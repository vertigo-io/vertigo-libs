package io.vertigo.orchestra.plugins.store;


import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

import javax.inject.Inject;

import io.vertigo.commons.transaction.Transactional;
import io.vertigo.dynamo.criteria.Criterions;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.orchestra.dao.definition.OJobModelDAO;
import io.vertigo.orchestra.dao.execution.ExecutionPAO;
import io.vertigo.orchestra.dao.execution.OJobBoardDAO;
import io.vertigo.orchestra.dao.execution.OJobRunningDAO;
import io.vertigo.orchestra.dao.history.OJobExecutionDAO;
import io.vertigo.orchestra.dao.scheduling.OJobScheduleDAO;
import io.vertigo.orchestra.domain.definition.OJobModel;
import io.vertigo.orchestra.domain.execution.OJobBoard;
import io.vertigo.orchestra.domain.history.OJobExecution;
import io.vertigo.orchestra.domain.planification.OProcessNextRun;
import io.vertigo.orchestra.domain.scheduling.OJobSchedule;
import io.vertigo.orchestra.plugins.services.JobRunnerUtil;
import io.vertigo.orchestra.services.execution.JobExecutionWorkspace;

@Transactional
public class OrchestraStoreImpl implements OrchestraStore {

	@Inject
	private OJobModelDAO jobModelDAO;
	@Inject
	private OJobScheduleDAO jobScheduleDAO;
	@Inject
	private ExecutionPAO executionPAO;
	@Inject
	private OJobBoardDAO jobBoardDAO;
	@Inject
	private OJobExecutionDAO jobExecutionDAO;
	
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
		// TODO Auto-generated method stub
		jobScheduleDAO.delete(jscId);
	}

	@Override
	public String startJobSchedule(long jscId) {
		// TODO: jobSchedule
		OJobSchedule jobSchedule = jobScheduleDAO.get(jscId);
		OJobModel jobModel = jobSchedule.getJobModel();

		OProcessNextRun nextRun = new OProcessNextRun();
		nextRun.setExpectedTime(jobSchedule.getScheduleDate());
		nextRun.setInitialParams(jobSchedule.getParams());
		nextRun.setJobname(jobModel.getJobname());
		nextRun.setJobId(JobRunnerUtil.generateJobId(jobSchedule.getScheduleDate(), "S", jscId));
		long count = executionPAO.insertJobRunningToLaunch(nodId, ZonedDateTime.now(), DtList.of(nextRun));
		
		if (count > 0) {
			OJobBoard jobBoard = new OJobBoard();
			jobBoard.setCurrentRetry(0);
			jobBoard.setMaxRetry(jobModel.getMaxRetry());
			jobBoard.setMaxDate(null);
			jobBoard.setStatus("R");
			jobBoardDAO.create(jobBoard);
			
			OJobExecution jobExecution = new OJobExecution();
			jobExecution.setClassEngine(jobModel.getClassEngine());
			jobExecution.setDateDebut(ZonedDateTime.now());
			jobExecution.setJobname(jobModel.getJobname());
			jobExecution.setNodId(nodId);
			jobExecution.setStatus("R");
			jobExecution.setWorkspaceIn("");
			jobExecutionDAO.create(jobExecution);
		}
		
		return null;
	}

	@Override
	public void fireSuccessJob(String jobId, OWorkspace workspace) {
		
		long countNbDeleted = executionPAO.deleteJobRunning(nodId, jobId);
		
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