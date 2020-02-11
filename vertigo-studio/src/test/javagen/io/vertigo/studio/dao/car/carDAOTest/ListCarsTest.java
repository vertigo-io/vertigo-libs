package io.vertigo.studio.dao.car.carDAOTest;

import javax.inject.Inject;
import org.junit.jupiter.api.Test;
import io.vertigo.studio.data.tasktest.DaoTestClass;

public class ListCarsTest extends DaoTestClass {
	
	@Inject
	io.vertigo.studio.dao.car.CarDAO carDAO;

	@Test
	public void check_listCars_Ok(){		
		this.check().semantics(() -> carDAO.listCars(dum().dum(io.vertigo.studio.domain.car.Car.class)));
	}
}