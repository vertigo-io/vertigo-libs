package io.vertigo.ui.impl.thymeleaf.composite.helper;

import java.util.List;

import org.thymeleaf.context.IEngineContext;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.exceptions.TemplateProcessingException;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import org.thymeleaf.standard.expression.Assignation;
import org.thymeleaf.standard.expression.AssignationSequence;
import org.thymeleaf.standard.expression.AssignationUtils;
import org.thymeleaf.standard.expression.IStandardExpression;
import org.thymeleaf.util.StringUtils;

public final class WithHelper {

	private WithHelper() {
		//private constructor for Helper
	}

	public static void processWith(final ITemplateContext context, final String attributeValue, final IElementModelStructureHandler structureHandler) {

		final AssignationSequence assignations = AssignationUtils.parseAssignationSequence(context, attributeValue, false /* no parameters without value */);
		if (assignations == null) {
			throw new TemplateProcessingException("Could not parse value as attribute assignations: \"" + attributeValue + "\"");
		}

		// Normally we would just allow the structure handler to be in charge of declaring the local variables
		// by using structureHandler.setLocalVariable(...) but in this case we want each variable defined at an
		// expression to be available for the next expressions, and that forces us to cast our ITemplateContext into
		// a more specific interface --which shouldn't be used directly except in this specific, special case-- and
		// put the local variables directly into it.
		IEngineContext engineContext = null;
		if (context instanceof IEngineContext) {
			// NOTE this interface is internal and should not be used in users' code
			engineContext = (IEngineContext) context;
		}

		final List<Assignation> assignationValues = assignations.getAssignations();
		final int assignationValuesLen = assignationValues.size();

		for (int i = 0; i < assignationValuesLen; i++) {

			final Assignation assignation = assignationValues.get(i);

			final IStandardExpression leftExpr = assignation.getLeft();
			final Object leftValue = leftExpr.execute(context);

			final IStandardExpression rightExpr = assignation.getRight();
			final Object rightValue = rightExpr.execute(context);

			final String newVariableName = leftValue == null ? null : leftValue.toString();
			if (StringUtils.isEmptyOrWhitespace(newVariableName)) {
				throw new TemplateProcessingException("Variable name expression evaluated as null or empty: \"" + leftExpr + "\"");
			}

			if (engineContext != null) {
				// The advantage of this vs. using the structure handler is that we will be able to
				// use this newly created value in other expressions in the same 'th:with'
				engineContext.setVariable(newVariableName, rightValue);
			} else {
				// The problem is, these won't be available until we execute the next processor
				structureHandler.setLocalVariable(newVariableName, rightValue);
			}
		}
	}
}
