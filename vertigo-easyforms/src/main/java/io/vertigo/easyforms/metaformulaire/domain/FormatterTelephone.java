package io.vertigo.easyforms.metaformulaire.domain;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.structure.definitions.Formatter;

/**
 * Gestion des formattages de téléphone.
 * Force le +XX ou +33 et les espaces +33 1 2 2 2 2 ou +3 3 2 2 2
 * @author npiedeloup
 */
public final class FormatterTelephone implements Formatter {
	//private final Pattern ARGS_PARSER_PREFIX_PATTERN = Pattern.compile("^([^#\\s().\\-]*?)([\\s().\\-]?(?:[#]*#+[^#\\n]*)+)");//group1 prefix
	private final Pattern ARGS_PARSER_FORMAT_PATTERN = Pattern.compile("([^#]*)(#+)([^#]*)");//group2 format
	private final Map<String, Tuple<Pattern, String>> patterns = new LinkedHashMap<>();
	private Tuple<Pattern, String> defaultPattern = null;

	/**
	 * Constructor.
	 * @param args liste des formats par préfix, le dernier prend forcément tout les chiffres restants (exemple 0033|+33:+33 # ## ## ## ##;00590|+590:+590 ### ## ## ##;0:0# ## ## ## ##;+1|011:+1 (###) ###-####;+:+## ####;####)
	 */
	public FormatterTelephone(final String args) {
		Assertion.check().isNotBlank(args, "Les arguments pour la construction de FormatterTelephone sont invalides: {0033|+33:+33 # ## ## ## ##};{prefix1|prefix2:formats de rendu};{format par défaut};");
		//---
		final StringBuilder sbPattern = new StringBuilder();
		final StringBuilder sbReplace = new StringBuilder();

		for (final String token : args.split(";")) {
			final String[] tokenParsed = token.split(":");
			final String prefixes;
			final String format;
			if (tokenParsed.length == 1) { //pas de : pour le format par défaut
				prefixes = "";
				format = tokenParsed[0];
			} else {
				prefixes = tokenParsed[0];
				format = tokenParsed[1];
			}
			final Matcher matchNumber = ARGS_PARSER_FORMAT_PATTERN.matcher(format);
			//Assertion.check().isTrue(matchNumber.find(), "Erreur de syntaxe du format de téléphone: {}", format);
			final AtomicInteger group = new AtomicInteger(0);
			//(\d{3})(\d{3})(\d+)", "($1) $2-$3
			matchNumber.results()
					.forEach(mr -> {
						if (mr.end() == format.length()) {
							sbPattern.append("(\\d+)"); //le dernier prend tout
						} else {
							sbPattern.append("(\\d{").append(mr.group(2).length()).append("})");
						}
						sbReplace.append(mr.group(1)).append("$").append(group.addAndGet(1)).append(mr.group(3));
					});
			if (!prefixes.isBlank()) {
				final String[] prefixesParsed = prefixes.split("\\|");
				for (final String prefix : prefixesParsed) {
					patterns.put(prefix, Tuple.of(Pattern.compile(sbPattern.toString()), sbReplace.toString()));
				}
			} else {
				Assertion.check().isNull(defaultPattern, "Plusieurs format par défaut trouvés, préciser un prefix : {}", token);
				defaultPattern = Tuple.of(Pattern.compile(sbPattern.toString()), sbReplace.toString());
			}
			sbPattern.setLength(0);
			sbReplace.setLength(0);
		}
	}

	/** {@inheritDoc} */
	@Override
	public String stringToValue(final String strValue, final BasicType dataType) {
		Assertion.check().isTrue(dataType == BasicType.String, "Formatter ne s'applique qu'aux Strings");
		//-----
		final String sValue = StringUtil.isBlank(strValue) ? null : strValue.trim();
		if (sValue == null) {
			return sValue;
		}
		String formatted = strValue.replaceAll("[\\(\\)\\s\\.\\-]+", ""); //on autorise ( ) . - et espaces comme séparateur
		final String formattedPrepared = formatted;
		final Optional<Map.Entry<String, Tuple<Pattern, String>>> foundPrefix = patterns.entrySet().stream()
				.filter(entry -> formattedPrepared.startsWith(entry.getKey()))
				.findFirst();
		final String prefix = foundPrefix.map(Map.Entry::getKey).orElseGet(() -> "");
		final Tuple<Pattern, String> replaceTuple = foundPrefix.map(Map.Entry::getValue).orElseGet(() -> defaultPattern);
		formatted = formatted.substring(prefix.length());
		final Matcher matcher = replaceTuple.val1().matcher(formatted);
		if (matcher.matches()) {
			return matcher.replaceAll(replaceTuple.val2());
		}
		return sValue;
	}

	/** {@inheritDoc} */
	@Override
	public String valueToString(final Object objValue, final BasicType dataType) {
		Assertion.check().isTrue(dataType == BasicType.String, "Formatter ne s'applique qu'aux Strings");
		//-----
		if (objValue == null) {
			return "";
		}
		return objValue.toString();
	}
}
