package io.vertigo.orchestra.services.execution;

import java.time.ZonedDateTime;

import javax.inject.Inject;

import org.junit.Test;

import io.vertigo.orchestra.AbstractOrchestraTestCaseJU4;
import io.vertigo.orchestra.domain.definition.OJobModel;
import io.vertigo.orchestra.plugins.store.OParams;
import io.vertigo.orchestra.plugins.store.OrchestraStore;

/**
 * TODO : Description de la classe.
 *
 * @author xdurand.
 * @version $Id$
 */
public class TestOrchestra2 extends AbstractOrchestraTestCaseJU4 {
	
	@Inject
	private OrchestraStore orchestraStore;
	
	/**
	 * @throws InterruptedException 
	 */
	@Test
	public void singleExecution() throws InterruptedException {
		
		OJobModel model = new OJobModel();
		
		orchestraStore.createJobModel(model);
		
		OParams params = new OParams();
		orchestraStore.scheduleAt(model.getJmoId(), params, ZonedDateTime.now());
		
		Thread.sleep(3000);
	}
	
	
}