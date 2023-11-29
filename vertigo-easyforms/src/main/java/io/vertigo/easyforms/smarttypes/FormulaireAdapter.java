package io.vertigo.easyforms.smarttypes;

import com.google.gson.Gson;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;

public class FormulaireAdapter implements BasicTypeAdapter<FormulaireDemarche, String> {

	private static final Gson GSON = new Gson();

	@Override
	public FormulaireDemarche toJava(final String formulaireAsString, final Class<FormulaireDemarche> type) {
		if (formulaireAsString == null) {
			return null;
		}
		return GSON.fromJson(formulaireAsString, FormulaireDemarche.class);

	}

	@Override
	public String toBasic(final FormulaireDemarche formulaire) {
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
