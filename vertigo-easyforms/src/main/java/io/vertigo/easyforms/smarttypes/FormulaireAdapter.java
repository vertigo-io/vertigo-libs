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
