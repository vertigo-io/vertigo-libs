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
	/**
	 * the tick process updates the state of the jobs.
	 */
	void tick();

	/* ----------- JobModel	--------- */
	/**
	 * Creates a job-model in the database.
	 *
	 * @param jobModel the job model
	 * @return the created job-model.
	 */
	OJobModel createJobModel(OJobModel jobModel);

	/**
	 * Lists all the job-models.
	 *
	 * @return all the job-models
	 */
	DtList<OJobModel> getAllJobModels();

	/**
	 * Deactivates the job model.
	 * All the running jobs will be killed.
	 *
	 * @param jmoId the job-model Id
	 * @return the updated job-model
	 */
	OJobModel deactivateJobModel(long jmoId);

	/**
	 * Activates the job-model.
	 *
	 * @param jmoId the job-model Id
	 * @return the updated job-model
	 */
	OJobModel activateJobModel(long jmoId);

	/*
	//void updateJobModel(long jmoId, long maxRetry, long maxDelay, long timeout);
	
	/* ----------- Schedule --------- */
	//
	/**
	 * Schedules a job-model.
	 *
	 * @param jmoId the job-model Id
	 * @param params the init params
	 * @param scheduleDate the scheduled date
	 * @return the job-schedule
	 */
	OJobSchedule scheduleAt(long jmoId, OParams params, ZonedDateTime scheduleDate);

	/**
	 * Creates a cron from a job-model.
	 * @param jmoId the job-model Id
	 * @param params the init params
	 * @param cronExpression the cron expression
	 * @return the job-cron
	 */
	OJobCron cron(long jmoId, OParams params, CronExpression cronExpression);

	DtList<OJobSchedule> getAllJobSchedules();

	/**
	 * Removes a job-schedule.
	 * If the job is currently running it will be killed.
	 */
	//void removeJobSchedule(long jscId);
	/**
	 * Removes a job-cron.
	 * If a job is currently running it will be killed.
	 */
	//void removeJobCron(long jcrId);

	/* ----------- Run --------- */

	/**
	 * Starts a job from a job-schedule.
	 *
	 *  (creates a new run and the first exec)
	 *
	 * @param jscId the job-schedule Id
	 * @return the job-id
	 */
	String startJobSchedule(long jscId);

	DtList<OJobExec> getAllJobExecs();

	DtList<OJobRun> getAllJobRuns();

	//
	/**
	 * Kills a job.
	 *
	 * @param jobId the jobId
	 */
	void killJob(String jobId);
}
