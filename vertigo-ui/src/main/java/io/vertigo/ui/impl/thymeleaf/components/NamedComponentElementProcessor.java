/**
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

import static java.util.Collections.singleton;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.thymeleaf.context.IEngineContext;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.exceptions.TemplateProcessingException;
import org.thymeleaf.model.IAttribute;
import org.thymeleaf.model.ICloseElementTag;
import org.thymeleaf.model.IElementTag;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IOpenElementTag;
import org.thymeleaf.model.IProcessableElementTag;
import org.thymeleaf.model.IStandaloneElementTag;
import org.thymeleaf.model.ITemplateEvent;
import org.thymeleaf.model.IText;
import org.thymeleaf.processor.element.AbstractElementModelProcessor;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import org.thymeleaf.standard.StandardDialect;
import org.thymeleaf.standard.expression.Assignation;
import org.thymeleaf.standard.expression.AssignationSequence;
import org.thymeleaf.standard.expression.AssignationUtils;
import org.thymeleaf.standard.expression.IStandardExpression;
import org.thymeleaf.standard.expression.IStandardExpressionParser;
import org.thymeleaf.standard.expression.StandardExpressions;
import org.thymeleaf.standard.expression.VariableExpression;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.util.EscapedAttributeUtils;
import org.thymeleaf.util.EvaluationUtils;
import org.thymeleaf.util.StringUtils;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.util.StringUtil;

public class NamedComponentElementProcessor extends AbstractElementModelProcessor {
	private static final String COMPONENT_PARAMS = "params";
	private static final String NO_RESERVED_FIRST_CHAR_PATTERN_STR = "^(([^$@]\\{)|[^#|'](?!\\{)).*$";
	private static final String NO_RESERVED_TEXT_PATTERN_STR = "^[^$#@|']([^$#@]|(&#[0-9]{1,4};))*$"; //don't start with $#@|' and no $#@ after (excepted html encoded chars : &#[0-9]+;)
	private static final String NUMBER_PATTERN_STR = "^[0-9\\.]+";
	private static final String SIMPLE_TEXT_PATTERN_STR = "^[a-zA-Z]*$";
	private static final Pattern NO_RESERVED_FIRST_CHAR_PATTERN = Pattern.compile(NO_RESERVED_FIRST_CHAR_PATTERN_STR, Pattern.DOTALL);
	private static final Pattern NO_RESERVED_TEXT_PATTERN = Pattern.compile(NO_RESERVED_TEXT_PATTERN_STR);
	private static final Pattern NUMBER_PATTERN = Pattern.compile(NUMBER_PATTERN_STR);
	private static final Pattern SIMPLE_TEXT_PATTERN = Pattern.compile(SIMPLE_TEXT_PATTERN_STR);

	private static final String VARIABLE_PLACEHOLDER_SEPARATOR = "_";
	private static final String SLOTS_SUFFIX = "slot";
	private static final String ATTRS_SUFFIX = "attrs";
	private static final String CONTENT_TAGS = "contentTags";

	private static final int PRECEDENCE = 350;

	private final Set<String> excludeAttributes = singleton(COMPONENT_PARAMS);
	private final String componentName;
	private final Optional<VariableExpression> selectionExpressionOpt;
	private final Set<String> parameterNames;
	private final Set<String> slotNames;
	private final List<String> placeholderPrefixes;
	private final Optional<String> unnamedPlaceholderPrefix;
	private final String frag;

	private final Deque<IModel> emptyStack = new UnmodifiableDeque<>();

	/**
	 * Constructor
	 *
	 * @param dialectPrefix Dialect prefix (tc)
	 * @param tagName Tag name to search for (e.g. panel)
	 * @param componentName Fragment to search for
	 */
	public NamedComponentElementProcessor(final String dialectPrefix, final NamedComponentDefinition thymeleafComponent) {
		super(TemplateMode.HTML, dialectPrefix, thymeleafComponent.getName(), true, null, false, PRECEDENCE);
		componentName = thymeleafComponent.getFragmentTemplate();
		frag = thymeleafComponent.getFrag();

		selectionExpressionOpt = thymeleafComponent.getSelectionExpression();
		parameterNames = new HashSet<>(thymeleafComponent.getParameters());

		slotNames = parameterNames.stream()
				.filter(key -> key.endsWith(VARIABLE_PLACEHOLDER_SEPARATOR + SLOTS_SUFFIX))
				.collect(Collectors.toSet());

		placeholderPrefixes = thymeleafComponent.getParameters().stream() //we read from thymeleafComponent.getParameters() to keep order of placeholders
				.filter(parameterName -> parameterName.endsWith(VARIABLE_PLACEHOLDER_SEPARATOR + ATTRS_SUFFIX))
				.map(parameterName -> parameterName.substring(0, parameterName.length() - ATTRS_SUFFIX.length()))
				.collect(Collectors.toList());
		unnamedPlaceholderPrefix = placeholderPrefixes.isEmpty() ? Optional.empty() : Optional.of(placeholderPrefixes.get(placeholderPrefixes.size() - 1));
	}

	@Override
	protected void doProcess(final ITemplateContext context, final IModel model, final IElementModelStructureHandler structureHandler) {
		if (selectionExpressionOpt.isEmpty() //no selector
				|| (boolean) selectionExpressionOpt.get().execute(context)) { //or selector valid

			final IProcessableElementTag tag = processElementTag(context, model);
			final Map<String, String> attributes = processAttribute(model, context, structureHandler);

			final String param = attributes.get(COMPONENT_PARAMS);
			final String fragmentToUse = "~{" + componentName + " :: " + frag + "}";
			final IModel fragmentModel = FragmentUtil.getFragmentModel(context, fragmentToUse + (param == null ? "" : "(" + param + ")"), structureHandler);
			final IModel clonedFragmentModel = fragmentModel.cloneModel(); //le clone change l'index des éléments

			//by default we stop content and slots propagation
			structureHandler.setLocalVariable("contentStack", emptyStack);
			if (parameterNames.contains(CONTENT_TAGS)) {
				structureHandler.setLocalVariable(CONTENT_TAGS, Collections.emptyList());
			}
			for (final String slotName : slotNames) {
				if (attributes.containsKey(slotName)) {
					final String slotNameValue = attributes.get(slotName);
					structureHandler.setLocalVariable(slotName, context.getVariable(slotNameValue));
				} else {
					structureHandler.setLocalVariable(slotName, null);
				}
			}

			if (!(tag instanceof IStandaloneElementTag)) { //this tag has got a body : we get and stack content
				Deque<IModel> contentStack = (Deque<IModel>) context.getVariable("contentStack");
				if (contentStack == null || contentStack.isEmpty()) {
					contentStack = new LinkedList<>();
				} else {
					//we must clone contentStack to keep the scope of thymleaf variable
					contentStack = new LinkedList<>(contentStack);
				}

				//Manage content
				final IModel contentModel = cleanAndExtractContent(model);
				contentStack.push(contentModel);
				structureHandler.setLocalVariable("contentStack", contentStack);
				//set content as list
				if (parameterNames.contains(CONTENT_TAGS)) {
					structureHandler.setLocalVariable(CONTENT_TAGS, asList(contentModel, context));
				}

				//Manage slots
				//there is slots only if tag isn't IStandaloneElementTag
				final Map<String, IModel> slotContents = slotNames.isEmpty() ? Collections.emptyMap() : removeAndExtractSlots(contentModel, context);

				for (final Map.Entry<String, IModel> entry : slotContents.entrySet()) {
					Assertion.check().isTrue(slotNames.contains(entry.getKey()), "Component {0} have no slot {1} (accepted slots : {2})", componentName, entry.getKey(), slotNames);
					//-----
					structureHandler.setLocalVariable(entry.getKey(), entry.getValue());
				}
			}

			//We replace the whole model
			model.reset();
			model.addModel(clonedFragmentModel);

			processVariables(attributes, context, structureHandler, excludeAttributes);
		} // else nothing

	}

	private static Map<String, IModel> removeAndExtractSlots(final IModel contentModel, final ITemplateContext context) {
		final Map<String, IModel> slotContents = new HashMap<>();
		final IModel buildingModel = contentModel.cloneModel(); //contains each first level tag (and all it's sub-tags)
		buildingModel.reset();
		int tapDepth = 0;
		String slotName = null;
		final int fullContentSize = contentModel.size();
		for (int i = 0; i < fullContentSize; i++) {
			final ITemplateEvent templateEvent = contentModel.get(0); //get always first (because we remove it)
			if (templateEvent instanceof IOpenElementTag) {
				//we only parse slots at first level (tagDepth == 0)
				if (tapDepth == 0 && "vu:slot".equals(((IElementTag) templateEvent).getElementCompleteName())) {
					//support slot of an component into slot of another
					slotName = ((IProcessableElementTag) templateEvent).getAttributeValue("name");
				} else if (tapDepth == 0) {
					break; //slots must be set at first
				}
				tapDepth++;
			} else if (templateEvent instanceof ICloseElementTag) {
				tapDepth--;
			} else if (templateEvent instanceof IStandaloneElementTag) {
				//we only parse slots at first level (tagDepth == 0)
				if (tapDepth == 0 && "vu:slot".equals(((IElementTag) templateEvent).getElementCompleteName())) {
					//we accept empty slot (to clear a component default slot)
					slotName = ((IProcessableElementTag) templateEvent).getAttributeValue("name");
				} else if (tapDepth == 0) {
					break; //slots must be set at first
				}
			} else if (tapDepth == 0) {
				break; //slots must be set at first
			}
			buildingModel.add(templateEvent); //add first
			contentModel.remove(0); //remove first : in fact we move slot's tags from content model to building model

			if (tapDepth == 0 && templateEvent instanceof IElementTag) {
				if ("vu:slot".equals(((IElementTag) templateEvent).getElementCompleteName())) {
					Assertion.check().isNotNull(slotName);
					//Si on est à la base, on ajout que le model qu'on a préparé, on le close et on reset pour la boucle suivante
					final IModel firstLevelTagModel = buildingModel.cloneModel();
					if (isVisible(context, firstLevelTagModel)) {
						removeContainerTag(firstLevelTagModel); //we remove the slot tag itself
						slotContents.put(slotName, firstLevelTagModel);
					}
					buildingModel.reset(); //we prepare next buildingModel
				} else {
					break; //slots must be set at first
				}
			}
		}
		Assertion.check().isTrue(tapDepth == 0, "Can't extract component slots, tags may be missclosed in slot {0}", slotName);
		return slotContents;
	}

	private static IModel cleanAndExtractContent(final IModel model) {
		final IModel cleanerModel = model.cloneModel();
		final int size = cleanerModel.size();
		for (int i = size - 1; i > 0; i--) { //We loop decreasly for remove by index
			if (cleanerModel.get(i) instanceof IText) {
				final IText innerText = (IText) cleanerModel.get(i);
				if (StringUtil.isBlank(innerText.getText())) {
					cleanerModel.remove(i);
				}
			}
		}
		removeContainerTag(cleanerModel);
		return cleanerModel;
	}

	private static void removeContainerTag(final IModel contentModel) {
		//Remove container tag
		contentModel.remove(0);
		if (contentModel.size() >= 1) {
			contentModel.remove(contentModel.size() - 1);
		}
	}

	private static List<NamedComponentContentComponent> asList(final IModel componentModel, final ITemplateContext context) {
		final List<NamedComponentContentComponent> asList = new ArrayList<>();
		final IModel buildingModel = componentModel.cloneModel(); //contains each first level tag (and all it's sub-tags)
		buildingModel.reset();
		int tapDepth = 0;
		for (int i = 0; i < componentModel.size(); i++) {
			final ITemplateEvent templateEvent = componentModel.get(i);
			buildingModel.add(templateEvent);
			if (templateEvent instanceof IOpenElementTag) {
				tapDepth++;
			} else if (templateEvent instanceof ICloseElementTag) {
				tapDepth--;
			}
			if (tapDepth == 0) {
				//Si on est à la base, on ajout que le model qu'on a préparé, on le close et on reset pour la boucle suivante
				final IModel firstLevelTagModel = buildingModel.cloneModel();
				//si on a un tag if, on l'evalue avant d'ajouter le contenu, pour n'avoir que des composants avec un rendu
				if (isVisible(context, firstLevelTagModel)) {
					final NamedComponentContentComponent contentComponent = new NamedComponentContentComponent(firstLevelTagModel);
					asList.add(contentComponent);
				}
				buildingModel.reset();
			}
		}
		return asList;
	}

	private static boolean isVisible(final ITemplateContext context, final IModel firstLevelTagModel) {
		final ITemplateEvent firstLevelTag = firstLevelTagModel.get(0);
		if (firstLevelTag instanceof IProcessableElementTag) {
			final IAttribute ifAttribute = ((IProcessableElementTag) firstLevelTag).getAttribute("th:if");
			if (ifAttribute != null) {
				final IStandardExpressionParser expressionParser = StandardExpressions.getExpressionParser(context.getConfiguration());
				final IStandardExpression expression = expressionParser.parseExpression(context, ifAttribute.getValue());
				final Object value = expression.execute(context);
				return EvaluationUtils.evaluateAsBoolean(value);
			}
		}
		return true;
	}

	private static IProcessableElementTag processElementTag(final ITemplateContext context, final IModel model) {
		final ITemplateEvent firstEvent = model.get(0);
		if (firstEvent instanceof IOpenElementTag) {
			final String elementCompleteName = ((IOpenElementTag) firstEvent).getElementCompleteName();
			final ITemplateEvent lastEvent = model.get(model.size() - 1);
			Assertion.check().isTrue(lastEvent instanceof ICloseElementTag
					&& !((ICloseElementTag) lastEvent).isSynthetic()
					&& elementCompleteName.equals(((ICloseElementTag) lastEvent).getElementCompleteName()),
					"Can't find endTag of {0} in {1} line {2} col {3}", elementCompleteName, firstEvent.getTemplateName(), firstEvent.getLine(), firstEvent.getCol());
		}
		for (final IProcessableElementTag tag : context.getElementStack()) {
			if (locationMatches(firstEvent, tag)) {
				return tag;
			}
		}
		return null;
	}

	private static boolean locationMatches(final ITemplateEvent a, final ITemplateEvent b) {
		return Objects.equals(a.getTemplateName(), b.getTemplateName())
				&& Objects.equals(a.getLine(), b.getLine())
				&& Objects.equals(a.getCol(), b.getCol());
	}

	private void processVariables(final Map<String, String> attributes,
			final ITemplateContext context,
			final IElementModelStructureHandler structureHandler,
			final Set<String> excludeAttr) {

		final Map<String, Map<String, Object>> placeholders = new HashMap<>();

		//set attributs and read placeholders
		for (final Map.Entry<String, String> entry : attributes.entrySet()) {
			if (excludeAttr.contains(entry.getKey()) || isDynamicAttribute(entry.getKey(), getDialectPrefix())) {
				continue;
			}
			processWith(context, entry.getKey(), entry.getValue(), structureHandler, placeholders);
		}

		//we set placeholders as localvariables (inner components shouldn't affect these in case of name conflict)
		setLocalPlaceholderVariables(context, structureHandler, placeholders);
	}

	private static Object encodeAttributeValue(final Object attributeValue, final boolean isPlaceholder) {
		if (attributeValue == null) {
			return "${true}";
		} else if ("".equals(((String) attributeValue).trim())) {
			return "''";
		} else if (attributeValue instanceof String
				&& !"true".equalsIgnoreCase((String) attributeValue) //not boolean
				&& !"false".equalsIgnoreCase((String) attributeValue)
				&& !NUMBER_PATTERN.matcher((String) attributeValue).matches() //not number
				&& (isPlaceholder //is a placeholder => escape for thymeleaf
						|| NO_RESERVED_TEXT_PATTERN.matcher((String) attributeValue).matches()) //no reserved char
				&& NO_RESERVED_FIRST_CHAR_PATTERN.matcher((String) attributeValue).matches()) { //don't start with reserved char
			//We escape :
			//IF placeholder or no thymeleaf's reserved char ($ @ # | )  (but authorized || and &#xx; )
			//AND dont start with reserved char (for case like ${value} )
			//BUT IF true, false or number (it become string instead)
			return "'" + ((String) attributeValue).replace("'", "\\'") + "'"; //escape as text
		}
		return attributeValue;
	}

	private static String encodeAttributeName(final String attributeName, final Object attributeValue) {
		if (!attributeName.startsWith(":") && !attributeName.startsWith("'")
				&& (attributeValue == null
						|| attributeValue instanceof String
								&& "true".equalsIgnoreCase((String) attributeValue) //boolean
								&& "false".equalsIgnoreCase((String) attributeValue))) {
			return "':" + attributeName + "'";
		} else if (!attributeName.startsWith("'") //if not only char and don't already start by ' add them
				&& !SIMPLE_TEXT_PATTERN.matcher(attributeName).matches()) {
			return "'" + attributeName + "'";
		}
		return attributeName;
	}

	private void setLocalPlaceholderVariables(final ITemplateContext context, final IElementModelStructureHandler structureHandler, final Map<String, Map<String, Object>> placeholders) {
		for (final String placeholderPrefix : placeholderPrefixes) {
			final String placeholder = placeholderPrefix + ATTRS_SUFFIX;
			final String affectationString;
			String preAffectationString = "";
			if (context.containsVariable(placeholder)) {
				preAffectationString = context.getVariable(placeholder) + ", ";
			}

			final Map<String, Object> placeholderValues = placeholders.get(placeholder);
			if (placeholderValues != null) {
				affectationString = placeholderValues
						.entrySet().stream()
						.map((entry1) -> {
							if (entry1.getKey().isEmpty()) {
								return (String) entry1.getValue();
							}
							return entry1.getKey() + "=" + entry1.getValue();
						})
						.collect(Collectors.joining(", "));
			} else {
				affectationString = "noOp=_";
			}
			structureHandler.setLocalVariable(placeholder, preAffectationString + affectationString);
		}
	}

	private Map<String, String> processAttribute(final IModel model, final ITemplateContext context, final IElementModelStructureHandler structureHandler) {
		final ITemplateEvent firstEvent = model.get(0);
		final Map<String, String> attributes = new HashMap<>();

		if (firstEvent instanceof IProcessableElementTag) {
			final IProcessableElementTag processableElementTag = (IProcessableElementTag) firstEvent;
			for (final IAttribute attribute : processableElementTag.getAllAttributes()) {
				final String completeName = attribute.getAttributeCompleteName();
				if (!isDynamicAttribute(completeName, StandardDialect.PREFIX)) {
					if (isPlaceholder(completeName)) {
						final String attrsValue = executeAttrsExpression(context, attribute.getValue());
						final AssignationSequence assignations = AssignationUtils.parseAssignationSequence(context, attrsValue, false /* no parameters without value */);
						if (assignations == null) {
							throw new TemplateProcessingException("Could not parse value as attribute assignations: \"" + attribute.getValue() + "\"");
						}
						for (final Assignation assignation : assignations.getAssignations()) {
							final IStandardExpression leftExpr = assignation.getLeft();
							final Object leftValue = leftExpr.execute(context);

							final String newVariableName = leftValue == null ? null : leftValue.toString();
							if ("noOp".equals(newVariableName)) {
								continue;
							}
							if (StringUtils.isEmptyOrWhitespace(newVariableName)) {
								throw new TemplateProcessingException("Variable name expression evaluated as null or empty: \"" + leftExpr + "\"");
							}
							final IStandardExpression rightExpr = assignation.getRight();
							//must execute rightExpr too : if not must use th: in component, else expression will be parsed/encoded two times
							attributes.put(newVariableName, String.valueOf(rightExpr.execute(context)));
						}
					} else {
						attributes.put(completeName, attribute.getValue());
					}
				}
			}
		}
		//We keep attributs put on <vu:content> tag (except contentId attribute)
		final Map<String, String> contentAttrs = (Map<String, String>) context.getVariable(ContentComponentProcessor.CONTENT_ATTRS_NAME);
		if (contentAttrs != null && !contentAttrs.isEmpty()) {
			structureHandler.removeLocalVariable(ContentComponentProcessor.CONTENT_ATTRS_NAME);
			for (final Entry<String, String> attribute : contentAttrs.entrySet()) {
				if (ContentComponentProcessor.CONTENT_ID_ATTR_NAME.equals(attribute.getKey())) {
					//don't copy contentId on inner tags
				} else if (shouldConcat(attribute.getKey())) {
					attributes.compute(attribute.getKey(), (k, v) -> (v == null ? "" : v + " ") + attribute.getValue());
				} else {
					attributes.put(attribute.getKey(), attribute.getValue());
				}
			}
		}
		return attributes;
	}

	private String executeAttrsExpression(final ITemplateContext context, final String attrValue) {
		//final IStandardExpressionParser expressionParser = StandardExpressions.getExpressionParser(context.getConfiguration());
		//final IStandardExpression standardExpression = expressionParser.parseExpression(context, attrValue.trim());
		//return String.valueOf(standardExpression.execute(context));
		if (attrValue.contains("__")) {
			return attrValue;
		}
		final AssignationSequence assignations = AssignationUtils.parseAssignationSequence(context, "attrs=" + attrValue, false /* no parameters without value */);
		if (assignations == null) {
			throw new TemplateProcessingException("Could not parse value as attribute assignations: \"" + attrValue + "\"");
		}
		if (assignations.getAssignations().isEmpty()) {
			throw new TemplateProcessingException("Could not parse value as attribute assignations: \"" + attrValue + "\" (found 0 assignation)");
		}
		if (assignations.getAssignations().size() > 1) {
			throw new TemplateProcessingException("Could not parse value as attribute assignations: \"" + attrValue + "\" (found more than 1 assignation)");
		}
		final Assignation assignation = assignations.getAssignations().get(0);
		final IStandardExpression rightExpr = assignation.getRight();
		return String.valueOf(rightExpr.execute(context));
	}

	private static boolean shouldConcat(final String key) {
		return "class".equals(key); //TODO : found the great rule
	}

	private void addPlaceholderVariable(final Map<String, Map<String, Object>> placeholders, final String prefixedVariableName, final Object value) {
		for (final String placeholderPrefix : placeholderPrefixes) {
			if (prefixedVariableName.startsWith(placeholderPrefix)) {
				final String attributeName = prefixedVariableName.substring(placeholderPrefix.length());
				addPlaceholderVariable(placeholders, placeholderPrefix, attributeName, value);
			}
		}
	}

	private static void addPlaceholderVariable(final Map<String, Map<String, Object>> placeholders, final String placeholderPrefix, final String attributeName, final Object value) {
		Map<String, Object> previousPlaceholderValues = placeholders.get(placeholderPrefix + ATTRS_SUFFIX);
		if (previousPlaceholderValues == null) {
			previousPlaceholderValues = new HashMap<>();
			placeholders.put(placeholderPrefix + ATTRS_SUFFIX, previousPlaceholderValues);
		}
		previousPlaceholderValues.put(encodeAttributeName(attributeName, value), encodeAttributeValue(value, true));
	}

	private boolean isPlaceholderable(final String prefixedVariableName) {
		for (final String placeholderPrefix : placeholderPrefixes) {
			if (prefixedVariableName.startsWith(placeholderPrefix)) {
				return true;
			}
		}
		return false;
	}

	private boolean isPlaceholder(final String prefixedVariableName) {
		for (final String placeholderPrefix : placeholderPrefixes) {
			if (prefixedVariableName.equals(placeholderPrefix + ATTRS_SUFFIX)) {
				return true;
			}
		}
		return false;
	}

	private static boolean isDynamicAttribute(final String attribute, final String prefix) {
		return attribute.startsWith(prefix + ":") || attribute.startsWith("data-" + prefix + "-");
	}

	private void processWith(
			final ITemplateContext context,
			final String attributeKey,
			final Object attributeValue,
			final IElementModelStructureHandler structureHandler,
			final Map<String, Map<String, Object>> placeholders) {
		Assertion.check().isNotBlank(attributeKey, "Variable name can't be null or empty");
		//-----

		if (!isPlaceholder(attributeKey) && isPlaceholderable(attributeKey)) {
			//We prepared prefixed placeholders variables.
			addPlaceholderVariable(placeholders, attributeKey, attributeValue);
		} else if (!parameterNames.contains(attributeKey)) {
			Assertion.check().isTrue(
					unnamedPlaceholderPrefix.isPresent(),
					"Component '{0}' can't accept this parameter : '{1}' (accepted params : {2})", componentName, attributeKey, parameterNames);
			//We prepared unnamed placeholder variable
			Object unescapedattributeValue = attributeValue;
			if (attributeValue instanceof String) {
				//We need to unescape placeholder : it will be escaped again when used in component (th:attr="__${other_attrs}__" => escape value)
				unescapedattributeValue = EscapedAttributeUtils.unescapeAttribute(context.getTemplateMode(), (String) attributeValue);
			}
			addPlaceholderVariable(placeholders, unnamedPlaceholderPrefix.get(), attributeKey, unescapedattributeValue);
		} else {
			//See StandardWithTagProcessor

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

			final Object encodedAttributeValue = encodeAttributeValue(attributeValue, false);
			final AssignationSequence assignations = AssignationUtils.parseAssignationSequence(context, attributeKey + "=" + encodedAttributeValue, false /* no parameters without value */);
			if (assignations == null) {
				throw new TemplateProcessingException("Could not parse value as attribute assignations: \"" + attributeKey + "=" + encodedAttributeValue + "\"");
			}
			for (final Assignation assignation : assignations.getAssignations()) {

				final IStandardExpression leftExpr = assignation.getLeft();
				final Object leftValue = leftExpr.execute(context);

				final String newVariableName = leftValue == null ? null : leftValue.toString();
				if (StringUtils.isEmptyOrWhitespace(newVariableName)) {
					throw new TemplateProcessingException("Variable name expression evaluated as null or empty: \"" + leftExpr + "\"");
				}

				final IStandardExpression rightExpr = assignation.getRight();
				final Object rightValue = rightExpr.execute(context);
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

	private final static class UnmodifiableDeque<E> extends ArrayDeque<E> {
		private static final long serialVersionUID = 1415497376066075497L;

		/** {@inheritDoc} */
		@Override
		public boolean isEmpty() {
			return true;
		}

		/** {@inheritDoc} */
		@Override
		public int size() {
			return 0;
		}

		/** {@inheritDoc} */
		@Override
		public void addFirst(final E e) {
			//inactive all other push and add
			throw new UnsupportedOperationException("unmodifiable Deque");
		}

		/** {@inheritDoc} */
		@Override
		public void addLast(final E e) {
			//inactive all other push and add
			throw new UnsupportedOperationException("unmodifiable Deque");
		}
	}
}
