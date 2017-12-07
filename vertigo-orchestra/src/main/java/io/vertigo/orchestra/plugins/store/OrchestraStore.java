package io.vertigo.orchestra.plugins.store;

import java.time.Instant;

import io.vertigo.core.component.Component;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.run.OJobExec;
import io.vertigo.orchestra.domain.run.OJobRun;
import io.vertigo.orchestra.domain.schedule.OJobCron;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.impl.services.schedule.CronExpression;

public interface OrchestraStore extends Component {
	/* ----------- JobModel	---------------------------------------------------*/
	/**
	 * Creates a job-model in the database.
	 *
	 * Rule : none
	 *
	 * @param jobModel the job model without id.
	 * @return the created job-model with an id.
	 */
	OJobModel createJobModel(OJobModel jobModel);

	/**
	 * Lists all the job-models.
	 *
	 * As the number of job-models is low,
	 * it's possible (and preferable) to list all the job-models.
	 *
	 * Rule : none
	 *
	 * @return all the job-models
	 */
	DtList<OJobModel> getAllJobModels();

	/**
	 * Deactivates the job model.
	 *
	 * What are the consequences of this action on the living jobs ?
	 *
	 * Rule : All the living jobs associated with this model will be killed.
	 *
	 * @param jmoId the job-model Id
	 * @return the updated job-model
	 */
	OJobModel deactivateJobModel(long jmoId);

	/**
	 * Activates the job-model.
	 *
	 * Rule : none
	 *
	 * @param jmoId the job-model Id
	 * @return the updated job-model
	 */
	OJobModel activateJobModel(long jmoId);

	/**
	 * Updates some params on the job-model.
	 * Rule : The running jobs are not updated with these modifications.
	 *
	 * @param jmoId
	 * @param maxRetry
	 * @param maxDelay
	 * @param timeout
	 */
	//void updateJobModel(long jmoId, long maxRetry, long maxDelay, long timeout);

	/* ----------- Schedule --------- */
	//
	/**
	 * Schedules a job-model.
	 *
	 * Rule : the date must be in the future.
	 * Note : the job-model can be activated or deactivated
	 *
	 * @param jmoId the job-model Id
	 * @param params the init params
	 * @param scheduledInstant the scheduled date
	 * @return the job-schedule
	 */
	OJobSchedule scheduleAt(long jmoId, OParams params, Instant scheduledInstant);

	/**
	 * Creates a cron from a job-model.
	 *
	 * Rule : none
	 * Note : the job-model can be activated or deactivated
	 *
	 * @param jmoId the job-model Id
	 * @param params the init params
	 * @param cronExpression the cron expression
	 * @return the job-cron
	 */
	OJobCron cron(long jmoId, OParams params, CronExpression cronExpression);

	/**
	 * Rule : none
	 *
	 * @return all the job-schedules
	 */
	DtList<OJobSchedule> getAllJobSchedules();

	/**
	 * Removes a job-schedule.
	 *
	 * Rule : If the job is currently running it will be killed.
	 *
	 */
	//void removeJobSchedule(long jscId);

	/**
	 * Removes a job-cron.
	 *
	 * Rule : If a job is currently running it will be killed.
	 */
	//void removeJobCron(long jcrId);

	/* ----------- Run --------- */

	/**
	 * Kills a job even if the job is running on a node.
	 *
	 * Rule : the job must be alive
	 *
	 * @param jobId the jobId
	 */
	void killJob(String jobId);

	/**
	 * Rule : none
	 * @return the alive job-runs.
	 */
	DtList<OJobRun> getAliveJobRuns();

	/**
	 * Rule : none

	 * A run can have at most one execution.
	 * @return the alive job-executions.
	 */
	DtList<OJobExec> getAliveJobExecs();

	/**
	 * PRIVATE
	 * Starts a job from a job-schedule.
	 *
	 * creates a new run and the first exec.
	 * This method is private.
	 *
	 * Rules :
	 *  - the job-model must be active.
	 *  - there must be no job running with the same job-model
	 *
	 * @param jscId the job-schedule Id
	 * @return the job-id
	 */
	String startJobSchedule(long jscId);

	/**
	 * PRIVATE
	 * This	 methods is called a tick process.
	 *  - processes (re)starts the cron-jobs and scheduled-jobs.
	 *  - watches the runnning josb to check the jobs
	 *  		- in timeout (job-exec)
	 *  		- or delay exceeded (job-run)
	 *  - watches the nodes to check dead nodes
	 *	-
	 * Rule :
	 * EXCLUSIVE-EXECUTION : this rule is very important.
	 * 	By design we decide that only ONE job per type can be running at the same time.
	 *
	 */
	void tick();
}
