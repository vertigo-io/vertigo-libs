package io.vertigo.ui.impl.thymeleaf.components;

import java.util.Map;

import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.engine.TemplateData;
import org.thymeleaf.engine.TemplateModel;
import org.thymeleaf.exceptions.TemplateInputException;
import org.thymeleaf.model.IModel;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import org.thymeleaf.standard.expression.Fragment;
import org.thymeleaf.standard.expression.FragmentExpression;
import org.thymeleaf.standard.expression.FragmentExpression.ExecutedFragmentExpression;
import org.thymeleaf.standard.expression.IStandardExpressionParser;
import org.thymeleaf.standard.expression.NoOpToken;
import org.thymeleaf.standard.expression.StandardExpressions;

public class FragmentHelper {

	private FragmentHelper() {

	}

	public static IModel getFragmentModel(final ITemplateContext context,
			final String attributeValue,
			final IElementModelStructureHandler structureHandler,
			final String dialectPrefix,
			final String fragmentAttrName) {

		//final IEngineConfiguration configuration = context.getConfiguration();

		final Object fragmentObj = computeFragment(context, attributeValue);
		if (fragmentObj == null) {

			// If the Fragment result is null, this is an error. Note a NULL
			// result is not the same as the result being the empty fragment
			// (~{})
			throw new TemplateInputException("Error resolving fragment: \"" + attributeValue + "\": " + "template or fragment could not be resolved");
		}

		final Fragment fragment = (Fragment) fragmentObj;

		final TemplateModel fragmentModel = fragment.getTemplateModel();
		final Map<String, Object> fragmentParameters = fragment.getParameters();

		/*
		 * ONCE WE HAVE THE FRAGMENT MODEL (its events, in fact), CHECK THE
		 * FRAGMENT SIGNATURE Fragment signature is important because it might
		 * affect the way we apply the parameters to the fragment.
		 *
		 * Note this works whatever the template mode of the inserted fragment,
		 * given we are looking for an element containing a
		 * "th:fragment/data-th-fragment" in a generic, non-template-dependent
		 * way.
		 */

		// We will check types first instead of events in order to (many times)
		// avoid creating an immutably-wrapped
		// event object when calling "model.get(pos)"

		/*boolean signatureApplied = false;
		final ITemplateEvent firstEvent = fragmentModel.size() > 2 ? fragmentModel.get(1) : null;
		if (firstEvent != null && IProcessableElementTag.class.isAssignableFrom(firstEvent.getClass())) {

			final IProcessableElementTag fragmentHolderEvent = (IProcessableElementTag) firstEvent;

			if (fragmentHolderEvent.hasAttribute(dialectPrefix, fragmentAttrName)) {
				// The selected fragment actually has a "th:fragment" attribute,
				// so we should process its signature

				final String fragmentSignatureSpec = EscapedAttributeUtils
						.unescapeAttribute(fragmentModel.getTemplateMode(),
								fragmentHolderEvent.getAttributeValue(dialectPrefix,
										fragmentAttrName));
				if (!StringUtils.isEmptyOrWhitespace(fragmentSignatureSpec)) {

					final FragmentSignature fragmentSignature = FragmentSignatureUtils.parseFragmentSignature(configuration, fragmentSignatureSpec);
					if (fragmentSignature != null) {

						// Reshape the fragment parameters into the ones that we
						// will actually use, according to the signature
						fragmentParameters = FragmentSignatureUtils.processParameters(
								fragmentSignature, fragmentParameters,
								fragment.hasSyntheticParameters());
						signatureApplied = true;
					}
				}
			}
		}

		// If no signature applied, we must check if the parameters map contains
		// synthetic parameters. If so,
		// we should raise an exception because not doing so could provoke
		// confusion in users who would see parameters
		// not being applied, maybe not realising there was no signature
		// assignation involved.
		if (!signatureApplied && fragment.hasSyntheticParameters()) {
			throw new TemplateProcessingException("Fragment '" + attributeValue
					+ "' specifies synthetic (unnamed) parameters, but the resolved fragment "
					+ "does not match a fragment signature (th:fragment,data-th-fragment) which could apply names to "
					+ "the specified parameters.");
		}*/

		/*
		 * APPLY THE FRAGMENT'S TEMPLATE RESOLUTION so that all code inside the
		 * fragment is executed with its own template resolution info (working
		 * as if it were a local variable)
		 */
		final TemplateData fragmentTemplateData = fragmentModel.getTemplateData();
		structureHandler.setTemplateData(fragmentTemplateData);

		/*
		 * APPLY THE FRAGMENT PARAMETERS AS LOCAL VARIABLES, perhaps after
		 * reshaping it according to the fragment signature
		 */
		if (fragmentParameters != null && fragmentParameters.size() > 0) {
			for (final Map.Entry<String, Object> fragmentParameterEntry : fragmentParameters.entrySet()) {
				structureHandler.setLocalVariable(fragmentParameterEntry.getKey(), fragmentParameterEntry.getValue());
			}
		}

		return fragmentModel;
	}

	private static Object computeFragment(final ITemplateContext context, final String input) {

		final IStandardExpressionParser expressionParser = StandardExpressions.getExpressionParser(context.getConfiguration());
		//final ViewContextMap viewContextMap = (ViewContextMap) context.getVariable("model");
		//final String mode = ((FormMode) viewContextMap.get("mode")) == FormMode.edit ? "edit" : "read";
		final FragmentExpression fragmentExpression = (FragmentExpression) expressionParser.parseExpression(context, input.trim() /*+ "." + mode*/);

		final ExecutedFragmentExpression executedFragmentExpression = FragmentExpression.createExecutedFragmentExpression(context, fragmentExpression);

		if (executedFragmentExpression.getFragmentSelectorExpressionResult() == null && executedFragmentExpression.getFragmentParameters() == null) {
			// We might be in the scenario that what we thought was a template
			// name in fact was instead an expression
			// returning a Fragment itself, so we should simply return it
			final Object templateNameExpressionResult = executedFragmentExpression.getTemplateNameExpressionResult();
			if (templateNameExpressionResult != null) {
				if (templateNameExpressionResult instanceof Fragment) {
					return templateNameExpressionResult;
				}
				if (templateNameExpressionResult == NoOpToken.VALUE) {
					return NoOpToken.VALUE;
				}
			}
		}

		// Given this is a simple (originally unwrapped) fragment expression, we
		// will consider the non-existence
		// of the fragment a failure. The reason we do this here instead of just
		// waiting and seeing if we receive
		// a null and then failing is that, in order to receive such "null", the
		// underlying resolution system would
		// have to execute a (potentially costly) resource.exists() call on the
		// resolved resource.
		return FragmentExpression.resolveExecutedFragmentExpression(context, executedFragmentExpression, true);
	}
}
