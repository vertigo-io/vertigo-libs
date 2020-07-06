package io.vertigo.datastore.filestore.db;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import org.h2.Driver;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.database.plugins.sql.connection.c3p0.C3p0ConnectionProviderPlugin;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.datastore.entitystore.sql.SqlUtil;
import io.vertigo.datastore.filestore.AbstractFileStoreManagerTest;
import io.vertigo.datastore.filestore.data.DtDefinitions;
import io.vertigo.datastore.filestore.data.TestSmartTypes;
import io.vertigo.datastore.filestore.data.domain.fileinfo.FileInfoFs;
import io.vertigo.datastore.filestore.data.domain.fileinfo.FileInfoStd;
import io.vertigo.datastore.filestore.data.domain.fileinfo.FileInfoTemp;
import io.vertigo.datastore.plugins.entitystore.sql.SqlEntityStorePlugin;
import io.vertigo.datastore.plugins.filestore.db.DbFileStorePlugin;

public class DbFileStoreManagerTest extends AbstractFileStoreManagerTest {

	@Inject
	private TaskManager taskManager;

	@Override
	protected void doSetUp() throws Exception {
		//A chaque test on recrée la table famille
		final List<String> requests = List.of(
				" create table VX_FILE_INFO(FIL_ID BIGINT , FILE_NAME varchar(255), MIME_TYPE varchar(255), LENGTH BIGINT, LAST_MODIFIED date, FILE_PATH varchar(255), FILE_DATA BLOB)",
				" create sequence SEQ_VX_FILE_INFO start with 10001 increment by 1");
		SqlUtil.execRequests(
				transactionManager,
				taskManager,
				requests,
				"TkInitMain",
				Optional.empty());
	}

	@Override
	protected void doTearDown() {
		SqlUtil.execRequests(
				transactionManager,
				taskManager,
				Arrays.asList(
						" drop table if exists VX_FILE_INFO ",
						" drop sequence if exists SEQ_VX_FILE_INFO"),
				"TkShutDown",
				Optional.empty());
	}

	@Override
	protected NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr_FR")
						.addPlugin(ClassPathResourceResolverPlugin.class)
						.build())
				.addModule(new CommonsFeatures()
						.withScript()
						.withJaninoScript()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.addPlugin(C3p0ConnectionProviderPlugin.class,
								Param.of("dataBaseClass", H2DataBase.class.getCanonicalName()),
								Param.of("jdbcDriver", Driver.class.getCanonicalName()),
								Param.of("jdbcUrl", "jdbc:h2:mem:database"))
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(new DataStoreFeatures()
						.withCache()
						.withMemoryCache()
						.withEntityStore()
						.withFileStore()
						.addPlugin(SqlEntityStorePlugin.class)
						.addPlugin(DbFileStorePlugin.class,
								Param.of("storeDtName", "DtVxFileInfo"),
								Param.of("fileInfoClass", FileInfoStd.class.getName()))
						.withFsFileStore(Param.of("name", "fsStore"),
								Param.of("path", "${java.io.tmpdir}/testFsVertigo/"),
								Param.of("storeDtName", "DtVxFileInfo"),
								Param.of("fileInfoClass", FileInfoFs.class.getName()))
						.withFsFullFileStore(
								Param.of("name", "temp"),
								Param.of("path", "${java.io.tmpdir}/testVertigo/"),
								Param.of("purgeDelayMinutes", "0"),
								Param.of("fileInfoClass", FileInfoTemp.class.getName()))
						.build())
				.addModule(ModuleConfig.builder("definition")
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getName())
								.addDefinitionResource("dtobjects", DtDefinitions.class.getName())
								.build())
						.build())
				.build();

	}

}
