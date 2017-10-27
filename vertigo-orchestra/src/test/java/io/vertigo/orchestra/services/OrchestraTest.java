package io.vertigo.orchestra.services;

import java.time.ZonedDateTime;

import javax.inject.Inject;

import org.junit.Test;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.orchestra.AbstractOrchestraTestCaseJU4;
import io.vertigo.orchestra.domain.model.OJobModel;
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

	//	@Inject
	//	private JobExecutor jobExecutor;

	private OJobModel createJobModel() {
		final OJobModel jobModel = new OJobModel();
		jobModel.setActive(true);
		jobModel.setJobEngineClassName(SleepJobEngine.class.getCanonicalName());
		jobModel.setCreationDate(ZonedDateTime.now());
		jobModel.setDesc("unit test 1");
		jobModel.setJobName("JOB_TEST");
		jobModel.setRunMaxDelay(10);
		jobModel.setMaxRetry(3);
		jobModel.setExecTimeout(3600);

		return orchestraStore.createJobModel(jobModel);
	}

	@Test
	public void testCreateJobModel() {
		final OJobModel jobModel = createJobModel();
		final DtList<OJobModel> jobModels = orchestraStore.getAllJobModels();
		Assert.assertEquals(1, jobModels.size());
		Assert.assertEquals(jobModel.getJmoId(), jobModels.get(0).getJmoId());

		//
		//		final OParams params = new OParams();
		//		orchestraStore.scheduleAt(model.getJmoId(), params, ZonedDateTime.now());
		//
		//		jobExecutor.awaitTermination();
		// Asserts here
	}

	@Test
	public void testActivateDeactivateJobModel() {
		final OJobModel jobModel = createJobModel();

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
	public void testScheduleAt() {
		final OJobModel jobModel = createJobModel();
		final OParams params = new OParams();
		orchestraStore.scheduleAt(jobModel.getJmoId(), params, ZonedDateTime.now());

		final DtList<OJobSchedule> jobSchedules = orchestraStore.getAllJobSchedules();
		Assert.assertEquals(1, jobSchedules.size());
	}
}
