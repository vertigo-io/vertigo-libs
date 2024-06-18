package io.vertigo.datastore.plugins.filestore.s3;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.commons.transaction.VTransaction;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.connectors.s3.S3Connector;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.filestore.FileStoreManager;
import io.vertigo.datastore.filestore.definitions.FileInfoDefinition;
import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.FileStorePlugin;
import io.vertigo.datastore.impl.filestore.model.AbstractFileInfo;
import io.vertigo.datastore.impl.filestore.model.StreamFile;

/**
 * Store file data in S3 and metadatas in database.
 *
 * @author pchretien, npiedeloup, skerdudou
 */
public final class S3FileStorePlugin implements FileStorePlugin, Activeable {
	private static final String STORE_READ_ONLY = "Store is in read-only mode";

	/**
	 * List of the storage Dto fields.
	 * These fields are mandatory on the Dt associated with fileInfoDefinitions.
	 *
	 * @author npiedeloup
	 */
	private enum DtoFields {
		/** Champ FileName */
		fileName,
		/** Champ MimeType */
		mimeType,
		/** Champ LastModified */
		lastModified,
		/** Champ Length */
		length,
		/** Champ FilePath */
		filePath
	}

	/**
	 * Is the store in read-only mode ?
	 */
	private final boolean readOnly;
	private final String name;
	private final String bucketName;
	private DataField storeIdField;
	private DataDefinition storeDataDefinition;
	private final String storeDataDefinitionName;
	private final VTransactionManager transactionManager;
	private final String fileInfoClassName;
	private final boolean useTags;

	private final S3Helper s3Helper;

	/**
	 * Constructor.
	 *
	 * @param name Store name
	 * @param storeDtName Database entity
	 * @param bucket S3 bucket name
	 * @param fileInfoClass file info class
	 * @param readOnly read only store. Default to false
	 * @param useTags tag state on s3 files (state = uncommited|commited). Default to true.
	 * Can hang in some race conditions. Ex: during a transaction, create a file, re-read the same file but do not consume input stream, then commit transaction
	 * @param transactionManager used to stick at Vertigo transaction level
	 * @param s3Connector S3 connector
	 * @param analyticsManager Analytics Manager
	 */
	@Inject
	public S3FileStorePlugin(
			@ParamValue("name") final Optional<String> name,
			@ParamValue("storeDtName") final String storeDataDefinitionName,
			@ParamValue("bucket") final String bucketName,
			@ParamValue("fileInfoClass") final String fileInfoClassName,
			@ParamValue("readOnly") final Optional<Boolean> readOnlyOpt,
			@ParamValue("useTags") final Optional<Boolean> useTagsOpt,
			final VTransactionManager transactionManager,
			final S3Connector s3Connector,
			final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotNull(name)
				.isNotBlank(storeDataDefinitionName)
				.isNotBlank(bucketName)
				.isNotBlank(fileInfoClassName)
				.isNotNull(transactionManager)
				.isNotNull(s3Connector);
		//-----
		this.name = name.orElse(FileStoreManager.MAIN_DATA_SPACE_NAME);
		readOnly = readOnlyOpt.orElse(Boolean.FALSE);
		useTags = useTagsOpt.orElse(Boolean.TRUE);
		this.transactionManager = transactionManager;
		this.bucketName = bucketName;
		this.storeDataDefinitionName = storeDataDefinitionName;
		this.fileInfoClassName = fileInfoClassName;
		s3Helper = new S3Helper(s3Connector, analyticsManager);
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		storeDataDefinition = Node.getNode().getDefinitionSpace().resolve(storeDataDefinitionName, DataDefinition.class);
		storeIdField = storeDataDefinition.getIdField().get();
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		//NOP
	}

	/** {@inheritDoc} */
	@Override
	public String getName() {
		return name;
	}

	/** {@inheritDoc} */
	@Override
	public FileInfo read(final FileInfoURI uri) {
		// récupération de l'objet en base
		final UID<Entity> dtoUri = createDataObjectURI(uri);
		final DataObject fileInfoDto = getEntityStoreManager().readOne(dtoUri);

		// récupération du fichier
		final String fileName = getValue(fileInfoDto, DtoFields.fileName, String.class);
		final String mimeType = getValue(fileInfoDto, DtoFields.mimeType, String.class);
		final Instant lastModified = getValue(fileInfoDto, DtoFields.lastModified, Instant.class);
		final Long length = getValue(fileInfoDto, DtoFields.length, Long.class);
		final String filePath = getValue(fileInfoDto, DtoFields.filePath, String.class);

		final InputStream readResponse = s3Helper.readObject(bucketName, filePath);
		final VFile vFile = StreamFile.of(fileName, mimeType, lastModified, length, () -> readResponse);

		// retourne le fileinfo avec le fichier et son URI
		final S3FileInfo s3FileInfo = new S3FileInfo(uri.getDefinition(), vFile);
		s3FileInfo.setURIStored(uri);
		return s3FileInfo;
	}

	private static class S3FileInfo extends AbstractFileInfo {
		private static final long serialVersionUID = -451514505811232766L;

		protected S3FileInfo(final FileInfoDefinition fileInfoDefinition, final VFile vFile) {
			super(fileInfoDefinition, vFile);
		}
	}

	private Entity createFileInfoEntity(final FileInfo fileInfo) {
		final Entity fileInfoDto = createFileInfoEntity(fileInfo.getDefinition());
		//-----
		final VFile vFile = fileInfo.getVFile();
		setValue(fileInfoDto, DtoFields.fileName, vFile.getFileName());
		setValue(fileInfoDto, DtoFields.mimeType, vFile.getMimeType());
		setValue(fileInfoDto, DtoFields.lastModified, vFile.getLastModified());
		setValue(fileInfoDto, DtoFields.length, vFile.getLength());
		if (fileInfo.getURI() == null) {
			// cas de la création, on ajoute en base un chemin fictif (colonne not null)
			setValue(fileInfoDto, DtoFields.filePath, "/dev/null");
		} else {
			// cas de l'update
			setIdValue(fileInfoDto, fileInfo.getURI());

			// récupération de l'objet en base pour récupérer le path du fichier et ne pas modifier la base
			final UID<Entity> dtoUri = createDataObjectURI(fileInfo.getURI());
			final DataObject fileInfoDtoBase = getEntityStoreManager().readOne(dtoUri);
			final String pathToSave = getValue(fileInfoDtoBase, DtoFields.filePath, String.class);
			setValue(fileInfoDto, DtoFields.filePath, pathToSave);
		}
		return fileInfoDto;
	}

	private void saveFile(final FileInfo fileInfo, final String pathToSave) {
		try (InputStream inputStream = fileInfo.getVFile().createInputStream()) {
			getCurrentTransaction().addAfterCompletion(new S3ActionSave(bucketName, pathToSave, inputStream, fileInfo.getVFile().getLength(), useTags, s3Helper));
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Can't read uploaded file.");
		}
	}

	/** {@inheritDoc} */
	@Override
	public FileInfo create(final FileInfo fileInfo) {
		Assertion.check()
				.isFalse(readOnly, STORE_READ_ONLY)
				.isNotNull(fileInfo.getURI() == null, "Only file without any id can be created.");
		//-----
		final Entity fileInfoDto = createFileInfoEntity(fileInfo);
		//-----
		getEntityStoreManager().create(fileInfoDto);

		// cas de la création
		final Object fileInfoDtoId = DataModelUtil.getId(fileInfoDto);
		Assertion.check().isNotNull(fileInfoDtoId, "File's id must be set.");
		final FileInfoURI uri = createURI(fileInfo.getDefinition(), fileInfoDtoId);
		fileInfo.setURIStored(uri);

		// on met a jour la base
		final DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy/MM/dd/", Locale.FRANCE);
		final String pathToSave = format.format(LocalDate.now()) + fileInfoDtoId;
		setValue(fileInfoDto, DtoFields.filePath, pathToSave);
		//-----
		getEntityStoreManager().update(fileInfoDto);
		//-----
		if (s3Helper.checkFileExists(bucketName, pathToSave)) { // prevent silent overwrite
			throw new VSystemException("Error writing new object in S3, '" + bucketName + ":" + pathToSave + "' already exists.");
		}
		saveFile(fileInfo, pathToSave);
		return fileInfo;
	}

	/** {@inheritDoc} */
	@Override
	public void update(final FileInfo fileInfo) {
		Assertion.check()
				.isFalse(readOnly, STORE_READ_ONLY)
				.isNotNull(fileInfo.getURI() != null, "Only file with an id can be updated.");
		//-----
		final Entity fileInfoDto = createFileInfoEntity(fileInfo);
		//-----
		getEntityStoreManager().update(fileInfoDto);

		final String pathToSave = getValue(fileInfoDto, DtoFields.filePath, String.class);
		//-----
		saveFile(fileInfo, pathToSave);
	}

	private static FileInfoURI createURI(final FileInfoDefinition fileInfoDefinition, final Object key) {
		return new FileInfoURI(fileInfoDefinition, key);
	}

	/** {@inheritDoc} */
	@Override
	public void delete(final FileInfoURI uri) {
		Assertion.check().isFalse(readOnly, STORE_READ_ONLY);

		final UID<Entity> dtoUri = createDataObjectURI(uri);
		//-----suppression du fichier
		final DataObject fileInfoDto = getEntityStoreManager().readOne(dtoUri);
		final String path = getValue(fileInfoDto, DtoFields.filePath, String.class);
		getCurrentTransaction().addAfterCompletion(new S3ActionDelete(bucketName, path, s3Helper));
		//-----suppression en base
		getEntityStoreManager().delete(dtoUri);
	}

	/** {@inheritDoc} */
	@Override
	public Class<? extends FileInfo> getFileInfoClass() {
		return ClassUtil.classForName(fileInfoClassName, FileInfo.class);
	}

	/**
	 * Creation of a DTO URI from the FileInfo URI.
	 *
	 * @param uri URI of the FileInfo
	 * @return URI of the DTO used in Database for storage
	 */
	private UID<Entity> createDataObjectURI(final FileInfoURI uri) {
		Assertion.check().isNotNull(uri, "file uri must be provided.");
		//-----
		// Il doit exister un DtObjet associé, avec la structure attendue.
		return UID.of(storeDataDefinition, uri.getKeyAs(storeIdField.smartTypeDefinition().getJavaClass()));
	}

	/**
	 * Creation of a DTO from a FileInfo definition.
	 *
	 * @param fileInfoDefinition Definition of the FileInfo
	 * @return DTO used in Database for storage
	 */
	private Entity createFileInfoEntity(final FileInfoDefinition fileInfoDefinition) {
		Assertion.check().isNotNull(fileInfoDefinition, "fileInfoDefinition must be provided.");
		//-----
		// Il doit exister un DtObjet associé, avec la structure attendue.
		return DataModelUtil.createEntity(storeDataDefinition);
	}

	/**
	 * Returns a value of a field from the DataObject.
	 *
	 * @param dto DataObject
	 * @param field Name of the field
	 * @return Typed value of the field
	 */
	private static <V> V getValue(final DataObject dto, final DtoFields field, final Class<V> valueClass) {
		final DataDefinition dtDefinition = DataModelUtil.findDataDefinition(dto);
		final DataField dtField = dtDefinition.getField(field.name());
		return valueClass.cast(dtField.getDataAccessor().getValue(dto));
	}

	/**
	 * Sets a value of a field of a DataObject.
	 *
	 * @param dto DataObject
	 * @param field Name of the field
	 * @param value Value
	 */
	private static void setValue(final DataObject dto, final DtoFields field, final Object value) {
		final DataField dtField = DataModelUtil.findDataDefinition(dto).getField(field.name());
		dtField.getDataAccessor().setValue(dto, value);
	}

	private static void setIdValue(final DataObject dto, final FileInfoURI uri) {
		final DataField dtField = DataModelUtil.findDataDefinition(dto).getIdField().get();
		dtField.getDataAccessor().setValue(dto, uri.getKeyAs(dtField.smartTypeDefinition().getJavaClass()));
	}

	private static EntityStoreManager getEntityStoreManager() {
		return Node.getNode().getComponentSpace().resolve(EntityStoreManager.class);
	}

	/** Retrieves the current transaction. */
	private VTransaction getCurrentTransaction() {
		return transactionManager.getCurrentTransaction();
	}

}
