package io.vertigo.orchestra.plugins.store;

import java.text.ParseException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.app.Home;
import io.vertigo.commons.analytics.AnalyticsManager;
import io.vertigo.commons.daemon.DaemonScheduled;
import io.vertigo.commons.transaction.Transactional;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.component.Activeable;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.dynamo.criteria.Criterions;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.VUserException;
import io.vertigo.orchestra.dao.model.OJobModelDAO;
import io.vertigo.orchestra.dao.node.ONodeDAO;
import io.vertigo.orchestra.dao.run.OJobExecDAO;
import io.vertigo.orchestra.dao.run.OJobRunDAO;
import io.vertigo.orchestra.dao.schedule.OJobCronDAO;
import io.vertigo.orchestra.dao.schedule.OJobScheduleDAO;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.node.ONode;
import io.vertigo.orchestra.domain.run.OJobExec;
import io.vertigo.orchestra.domain.run.OJobRun;
import io.vertigo.orchestra.domain.run.OJobRunStatus;
import io.vertigo.orchestra.domain.schedule.OJobCron;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.impl.services.schedule.CronExpression;
import io.vertigo.orchestra.services.run.JobEngine;
import io.vertigo.util.ClassUtil;
import io.vertigo.util.ListBuilder;

@Transactional
public class OrchestraStoreImpl implements OrchestraStore, Activeable {
	//private static final Logger LOGGER = LogManager.getLogger(OrchestraStoreImpl.class);

	private final ExecutorService executor = Executors.newFixedThreadPool(10); // TODO: named parameter

	@Inject
	private OJobModelDAO jobModelDAO;
	@Inject
	private OJobScheduleDAO jobScheduleDAO;
	@Inject
	private OJobCronDAO jobCronDAO;
	@Inject
	private OJobRunDAO jobRunDAO;
	@Inject
	private OJobExecDAO jobExecDAO;
	@Inject
	private ONodeDAO nodeDAO;
	@Inject
	private VTransactionManager transactionManager;
	@Inject
	private AnalyticsManager analyticsManager;

	@Inject
	private StoreManager storeManager;

	private final String nodId = UUID.randomUUID().toString();
	//	private final long nodeId = 2L;

	//	@Inject
	//	public OrchestraSchedulerProvider(@Named("planningPeriod") int planningPeriod) {
	//		this.myPlanningPeriod = planningPeriod;
	//	}
	//
	//
	//	@Override
	//	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
	//		return Collections.singletonList(new DaemonDefinition("DMN_O_DB_PROCESS_SCHEDULER_DAEMON", () -> this::scheduleAndInit, myPlanningPeriod));
	//	}

	@Override
	public void start() {
		createNode();
	}

	@Override
	public void stop() {
		//
	}

	private void createNode() {
		final ONode node = new ONode();
		node.setNodId(nodId);
		node.setLastHeartbeat(Instant.now());
		node.setCapacity(getCapacity());
		node.setUsed(getUsed());
		nodeDAO.insertNode(node);
	}

	private void updateNode() {
		final ONode node = new ONode();
		node.setNodId(nodId);
		node.setLastHeartbeat(Instant.now());
		node.setCapacity(getCapacity());
		node.setUsed(getUsed());
		nodeDAO.update(node);
	}

	private int getUsed() {
		final ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) executor;
		final int used = threadPoolExecutor.getActiveCount();
		return used;
	}

	private int getCapacity() {
		final ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) executor;
		final int capacity = threadPoolExecutor.getMaximumPoolSize();
		return capacity;

	}

	@Override
	@DaemonScheduled(name = "DMN_TICK", periodInSeconds = 30)
	public void tick() {
		//For Update : lLock all nodes
		final List<ONode> nodes = nodeDAO.getNodes();
		final int localCapacity = getCapacity();
		final int localUsed = getUsed();
		int globalCapacity = 0;
		int globalUsed = 0;
		for (final ONode node : nodes) {
			if (node.getNodId() != nodId) {
				globalCapacity += node.getCapacity();
				globalUsed += node.getUsed();
			} else {
				globalCapacity += localCapacity;
				globalUsed += localUsed;
			}
		}

		//The objective is to have the same ratio used/capacity on each node.

		//00. find candidates (job to start).
		//		List<OJobModel> still
		final List<OJobToLaunch> jobsToLaunch2 = new ListBuilder<OJobToLaunch>()
				.addAll(findJobCronCandidates())
				.addAll(findJobScheduleCandidates())
				.sort((o1, o2) -> o1.getScheduledInstant().equals(o2.getScheduledInstant()) ? 0 : o1.getScheduledInstant().isBefore(o2.getScheduledInstant()) ? 1 : -1)
				.build();

		final List<OJobToLaunch> jobsToLaunch = new ArrayList<>();
		for (final OJobToLaunch jobToLaunch : jobsToLaunch2) {
			if (jobsToLaunch.stream().allMatch(j -> j.getJmoId() != jobToLaunch.getJmoId())) {
				jobsToLaunch.add(jobToLaunch);
			}
		}
		//sort by date and keep only the first job as a same models is concerned.

		/*We want to equilibrate the load on each node
		* That's to say
		* localCapacity/globalCapacity = localUsed/globalUsed
		* LC/GC = LU/GU
		* so what is the number max [J] of jobs to start if we have to start [N].
		* (J+LU)/(N+GU) = LC/GC
		* J = (LC/GC).(N+GU)-LU
		*
		* we have to round or truncate J
		* J must be so that (J + LU) < LC
		* Indeed  J<= Free
		* J = RoundUp(J)
		*
		* J = min (LC - LU, J)
		*
		*/

		//0. Launch cron Jobs

		//	jobCronCandidates.stream().findFirst().map(candidate->
		//
		//	startJobCron(candidate.getVal1(), candidate.getVal2()));
		//
		//		//1. Launch scheduled Jobs
		//		jobScheduleCandidates
		//				.stream()
		//				.findFirst()
		//				.map(candidate -> startJobSchedule(candidate));
		//		//---

		// J = (LC/GC).(N+GU)-LU
		int j = (localCapacity / globalCapacity) * (jobsToLaunch.size() + globalUsed) - localUsed;
		j = Math.min(j, localCapacity - localUsed);

		for (int i = 0; i < j; i++) {
			jobsToLaunch.get(i);
			startJob(jobsToLaunch.get(i));
		}
		//2. Watch jobs alive
		//- in timeout
		// - delay exceeded
		//- in error (=> restart)
		//watchJobTimeOut();
		//3. Watch jobs in error
		//TODO
		//How to calculate the numbers of jobs to lauch
		//For the current node [C]apacity = [U]sed + [F]ree
		//For all nodes GC= GU + GF
		//[N]odes = number of active nodes
		//ih there are J jobs to launch
		//1 node :
		//The global idea is to distribute the todo list on each node
		//Examples
		//|||||||||-------
		//||||------------
		//
		// J> GF : overload => we have to take the max/N
		// J<=GF :
		//	if (J/N)
		updateNode();

	}

	//	private void watchJobExecInTimeout() {
	//		//		return false;
	//	}
	//
	//	private void watchJobRunInTimeout() {
	//		//		return false;
	//	}

	private List<OJobToLaunch> findJobScheduleCandidates() {
		return jobScheduleDAO.getJobScheduleToRun(Instant.now())
				.stream()
				.map(jobSchedule -> new OJobToLaunch(jobSchedule))
				.collect(Collectors.toList());
	}

	private List<OJobToLaunch> findJobCronCandidates() {
		final DtList<OJobCron> jobCrons = jobCronDAO.getJobCron();

		final ListBuilder<OJobToLaunch> candidatesBuilder = new ListBuilder<>();
		for (final OJobCron jobCron : jobCrons) {
			jobCron.jobModel().load();
			final Instant start = Instant.now().minusSeconds(jobCron.jobModel().get().getRunMaxDelay());
			final Instant scheduledInstant;
			try {
				scheduledInstant = CronExpression.of(jobCron.getCronExpression())
						.getNextValidTimeAfter(Date.from(start))
						.toInstant();
			} catch (final ParseException e) {
				throw new RuntimeException(e);
			}
			final boolean mustBeStarted = scheduledInstant.isBefore(Instant.now());
			if (mustBeStarted) {
				candidatesBuilder.add(new OJobToLaunch(jobCron, scheduledInstant));
			}
		}
		return candidatesBuilder.build();
	}

	//-------------------------------------------------------------------------
	private OJobSchedule readJobScheduleForUpdate(final long jscId) {
		final URI<OJobSchedule> uri = new URI(DtObjectUtil.findDtDefinition(OJobSchedule.class), jscId);
		return storeManager.getDataStore()
				.readOneForUpdate(uri);
	}

	private OJobModel readJobModelForUpdate(final long jmoId) {
		final URI<OJobModel> uri = new URI(DtObjectUtil.findDtDefinition(OJobModel.class), jmoId);
		return storeManager.getDataStore()
				.readOneForUpdate(uri);
	}

	private OJobRun readJobRunForUpdate(final String jobId) {
		final URI<OJobRun> uri = new URI(DtObjectUtil.findDtDefinition(OJobRun.class), jobId);
		return storeManager.getDataStore()
				.readOneForUpdate(uri);
	}
	//-------------------------------------------------------------------------

	@Override
	public OJobModel createJobModel(final OJobModel jobModel) {
		Assertion.checkNotNull(jobModel);
		//---
		return jobModelDAO.create(jobModel);
	}

	@Override
	public DtList<OJobModel> getAllJobModels() {
		return jobModelDAO.findAll(Criterions.alwaysTrue(), Integer.MAX_VALUE);
	}

	@Override
	public OJobModel deactivateJobModel(final long jmoId) {
		return updateJobModel(jmoId, false);
	}

	@Override
	public OJobModel activateJobModel(final long jmoId) {
		return updateJobModel(jmoId, true);
	}

	private OJobModel updateJobModel(final long jmoId, final boolean active) {
		final OJobModel jobModel = readJobModelForUpdate(jmoId);
		jobModel.setActive(active);
		jobModelDAO.update(jobModel);
		return jobModel;
	}

	//--------------------------------------------------------------

	@Override
	//a job can be scheduled even if it is deactivated.
	public OJobSchedule scheduleAt(final long jmoId, final OParams params, final Instant scheduledInstant) {
		Assertion.checkNotNull(params);
		Assertion.checkNotNull(scheduledInstant);
		//---
		final OJobSchedule jobSchedule = new OJobSchedule();
		jobSchedule.jobModel().setId(jmoId);
		jobSchedule.setParams(params.toJson());
		jobSchedule.setScheduleInstant(scheduledInstant);
		return jobScheduleDAO.create(jobSchedule);
	}

	@Override
	//a job can be croned even if it is deactivated.
	public OJobCron cron(final long jmoId, final OParams params, final CronExpression cronExpression) {
		Assertion.checkNotNull(params);
		Assertion.checkNotNull(cronExpression);
		//---
		final OJobCron jobCron = new OJobCron();
		jobCron.jobModel().setId(jmoId);
		jobCron.setParams(params.toJson());
		jobCron.setCronExpression(cronExpression.getCronExpression());
		return jobCronDAO.create(jobCron);
	}

	@Override
	public DtList<OJobSchedule> getAllJobSchedules() {
		return jobScheduleDAO.findAll(Criterions.alwaysTrue(), Integer.MAX_VALUE);
	}

	//	@Override
	//	public void removeJobSchedule(final long jscId) {
	//		jobScheduleDAO.delete(jscId);
	//	}

	//--------------------------------------------------------------
	private OJobRun createJobRun(
			final OJobModel jobModel,
			final Instant scheduledInstant,
			final String jobId) {
		Assertion.checkNotNull(jobModel);
		Assertion.checkNotNull(scheduledInstant);
		//---
		final Instant startInstant = Instant.now();
		final Instant maxInstant = scheduledInstant.plusSeconds(jobModel.getRunMaxDelay());

		Assertion.checkArgument(maxInstant.isAfter(startInstant), "delay has expired, the job {0} can't be executed", jobModel.getJobName());
		final UUID uuid = UUID.randomUUID();
		final OJobRun jobRun = new OJobRun();
		jobRun.setJobId(jobId);
		jobRun.jobModel().set(jobModel);
		jobRun.setMaxRetry(jobModel.getMaxRetry());
		jobRun.setMaxInstant(maxInstant);
		jobRun.setStartInstant(startInstant);

		//mutables fields
		jobRun.setAlive(true);
		jobRun.setCurrentTry(1);
		jobRun.setJexId(uuid.toString());
		jobRun.setStatus(OJobRunStatus.RUNNING.getCode());

		jobRunDAO.insertJobRunWithJobId(jobRun);
		return jobRun;
	}

	private OJobExec createJobExec(final OJobRun jobRun) {
		Assertion.checkNotNull(jobRun);
		//---
		final Instant startExecInstant = Instant.now();
		final Instant maxExecInstant = startExecInstant.plusSeconds(jobRun.jobModel().get().getExecTimeout());

		final OJobExec jobExec = new OJobExec();
		jobExec.setJexId(jobRun.getJexId());
		jobExec.setJobId(jobRun.getJobId());
		//	jobExec.setJobName(jobModel.getJobName());
		jobExec.setMaxExecInstant(maxExecInstant);
		jobExec.setStartExecInstant(startExecInstant);
		jobExec.jobRun().set(jobRun);
		/*to attach a unique constraint*/
		jobExec.jobModel().set(jobRun.jobModel().get());
		//		jobExec.setNodeId(nodeId);
		jobExecDAO.insertJobExecWithJobId(jobExec);
		return jobExec;
	}

	private static String createJobId(final OJobCron jobCron) {
		//TODO
		//TODO
		//TODO
		//TODO
		//TODO
		return "CRN:" + String.valueOf(jobCron.getJcrId());
	}

	private static String createJobId(final OJobSchedule jobSchedule) {
		return "SCH:" + String.valueOf(jobSchedule.getJscId());
	}

	private String startJob(final OJobToLaunch jobToLaunch) {
		Assertion.checkNotNull(jobToLaunch);
		//---
		if (jobToLaunch.isCron()) {
			return startJobCron(jobToLaunch.getJobCron(), jobToLaunch.getScheduledInstant());
		}
		return startJobSchedule(jobToLaunch.getJobSchedule());
	}

	//jobCron must have been locked
	private String startJobCron(final OJobCron jobCron, final Instant scheduledInstant) {
		Assertion.checkNotNull(jobCron);
		//---
		jobCron.jobModel().load();
		final OJobModel jobModel = jobCron.jobModel().get();
		Assertion.checkArgument(jobModel.getActive(), "The selected job {0} must be active to be executed", jobModel.getJobName());
		//--- To start a Job---
		// 1. create a run
		// 2. create the first exec attached to this run
		final String jobId = createJobId(jobCron);
		final OJobRun jobRun = createJobRun(jobModel, scheduledInstant, jobId);
		final OParams initialParams = OParams.of(jobCron.getParams());
		startRun(jobRun, initialParams);
		return jobId;
	}

	@Override
	public String startJobSchedule(final long jscId) {
		final OJobSchedule jobSchedule = readJobScheduleForUpdate(jscId);
		return startJobSchedule(jobSchedule);
	}

	//jobSchedule must have been locked
	private String startJobSchedule(final OJobSchedule jobSchedule) {
		Assertion.checkNotNull(jobSchedule);
		//---
		jobSchedule.jobModel().load();
		final OJobModel jobModel = jobSchedule.jobModel().get();
		Assertion.checkArgument(jobModel.getActive(), "The selected job {0} must be active to be executed", jobModel.getJobName());
		//--- To start a Job---
		// 1. create a run
		// 2. create the first exec attached to this run
		final String jobId = createJobId(jobSchedule);
		final OJobRun jobRun = createJobRun(jobModel, jobSchedule.getScheduleInstant(), jobId);
		final OParams initialParams = OParams.of(jobSchedule.getParams());
		startRun(jobRun, initialParams);
		return jobId;
	}

	private void startRun(final OJobRun jobRun, final OParams initialParams) {
		final OJobExec jobExec = createJobExec(jobRun);
		//---
		final String jobEngineClassName = jobRun.jobModel().get().getJobEngineClassName();
		final Class<? extends JobEngine> jobEngineClass = ClassUtil.classForName(jobEngineClassName, JobEngine.class);
		final JobEngine jobEngine = DIInjector.newInstance(jobEngineClass, Home.getApp().getComponentSpace());

		executeASync(jobExec, jobEngine, initialParams);
	}

	private void executeASync(
			final OJobExec jobExec,
			final JobEngine jobEngine,
			final OParams initialParams) {
		Assertion.checkNotNull(jobExec);
		Assertion.checkNotNull(jobEngine);
		Assertion.checkNotNull(initialParams);
		// ---
		final OWorkspace workspace = new OWorkspace(jobExec.getJobId(), jobExec.getJexId()); //initialParams.asMap(), jobId, jobModel.getJobName(), engineclassName, execDate);

		CompletableFuture.supplyAsync(() -> execute(jobEngine, workspace), executor)
				.whenCompleteAsync(this::onComplete);
	}

	private OWorkspace execute(final JobEngine jobEngine, final OWorkspace workspace) {
		/*execution is done with analytics*/
		return analyticsManager.traceWithReturn(
				"jobs",
				"/execute/",
				tracer -> {
					jobEngine.execute(workspace);
					return workspace;
				});
	}

	private void onComplete(final OWorkspace workspace, final Throwable t) {
		//case X : the run is not found
		// 	this case is abnormal !!
		// When the run is found there is two cases
		//case A : an exec is found

		// normaly the exec has been destroyed, so we have nothing to do...
		//except log this fail --Timeout
		//case B : an exec is found and is still the same
		// - the delay has expired => TimeOut
		// - the delay has not expired
		//     -- Success
		//
		//LOGGER.catching(t);
		try (final VTransactionWritable tx = transactionManager.createCurrentTransaction()) {
			//dataBaseManager.getConnectionProvider("orchestra").obtainConnection();
			//We have to
			// - to update JobRun
			// - to delete JobExec
			final OJobRun jobRun = readJobRunForUpdate(workspace.getJobId());

			final boolean stillTheSameExec = jobRun.getJexId().equals(workspace.getJexId());
			if (stillTheSameExec) {
				Assertion.checkState(jobRun.getStatus().equals(OJobRunStatus.RUNNING.getCode()), "The status of this job is not valid. expected [R]UNNING, [{0}] found.", jobRun.getStatus());
				//--
				jobExecDAO.delete(workspace.getJexId());
				if (t == null) {
					if (delayExceeded(jobRun)) {
						jobRun.setStatus(OJobRunStatus.DELAY_EXCEEDED.getCode());
						jobRun.setAlive(false);
					} else {
						jobRun.setStatus(OJobRunStatus.SUCCEEDED.getCode());
						jobRun.setAlive(false);
					}
				} else {
					if (delayExceeded(jobRun) || jobRun.getCurrentTry() > jobRun.getMaxRetry()) {
						jobRun.setStatus(OJobRunStatus.FAILED.getCode());
						jobRun.setAlive(false);
					} else {
						jobRun.setStatus(OJobRunStatus.ERROR.getCode());
						//Still alive
					}
				}
				jobRun.setJexId(null);
				jobRunDAO.update(jobRun);
				//TODO
				//créer un event
			} else {
				//TODO
				//créer un event
			}
			tx.commit();
		} catch (final Throwable th) {
			th.printStackTrace();
			//LOGGER.catching(th);
		}
	}

	@Override
	public DtList<OJobExec> getAliveJobExecs() {
		return jobExecDAO.findAll(Criterions.alwaysTrue(), Integer.MAX_VALUE);
	}

	@Override
	public DtList<OJobRun> getAliveJobRuns() {
		return jobRunDAO.findAll(Criterions.alwaysTrue(), Integer.MAX_VALUE);
	}

	private static boolean delayExceeded(final OJobRun jobRun) {
		return !jobRun.getMaxInstant().isAfter(Instant.now());
	}

	//	@Override
	//	public void timeoutJob(final String jobId) {
	//		Assertion.checkNotNull(jobId);
	//		//---
	//		final OJobRun jobRun = readJobRunForUpdate(jobId);
	//		if (OJobRunStatus.isAlive(jobRun)) {
	//			jobExecDAO.delete(jobId);
	//			jobRun.setStatus(OJobRunStatus.KILLED.getCode());
	//			jobRunDAO.update(jobRun);
	//		} else {
	//			throw new VUserException("Only a living job can be killed");
	//		}
	//	}

	@Override
	public void killJob(final String jobId) {
		Assertion.checkNotNull(jobId);
		//---
		final OJobRun jobRun = readJobRunForUpdate(jobId);

		if (!OJobRunStatus.isAlive(jobRun)) {
			throw new VUserException("Only a living job can be killed");
		}

		jobExecDAO.delete(jobRun.getJexId());
		jobRun.setStatus(OJobRunStatus.KILLED.getCode());
		jobRun.setAlive(false);
		jobRun.setJexId(null);
		jobRunDAO.update(jobRun);
	}
}
