/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.datastore.plugins.filestore.db;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.basics.task.AbstractTaskEngineSQL;
import io.vertigo.basics.task.TaskEngineProc;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.daemon.definitions.DaemonDefinition;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.DataStream;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datamodel.task.definitions.TaskDefinition;
import io.vertigo.datamodel.task.model.Task;
import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.FileStorePlugin;
import io.vertigo.datastore.impl.filestore.model.StreamFile;

/**
 * Permet de gérer les accès atomiques à n'importe quel type de stockage SQL/
 * non SQL pour les traitements de FileInfo.
 *
 * @author pchretien, npiedeloup, mlaroche
 */
public final class DbFileStorePlugin extends AbstractDbFileStorePlugin implements FileStorePlugin, SimpleDefinitionProvider, Activeable {

	private static final Logger LOG = LogManager.getLogger(DbFileStorePlugin.class);

	/**
	 * Liste des champs du Dto de stockage.
	 * Ces champs sont obligatoire sur les Dt associés aux fileInfoDefinitions
	 * @author npiedeloup
	 */
	private enum DtoFields implements DataFieldName {
		fileName, mimeType, lastModified, length, fileData
	}

	private final VTransactionManager transactionManager;
	private final TaskManager taskManager;

	private final String storeDtDefinitionName;
	private final Optional<Integer> purgeDelayMinutesOpt;

	private DataDefinition storeDtDefinition;
	private DataField storeIdField;
	private final String dmnUniqueName;
	private TaskDefinition deleteExpiredTaskDefinition;

	/**
	 * Constructor.
	 * @param name Store name
	 * @param storeDtDefinitionName Nom du dt de stockage
	 */
	@Inject
	public DbFileStorePlugin(
			@ParamValue("name") final Optional<String> name,
			@ParamValue("storeDtName") final String storeDtDefinitionName,
			@ParamValue("fileInfoClass") final String fileInfoClassName,
			@ParamValue("purgeDelayMinutes") final Optional<Integer> purgeDelayMinutesOpt,
			final VTransactionManager transactionManager,
			final TaskManager taskManager) {
		super(name, fileInfoClassName);
		Assertion.check()
				.isNotBlank(storeDtDefinitionName)
				.isNotNull(transactionManager)
				.isNotNull(taskManager);
		//-----
		this.transactionManager = transactionManager;
		this.taskManager = taskManager;
		this.storeDtDefinitionName = storeDtDefinitionName;
		this.purgeDelayMinutesOpt = purgeDelayMinutesOpt;
		if (this.purgeDelayMinutesOpt.isPresent()) {
			dmnUniqueName = "DmnPurgeDbFileDaemon$t" + this.purgeDelayMinutesOpt.get() + "n" + this.getName();
		} else {
			dmnUniqueName = "DmnPurgeDbFileDaemon";
		}

	}

	@Override
	public void start() {
		storeDtDefinition = Node.getNode().getDefinitionSpace().resolve(storeDtDefinitionName, DataDefinition.class);
		deleteExpiredTaskDefinition = createDeleteExpiredTaskDefinition(storeDtDefinition);
		storeIdField = storeDtDefinition.getIdField().get();
	}

	@Override
	public void stop() {
		// nothing

	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final List<? extends Definition> definition;
		if (purgeDelayMinutesOpt.isPresent()) {
			definition = Collections.singletonList(new DaemonDefinition(dmnUniqueName, () -> this::deleteOldFiles, 5 * 60));
		} else {
			definition = Collections.emptyList();
		}
		return definition;
	}

	/**
	 * Call by Daemon to purge old files
	 */
	public void deleteOldFiles() {
		if (purgeDelayMinutesOpt.isPresent()) {
			randomSleep();
			//only if purgeDelayMinutesOpt is present
			try (var tr = transactionManager.createCurrentTransaction()) {
				final var expiryTime = Instant.now().minusSeconds(purgeDelayMinutesOpt.get() * 60);
				final var task = Task.builder(deleteExpiredTaskDefinition)
						.addValue("expiryTime", expiryTime)
						.addContextProperty("connectionName", getEntityStoreManager().getDataStoreConfig().getConnectionName(storeDtDefinition.getDataSpace()))
						.build();

				final int sqlRowCount = taskManager
						.execute(task)
						.getResult();
				LOG.info("{} db files has expired and have been deleted", sqlRowCount);
				tr.commit();
			}
		}
	}

	/** {@inheritDoc} */
	@Override
	public FileInfo read(final FileInfoURI uri) {
		Assertion.check().isNotNull(uri);
		checkDefinitionStoreBinding(uri.getDefinition());
		//-----
		final UID<Entity> dtoUri = UID.of(storeDtDefinition, uri.getKeyAs(storeIdField.smartTypeDefinition().getJavaClass()));
		final var fileInfoDto = getEntityStoreManager().readOne(dtoUri);
		final var inputStreamBuilder = getValue(fileInfoDto, DtoFields.fileData, DataStream.class);
		final var fileName = getValue(fileInfoDto, DtoFields.fileName, String.class);
		final var mimeType = getValue(fileInfoDto, DtoFields.mimeType, String.class);
		final var lastModified = getValue(fileInfoDto, DtoFields.lastModified, Instant.class);
		final var length = getValue(fileInfoDto, DtoFields.length, Long.class);
		final VFile vFile = StreamFile.of(fileName, mimeType, lastModified, length, inputStreamBuilder);
		final var dataFileInfo = new DatabaseFileInfo(uri.getDefinition(), vFile);
		dataFileInfo.setURIStored(uri);
		return dataFileInfo;
	}

	/** {@inheritDoc} */
	@Override
	public FileInfo create(final FileInfo fileInfo) {
		checkReadonly();
		Assertion.check().isNull(fileInfo.getURI(), "Only file without any id can be created.");
		checkDefinitionStoreBinding(fileInfo.getDefinition());
		//-----
		final var fileInfoDto = createFileInfoDto(fileInfo);
		//-----
		getEntityStoreManager().create(fileInfoDto);
		//-----
		final var fileInfoDtoId = DataModelUtil.getId(fileInfoDto);
		Assertion.check().isNotNull(fileInfoDtoId, "File's id must be set");
		final var uri = new FileInfoURI(fileInfo.getDefinition(), fileInfoDtoId);
		fileInfo.setURIStored(uri);
		return fileInfo;
	}

	/** {@inheritDoc} */
	@Override
	public void update(final FileInfo fileInfo) {
		checkReadonly();
		Assertion.check().isNotNull(fileInfo.getURI(), "Only file with an id can be updated.");
		checkDefinitionStoreBinding(fileInfo.getDefinition());
		//-----
		final var fileInfoDto = createFileInfoDto(fileInfo);
		//-----
		getEntityStoreManager().update(fileInfoDto);
	}

	/** {@inheritDoc} */
	@Override
	public void delete(final FileInfoURI uri) {
		checkReadonly();
		Assertion.check().isNotNull(uri, "Only file with an id can be delete");
		checkDefinitionStoreBinding(uri.getDefinition());
		//-----
		final UID<Entity> dtoUri = UID.of(storeDtDefinition, uri.getKeyAs(storeIdField.smartTypeDefinition().getJavaClass()));
		getEntityStoreManager().delete(dtoUri);
	}

	@Override
	public Class<? extends FileInfo> getFileInfoClass() {
		return ClassUtil.classForName(getFileInfoClassName(), FileInfo.class);
	}

	private Entity createFileInfoDto(final FileInfo fileInfo) {
		//Il doit exister un DtObjet associé à storeDtDefinition avec la structure attendue.
		final var fileInfoDto = DataModelUtil.createEntity(storeDtDefinition);
		//-----

		final var vFile = fileInfo.getVFile();
		setValue(fileInfoDto, DtoFields.fileName, vFile.getFileName());
		setValue(fileInfoDto, DtoFields.mimeType, vFile.getMimeType());
		setValue(fileInfoDto, DtoFields.lastModified, vFile.getLastModified());
		setValue(fileInfoDto, DtoFields.length, vFile.getLength());
		setValue(fileInfoDto, DtoFields.fileData, vFile);

		if (fileInfo.getURI() != null) {
			setIdValue(fileInfoDto, fileInfo.getURI());
		}
		return fileInfoDto;
	}

	private static void randomSleep() {
		try {
			//sleep random 100-500ms to desynchronized executions
			Thread.sleep(ThreadLocalRandom.current().nextInt(100, 501)); // between 100 and 500 included);
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt();
		}
	}

	private static TaskDefinition createDeleteExpiredTaskDefinition(final DataDefinition dataDefinition) {
		final var tableName = StringUtil.camelToConstCase(dataDefinition.id().shortName());
		final var lastModifieldField = dataDefinition.getField(DtoFields.lastModified);
		final var request = "delete from " + tableName +
				" where " + StringUtil.camelToConstCase(lastModifieldField.name()) + " < #expiryTime#";

		final var integerSmartType = SmartTypeDefinition.builder(SmartTypeDefinition.PREFIX + "IntegerSql", BasicType.Integer).build();

		return TaskDefinition.builder(TaskDefinition.PREFIX + "PurgeDbExpiredFiles")
				.withEngine(TaskEngineProc.class)
				.withDataSpace(dataDefinition.getDataSpace())
				.withRequest(request)
				.addInAttribute("expiryTime", lastModifieldField.smartTypeDefinition(), Cardinality.ONE)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

	}

}
