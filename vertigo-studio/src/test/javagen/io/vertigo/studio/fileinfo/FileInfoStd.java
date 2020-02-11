package io.vertigo.studio.fileinfo;

import io.vertigo.datastore.filestore.metamodel.FileInfoDefinition;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.AbstractFileInfo;

/**
 * Attention cette classe est générée automatiquement !
 * Objet représentant un fichier persistant FileInfoStd
 */
public final class FileInfoStd extends AbstractFileInfo {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructeur par défaut.
	 * @param vFile Données du fichier
	 */
	public FileInfoStd(final VFile vFile) {
		super(FileInfoDefinition.findFileInfoDefinition(FileInfoStd.class), vFile);
	}
}

