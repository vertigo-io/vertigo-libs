package io.vertigo.studio.dao.daoPAOTest;

import javax.inject.Inject;
import org.junit.jupiter.api.Test;
import io.vertigo.studio.data.tasktest.DaoTestClass;

public class OneParamSelectTest extends DaoTestClass {
	
	@Inject
	io.vertigo.studio.dao.DaoPAO daoPAO;

	@Test
	public void check_oneParamSelect_Ok(){		
		this.check().semantics(() -> daoPAO.oneParamSelect(dum().dum(java.lang.Integer.class)));
	}
}