package io.vertigo.planning;

import java.net.MalformedURLException;
import java.nio.file.Paths;

import io.vertigo.core.lang.WrappedException;
import io.vertigo.studio.tools.VertigoStudioMda;

public class StudioGenerate {

	public static void main(final String[] args) {
		try {
			VertigoStudioMda.main(new String[] { "generate", Paths.get("studio-config.yaml").toUri().toURL().toExternalForm() });
		} catch (final MalformedURLException e) {
			throw WrappedException.wrap(e);
		}
	}
}
