package io.vertigo.orchestra.plugins.store;

import java.time.ZonedDateTime;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.commons.transaction.Transactional;
import io.vertigo.dynamo.criteria.Criterions;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.dao.history.OJobExecutionDAO;
import io.vertigo.orchestra.dao.model.OJobModelDAO;
import io.vertigo.orchestra.dao.run.OJobRunDAO;
import io.vertigo.orchestra.dao.run.RunPAO;
import io.vertigo.orchestra.dao.schedule.OJobScheduleDAO;
import io.vertigo.orchestra.domain.history.OJobExecution;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.run.OJobRun;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.domain.schedule.OProcessNextRun;
import io.vertigo.orchestra.plugins.services.JobRunnerUtil;
import io.vertigo.orchestra.services.run.JobExecutorManager;

@Transactional
public class OrchestraStoreImpl implements OrchestraStore {

	private static final Logger LOG = LogManager.getLogger(OrchestraStoreImpl.class);

	@Inject
	private OJobModelDAO jobModelDAO;
	@Inject
	private OJobScheduleDAO jobScheduleDAO;
	@Inject
	private RunPAO runPAO;
	@Inject
	private OJobRunDAO jobRunDAO;
	@Inject
	private OJobExecutionDAO jobExecutionDAO;
	@Inject
	private StoreManager storeManager;
	@Inject
	private JobExecutorManager jobExecutorManager;

	private final Long nodId = 2L;

	//--------------------------------------------------------------
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
		final URI<OJobModel> uri = new URI(DtObjectUtil.findDtDefinition(OJobModel.class), jmoId);
		final OJobModel jobModel = storeManager.getDataStore()
				.readOneForUpdate(uri);
		jobModel.setActive(false);
		jobModelDAO.update(jobModel);
		return jobModel;
	}

	@Override
	public OJobModel activateJobModel(final long jmoId) {
		final URI<OJobModel> uri = new URI(DtObjectUtil.findDtDefinition(OJobModel.class), jmoId);
		final OJobModel jobModel = storeManager.getDataStore()
				.readOneForUpdate(uri);
		jobModel.setActive(true);
		jobModelDAO.update(jobModel);
		return jobModel;
	}
	//--------------------------------------------------------------

	@Override
	public OJobSchedule scheduleAt(final long jmoId, final OParams params, final ZonedDateTime scheduleDate) {
		final OJobSchedule schedule = new OJobSchedule();
		schedule.setJmoId(jmoId);
		schedule.setParams(params.toJson());
		schedule.setScheduleDate(scheduleDate);
		return jobScheduleDAO.create(schedule);
	}

	@Override
	public DtList<OJobSchedule> getAllJobSchedules() {
		return jobScheduleDAO.findAll(Criterions.alwaysTrue(), Integer.MAX_VALUE);
	}

	//--------------------------------------------------------------
	@Override
	public void removeJobSchedule(final long jscId) {
		jobScheduleDAO.delete(jscId);
	}

	@Override
	public String startJobSchedule(final long jscId) {
		final OJobSchedule jobSchedule = jobScheduleDAO.get(jscId);
		final OJobModel jobModel = jobSchedule.getJobModel();

		final OProcessNextRun nextRun = new OProcessNextRun();
		nextRun.setExpectedTime(jobSchedule.getScheduleDate());
		nextRun.setInitialParams(jobSchedule.getParams());
		nextRun.setJobname(jobModel.getJobName());
		final String jobId = JobRunnerUtil.generateJobId(jobSchedule.getScheduleDate(), "S", jscId);
		nextRun.setJobId(jobId);

		final ZonedDateTime execDate = ZonedDateTime.now();
		final long count = runPAO.insertJobRunningToLaunch(nodId, execDate, null, nextRun);

		if (count > 0) {
			final OJobRun jobBoard = new OJobRun();
			jobBoard.setJid(jobId);
			jobBoard.setCurrentTry(0);
			jobBoard.setMaxRetry(jobModel.getMaxRetry());
			jobBoard.setMaxDate(null);
			jobBoard.setStatus("R");
			jobBoard.setNodeId(nodId);
			runPAO.insertJobBoardToLaunch(jobBoard);

			final OJobExecution jobExecution = new OJobExecution();
			jobExecution.setClassEngine(jobModel.getJobEngineClassName());
			jobExecution.setDateDebut(execDate);
			jobExecution.setJobName(jobModel.getJobName());
			jobExecution.setNodId(nodId);
			jobExecution.setStatus("R");
			jobExecution.setWorkspaceIn("");
			jobExecutionDAO.create(jobExecution);

			final OParams params = new OParams(jobSchedule.getParams());
			jobExecutorManager.execute(jobModel, params, jobId, execDate);
		} else {
			LOG.info("Race condition on Insert JobRunning");
		}

		return jobId;
	}

	@Override
	public void fireSuccessJob(final String jobId, final OWorkspace workspace) {

		final long countNbDeleted = runPAO.deleteJobRunning(jobId, nodId, workspace.getExecDate());

		if (countNbDeleted > 0) {
			final OJobRun jobBoard = jobRunDAO.get(jobId);

			jobBoard.setStatus("S");
			jobRunDAO.update(jobBoard);

			final OJobExecution jobExecution = new OJobExecution();
			jobExecution.setClassEngine(workspace.getClassEngine());
			jobExecution.setDateDebut(ZonedDateTime.now());
			jobExecution.setJobName(workspace.getJobName());
			jobExecution.setNodId(nodId);
			jobExecution.setStatus("R");
			jobExecution.setWorkspaceIn(workspace.toJson());
			jobExecutionDAO.create(jobExecution);
		} else {
			LOG.info("Race condition on Delete JobRunning");
		}

	}

}
