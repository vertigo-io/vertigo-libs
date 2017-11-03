package io.vertigo.orchestra.plugins.store;

import java.time.ZonedDateTime;

import io.vertigo.core.component.Component;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.run.OJobExec;
import io.vertigo.orchestra.domain.run.OJobRun;
import io.vertigo.orchestra.domain.schedule.OJobCron;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.impl.services.schedule.CronExpression;

public interface OrchestraStore extends Component {
	void tick();

	/* ----------- JobModel	--------- */
	OJobModel createJobModel(OJobModel model);

	DtList<OJobModel> getAllJobModels();

	OJobModel deactivateJobModel(long jmoId);

	OJobModel activateJobModel(long jmoId);

	//void updateJobModel(long jmoId, long maxRetry, long maxDelay, long timeout);

	/* ----------- Schedule --------- */
	OJobSchedule scheduleAt(long jmoId, OParams params, ZonedDateTime scheduleDate);

	OJobCron cron(long jmoId, OParams params, CronExpression cronExpression);

	DtList<OJobSchedule> getAllJobSchedules();

	//void removeJobSchedule(long jscId);
	//void removeJobCron(long jcrId);

	/* ----------- Run --------- */

	/**
	 * Starts a job
	 *  - create a new run and the first exec
	 * @param jscId
	 */
	String startJobSchedule(long jscId);

	DtList<OJobExec> getAllJobExecs();

	DtList<OJobRun> getAllJobRuns();

	/**
	 *
	 * @parbam jcrId
	 * @return JobID le jobId
	 */
	//String startJobCron(long jcrId);

	/**
	 *
	 * @param jobId le jobId
	 */
	//void fireFailedJob(String jobId);

	/**
	 *
	 * @param jobId the jobId
	 */
	void killJob(String jobId);

	/**
	 *
	 * @param jobId le jobId
	 */
	//void fireRetryJob(String jobId);

	/**
	 *
	 * @param jobId le jobId
	 */
	//	/void fireSuccessJob(String jobId, OWorkspace ws);

	/* ----------- JobExec --------- */

	/* ----------- History --------- */
	//void log(String level, String type, String typeLog, String message, OParams params, String error);

}
