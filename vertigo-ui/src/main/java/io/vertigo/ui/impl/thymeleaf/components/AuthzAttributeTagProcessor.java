/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.ui.impl.thymeleaf.components;

import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.engine.AttributeDefinition;
import org.thymeleaf.engine.AttributeDefinitions;
import org.thymeleaf.engine.AttributeName;
import org.thymeleaf.engine.IAttributeDefinitionsAware;
import org.thymeleaf.model.IProcessableElementTag;
import org.thymeleaf.processor.element.AbstractAttributeTagProcessor;
import org.thymeleaf.processor.element.IElementTagStructureHandler;
import org.thymeleaf.standard.expression.IStandardExpression;
import org.thymeleaf.standard.expression.IStandardExpressionParser;
import org.thymeleaf.standard.expression.StandardExpressions;
import org.thymeleaf.standard.util.StandardProcessorUtils;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.util.EvaluationUtils;
import org.thymeleaf.util.Validate;

import io.vertigo.core.lang.Assertion;
import io.vertigo.ui.impl.springmvc.util.UiAuthorizationUtil;
import io.vertigo.vega.webservice.model.UiObject;

/**
 * Attribut tag processor to apply simply hasAuthorization and hasOperation .
 * It use UiAuthorizationUtil instance already registered in thymeleaf engine context.
 * A global dev mode keep element visible but with a "security-locked" class
 * Should sow a beautifull security overlay.
 *
 * 3 ways to use it :
 * 1- With a simple string
 *    vu:authz="myGlobalAuthz" or vu:authz="mySecuredEntityAuthz$read"
 *    => use like authz.hasAuthorization('myGlobalAuthz')
 *    Support multiple list OR separator ',' and '!' for NOT
 *
 * 2- With a contextPath to a UiObject<Entity>
 *    vu:authz="model.myEntity$read" or vu:authz="model.list[0]$read"
 *    => use like authz.hasOperation(model.myEntity, 'read')
 *    (first part is evaluated like ${model.myEntity})
 *
 * 3- With a evaluated expression (starts with ${ )
 *    vu:authz="${authz.hasAuthorization('myGlobalAuthz') && authz.hasAuthorization('mySecuredEntityAuthz$read')}"
 *    => use exactly like th:if, but no need to merge your th:if business logic with th:authz security logic
 *
 * @author npiedeloup
 */
public class AuthzAttributeTagProcessor extends AbstractAttributeTagProcessor
		implements IAttributeDefinitionsAware {

	public static final String CLASS_AUTHZ_LOCKED = "authz--locked";

	public static final int PRECEDENCE = 301; //th:if+1
	public static final String ATTR_NAME = "authz";
	public static final boolean AUTHZ_DEV_MODE_LOOK = false;
	public static final String AUTHZ_DEV_MODE_NAME = "authz-dev";

	/**
	 * Constructor.
	 * @param dialectPrefix Dialect prefix (tc)
	 */
	public AuthzAttributeTagProcessor(final String dialectPrefix) {
		super(TemplateMode.HTML, dialectPrefix, null, false, ATTR_NAME, true, PRECEDENCE, true);
	}

	public static final String TARGET_ATTR_NAME = "class";
	private static final TemplateMode TEMPLATE_MODE = TemplateMode.HTML;
	private AttributeDefinition targetAttributeDefinition;

	@Override
	public void setAttributeDefinitions(final AttributeDefinitions attributeDefinitions) {
		Validate.notNull(attributeDefinitions, "Attribute Definitions cannot be null");
		// We precompute the AttributeDefinition of the target attribute in order to being able to use much
		// faster methods for setting/replacing attributes on the ElementAttributes implementation
		targetAttributeDefinition = attributeDefinitions.forName(TEMPLATE_MODE, TARGET_ATTR_NAME);
	}

	@Override
	protected final void doProcess(
			final ITemplateContext context,
			final IProcessableElementTag tag,
			final AttributeName attributeName, final String attributeValue,
			final IElementTagStructureHandler structureHandler) {

		final boolean visible = isVisible(context, tag, attributeName, attributeValue);

		if (!visible) {
			if (AUTHZ_DEV_MODE_LOOK) {
				final Object authzDevModeVar = context.getVariable(AUTHZ_DEV_MODE_NAME);
				if (authzDevModeVar != null && !Boolean.FALSE.equals(authzDevModeVar)) {
					String newAttributeValue = CLASS_AUTHZ_LOCKED;
					final AttributeName targetAttributeName = targetAttributeDefinition.getAttributeName();
					if (tag.hasAttribute(targetAttributeName)) {
						final String currentValue = tag.getAttributeValue(targetAttributeName);
						if (currentValue.length() > 0) {
							newAttributeValue = currentValue + ' ' + newAttributeValue;
						}
					}
					StandardProcessorUtils.setAttribute(structureHandler, targetAttributeDefinition, TARGET_ATTR_NAME, newAttributeValue);
					return;
					//other case we remove element
				}
			}
			structureHandler.removeElement();
		}
	}

	protected boolean isVisible(final ITemplateContext context,
			final IProcessableElementTag tag, final AttributeName attributeName,
			final String attributeValue) {
		Assertion.check().isFalse(attributeValue.startsWith("."), attributeValue,
				"Authz can't startsWith . ({0})", attributeValue);
		//----
		if (attributeValue.startsWith("${")) {
			//same code as th:if
			final IStandardExpressionParser expressionParser = StandardExpressions.getExpressionParser(context.getConfiguration());
			final IStandardExpression expression = expressionParser.parseExpression(context, attributeValue);
			final Object value = expression.execute(context);
			return EvaluationUtils.evaluateAsBoolean(value);
		}
		Assertion.check().isFalse(attributeValue.contains("&&"), attributeValue,
				"Authz don't support &&, use a complete expression like : vu:authz=\"${authz.hasAuthorization('myGlobalAuthz') && authz.hasAuthorization('mySecuredEntityAuthz$read')}\". ({0})", attributeValue);
		//Sinon on récupère depuis le context d'exec de la page
		final UiAuthorizationUtil authz = obtainUiAuthorizationUtil(context);
		//Liste d'authorizations () avec deux modes :
		// - simple chaine => hasAuthorization
		// - référence à un objet du model (xxx.myEntityInstance$operation) => hasOperation
		//
		//Liste en OR avec le separateur ',' et '!' pour le NOT
		boolean isAuthorized;
		boolean isNeg;
		for (final String authzAttributInput : attributeValue.split(",")) {
			String authzAttribut = authzAttributInput.trim();
			if (authzAttribut.isEmpty()) {
				continue;
			}
			isNeg = authzAttribut.startsWith("!");
			if (isNeg) {
				authzAttribut = authzAttribut.substring(1).trim();
			}
			if (attributeValue.indexOf('.') > 0) { //le $ n'est pas discriminant entre les deux modes
				final int opeIdx = attributeValue.indexOf('$');
				Assertion.check().isTrue(opeIdx > 0, "Authz invalid syntax : missing $ in '{0}'. When check object instance, you must provide operation (xxx.myEntityInstance$operation)", attributeValue);

				final String modelPart = attributeValue.substring(0, opeIdx);
				final String opePart = attributeValue.substring(opeIdx + 1);

				final IStandardExpressionParser expressionParser = StandardExpressions.getExpressionParser(context.getConfiguration());
				final IStandardExpression expression = expressionParser.parseExpression(context, "${" + modelPart + "}");
				final UiObject value = UiObject.class.cast(expression.execute(context));
				isAuthorized = authz.hasOperation(value, opePart);
			} else {
				isAuthorized = authz.hasAuthorization(authzAttribut);
			}
			if (isNeg ? !isAuthorized : isAuthorized) {
				return true;
			}
		}
		return false;
	}

	private UiAuthorizationUtil obtainUiAuthorizationUtil(final ITemplateContext context) {
		return (UiAuthorizationUtil) context.getVariable("authz");
	}
}
