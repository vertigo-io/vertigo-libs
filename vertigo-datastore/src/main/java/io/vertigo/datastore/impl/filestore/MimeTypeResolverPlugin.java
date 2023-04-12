package io.vertigo.datastore.impl.filestore;

import java.util.Optional;

import io.vertigo.core.node.component.Plugin;
import io.vertigo.datastore.filestore.model.VFile;

public interface MimeTypeResolverPlugin extends Plugin {

	/**
	 * Resolve mimetype
	 * @param vFile the file to probe
	 * @return the resolved MimeType
	 */
	Optional<String> resolveMimeType(final VFile vFile);

}
