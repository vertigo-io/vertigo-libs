package io.vertigo.orchestra.services.execution;

import java.time.ZonedDateTime;

import javax.inject.Inject;

import org.junit.Test;

import io.vertigo.orchestra.AbstractOrchestraTestCaseJU4;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.plugins.store.OParams;
import io.vertigo.orchestra.plugins.store.OrchestraStore;
import io.vertigo.orchestra.services.execution.engine.SleepJobEngine;
import io.vertigo.orchestra.services.run.JobExecutor;

/**
 * TODO : Description de la classe.
 *
 * @author xdurand.
 * @version $Id$
 */
public class TestOrchestra extends AbstractOrchestraTestCaseJU4 {
	
	@Inject
	private OrchestraStore orchestraStore;
	
	@Inject 
	private JobExecutor jobExecutor;
	
	/**
	 * @throws InterruptedException 
	 */
	@Test
	public void singleExecution() throws InterruptedException {
		
		OJobModel model = new OJobModel();
		model.setActive(Boolean.TRUE);
		model.setClassEngine(SleepJobEngine.class.getCanonicalName());
		model.setCreationDate(ZonedDateTime.now());
		model.setDesc("Test unitaire 1");
		model.setJobname("JOB_TEST_UNTAIRE_1");
		model.setMaxDelay(1800);
		model.setMaxRetry(3);
		model.setTimeout(3600);
		
		orchestraStore.createJobModel(model);
		
		OParams params = new OParams();
		orchestraStore.scheduleAt(model.getJmoId(), params, ZonedDateTime.now());
		
		jobExecutor.awaitTermination();
		// Asserts here
		
	}
	
}