package io.vertigo.easyforms.smarttypes;

import com.google.gson.Gson;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;

public class FormulaireAdapter implements BasicTypeAdapter<Formulaire, String> {

	private static final Gson GSON = new Gson();

	@Override
	public Formulaire toJava(final String formulaireAsString, final Class<Formulaire> type) {
		if (formulaireAsString == null) {
			return null;
		}

		// H2 wraps json in a String by default (http://www.h2database.com/html/datatypes.html#json_type)
		// temporary fix to unescape json, it should have been inserted as json value not json string
		if (formulaireAsString.startsWith("\"")) {
			final var resolvedJson = formulaireAsString
					.substring(1, formulaireAsString.length() - 1)
					.replace("\\\"", "\"")
					.replace("\\\\", "\\");
			return GSON.fromJson(resolvedJson, Formulaire.class);
		}
		return GSON.fromJson(formulaireAsString, Formulaire.class);

	}

	@Override
	public String toBasic(final Formulaire formulaire) {
		if (formulaire == null) {
			return null;
		}
		return GSON.toJson(formulaire);
	}

	@Override
	public BasicType getBasicType() {
		return BasicType.String;
	}

}
