package io.vertigo.easyforms.metaformulaire.domain;

import com.google.gson.Gson;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;

public class ModeleFormulaireAdapter implements BasicTypeAdapter<ModeleFormulaire, String> {

	private static final Gson GSON = new Gson();

	@Override
	public ModeleFormulaire toJava(final String modeleAsString, final Class<ModeleFormulaire> type) {
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
