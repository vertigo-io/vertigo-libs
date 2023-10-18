package io.vertigo.vortex.bb;

import io.vertigo.core.lang.Assertion;

public final class BBKeyPattern {

	public static final String KEY_PATTERN_REGEX = "(" + BBKey.KEY_REGEX + "/?\\*?)|/\\*";

	private final String keyPattern;

	private BBKeyPattern(final String keyPattern) {
		Assertion.check()
				.isNotBlank(keyPattern)
				.isTrue(keyPattern.matches(KEY_PATTERN_REGEX), "the key pattern '{0}' must contain only a-z 0-9 words separated with / and is finished by a * or nothing", keyPattern);
		//---
		this.keyPattern = keyPattern;
	}

	public String keyPattern() {
		return keyPattern;
	}

	public BBKeyPattern indent(final String prefix) {
		Assertion.check().isNotBlank(prefix);
		//---
		return BBKeyPattern.of(prefix + keyPattern);
	}

	public BBKeyPattern outdent(final String prefix) {
		Assertion.check()
				.isNotBlank(prefix)
				.isTrue(keyPattern.startsWith(prefix), "To outdent the keyPattern '{0}' it must starts with the provided prefix '{1}' ", keyPattern, prefix);
		//---
		return BBKeyPattern.of(keyPattern.substring(prefix.length()));
	}

	public static BBKeyPattern of(final String keyPattern) {
		return new BBKeyPattern(keyPattern);
	}

	public static BBKeyPattern ofRoot(final BBKey rootKey) {
		return new BBKeyPattern(rootKey.key() + "/*");
	}

	@Override
	public boolean equals(final Object obj) {
		return obj instanceof BBKeyPattern && keyPattern.equals(((BBKeyPattern) obj).keyPattern);
	}

	@Override
	public int hashCode() {
		return keyPattern.hashCode();
	}

}
