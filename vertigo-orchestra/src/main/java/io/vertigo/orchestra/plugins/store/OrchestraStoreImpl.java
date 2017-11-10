package io.vertigo.orchestra.plugins.store;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import javax.inject.Inject;

import io.vertigo.app.Home;
import io.vertigo.commons.daemon.DaemonScheduled;
import io.vertigo.commons.transaction.Transactional;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.dynamo.criteria.Criterions;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.VUserException;
import io.vertigo.orchestra.dao.model.OJobModelDAO;
import io.vertigo.orchestra.dao.run.OJobExecDAO;
import io.vertigo.orchestra.dao.run.OJobRunDAO;
import io.vertigo.orchestra.dao.run.RunPAO;
import io.vertigo.orchestra.dao.schedule.OJobCronDAO;
import io.vertigo.orchestra.dao.schedule.OJobScheduleDAO;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.run.OJobExec;
import io.vertigo.orchestra.domain.run.OJobRun;
import io.vertigo.orchestra.domain.run.OJobRunStatus;
import io.vertigo.orchestra.domain.schedule.OJobCron;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.impl.services.schedule.CronExpression;
import io.vertigo.orchestra.services.run.JobEngine;
import io.vertigo.util.ClassUtil;

@Transactional
public class OrchestraStoreImpl implements OrchestraStore {
	//private static final Logger LOGGER = LogManager.getLogger(OrchestraStoreImpl.class);

	private final Executor executor = Executors.newFixedThreadPool(10); // TODO: named parameter

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
	private RunPAO runPAO;
	@Inject
	private VTransactionManager transactionManager;
	//	@Inject
	//	private SqlDataBaseManager dataBaseManager;
	//----

	//	@Inject
	//	private RunPAO runPAO;
	//	@Inject
	//	private OJobExecutionDAO jobExecutionDAO;
	@Inject
	private StoreManager storeManager;

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
	@DaemonScheduled(name = "DMN_TICK", periodInSeconds = 30)
	public void tick() {
		//0. Launch cron Jobs
		if (startFirstJobCron()) {
			return;
		}
		//1. Launch scheduled Jobs
		if (startFirstJobSchedule()) {
			return;
			//---
			//2. Watch jobs alive
			//- in timeout
			//- in error (=> restart)
			//watchJobTimeOut();
			//3. Watch jobs in error
			//TODO
		}
	}

	private boolean startFirstJobSchedule() {
		final DtList<OJobSchedule> jobSchedules = jobScheduleDAO.getJobScheduleToRun(ZonedDateTime.now());
		for (final OJobSchedule jobSchedule : jobSchedules) {
			startJobSchedule(jobSchedule);
			return true;
		}
		return false;
	}

	private boolean startFirstJobCron() {
		final DtList<OJobCron> jobCrons = jobCronDAO.getJobCron();
		for (final OJobCron jobCron : jobCrons) {
			jobCron.jobModel().load();
			final Date start = Date.from(ZonedDateTime.now().minusSeconds(jobCron.jobModel().get().getRunMaxDelay()).toInstant());
			try {
				final ZonedDateTime scheduledDate = CronExpression.of(jobCron.getCronExpression()).getNextValidTimeAfter(start).toInstant().atZone(ZoneId.of("UTC"));
				if (scheduledDate.isBefore(ZonedDateTime.now())) {
					startJobCron(jobCron, scheduledDate);
					return true;
				}
			} catch (final ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return false;
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
		final OJobModel jobModel = readJobModelForUpdate(jmoId);
		jobModel.setActive(false);
		jobModelDAO.update(jobModel);
		return jobModel;
	}

	@Override
	public OJobModel activateJobModel(final long jmoId) {
		final OJobModel jobModel = readJobModelForUpdate(jmoId);
		jobModel.setActive(true);
		jobModelDAO.update(jobModel);
		return jobModel;
	}
	//--------------------------------------------------------------

	@Override
	//a job can be scheduled even if it is deactivated.
	public OJobSchedule scheduleAt(final long jmoId, final OParams params, final ZonedDateTime scheduleDate) {
		Assertion.checkNotNull(params);
		Assertion.checkNotNull(scheduleDate);
		//---
		final OJobSchedule jobSchedule = new OJobSchedule();
		jobSchedule.jobModel().setId(jmoId);
		jobSchedule.setParams(params.toJson());
		jobSchedule.setScheduleDate(scheduleDate);
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
			final ZonedDateTime scheduledDate,
			final String jobId) {
		Assertion.checkNotNull(jobModel);
		Assertion.checkNotNull(scheduledDate);
		//---
		final ZonedDateTime startDate = ZonedDateTime.of(LocalDateTime.now(), ZoneId.of("UTC"));
		final ZonedDateTime maxDate = scheduledDate.plusSeconds(jobModel.getRunMaxDelay());

		final ZonedDateTime now = ZonedDateTime.now(ZoneId.of("UTC"));
		Assertion.checkArgument(maxDate.isAfter(now), "delay has expired, the job {0} can't be executed", jobModel.getJobName());
		final UUID uuid = UUID.randomUUID();
		final OJobRun jobRun = new OJobRun();
		jobRun.setJobId(jobId);
		jobRun.jobModel().set(jobModel);
		jobRun.setMaxRetry(jobModel.getMaxRetry());
		jobRun.setMaxDate(maxDate);
		jobRun.setStartDate(startDate);

		//mutables fields
		jobRun.setAlive(true);
		jobRun.setCurrentTry(1);
		jobRun.setJexId(uuid.toString());
		jobRun.setStatus(OJobRunStatus.RUNNING.getCode());

		runPAO.insertJobRunWithJobId(jobRun);
		return jobRun;
	}

	private OJobExec createJobExec(final OJobModel jobModel, final OJobRun jobRun) {
		Assertion.checkNotNull(jobRun);
		//---
		final ZonedDateTime startExecDate = ZonedDateTime.of(LocalDateTime.now(), ZoneId.of("UTC"));
		final ZonedDateTime maxExecDate = startExecDate.plusSeconds(jobModel.getExecTimeout());

		final OJobExec jobExec = new OJobExec();
		jobExec.setJexId(jobRun.getJexId());
		jobExec.setJobId(jobRun.getJobId());
		//	jobExec.setJobName(jobModel.getJobName());
		jobExec.setMaxExecDate(maxExecDate);
		jobExec.setStartExecDate(startExecDate);
		jobExec.jobRun().set(jobRun);
		/*to attach a unique constraint*/
		jobExec.jobModel().setId(jobRun.jobModel().getId());
		//		jobExec.setNodeId(nodeId);
		runPAO.insertJobExecWithJobId(jobExec);
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

	//jobCron must have been locked
	private String startJobCron(final OJobCron jobCron, final ZonedDateTime scheduledDate) {
		Assertion.checkNotNull(jobCron);
		//---
		jobCron.jobModel().load();
		final OJobModel jobModel = jobCron.jobModel().get();
		Assertion.checkArgument(jobModel.getActive(), "The selected job {0} must be active to be executed", jobModel.getJobName());
		//--- To start a Job---
		// 1. create a run
		// 2. create the first exec attached to this run
		final String jobId = createJobId(jobCron);
		final OJobRun jobRun = createJobRun(jobModel, scheduledDate, jobId);
		final OParams initialParams = OParams.of(jobCron.getParams());
		startRun(jobModel, jobRun, initialParams);
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
		final OJobRun jobRun = createJobRun(jobModel, jobSchedule.getScheduleDate(), jobId);
		final OParams initialParams = OParams.of(jobSchedule.getParams());
		startRun(jobModel, jobRun, initialParams);
		return jobId;
	}

	private void startRun(final OJobModel jobModel, final OJobRun jobRun, final OParams initialParams) {
		final OJobExec jobExec = createJobExec(jobModel, jobRun);
		//---
		final String jobEngineClassName = jobModel.getJobEngineClassName();
		final Class<? extends JobEngine> jobEngineClass = ClassUtil.classForName(jobEngineClassName, JobEngine.class);
		executeASync(jobExec, jobEngineClass, initialParams);
	}

	//	private void addStartJobEvent(final OJobSchedule jobSchedule) {
	//		Assertion.checkNotNull(jobSchedule);
	//		//---
	//		final ZonedDateTime execDate = ZonedDateTime.now();
	//
	//		final OJobEvent jobEvent = new OJobEvent();
	//		jobEvent.setStartDate(startDate);
	//		JobName(jobName);
	//	}
	//		final ZonedDateTime execDate = ZonedDateTime.now();
	//		final long count = runPAO.insertJobRunningToLaunch(nodId, execDate, null, nextRun);
	//			final OJobExecution jobExecution = new OJobExecution();
	//			jobExecution.setClassEngine(jobModel.getJobEngineClassName());
	//			jobExecution.setDateDebut(execDate);
	//			jobExecution.setJobName(jobModel.getJobName());
	//			jobExecution.setNodId(nodId);
	//			jobExecution.setStatus("R");
	//			jobExecution.setWorkspaceIn("");
	//			jobExecutionDAO.create(jobExecution);
	//
	//			final OParams params = new OParams(jobSchedule.getParams());
	//			jobExecutorManager.execute(jobModel, params, jobId, execDate);
	//		} else {
	//			LOG.info("Race condition on Insert JobRunning");
	//		}

	//return jobId;

	//	@Override
	//	public void fireSuccessJob(final String jobId, final OWorkspace workspace) {
	//		final long countNbDeleted = runPAO.deleteJobRunning(jobId, nodeId, workspace.getExecDate());
	//
	//		if (countNbDeleted > 0) {
	//			final OJobRun jobBoard = jobRunDAO.get(jobId);
	//
	//			jobBoard.setStatus("S");
	//			jobRunDAO.update(jobBoard);
	//
	//			final OJobExecution jobExecution = new OJobExecution();
	//			jobExecution.setClassEngine(workspace.getClassEngine());
	//			jobExecution.setDateDebut(ZonedDateTime.now());
	//			jobExecution.setJobName(workspace.getJobName());
	//			jobExecution.setNodId(nodeId);
	//			jobExecution.setStatus("R");
	//			jobExecution.setWorkspaceIn(workspace.toJson());
	//			jobExecutionDAO.create(jobExecution);
	//		} else {
	//			LOG.info("Race condition on Delete JobRunning");
	//		}
	//
	//	}
	private void executeASync(
			final OJobExec jobExec,
			final Class<? extends JobEngine> jobEngineClass,
			final OParams initialParams) {
		Assertion.checkNotNull(jobExec);
		Assertion.checkNotNull(jobEngineClass);
		Assertion.checkNotNull(initialParams);
		// ---
		final JobEngine jobEngine = DIInjector.newInstance(jobEngineClass, Home.getApp().getComponentSpace());

		final OWorkspace workspace = new OWorkspace(jobExec.getJobId(), jobExec.getJexId()); //initialParams.asMap(), jobId, jobModel.getJobName(), engineclassName, execDate);

		CompletableFuture.supplyAsync(() -> jobEngine.execute(workspace), executor)
				.whenCompleteAsync(this::onComplete);
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
						jobRun.setStatus(OJobRunStatus.TIMEOUT.getCode());
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
		return !jobRun.getMaxDate().isAfter(ZonedDateTime.now());
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
