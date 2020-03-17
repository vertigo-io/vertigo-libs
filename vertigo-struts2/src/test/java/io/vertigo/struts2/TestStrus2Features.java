package io.vertigo.struts2;

import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.Features;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.struts2.boot.initializer.TestStruts2MasterDataDefinitionProvider;
import io.vertigo.struts2.data.Struts2TestSmartTypes;
import io.vertigo.struts2.data.dao.movies.MovieDAO;
import io.vertigo.struts2.services.movies.MovieServices;
import io.vertigo.struts2.services.movies.MovieServicesImpl;
import io.vertigo.struts2.services.users.UserServices;
import io.vertigo.struts2.services.users.UserServicesImpl;

public class TestStrus2Features extends Features<TestStrus2Features> {

	public TestStrus2Features() {
		super("test-vertigo-struts2");
	}

	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
						.addDefinitionResource("smarttypes", Struts2TestSmartTypes.class.getName())
						.addDefinitionResource("dtobjects", "io.vertigo.struts2.data.domain.DtDefinitions")
						.build())
				.addDefinitionProvider(TestStruts2MasterDataDefinitionProvider.class)
				.addComponent(MovieDAO.class)
				.addComponent(MovieServices.class, MovieServicesImpl.class)
				.addComponent(UserServices.class, UserServicesImpl.class)
				.build();
	}

}
