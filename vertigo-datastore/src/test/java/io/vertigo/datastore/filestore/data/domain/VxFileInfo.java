package io.vertigo.datastore.filestore.data.domain;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.DataType;
import io.vertigo.datamodel.smarttype.annotations.Mapper;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datamodel.structure.util.JsonMapper;

@Mapper(clazz = JsonMapper.class, dataType = DataType.String)
public final class VxFileInfo implements Entity {
	private static final long serialVersionUID = 1L;

	private Long filId;
	private String fileName;
	private String mimeType;
	private Long length;
	private java.time.Instant lastModified;
	private String filePath;
	private io.vertigo.core.lang.DataStream fileData;

	/** {@inheritDoc} */
	@Override
	public UID<VxFileInfo> getUID() {
		return UID.of(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Identifiant'.
	 * @return Long filId <b>Obligatoire</b>
	 */
	@Field(smartType = "STyId", type = "ID", cardinality = Cardinality.ONE, label = "Identifiant")
	public Long getFilId() {
		return filId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Identifiant'.
	 * @param filId Long <b>Obligatoire</b>
	 */
	public void setFilId(final Long filId) {
		this.filId = filId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nom'.
	 * @return String fileName <b>Obligatoire</b>
	 */
	@Field(smartType = "STyString", cardinality = Cardinality.ONE, label = "Nom")
	public String getFileName() {
		return fileName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nom'.
	 * @param fileName String <b>Obligatoire</b>
	 */
	public void setFileName(final String fileName) {
		this.fileName = fileName;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Type mime'.
	 * @return String mimeType <b>Obligatoire</b>
	 */
	@Field(smartType = "STyString", cardinality = Cardinality.ONE, label = "Type mime")
	public String getMimeType() {
		return mimeType;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Type mime'.
	 * @param mimeType String <b>Obligatoire</b>
	 */
	public void setMimeType(final String mimeType) {
		this.mimeType = mimeType;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Taille'.
	 * @return Long length <b>Obligatoire</b>
	 */
	@Field(smartType = "STyLong", cardinality = Cardinality.ONE, label = "Taille")
	public Long getLength() {
		return length;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Taille'.
	 * @param length Long <b>Obligatoire</b>
	 */
	public void setLength(final Long length) {
		this.length = length;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de derniÃ¨re modification'.
	 * @return java.time.Instant lastModified <b>Obligatoire</b>
	 */
	@Field(smartType = "STyInstant", cardinality = Cardinality.ONE, label = "Date de derniÃ¨re modification")
	public java.time.Instant getLastModified() {
		return lastModified;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de derniÃ¨re modification'.
	 * @param lastModified java.time.Instant <b>Obligatoire</b>
	 */
	public void setLastModified(final java.time.Instant lastModified) {
		this.lastModified = lastModified;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'filePath'.
	 * @return String filePath
	 */
	@Field(smartType = "STyString", cardinality = Cardinality.OPTIONAL_OR_NULLABLE, label = "File Path")
	public String getFilePath() {
		return filePath;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'filePath'.
	 * @param filePath String
	 */
	public void setFilePath(final String filePath) {
		this.filePath = filePath;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'data'.
	 * @return io.vertigo.lang.DataStream fileData
	 */
	@Field(smartType = "STyStream", label = "data")
	public io.vertigo.core.lang.DataStream getFileData() {
		return fileData;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'data'.
	 * @param fileData io.vertigo.lang.DataStream
	 */
	public void setFileData(final io.vertigo.core.lang.DataStream fileData) {
		this.fileData = fileData;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
