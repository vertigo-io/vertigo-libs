package io.vertigo.easyforms.metaformulaire.domain;

import com.google.gson.Gson;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;

public class ModeleFormulaireAdapter implements BasicTypeAdapter<ModeleFormulaire, String> {

	private static final Gson GSON = new Gson();

	@Override
	public ModeleFormulaire toJava(final String modeleAsString, final Class<ModeleFormulaire> type) {
		// H2 wraps json in a String by default (http://www.h2database.com/html/datatypes.html#json_type)
		// temporary fix to unescape json, it should have been inserted as json value not json string
		if (modeleAsString.startsWith("\"")) {
			final var resolvedJson = modeleAsString
					.substring(1, modeleAsString.length() - 1)
					.replace("\\\"", "\"")
					.replace("\\\\", "\\");
			return GSON.fromJson(resolvedJson, ModeleFormulaire.class);
		}
		return GSON.fromJson(modeleAsString, ModeleFormulaire.class);
	}

	@Override
	public String toBasic(final ModeleFormulaire modele) {
		return GSON.toJson(modele);
	}

	@Override
	public BasicType getBasicType() {
		return BasicType.String;
	}

}
