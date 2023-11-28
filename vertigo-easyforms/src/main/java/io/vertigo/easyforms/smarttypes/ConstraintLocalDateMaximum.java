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
 * Contrainte sur la valeur maximale d'une date.
 * arguments = valeur maximale.
 *
 * @author npiedeloup
 */
public final class ConstraintLocalDateMaximum implements Constraint<Double, LocalDate> {
	private static final String DATE_PATTERN = "dd/MM/yyyy";
	private final String maxExpression;
	private final LocalDate maxStableValue;
	private final LocaleMessageText errorMessage;

	/**
	 * Constructor.
	 *
	 * @param args the minimum value
	 */
	public ConstraintLocalDateMaximum(final String args, final Optional<String> overrideMessageOpt, final Optional<String> overrideResourceMessageOpt) {
		Assertion.check()
				.isNotBlank(args, "Vous devez préciser la valeur maximum comme argument de ConstraintLocalDateMaximum");
		//-----
		maxExpression = args;
		//check format :

		if (maxExpression.contains("now")) {
			Assertion.check().isNotNull(DateUtil.parseToLocalDate(maxExpression, DATE_PATTERN), "Pattern de date non reconnu {0}", maxExpression);
			maxStableValue = null;
			errorMessage = ConstraintUtil.resolveMessage(overrideMessageOpt, overrideResourceMessageOpt,
					() -> LocaleMessageText.of("La date doit être égale ou antérieur au {0}", maxExpression));
		} else {
			maxStableValue = DateUtil.parseToLocalDate(maxExpression, DATE_PATTERN);
			errorMessage = ConstraintUtil.resolveMessage(overrideMessageOpt, overrideResourceMessageOpt,
					() -> LocaleMessageText.of("La date doit être égale ou antérieur au {0}", DateTimeFormatter.ofPattern(DATE_PATTERN)
							.format(maxStableValue))); //Message par défaut n'est pas satisfaisant : à surcharger en fonction des args
		}
	}

	/** {@inheritDoc} */
	@Override
	public boolean checkConstraint(final LocalDate value) {
		final var currentMax = maxStableValue != null ? maxStableValue : DateUtil.parseToLocalDate(maxExpression, DATE_PATTERN);
		return value == null
				|| !value.isAfter(currentMax); //value <= currentMax

	}

	/** {@inheritDoc} */
	@Override
	public LocaleMessageText getErrorMessage() {
		return errorMessage;
	}

	/** {@inheritDoc} */
	@Override
	public Property getProperty() {
		return DtProperty.MAX_VALUE;
	}

	/** {@inheritDoc} */
	@Override
	public Double getPropertyValue() {
		return (double) DateUtil.parseToLocalDate(maxExpression, DATE_PATTERN).toEpochDay();
	}
}
