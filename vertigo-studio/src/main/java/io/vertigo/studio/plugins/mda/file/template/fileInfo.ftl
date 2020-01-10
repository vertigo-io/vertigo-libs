package ${packageName};

import io.vertigo.datastore.filestore.metamodel.FileInfoDefinition;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.AbstractFileInfo;

/**
 * Attention cette classe est générée automatiquement !
 * Objet représentant un fichier persistant ${fiDefinition.classSimpleName}
 */
public final class ${fiDefinition.classSimpleName} extends AbstractFileInfo {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructeur par défaut.
	 * @param vFile Données du fichier
	 */
	public ${fiDefinition.classSimpleName}(final VFile vFile) {
		super(FileInfoDefinition.findFileInfoDefinition(${fiDefinition.classSimpleName}.class), vFile);
	}
}

