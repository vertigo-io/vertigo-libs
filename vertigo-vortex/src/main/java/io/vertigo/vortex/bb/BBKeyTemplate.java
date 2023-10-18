package io.vertigo.vortex.bb;

import io.vertigo.core.lang.Assertion;

public final class BBKeyTemplate {

	private final String keyTemplate;

	private BBKeyTemplate(final String keyTemplate) {
		Assertion.check()
				.isNotNull(keyTemplate);
		//---
		this.keyTemplate = keyTemplate;
	}

	public String keyTemplate() {
		return keyTemplate;
	}

	public BBKeyTemplate indent(final String prefix) {
		Assertion.check().isNotBlank(prefix);
		//---
		return BBKeyTemplate.of(prefix + keyTemplate);
	}

	public BBKeyTemplate outdent(final String prefix) {
		Assertion.check()
				.isNotBlank(prefix)
				.isTrue(keyTemplate.startsWith(prefix), "To outdent the keyTemplate '{0}' it must starts with the provided prefix '{1}' ", keyTemplate, prefix);
		//---
		return BBKeyTemplate.of(keyTemplate.substring(0, prefix.length() - 1));
	}

	public static BBKeyTemplate of(final String keyTemplate) {
		return new BBKeyTemplate(keyTemplate);
	}

	@Override
	public boolean equals(final Object obj) {
		return obj instanceof BBKeyTemplate && keyTemplate.equals(((BBKeyTemplate) obj).keyTemplate);
	}

	@Override
	public int hashCode() {
		return keyTemplate.hashCode();
	}

}
