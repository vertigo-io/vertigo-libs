package io.vertigo.vega.engines.webservice.json.records;

import java.lang.reflect.RecordComponent;
import java.util.Locale;

import com.google.gson.FieldNamingPolicy;

/**
 * Strategy for transforming the name of a Record component to a JSON property name.
 *
 * <p>This interface offers multiple existing implementations, such as {@link #LOWER_CASE_WITH_UNDERSCORES},
 * as well as {@link #fromFieldNamingPolicy(FieldNamingPolicy)} which makes integration with existing
 * Gson usage easier.
 *
 * <p>Naming strategy implementations must be thread-safe.
 *
 * @see marcono1234.gson.recordadapter.RecordTypeAdapterFactory.Builder#withComponentNamingStrategy(RecordComponentNamingStrategy)
 */
interface RecordComponentNamingStrategy {
	/**
	 * Uses the Record component name as is.
	 *
	 * @see FieldNamingPolicy#IDENTITY
	 */
	RecordComponentNamingStrategy IDENTITY = new RecordComponentNamingStrategy() {
		@Override
		public String translateName(final RecordComponent component) {
			return component.getName();
		}

		@Override
		public String toString() {
			return "IDENTITY";
		}
	};

	/**
	 * Converts the first letter of the Record component name to upper case.
	 *
	 * @see FieldNamingPolicy#UPPER_CAMEL_CASE
	 */
	RecordComponentNamingStrategy UPPER_CAMEL_CASE = new RecordComponentNamingStrategy() {
		@Override
		public String translateName(final RecordComponent component) {
			return RecordComponentNamingStrategy.uppercaseFirstLetter(component.getName());
		}

		@Override
		public String toString() {
			return "UPPER_CAMEL_CASE";
		}
	};

	/**
	 * Splits the Record component name at all existing upper case characters using spaces
	 * and coverts the first letter to upper case.
	 *
	 * @see FieldNamingPolicy#UPPER_CAMEL_CASE_WITH_SPACES
	 */
	RecordComponentNamingStrategy UPPER_CAMEL_CASE_WITH_SPACES = new RecordComponentNamingStrategy() {
		@Override
		public String translateName(final RecordComponent component) {
			return RecordComponentNamingStrategy.uppercaseFirstLetter(RecordComponentNamingStrategy.separateCamelCase(component.getName(), ' '));
		}

		@Override
		public String toString() {
			return "UPPER_CAMEL_CASE_WITH_SPACES";
		}
	};

	/**
	 * Splits the Record component name at all existing upper case characters using underscores
	 * and coverts the name to lower case.
	 *
	 * @see FieldNamingPolicy#LOWER_CASE_WITH_UNDERSCORES
	 */
	RecordComponentNamingStrategy LOWER_CASE_WITH_UNDERSCORES = new RecordComponentNamingStrategy() {
		@Override
		public String translateName(final RecordComponent component) {
			return RecordComponentNamingStrategy.lowercase(RecordComponentNamingStrategy.separateCamelCase(component.getName(), '_'));
		}

		@Override
		public String toString() {
			return "LOWER_CASE_WITH_UNDERSCORES";
		}
	};

	/**
	 * Splits the Record component name at all existing upper case characters using dashes
	 * and coverts the name to lower case.
	 *
	 * @see FieldNamingPolicy#LOWER_CASE_WITH_DASHES
	 */
	RecordComponentNamingStrategy LOWER_CASE_WITH_DASHES = new RecordComponentNamingStrategy() {
		@Override
		public String translateName(final RecordComponent component) {
			return RecordComponentNamingStrategy.lowercase(RecordComponentNamingStrategy.separateCamelCase(component.getName(), '-'));
		}

		@Override
		public String toString() {
			return "LOWER_CASE_WITH_DASHES";
		}
	};

	/**
	 * Splits the Record component name at all existing upper case characters using dots
	 * and coverts the name to lower case.
	 *
	 * @see FieldNamingPolicy#LOWER_CASE_WITH_DOTS
	 */
	RecordComponentNamingStrategy LOWER_CASE_WITH_DOTS = new RecordComponentNamingStrategy() {
		@Override
		public String translateName(final RecordComponent component) {
			return RecordComponentNamingStrategy.lowercase(RecordComponentNamingStrategy.separateCamelCase(component.getName(), '.'));
		}

		@Override
		public String toString() {
			return "LOWER_CASE_WITH_DOTS";
		}
	};

	// Based on com.google.gson.FieldNamingPolicy.upperCaseFirstLetter, but with
	// https://github.com/google/gson/issues/1965 being fixed
	static String uppercaseFirstLetter(final String s) {
		final int length = s.length();
		for (int i = 0; i < length; i++) {
			final char c = s.charAt(i);
			if (Character.isLetter(c)) {
				if (Character.isUpperCase(c)) {
					return s;
				}

				final char uppercased = Character.toUpperCase(c);
				// For leading letter only need one substring
				if (i == 0) {
					return uppercased + s.substring(1);
				} else {
					return s.substring(0, i) + uppercased + s.substring(i + 1);
				}
			}
		}

		return s;
	}

	// Based on com.google.gson.FieldNamingPolicy.separateCamelCase
	static String separateCamelCase(final String s, final char separator) {
		final StringBuilder sb = new StringBuilder();
		final int length = s.length();

		int nextSectionIndex = 0;
		// Can start at 1 because won't add leading separator
		for (int i = 1; i < length; i++) {
			if (Character.isUpperCase(s.charAt(i))) {
				sb.append(s, nextSectionIndex, i);
				sb.append(separator);
				nextSectionIndex = i;
			}
		}

		// Found nothing to split
		if (nextSectionIndex == 0) {
			return s;
		}
		// Add trailing characters
		sb.append(s.substring(nextSectionIndex));
		return sb.toString();
	}

	static String lowercase(final String s) {
		// Locale.ENGLISH to match com.google.gson.FieldNamingPolicy behavior
		return s.toLowerCase(Locale.ENGLISH);
	}

	/**
	 * Gets the Record component naming strategy which corresponds to the given Gson
	 * {@link FieldNamingPolicy}.
	 *
	 * @param policy
	 *      Gson field naming policy
	 * @return
	 *      The corresponding Record component naming strategy
	 * @throws IllegalArgumentException
	 *      If Gson adds a {@code FieldNamingPolicy} in the future which is not supported
	 *      by this method yet
	 */
	static RecordComponentNamingStrategy fromFieldNamingPolicy(final FieldNamingPolicy policy) throws IllegalArgumentException {
		return switch (policy) {
			case IDENTITY -> IDENTITY;
			case UPPER_CAMEL_CASE -> UPPER_CAMEL_CASE;
			case UPPER_CAMEL_CASE_WITH_SPACES -> UPPER_CAMEL_CASE_WITH_SPACES;
			case LOWER_CASE_WITH_UNDERSCORES -> LOWER_CASE_WITH_UNDERSCORES;
			case LOWER_CASE_WITH_DASHES -> LOWER_CASE_WITH_DASHES;
			case LOWER_CASE_WITH_DOTS -> LOWER_CASE_WITH_DOTS;
			// In case Gson ever adds new policies
			//noinspection UnnecessaryDefault
			default -> throw new IllegalArgumentException("Unsupported field naming policy " + policy);
		};
	}

	/**
	 * Transforms the name of a Record component.
	 *
	 * @param component
	 *      Record component whose name should be transformed
	 * @return
	 *      The transformed name
	 */
	String translateName(RecordComponent component);
}
