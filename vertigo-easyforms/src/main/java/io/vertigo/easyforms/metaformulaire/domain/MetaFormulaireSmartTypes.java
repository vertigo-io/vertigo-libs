package io.vertigo.easyforms.metaformulaire.domain;

import io.vertigo.basics.constraint.ConstraintRegex;
import io.vertigo.basics.constraint.ConstraintStringLength;
import io.vertigo.basics.formatter.FormatterDefault;
import io.vertigo.basics.formatter.FormatterId;
import io.vertigo.core.lang.BasicType;
import io.vertigo.datamodel.smarttype.annotations.Adapter;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.Formatter;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeProperty;
import io.vertigo.easyforms.smarttypes.Formulaire;
import io.vertigo.easyforms.smarttypes.FormulaireAdapter;

public enum MetaFormulaireSmartTypes {

	@SmartTypeDefinition(Long.class)
	@Formatter(clazz = FormatterId.class, arg = "")
	EfId,

	@SmartTypeDefinition(Boolean.class)
	@Formatter(clazz = FormatterDefault.class)
	EfBooleen,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintRegex.class, arg = "^[_a-zA-Z0-9-]+$", msg = "Le code n'est pas valide, seuls les lettres, chiffres, _ et - sont autorisés.")
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	@SmartTypeProperty(property = "indexType", value = "code:keyword")
	EfCode,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	@SmartTypeProperty(property = "indexType", value = "text_fr:facetable:sortable")
	EfLabel,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintStringLength.class, arg = "250", msg = "Le text est trop long")
	@Constraint(clazz = ConstraintRegex.class, arg = "^[^<>&\"]*$", msg = "Les caractères < > & et \" ne sont pas acceptés")
	EfText,

	@SmartTypeDefinition(Integer.class)
	@Formatter(clazz = FormatterDefault.class)
	EfSort,

	@SmartTypeDefinition(Formulaire.class)
	@Formatter(clazz = FormatterDefault.class)
	@Adapter(clazz = FormulaireAdapter.class, targetBasicType = BasicType.String)
	@SmartTypeProperty(property = "indexType", value = "text_fr")
	EfFormulaire,

	@SmartTypeDefinition(ModeleFormulaire.class)
	@Formatter(clazz = FormatterDefault.class)
	@Adapter(clazz = ModeleFormulaireAdapter.class, targetBasicType = BasicType.String)
	EfModeleFormulaire,
}
