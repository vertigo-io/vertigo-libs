package io.vertigo.orchestra.plugins.store;


import java.time.ZonedDateTime;

import javax.inject.Inject;

import io.vertigo.commons.transaction.Transactional;
import io.vertigo.dynamo.criteria.Criterions;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.orchestra.dao.history.OJobExecutionDAO;
import io.vertigo.orchestra.dao.model.OJobModelDAO;
import io.vertigo.orchestra.dao.run.OJobBoardDAO;
import io.vertigo.orchestra.dao.run.RunPAO;
import io.vertigo.orchestra.dao.schedule.OJobScheduleDAO;
import io.vertigo.orchestra.domain.history.OJobExecution;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.run.OJobBoard;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.domain.schedule.OProcessNextRun;
import io.vertigo.orchestra.plugins.services.JobRunnerUtil;
import io.vertigo.orchestra.services.run.JobExecutor;

@Transactional
public class OrchestraStoreImpl implements OrchestraStore {

	@Inject
	private OJobModelDAO jobModelDAO;
	@Inject
	private OJobScheduleDAO jobScheduleDAO;
	@Inject
	private RunPAO runPAO;
	@Inject
	private OJobBoardDAO jobBoardDAO;
	@Inject
	private OJobExecutionDAO jobExecutionDAO;
	@Inject
	private JobExecutor jobExecutor;
	
	private Long nodId = 2L;
	
	@Override
	public OJobModel createJobModel(OJobModel model) {
		return jobModelDAO.create(model);
	}

	@Override
	public DtList<OJobModel> getAllModel() {
		return jobModelDAO.findAll(Criterions.alwaysTrue(), Integer.MAX_VALUE);
	}

	@Override
	public OJobSchedule scheduleAt(long jmoId, OParams params, ZonedDateTime scheduleDate) {
		OJobSchedule schedule = new OJobSchedule();
		schedule.setJmoId(jmoId);
		schedule.setParams(params.toJson());
		schedule.setScheduleDate(scheduleDate);
		return jobScheduleDAO.create(schedule);
	}

	@Override
	public void removeJobSchedule(long jscId) {
		jobScheduleDAO.delete(jscId);
	}

	@Override
	public String startJobSchedule(long jscId) {
		OJobSchedule jobSchedule = jobScheduleDAO.get(jscId);
		OJobModel jobModel = jobSchedule.getJobModel();

		OProcessNextRun nextRun = new OProcessNextRun();
		nextRun.setExpectedTime(jobSchedule.getScheduleDate());
		nextRun.setInitialParams(jobSchedule.getParams());
		nextRun.setJobname(jobModel.getJobname());
		String jobId = JobRunnerUtil.generateJobId(jobSchedule.getScheduleDate(), "S", jscId);
		nextRun.setJobId(jobId);
		long count = runPAO.insertJobRunningToLaunch(nodId, ZonedDateTime.now(), nextRun.getJobId(), nextRun);
		
		if (count > 0) {
			OJobBoard jobBoard = new OJobBoard();
			jobBoard.setJid(jobId);
			jobBoard.setCurrentRetry(0);
			jobBoard.setMaxRetry(jobModel.getMaxRetry());
			jobBoard.setMaxDate(null);
			jobBoard.setStatus("R");
			jobBoard.setNodeId(nodId);
			runPAO.insertJobBoardToLaunch(jobBoard);
			
			OJobExecution jobExecution = new OJobExecution();
			jobExecution.setClassEngine(jobModel.getClassEngine());
			jobExecution.setDateDebut(ZonedDateTime.now());
			jobExecution.setJobname(jobModel.getJobname());
			jobExecution.setNodId(nodId);
			jobExecution.setStatus("R");
			jobExecution.setWorkspaceIn("");
			jobExecutionDAO.create(jobExecution);
			
			OParams params = new OParams(jobSchedule.getParams());
			jobExecutor.execute(jobModel, params, jobId);
		}
		
		return jobId;
	}

	@Override
	public void fireSuccessJob(String jobId, OWorkspace workspace) {
		
		long countNbDeleted = runPAO.deleteJobRunning(nodId, jobId);
		
		if (countNbDeleted > 0) {
			OJobBoard jobBoard = jobBoardDAO.get(jobId);
			
			jobBoard.setStatus("S");
			jobBoardDAO.update(jobBoard);
			
			OJobExecution jobExecution = new OJobExecution();
			jobExecution.setClassEngine(workspace.getClassEngine());
			jobExecution.setDateDebut(ZonedDateTime.now());
			jobExecution.setJobname(workspace.getJobName());
			jobExecution.setNodId(nodId);
			jobExecution.setStatus("R");
			jobExecution.setWorkspaceIn(workspace.toJson());
			jobExecutionDAO.create(jobExecution);
		}
		
	}

}