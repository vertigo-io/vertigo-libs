package io.vertigo.studio.dao.car.carDAOTest;

import javax.inject.Inject;
import org.junit.jupiter.api.Test;
import io.vertigo.studio.data.tasktest.DaoTestClass;

public class SelectCarByIdsTest extends DaoTestClass {
	
	@Inject
	io.vertigo.studio.dao.car.CarDAO carDAO;

	@Test
	public void check_selectCarByIds_Ok(){		
		this.check().semantics(() -> carDAO.selectCarByIds(dum().dumDtList(io.vertigo.studio.domain.car.Car.class)));
	}
}