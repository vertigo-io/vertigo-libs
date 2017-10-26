package io.vertigo.orchestra.plugins.store;

import java.time.ZonedDateTime;

import io.vertigo.core.component.Component;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;

public interface OrchestraStore extends Component {

	/* ----------- JobModel	--------- */
	OJobModel createJobModel(OJobModel model);

	//OJobModel disableJobModel(long jmoId);
	//OJobModel enableJobModel(long jmoId);

	//void updateJobModel(long jmoId, long maxRetry, long maxDelay, long timeout);

	DtList<OJobModel> getAllJobModels();

	/* ----------- Schedule --------- */
	OJobSchedule scheduleAt(long jmoId, OParams params, ZonedDateTime scheduleDate);
	//OJobSchedule scheduleCron(long jmoId, OParams params, String cronExpression);

	DtList<OJobSchedule> getAllJobSchedules();

	void removeJobSchedule(long jscId);
	//void removeJobCron(long jcrId);

	/* ----------- Run --------- */

	/**
	 *
	 * @param jscId
	 * @return JobID le jobId
	 */
	String startJobSchedule(long jscId);

	/**
	 *
	 * @param jcrId
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
	 * @param jobId le jobId
	 */
	//void fireKilledJob(String jobId);

	/**
	 *
	 * @param jobId le jobId
	 */
	//void fireRetryJob(String jobId);

	/**
	 *
	 * @param jobId le jobId
	 */
	void fireSuccessJob(String jobId, OWorkspace ws);

	/* ----------- JobExec --------- */

	/* ----------- History --------- */
	//void log(String level, String type, String typeLog, String message, OParams params, String error);

}
