package io.vertigo.studio.dao.daoPAOTest;

import javax.inject.Inject;
import org.junit.jupiter.api.Test;
import io.vertigo.studio.data.tasktest.DaoTestClass;

public class PingTest extends DaoTestClass {
	
	@Inject
	io.vertigo.studio.dao.DaoPAO daoPAO;

	@Test
	public void check_ping_Ok(){		
		this.check().semantics(() -> daoPAO.ping());
	}
}