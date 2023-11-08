package io.vertigo.planning;

import java.time.Instant;
import java.time.LocalDate;

import io.vertigo.basics.constraint.ConstraintNumberMaximum;
import io.vertigo.basics.constraint.ConstraintNumberMinimum;
import io.vertigo.basics.constraint.ConstraintRegex;
import io.vertigo.basics.constraint.ConstraintStringLength;
import io.vertigo.basics.formatter.FormatterDate;
import io.vertigo.basics.formatter.FormatterDefault;
import io.vertigo.basics.formatter.FormatterId;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.Formatter;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeProperty;

public enum PlanningSmartTypes {

	@SmartTypeDefinition(Long.class)
	@Formatter(clazz = FormatterId.class, arg = "")
	PId,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@SmartTypeProperty(property = "storeType", value = "TEXT")
	MultipleIds,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	PLabel,

	@SmartTypeDefinition(LocalDate.class)
	@Formatter(clazz = FormatterDate.class, arg = "dd/MM/yyyy;d/MM/yyyy;dd/M/yyyy;d/M/yyyy")
	PLocalDate,

	@SmartTypeDefinition(Instant.class)
	@Formatter(clazz = FormatterDate.class, arg = "dd/MM/yyyy ' ' HH'h'mm")
	PInstant,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintRegex.class, arg = "^[_a-zA-Z0-9-]+$", msg = "Le code n'est pas valide, seuls les lettres, chiffres, _ et - sont autorisés.")
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	PCode,

	@SmartTypeDefinition(Integer.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintNumberMinimum.class, arg = "1", msg = "La durée doit être supérieure à 1 minute")
	@Constraint(clazz = ConstraintNumberMaximum.class, arg = "480", msg = "La durée doit être inférieure à 480 minutes (8h)")
	PMinute,

	@SmartTypeDefinition(Integer.class)
	@Formatter(clazz = FormatterMinutes.class) // à terme utiliser un SmartType
	@Constraint(clazz = ConstraintNumberMinimum.class, arg = "0", msg = "L'heure doit être entre 00:00 et 23:59")
	@Constraint(clazz = ConstraintNumberMaximum.class, arg = "1439", msg = "L'heure doit être entre 00:00 et 23:59")
	PHeureMinute,

	@SmartTypeDefinition(Integer.class)
	@Formatter(clazz = FormatterDefault.class)
	PNombre,

	@SmartTypeDefinition(Integer.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintNumberMinimum.class, arg = "1", msg = "Le nombre de guichets doit être un nombre compris entre 1 et 9")
	@Constraint(clazz = ConstraintNumberMaximum.class, arg = "9", msg = "Le nombre de guichets doit être un nombre compris entre 1 et 9")
	PNbGuichet,

	@SmartTypeDefinition(Boolean.class)
	@Formatter(clazz = FormatterDefault.class)
	PBooleen;

}
