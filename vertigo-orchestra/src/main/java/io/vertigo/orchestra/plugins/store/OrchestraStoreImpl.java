package io.vertigo.orchestra.plugins.store;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.inject.Inject;

import io.vertigo.app.Home;
import io.vertigo.commons.transaction.Transactional;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.dynamo.criteria.Criterions;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.dao.model.OJobModelDAO;
import io.vertigo.orchestra.dao.run.OJobExecDAO;
import io.vertigo.orchestra.dao.run.OJobRunDAO;
import io.vertigo.orchestra.dao.schedule.OJobScheduleDAO;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.run.OJobExec;
import io.vertigo.orchestra.domain.run.OJobRun;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.services.run.JobEngine;
import io.vertigo.util.ClassUtil;

@Transactional
public class OrchestraStoreImpl implements OrchestraStore {
	//	private static final Logger LOG = Logger.getLogger(OrchestraStoreImpl.class);
	private final ExecutorService executorService = Executors.newFixedThreadPool(10); // TODO: named parameter

	@Inject
	private OJobModelDAO jobModelDAO;
	@Inject
	private OJobScheduleDAO jobScheduleDAO;
	@Inject
	private OJobRunDAO jobRunDAO;
	@Inject
	private OJobExecDAO jobExecDAO;
	//----

	//	@Inject
	//	private RunPAO runPAO;
	//	@Inject
	//	private OJobExecutionDAO jobExecutionDAO;
	@Inject
	private StoreManager storeManager;

	private final long nodeId = 2L;

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
		final OJobSchedule schedule = new OJobSchedule();
		schedule.getJobModelAccessor().setId(jmoId);
		schedule.setParams(params.toJson());
		schedule.setScheduleDate(scheduleDate);
		return jobScheduleDAO.create(schedule);
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
			final OJobSchedule jobSchedule,
			final String jobId) {
		Assertion.checkNotNull(jobModel);
		Assertion.checkNotNull(jobSchedule);
		//---
		final ZonedDateTime maxDate = jobSchedule.getScheduleDate().plusSeconds(jobModel.getRunMaxDelay());

		final ZonedDateTime now = ZonedDateTime.of(LocalDateTime.now(), ZoneId.of("UTC"));
		Assertion.checkArgument(now.isAfter(maxDate), "delay has been expired, the job {0} can't be executed", jobModel.getJobName());
		final OJobRun jobRun = new OJobRun();
		jobRun.setJobId(jobId);
		jobRun.setCurrentTry(1);
		jobRun.setMaxRetry(jobModel.getMaxRetry());
		jobRun.setMaxDate(maxDate);
		jobRun.setStatus("R"); //Run
		jobRun.setNodeId(nodeId);
		return jobRunDAO.create(jobRun);
	}

	private OJobExec createJobExec(final OJobModel jobModel, final OJobRun jobRun) {
		Assertion.checkNotNull(jobRun);
		//---
		final ZonedDateTime startExecDate = ZonedDateTime.of(LocalDateTime.now(), ZoneId.of("UTC"));
		final ZonedDateTime maxExecDate = startExecDate.plusSeconds(jobModel.getExecTimeout());

		final OJobExec jobExec = new OJobExec();
		jobExec.setJobId(jobRun.getJobId());
		jobExec.setJobName(jobModel.getJobName());
		jobExec.setNodeId(nodeId);
		jobExec.setMaxExecDate(maxExecDate);
		jobExec.setStartExecDate(startExecDate);
		return jobExecDAO.create(jobExec);
	}

	@Override
	public String startJobSchedule(final long jscId) {
		final OJobSchedule jobSchedule = readJobScheduleForUpdate(jscId);
		jobSchedule.getJobModelAccessor().load();
		final OJobModel jobModel = jobSchedule.getJobModelAccessor().get();
		//		final OJobModel jobModel = readJobModelForUpdate(jobSchedule.getJobMSodel().getJmoId());
		final String jobId = "SCH:" + String.valueOf(jscId);
		//---
		Assertion.checkArgument(jobModel.getActive(), "The selected job {0} must be active to be executed", jobModel.getJobName());
		//---
		//--- To start a Job---
		// 1. create a run
		// 2. create the first exec attached to this run
		final OJobRun jobRun = createJobRun(jobModel, jobSchedule, jobId);
		final OJobExec jobExec = createJobExec(jobModel, jobRun);
		//---
		final OParams initialParams = OParams.of(jobSchedule.getParams());

		final String jobEngineClassName = jobModel.getJobEngineClassName();
		final Class<? extends JobEngine> jobEngineClass = ClassUtil.classForName(jobEngineClassName, JobEngine.class);

		execute(jobExec, jobEngineClass, initialParams);
		return jobId; //Tuples.of(jobRun, jobExec);
		//		final OProcessNextRun nextRun = new OProcessNextRun();
		//		nextRun.setExpectedTime(jobSchedule.getScheduleDate());
		//		nextRun.setInitialParams(jobSchedule.getParams());
		//		nextRun.setJobname(jobModel.getJobName());
		//		final String jobId = JobRunnerUtil.generateJobId(jobSchedule.getScheduleDate(), "S", jscId);
		//		nextRun.setJobId(jobId);
		//
		//		final ZonedDateTime execDate = ZonedDateTime.now();
		//		final long count = runPAO.insertJobRunningToLaunch(nodId, execDate, null, nextRun);
		//
		//		if (count > 0) {
		//			final OJobRun jobBoard = new OJobRun();
		//			jobBoard.setJid(jobId);
		//			jobBoard.setCurrentTry(0);
		//			jobBoard.setMaxRetry(jobModel.getMaxRetry());
		//			jobBoard.setMaxDate(null);
		//			jobBoard.setStatus("R");
		//			jobBoard.setNodeId(nodId);
		//			runPAO.insertJobBoardToLaunch(jobBoard);
		//
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
	}

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
	private void execute(final OJobExec jobExec, final Class<? extends JobEngine> jobEngineClass, final OParams initialParams) {
		Assertion.checkNotNull(jobExec);
		Assertion.checkNotNull(jobEngineClass);
		Assertion.checkNotNull(initialParams);
		// ---
		final JobEngine jobEngine = DIInjector.newInstance(jobEngineClass, Home.getApp().getComponentSpace());

		final OWorkspace workspace = new OWorkspace(jobExec.getJobId()); //initialParams.asMap(), jobId, jobModel.getJobName(), engineclassName, execDate);

		CompletableFuture.supplyAsync(() -> jobEngine.execute(workspace), executorService)
				.whenComplete(this::onComplete);
	}

	private void onComplete(final OWorkspace workspace, final Throwable t) {
		//We have to
		// - to update JobRun
		// - to delete JobExec

		final OJobRun jobRun = readJobRunForUpdate(workspace.getJobId());
		jobExecDAO.delete(workspace.getJobId());
		if (t != null) {
			jobRun.setStatus("F");
		} else {
			jobRun.setStatus("S");
		}
		jobRunDAO.update(jobRun);
	}

	@Override
	public DtList<OJobExec> getAllJobExecs() {
		return jobExecDAO.findAll(Criterions.alwaysTrue(), Integer.MAX_VALUE);
	}
}
