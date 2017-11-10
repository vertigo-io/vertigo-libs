package io.vertigo.orchestra.services;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Test;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.lang.VUserException;
import io.vertigo.orchestra.AbstractOrchestraTestCaseJU4;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.run.OJobExec;
import io.vertigo.orchestra.domain.run.OJobRun;
import io.vertigo.orchestra.domain.schedule.OJobCron;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.impl.services.schedule.CronExpression;
import io.vertigo.orchestra.plugins.store.OParams;
import io.vertigo.orchestra.plugins.store.OrchestraStore;
import io.vertigo.orchestra.services.execution.engine.SleepJobEngine;

/**
 * @author xdurand.
 */
public class OrchestraTest extends AbstractOrchestraTestCaseJU4 {

	@Inject
	private OrchestraStore orchestraStore;

	private static OJobModel newJobModel() {
		final OJobModel jobModel = new OJobModel();
		jobModel.setActive(true);
		jobModel.setJobEngineClassName(SleepJobEngine.class.getCanonicalName());
		jobModel.setCreationDate(now());
		jobModel.setDesc("unit test 1");
		jobModel.setJobName("JOB_TEST");
		jobModel.setRunMaxDelay(2 * 3600); //2h
		jobModel.setMaxRetry(3);
		jobModel.setExecTimeout(100);
		return jobModel;
	}

	@Test
	public void testCreateJobModel() {
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final DtList<OJobModel> jobModels = orchestraStore.getAllJobModels();
		Assert.assertEquals(1, jobModels.size());
		Assert.assertEquals(jobModel.getJmoId(), jobModels.get(0).getJmoId());
	}

	@Test
	public void testActivateDeactivateJobModel() {
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());

		long activeCount;
		//count active job-models
		activeCount = orchestraStore.getAllJobModels().stream().filter(OJobModel::getActive).count();
		Assert.assertEquals(1, activeCount);

		//deactivate
		orchestraStore.deactivateJobModel(jobModel.getJmoId());
		activeCount = orchestraStore.getAllJobModels().stream().filter(OJobModel::getActive).count();
		Assert.assertEquals(0, activeCount);

		//activate
		orchestraStore.activateJobModel(jobModel.getJmoId());
		activeCount = orchestraStore.getAllJobModels().stream().filter(OJobModel::getActive).count();
		Assert.assertEquals(1, activeCount);
	}

	@Test
	public void testCreateJobSchedule() {
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		final OJobSchedule jobSchedule = orchestraStore.scheduleAt(jobModel.getJmoId(), params, now());

		final DtList<OJobSchedule> jobSchedules = orchestraStore.getAllJobSchedules();
		Assert.assertEquals(1, jobSchedules.size());
		Assert.assertEquals(jobSchedule.getJscId(), jobSchedules.get(0).getJscId());
	}

	@Test
	public void testStartJobSchedule() throws InterruptedException {
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		final OJobSchedule jobSchedule = orchestraStore.scheduleAt(jobModel.getJmoId(), params, now().plusHours(1));

		final String jobId = orchestraStore.startJobSchedule(jobSchedule.getJscId());
		//---
		assertJobRuns(1);
		assertJobExecs(1);
		assertJobExecsContains(jobId);
		//---
		Thread.sleep(1000);
		//---
		assertJobRuns(1);
		assertJobExecs(0);
	}

	@Test(expected = VUserException.class)
	/**
	 * This test checks that it's not possible to launch two job on the same model at the same time.
	 */
	public void testStartTwoJobSchedule() {
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		final OJobSchedule jobSchedule = orchestraStore.scheduleAt(jobModel.getJmoId(), params, now().plusHours(1));
		final OJobSchedule jobSchedule2 = orchestraStore.scheduleAt(jobModel.getJmoId(), params, now().plusHours(1));

		/*final String jobId =*/ orchestraStore.startJobSchedule(jobSchedule.getJscId());
		/*final String jobId2 =*/ orchestraStore.startJobSchedule(jobSchedule2.getJscId());
	}

	@Test
	public void testKillJob() throws InterruptedException {
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		final OJobSchedule jobSchedule = orchestraStore.scheduleAt(jobModel.getJmoId(), params, now().plusHours(1));

		final String jobId = orchestraStore.startJobSchedule(jobSchedule.getJscId());
		//---
		assertJobRuns(1);
		assertJobExecs(1);
		assertJobExecsContains(jobId);
		//---
		orchestraStore.killJob(jobId);
		Thread.sleep(1000);
		//---
		assertJobRuns(1);
		assertJobExecs(0);
	}

	@Test
	public void testJobSchedule() throws InterruptedException {
		/*******************************************************/
		/***************The SCHEDULE interesting test ******************/
		/******************************************************/
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		final OJobSchedule jobSchedule = orchestraStore.scheduleAt(jobModel.getJmoId(), params, now().plusSeconds(1));
		//---
		assertJobRuns(0);
		assertJobExecs(0);
		//---
		Thread.sleep(35 * 1000);
		//---
		assertJobRuns(1);
		assertJobExecs(0);
		assertJobRunsContains("SCH:" + jobSchedule.getJscId());
	}

	@Test
	public void testTwoJobSchedule() throws InterruptedException {
		/*******************************************************/
		/***************The SCHEDULE interesting test ******************/
		/******************************************************/
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		/*final OJobSchedule jobSchedule =*/ orchestraStore.scheduleAt(jobModel.getJmoId(), params, now().plusSeconds(1));
		/*final OJobSchedule jobSchedule2 =*/ orchestraStore.scheduleAt(jobModel.getJmoId(), params, now().plusSeconds(1));
		//---
		assertJobRuns(0);
		assertJobExecs(0);
		//---
		Thread.sleep(35 * 1000);
		//---
		assertJobRuns(1);
		assertJobExecs(0);
		//---
		Thread.sleep(35 * 1000);
		//---
		assertJobRuns(2);
		assertJobExecs(0);
	}

	private void assertJobRunsContains(final String jobId) {
		final boolean found = orchestraStore.getAliveJobRuns()
				.stream()
				.anyMatch(currentJobRun -> jobId.equals(currentJobRun.getJobId()));
		Assert.assertTrue(found);
	}

	private void assertJobExecsContains(final String jobId) {
		final boolean found = orchestraStore.getAliveJobExecs()
				.stream()
				.anyMatch(currentJobExec -> jobId.equals(currentJobExec.getJobId()));
		Assert.assertTrue(found);
	}

	private void assertJobRuns(final long expected) {
		final DtList<OJobRun> currentJobRuns = orchestraStore.getAliveJobRuns();
		Assert.assertEquals(expected, currentJobRuns.size());
	}

	private void assertJobExecs(final long expected) {
		final DtList<OJobExec> currentJobExecs = orchestraStore.getAliveJobExecs();
		Assert.assertEquals(expected, currentJobExecs.size());
	}

	@Test
	public void testJobCron() throws Exception {
		/*******************************************************/
		/***************The CRON interesting test ******************/
		/******************************************************/
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		final OJobCron jobCron = orchestraStore.cron(jobModel.getJmoId(), params, CronExpression.of("0 0/1 * 1/1 * ? *")); //every min
		//---

		assertJobRuns(0);
		assertJobExecs(0);
		//---
		Thread.sleep(65 * 1000);
		//---
		assertJobRuns(1);
		assertJobExecs(0);
		assertJobRunsContains("CRN:" + jobCron.getJcrId());
	}

	private static ZonedDateTime now() {
		return ZonedDateTime.now(ZoneId.of("UTC"));
	}
}
