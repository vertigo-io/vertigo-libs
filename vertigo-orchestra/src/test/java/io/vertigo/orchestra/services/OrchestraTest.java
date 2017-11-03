package io.vertigo.orchestra.services;

import java.time.ZonedDateTime;

import javax.inject.Inject;

import org.junit.Test;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.orchestra.AbstractOrchestraTestCaseJU4;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.domain.run.OJobExec;
import io.vertigo.orchestra.domain.run.OJobRun;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.plugins.store.OParams;
import io.vertigo.orchestra.plugins.store.OrchestraStore;
import io.vertigo.orchestra.services.execution.engine.SleepJobEngine;
import junit.framework.Assert;

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
		jobModel.setCreationDate(ZonedDateTime.now());
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
		final OJobSchedule jobSchedule = orchestraStore.scheduleAt(jobModel.getJmoId(), params, ZonedDateTime.now());

		final DtList<OJobSchedule> jobSchedules = orchestraStore.getAllJobSchedules();
		Assert.assertEquals(1, jobSchedules.size());
		Assert.assertEquals(jobSchedule.getJscId(), jobSchedules.get(0).getJscId());
	}

	@Test
	public void testStartJobSchedule() throws InterruptedException {
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		final OJobSchedule jobSchedule = orchestraStore.scheduleAt(jobModel.getJmoId(), params, ZonedDateTime.now().plusHours(1));

		final String jobId = orchestraStore.startJobSchedule(jobSchedule.getJscId());
		//---
		DtList<OJobRun> currentJobRuns;
		DtList<OJobExec> currentJobExecs;
		currentJobRuns = orchestraStore.getAllJobRuns();
		currentJobExecs = orchestraStore.getAllJobExecs();
		Assert.assertEquals(1, currentJobRuns.size());
		Assert.assertEquals(1, currentJobExecs.size());
		Assert.assertEquals(jobId, currentJobExecs.get(0).getJobId());
		//---
		Thread.sleep(1000);
		//---
		currentJobRuns = orchestraStore.getAllJobRuns();
		currentJobExecs = orchestraStore.getAllJobExecs();
		Assert.assertEquals(1, currentJobRuns.size());
		Assert.assertEquals(0, currentJobExecs.size());
	}

	@Test
	public void testKillJob() throws InterruptedException {
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		final OJobSchedule jobSchedule = orchestraStore.scheduleAt(jobModel.getJmoId(), params, ZonedDateTime.now().plusHours(1));

		final String jobId = orchestraStore.startJobSchedule(jobSchedule.getJscId());
		//---
		DtList<OJobRun> currentJobRuns;
		DtList<OJobExec> currentJobExecs;
		currentJobRuns = orchestraStore.getAllJobRuns();
		currentJobExecs = orchestraStore.getAllJobExecs();
		Assert.assertEquals(1, currentJobRuns.size());
		Assert.assertEquals(1, currentJobExecs.size());
		Assert.assertEquals(jobId, currentJobExecs.get(0).getJobId());
		//---
		orchestraStore.killJob(jobId);
		Thread.sleep(1000);
		//---
		currentJobRuns = orchestraStore.getAllJobRuns();
		currentJobExecs = orchestraStore.getAllJobExecs();
		Assert.assertEquals(1, currentJobRuns.size());
		Assert.assertEquals(0, currentJobExecs.size());
	}

	@Test
	public void testJobSchedule() throws InterruptedException {
		/*******************************************************/
		/***************The interesting test ******************/
		/******************************************************/
		final OJobModel jobModel = orchestraStore.createJobModel(newJobModel());
		final OParams params = new OParams();
		final OJobSchedule jobSchedule = orchestraStore.scheduleAt(jobModel.getJmoId(), params, ZonedDateTime.now().plusSeconds(1));
		//---
		DtList<OJobRun> currentJobRuns;
		DtList<OJobExec> currentJobExecs;
		currentJobRuns = orchestraStore.getAllJobRuns();
		currentJobExecs = orchestraStore.getAllJobExecs();
		Assert.assertEquals(0, currentJobRuns.size());
		Assert.assertEquals(0, currentJobExecs.size());
		//---
		Thread.sleep(35 * 1000);
		//---
		currentJobRuns = orchestraStore.getAllJobRuns();
		currentJobExecs = orchestraStore.getAllJobExecs();
		Assert.assertEquals(1, currentJobRuns.size());
		Assert.assertEquals(0, currentJobExecs.size());
		Assert.assertEquals("SCH:" + jobSchedule.getJscId(), currentJobRuns.get(0).getJobId());
	}
}
