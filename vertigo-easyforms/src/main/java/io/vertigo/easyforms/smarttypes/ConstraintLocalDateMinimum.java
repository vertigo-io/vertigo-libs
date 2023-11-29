package io.vertigo.easyforms.smarttypes;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import io.vertigo.basics.constraint.ConstraintUtil;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.util.DateUtil;
import io.vertigo.datamodel.structure.definitions.Constraint;
import io.vertigo.datamodel.structure.definitions.DtProperty;
import io.vertigo.datamodel.structure.definitions.Property;

/**
 * Contrainte sur la valeur minimale d'une date.
 * arguments = valeur minimale.
 *
 * @author npiedeloup
 */
public final class ConstraintLocalDateMinimum implements Constraint<Double, LocalDate> {
	private static final String DATE_PATTERN = "dd/MM/yyyy";
	private final String minExpression;
	private final LocalDate minStableValue;
	private final LocaleMessageText errorMessage;

	/**
	 * Constructor.
	 *
	 * @param args the minimum value
	 */
	public ConstraintLocalDateMinimum(final String args, final Optional<String> overrideMessageOpt, final Optional<String> overrideResourceMessageOpt) {
		Assertion.check()
				.isNotBlank(args, "Vous devez préciser la valeur minimum comme argument de ConstraintNumberMinimum");
		//-----
		minExpression = args;
		//check format :

		if (minExpression.contains("now")) {
			Assertion.check().isNotNull(DateUtil.parseToLocalDate(minExpression, DATE_PATTERN), "Pattern de date non reconnu {0}", minExpression);
			minStableValue = null;
			errorMessage = ConstraintUtil.resolveMessage(overrideMessageOpt, overrideResourceMessageOpt,
					() -> LocaleMessageText.of("La date doit être égale ou postérieur au {0}", minExpression));
		} else {
			minStableValue = DateUtil.parseToLocalDate(minExpression, DATE_PATTERN);
			errorMessage = ConstraintUtil.resolveMessage(overrideMessageOpt, overrideResourceMessageOpt,
					() -> LocaleMessageText.of("La date doit être égale ou postérieur au {0}", DateTimeFormatter.ofPattern(DATE_PATTERN)
							.format(minStableValue))); //Message par défaut n'est pas satisfaisant : à surcharger en fonction des args
		}
	}

	/** {@inheritDoc} */
	@Override
	public boolean checkConstraint(final LocalDate value) {
		final var currentMin = minStableValue != null ? minStableValue : DateUtil.parseToLocalDate(minExpression, DATE_PATTERN);
		return value == null
				|| !value.isBefore(currentMin); //value >= currentMin

	}

	/** {@inheritDoc} */
	@Override
	public LocaleMessageText getErrorMessage() {
		return errorMessage;
	}

	/** {@inheritDoc} */
	@Override
	public Property getProperty() {
		return DtProperty.MIN_VALUE;
	}

	/** {@inheritDoc} */
	@Override
	public Double getPropertyValue() {
		return (double) DateUtil.parseToLocalDate(minExpression, DATE_PATTERN).toEpochDay();
	}
}
