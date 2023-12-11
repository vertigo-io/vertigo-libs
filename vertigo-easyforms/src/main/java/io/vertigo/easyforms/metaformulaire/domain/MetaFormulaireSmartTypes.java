package io.vertigo.easyforms.metaformulaire.domain;

import java.time.LocalDate;

import io.vertigo.basics.constraint.ConstraintRegex;
import io.vertigo.basics.constraint.ConstraintStringLength;
import io.vertigo.basics.formatter.FormatterDate;
import io.vertigo.basics.formatter.FormatterDefault;
import io.vertigo.basics.formatter.FormatterId;
import io.vertigo.basics.formatter.FormatterString;
import io.vertigo.core.lang.BasicType;
import io.vertigo.datamodel.smarttype.annotations.Adapter;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.Formatter;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeProperty;
import io.vertigo.easyforms.smarttypes.ConstraintLocalDateMaximum;
import io.vertigo.easyforms.smarttypes.ConstraintLocalDateMinimum;
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

	@SmartTypeDefinition(Integer.class)
	@Formatter(clazz = FormatterDefault.class)
	EfSort,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintStringLength.class, arg = "250", msg = "Le text est trop long")
	@Constraint(clazz = ConstraintRegex.class, arg = "^[^<>&\"]*$", msg = "Les caractères < > & et \" ne sont pas acceptés")
	EfText,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterString.class, arg = "UPPER")
	@Constraint(clazz = ConstraintStringLength.class, arg = "80", msg = "Le nom est trop long")
	@Constraint(clazz = ConstraintRegex.class, arg = "^[^<>&\"]*$", msg = "Les caractères < > & et \" ne sont pas acceptés")
	EfNom,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterString.class, arg = "UPPER_FIRST")
	@Constraint(clazz = ConstraintStringLength.class, arg = "80", msg = "Le prénom est trop long")
	@Constraint(clazz = ConstraintRegex.class, arg = "^[^<>&\"]*$", msg = "Les caractères < > & et \" ne sont pas acceptés")
	EfPrenom,

	@SmartTypeDefinition(LocalDate.class)
	@Formatter(clazz = FormatterDate.class, arg = "yyyy-MM-dd")
	@Constraint(clazz = ConstraintLocalDateMaximum.class, arg = "now+100y", msg = "La date est trop loin dans le future")
	@Constraint(clazz = ConstraintLocalDateMinimum.class, arg = "now-100y", msg = "La date est trop loin dans le passé")
	EfDate,

	@SmartTypeDefinition(LocalDate.class)
	@Formatter(clazz = FormatterDate.class, arg = "yyyy-MM-dd")
	@Constraint(clazz = ConstraintLocalDateMaximum.class, arg = "now", msg = "La date n'est pas valide")
	@Constraint(clazz = ConstraintLocalDateMinimum.class, arg = "now-120y", msg = "La date n'est pas valide")
	EfDatePassee,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterString.class, arg = "LOWER")
	@Constraint(clazz = ConstraintRegex.class, arg = "^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*(\\.[a-zA-Z0-9-]{2,3})+$", msg = "L'email n'est pas valide")
	@Constraint(clazz = ConstraintStringLength.class, arg = "80", msg = "L'émail est trop long")
	EfEmail,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterTelephone.class, arg = "0033|+33:+33 #;005|+5:+5## #;006|+6:+6## #;0026|+26:+26# #;0:+33 #;+1:+1 #;+7:+7 #;+:+## #;#")
	@Constraint(clazz = ConstraintRegex.class,
			//vérifie un numéro international avec +XX ou 00XX ou un numéro francais.
			//Pour l'international seul le prefix 17 est filtré (pas d'autre commencant pas 1), et entre 2 et 13 chiffres après le prefix (la reco UIT-T limite à 15 le total)
			//pour la france vérifie qu'on a +33 ou 0033 ou 0 + 9 chiffres . peut avoir des () des . ou des espaces. doit finir par 2 chiffres consécutifs
			arg = "^((?:\\+|00)([17]|[245689]\\d|3[0-24-9]\\d)(?:\\W*\\d){2,13}\\d)|((((?:\\+|00)33\\W*)|0)[1-9](?:\\W*\\d){7}\\d)$", msg = "Le numéro de téléphone n'est pas valide. Utilisez un numéro français à 10 chiffres, ou indiquez un numéro au format international avec le préfixe du pays (exemple: +33 pour la France)")
	@Constraint(clazz = ConstraintStringLength.class, arg = "20", msg = "Le numéro de téléphone est trop long")
	EfTelephone,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintRegex.class, arg = "^(?:D|[A-Z]{3})[0-9]{9}$", msg = "Le numéro de visa n'est pas valide. Il doit être au format XXX123456789 : code pays puis 9 chiffres")
	@Constraint(clazz = ConstraintStringLength.class, arg = "12", msg = "Le numéro de visa n'est pas valide. Il doit être au format XXX123456789 : code pays puis 9 chiffres")
	EfVisa,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterString.class, arg = "UPPER_FIRST")
	@Constraint(clazz = ConstraintStringLength.class, arg = "80", msg = "La nationalité est trop longue")
	@Constraint(clazz = ConstraintRegex.class, arg = "^[^<>&\"]*$", msg = "Les caractères < > & et \" ne sont pas acceptés")
	EfNationalite,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintRegex.class, arg = "[0-9]{5}", msg = "Un code postal doit contenir 5 chiffres")
	@Constraint(clazz = ConstraintStringLength.class, arg = "5", msg = "")
	EfCodePostal,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	EfTaxonomie, // TODO utile ?

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
