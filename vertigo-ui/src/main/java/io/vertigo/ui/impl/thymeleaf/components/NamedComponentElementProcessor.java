/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
import org.thymeleaf.model.IComment;
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
	/** For reserved chars @see https://www.thymeleaf.org/doc/articles/standarddialect5minutes.html */
	private static final String NO_RESERVED_FIRST_CHAR_PATTERN_STR = "^(([^$@~#*]\\{)|.(?!\\{)).*$"; //use to detect if we should escape in placeholder : must encode js string, like 'mylabel' ; an expression starts with ${ #{ @{ *{ ~{ (no javascript starts so) ; |...| : see isLiteralSubstitution
	private static final String NO_RESERVED_TEXT_PATTERN_STR = "^(?!')(?!.*[$#@]\\{).*$"; //an expression : ${ #{ @{ anywhere (as in listName + ${id}), ' at start ; |...| : see isLiteralSubstitution ; *{ ~{ at start only (see NO_RESERVED_FIRST_CHAR_PATTERN) ; a $ # @ starting no expression is text (#anchor, mail@domain)
	private static final String SIMPLE_TEXT_PATTERN_STR = "^[a-zA-Z]*$";
	private static final Pattern NO_RESERVED_FIRST_CHAR_PATTERN = Pattern.compile(NO_RESERVED_FIRST_CHAR_PATTERN_STR, Pattern.DOTALL);
	private static final Pattern NO_RESERVED_TEXT_PATTERN = Pattern.compile(NO_RESERVED_TEXT_PATTERN_STR, Pattern.DOTALL);
	private static final Pattern SIMPLE_TEXT_PATTERN = Pattern.compile(SIMPLE_TEXT_PATTERN_STR);
	/** A number Thymeleaf writes back as it is (no leading 0, no -0) : the other ones (0102030405, .5) are texts */
	private static final Pattern CANONICAL_NUMBER_PATTERN = Pattern.compile("^(?!-0(\\.0*)?$)-?(0|[1-9][0-9]*)(\\.[0-9]+)?$");
	/** A _ followed by a _ : see encodeComputedValue */
	private static final Pattern UNDERSCORE_BEFORE_UNDERSCORE_PATTERN = Pattern.compile("_(?=_)");
	private static final Pattern SINGLE_EXPRESSION_PATTERN = Pattern.compile("^\\s*[$#@*~]\\{(?:[^{}]++|\\{[^{}]*+\\})*+\\}\\s*$"); //one level of nested braces, as @{/x/{id}(id=${id})}
	/** A th: value which is a text literal holding an expression ('@{/x}') : gives the text, not its value. */
	private static final Pattern TEXT_LITERAL_HOLDING_EXPRESSION_PATTERN = Pattern.compile("^\\s*'[^']*[$#@*~]\\{[^}']*\\}[^']*'\\s*$", Pattern.DOTALL);

	private static final String VARIABLE_PLACEHOLDER_SEPARATOR = "_";
	private static final String SLOTS_SUFFIX = "slot";
	private static final String ATTRS_SUFFIX = "attrs";
	private static final String CONTENT_TAGS = "contentTags";

	private static final int PRECEDENCE = 1500; //same as Fragment

	private final Set<String> excludeAttributes = singleton(COMPONENT_PARAMS);
	private final String componentName;
	private final Optional<VariableExpression> selectionExpressionOpt;
	private final Set<String> parameterNames;
	private final Set<String> slotNames;
	private final List<String> placeholderPrefixes;
	private final Optional<String> unnamedPlaceholderPrefix;
	private final String frag;
	private final boolean devMode;

	private final Deque<IModel> emptyStack = new UnmodifiableDeque<>();

	/**
	 * Constructor
	 *
	 * @param dialectPrefix Dialect prefix (tc)
	 * @param tagName Tag name to search for (e.g. panel)
	 * @param componentName Fragment to search for
	 */
	public NamedComponentElementProcessor(final String dialectPrefix, final NamedComponentDefinition thymeleafComponent) {
		this(dialectPrefix, thymeleafComponent, false);
	}

	/**
	 * Constructor
	 *
	 * @param dialectPrefix Dialect prefix (tc)
	 * @param thymeleafComponent Component definition
	 * @param devMode Dev mode : checks the way the attributes are written (at each rendering)
	 */
	public NamedComponentElementProcessor(final String dialectPrefix, final NamedComponentDefinition thymeleafComponent, final boolean devMode) {
		super(TemplateMode.HTML, dialectPrefix, thymeleafComponent.getName(), true, null, false, PRECEDENCE);
		this.devMode = devMode;
		componentName = thymeleafComponent.getFragmentTemplate();
		frag = thymeleafComponent.getFrag();

		selectionExpressionOpt = thymeleafComponent.getSelectionExpression();
		parameterNames = new HashSet<>(thymeleafComponent.getParameters());
		acceptCamelCaseNameForKebabParameters();

		slotNames = parameterNames.stream()
				.filter(key -> key.endsWith(VARIABLE_PLACEHOLDER_SEPARATOR + SLOTS_SUFFIX))
				.collect(Collectors.toSet());

		placeholderPrefixes = thymeleafComponent.getParameters().stream() //we read from thymeleafComponent.getParameters() to keep order of placeholders
				.filter(parameterName -> parameterName.endsWith(VARIABLE_PLACEHOLDER_SEPARATOR + ATTRS_SUFFIX))
				.map(parameterName -> parameterName.substring(0, parameterName.length() - ATTRS_SUFFIX.length()))
				.toList();
		unnamedPlaceholderPrefix = placeholderPrefixes.isEmpty() ? Optional.empty() : Optional.of(placeholderPrefixes.get(placeholderPrefixes.size() - 1));
	}

	private void acceptCamelCaseNameForKebabParameters() {
		final Set<String> camelCaseParameterNames = new HashSet<>();
		for (final String parameterName : parameterNames) {
			if (parameterName.startsWith("v-")) {
				final String camelName = kebabToCamelCase(parameterName);
				camelCaseParameterNames.add(camelName);
				camelCaseParameterNames.add(":" + parameterName.substring("v-".length()));
			} else if (parameterName.contains("-")) {
				camelCaseParameterNames.add(kebabToCamelCase(parameterName));
			}
		}
		parameterNames.addAll(camelCaseParameterNames);
	}

	@Override
	protected void doProcess(final ITemplateContext context, final IModel model, final IElementModelStructureHandler structureHandler) {
		if (selectionExpressionOpt.isEmpty() //no selector
				|| (boolean) selectionExpressionOpt.get().execute(context)) { //or selector valid

			final IProcessableElementTag tag = processElementTag(context, model);
			//the values computed at rendering (th: attributes, forwarded *_attrs, vu:content attributes) are passed as they are
			final Set<String> computedAttributes = new HashSet<>();
			final Map<String, String> attributes = processAttribute(model, tag, computedAttributes, context, structureHandler);

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

			processVariables(attributes, computedAttributes, context, structureHandler, excludeAttributes);
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
		if (firstLevelTag instanceof IComment) {
			return false;
		} else if (firstLevelTag instanceof IProcessableElementTag) {
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
		return sourceTag(context, firstEvent);
	}

	/**
	 * The element stack keeps the tag as written in the template, before the th: processors ran on it : the lowest of the
	 * tags of this location on top of the stack (a component in itself stacks several tags of the same location).
	 */
	private static IProcessableElementTag sourceTag(final ITemplateContext context, final ITemplateEvent event) {
		final List<IProcessableElementTag> elementStack = context.getElementStack();
		IProcessableElementTag sourceTag = null;
		for (int i = elementStack.size() - 1; i >= 0 && locationMatches(event, elementStack.get(i)); i--) {
			sourceTag = elementStack.get(i);
		}
		return sourceTag;
	}

	/**
	 * @return the names of the attributes set at rendering by a processor (a th: attribute), not written in the template :
	 * not the same attribute instance as the tag written in the template
	 */
	static Set<String> computedAttributeNames(final ITemplateContext context, final IProcessableElementTag tag) {
		final IProcessableElementTag sourceTag = sourceTag(context, tag);
		checkSourceTag(sourceTag, tag);
		//-----
		final Set<String> computedAttributeNames = new HashSet<>();
		for (final IAttribute attribute : tag.getAllAttributes()) {
			if (isComputed(sourceTag, attribute)) {
				computedAttributeNames.add(attribute.getAttributeCompleteName());
			}
		}
		return computedAttributeNames;
	}

	private static void checkSourceTag(final IProcessableElementTag sourceTag, final IProcessableElementTag tag) {
		Assertion.check().isNotNull(sourceTag, "Can't find the tag {0} as written in {1} line {2} col {3}", tag.getElementCompleteName(), tag.getTemplateName(),
				String.valueOf(tag.getLine()), String.valueOf(tag.getCol()));
	}

	/** @return if the attribute was set at rendering by a processor (a th: attribute) : not the instance written in the template */
	private static boolean isComputed(final IProcessableElementTag sourceTag, final IAttribute attribute) {
		return sourceTag.getAttribute(attribute.getAttributeCompleteName()) != attribute;
	}

	private static boolean locationMatches(final ITemplateEvent a, final ITemplateEvent b) {
		return Objects.equals(a.getTemplateName(), b.getTemplateName())
				&& Objects.equals(a.getLine(), b.getLine())
				&& Objects.equals(a.getCol(), b.getCol());
	}

	private void processVariables(final Map<String, String> attributes,
			final Set<String> computedAttributes,
			final ITemplateContext context,
			final IElementModelStructureHandler structureHandler,
			final Set<String> excludeAttr) {

		final Map<String, Map<String, Object>> placeholders = new HashMap<>();

		//set attributs and read placeholders
		for (final Map.Entry<String, String> entry : attributes.entrySet()) {
			if (excludeAttr.contains(entry.getKey()) || isDynamicAttribute(entry.getKey(), getDialectPrefix())) {
				continue;
			}
			processWith(context, entry.getKey(), entry.getValue(), computedAttributes.contains(entry.getKey()), structureHandler, placeholders);
		}

		//we set placeholders as localvariables (inner components shouldn't affect these in case of name conflict)
		setLocalPlaceholderVariables(context, structureHandler, placeholders);
	}

	static Object encodeAttributeValue(final Object attributeValue, final boolean isPlaceholder) {
		if (attributeValue == null) {
			return "${true}";
		} else if ("".equals(((String) attributeValue).trim())) {
			return "''";
		} else if (attributeValue instanceof String
				&& !"true".equalsIgnoreCase((String) attributeValue) //not boolean
				&& !"false".equalsIgnoreCase((String) attributeValue)
				&& !CANONICAL_NUMBER_PATTERN.matcher((String) attributeValue).matches() //not number
				&& !isLiteralSubstitution((String) attributeValue)
				&& (isPlaceholder //is a placeholder => escape for thymeleaf
						|| NO_RESERVED_TEXT_PATTERN.matcher((String) attributeValue).matches()) //no reserved char
				&& NO_RESERVED_FIRST_CHAR_PATTERN.matcher((String) attributeValue).matches()) { //don't start with reserved char
			//We escape :
			//IF placeholder or no thymeleaf expression (${ #{ @{ anywhere, ' at start, |...|)
			//AND dont start with reserved char (for case like ${value} )
			//BUT IF true, false or number (it become string instead)
			return "'" + escapeFinalBackslash(((String) attributeValue).replace("'", "\\'")) + "'"; //escape as text
		}
		return attributeValue;
	}

	/** @return if the value starts with a literal substitution |...| : a | then another one (a single | is a text, as a separator) */
	private static boolean isLiteralSubstitution(final String value) {
		return value.charAt(0) == '|' && value.indexOf('|', 1) > 0;
	}

	private static String escapeFinalBackslash(final String text) {
		int finalBackslashes = 0;
		while (finalBackslashes < text.length() && text.charAt(text.length() - 1 - finalBackslashes) == '\\') {
			finalBackslashes++;
		}
		//an odd final \ would escape the closing quote : it is doubled, as Thymeleaf reads \\ as \
		return finalBackslashes % 2 == 1 ? text + '\\' : text;
	}

	/**
	 * A value computed at rendering, as a text literal holding it. true, false and numbers keep their type.
	 * A __ is written as a concatenation, as the Thymeleaf preprocessing reads the __ of a whole attribute value.
	 */
	static String encodeComputedValue(final String computedValue) {
		if (isBooleanOrNumber(computedValue)) {
			return computedValue;
		}
		return "'" + UNDERSCORE_BEFORE_UNDERSCORE_PATTERN.matcher(computedValue.replace("\\", "\\\\").replace("'", "\\'")).replaceAll("_' + '") + "'";
	}

	/** true or false (any case), or a number written in its usual form (01000 stays a text), as for a written value. */
	private static boolean isBooleanOrNumber(final String value) {
		return "true".equalsIgnoreCase(value) || "false".equalsIgnoreCase(value) || CANONICAL_NUMBER_PATTERN.matcher(value).matches();
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
						.map(entry1 -> {
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

			/**
			 * It works, may be used to check placeholder params to avoid override : but may prefer use of declared component's params.
			 * structureHandler.setLocalVariable(placeholder + "Map", placeholderValues);
			 */
		}
	}

	private Map<String, String> processAttribute(final IModel model, final IProcessableElementTag sourceTag, final Set<String> computedAttributes,
			final ITemplateContext context, final IElementModelStructureHandler structureHandler) {
		final ITemplateEvent firstEvent = model.get(0);
		final Map<String, String> attributes = new HashMap<>();

		if (firstEvent instanceof final IProcessableElementTag processableElementTag) {
			checkSourceTag(sourceTag, processableElementTag);
			for (final IAttribute attribute : processableElementTag.getAllAttributes()) {
				final String completeName = attribute.getAttributeCompleteName();
				if (isComputed(sourceTag, attribute)) {
					//set by a th: attribute : the value computed by Thymeleaf (escaped for html)
					if (devMode) {
						checkThAttributeValue(sourceTag, completeName);
					}
					computedAttributes.add(putAttributeSupportKebabCase(completeName,
							EscapedAttributeUtils.unescapeAttribute(context.getTemplateMode(), attribute.getValue()), attributes));
				} else if (!isDynamicAttribute(completeName, StandardDialect.PREFIX)) {
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
							//the executed value is data (as computed) ; a null (x=${null} removes the attribute) is forwarded as such
							final Object rightValue = rightExpr.execute(context);
							if (rightValue == null) {
								putAttributeSupportKebabCase(newVariableName, "${null}", attributes);
							} else {
								computedAttributes.add(putAttributeSupportKebabCase(newVariableName, String.valueOf(rightValue), attributes));
							}
						}
					} else {
						putAttributeSupportKebabCase(completeName, attribute.getValue(), attributes);
					}
				}
			}
		}
		//We keep attributs put on <vu:content> tag (except contentId attribute)
		final Map<String, String> contentAttrs = (Map<String, String>) context.getVariable(ContentComponentProcessor.CONTENT_ATTRS_NAME);
		if (contentAttrs != null && !contentAttrs.isEmpty()) {
			final Set<String> contentComputedAttrs = (Set<String>) context.getVariable(ContentComponentProcessor.CONTENT_COMPUTED_ATTRS_NAME);
			structureHandler.removeLocalVariable(ContentComponentProcessor.CONTENT_ATTRS_NAME);
			structureHandler.removeLocalVariable(ContentComponentProcessor.CONTENT_COMPUTED_ATTRS_NAME);
			for (final Entry<String, String> attribute : contentAttrs.entrySet()) {
				final boolean computed = contentComputedAttrs != null && contentComputedAttrs.contains(attribute.getKey());
				final String value = computed ? EscapedAttributeUtils.unescapeAttribute(context.getTemplateMode(), attribute.getValue()) : attribute.getValue();
				if (ContentComponentProcessor.CONTENT_ID_ATTR_NAME.equals(attribute.getKey())) {
					//don't copy contentId on inner tags
				} else if (shouldConcat(attribute.getKey())) { //concat some attribute (like class) //no kebab-case here
					attributes.compute(attribute.getKey(), (k, v) -> (v == null ? "" : v + " ") + value);
					if (computed) {
						computedAttributes.add(attribute.getKey());
					}
				} else {
					final String key = putAttributeSupportKebabCase(attribute.getKey(), value, attributes);
					if (computed) {
						computedAttributes.add(key);
					}
				}
			}
		}
		return attributes;
	}

	/**
	 * Dev mode : th:url="'@{/x}'" gives the text @{/x}, not a link (a text literal holding an expression) : fails with the
	 * way to write it, url="@{/x}".
	 */
	private static void checkThAttributeValue(final IProcessableElementTag sourceTag, final String attributeName) {
		for (final String thName : List.of(StandardDialect.PREFIX + ":" + attributeName, "data-" + StandardDialect.PREFIX + "-" + attributeName)) {
			final String writtenValue = sourceTag.getAttributeValue(thName);
			if (writtenValue != null && TEXT_LITERAL_HOLDING_EXPRESSION_PATTERN.matcher(writtenValue).matches()) {
				final String text = writtenValue.trim().substring(1, writtenValue.trim().length() - 1).trim();
				if (text.length() > 1 && text.charAt(0) == '`' && text.charAt(text.length() - 1) == '`') {
					continue; //a javascript template literal : a text for Thymeleaf, its ${...} are for javascript
				}
				//a single expression is written as it is, a text mixed with expressions as a literal substitution (unless it holds a |)
				final String advice;
				if (SINGLE_EXPRESSION_PATTERN.matcher(text).matches()) {
					advice = StringUtil.format("{0}=\"{1}\" (without th: nor quotes)", attributeName, text);
				} else if (text.indexOf('|') < 0) {
					advice = StringUtil.format("{0}=\"|{1}|\" (without th: nor quotes)", attributeName, text);
				} else {
					advice = attributeName + " without th:, as an expression giving this text,";
				}
				throw new TemplateProcessingException(StringUtil.format("<{0} {1}=\"{2}\"> gives the text {3}, not its value : write {4} in {5} line {6}",
						sourceTag.getElementCompleteName(), thName, writtenValue, text, advice,
						sourceTag.getTemplateName(), String.valueOf(sourceTag.getLine())));
			}
		}
	}

	/** @return the key of the attribute */
	private String putAttributeSupportKebabCase(final String variableName, final String variableValue, final Map<String, String> attributes) {
		final String key;
		if (variableName.contains("-") && parameterNames.contains(variableName)) {
			key = kebabToCamelCase(variableName);
		} else if (variableName.charAt(0) == ':' && parameterNames.contains(variableName)) {
			key = kebabToCamelCase("v-" + variableName.substring(1));
		} else {
			key = variableName;
		}
		attributes.put(key, variableValue);
		return key;
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

	private void addPlaceholderVariable(final Map<String, Map<String, Object>> placeholders, final String prefixedVariableName, final Object value, final boolean computed) {
		for (final String placeholderPrefix : placeholderPrefixes) {
			if (prefixedVariableName.startsWith(placeholderPrefix)) {
				final String attributeName = prefixedVariableName.substring(placeholderPrefix.length());
				addPlaceholderVariable(placeholders, placeholderPrefix, attributeName, value, computed);
			}
		}
	}

	private static void addPlaceholderVariable(final Map<String, Map<String, Object>> placeholders, final String placeholderPrefix, final String attributeName, final Object value,
			final boolean computed) {
		Map<String, Object> previousPlaceholderValues = placeholders.get(placeholderPrefix + ATTRS_SUFFIX);
		if (previousPlaceholderValues == null) {
			previousPlaceholderValues = new HashMap<>();
			placeholders.put(placeholderPrefix + ATTRS_SUFFIX, previousPlaceholderValues);
		}
		//a computed value is data ; the value of a th: attribute (as label_th:title) is evaluated by that th: attribute only
		final boolean asData = value instanceof String && (computed || isDynamicAttribute(attributeName, StandardDialect.PREFIX));
		final String placeholderAttributeName = encodePlaceholderAttributeName(attributeName, value);
		previousPlaceholderValues.put(placeholderAttributeName, asData ? encodeComputedValue((String) value) : encodeAttributeValue(value, true));
		//an attribute written with : (evaluated by VueJS) replaces the static attribute of the same name put by the component, as VueJS keeps the first one (not class nor style, merged by VueJS)
		if (placeholderAttributeName.startsWith("':")) {
			final String boundName = placeholderAttributeName.substring(2, placeholderAttributeName.length() - 1);
			if (!"class".equals(boundName) && !"style".equals(boundName)) {
				previousPlaceholderValues.putIfAbsent(encodePlaceholderAttributeName(boundName, ""), "${null}");
			}
		}
	}

	private static String encodePlaceholderAttributeName(final String attributeName, final Object attributeValue) {
		//no value, true or false : written with : to be evaluated by VueJS (:x="false"), as VueJS reads the text "false" as true ; not for an attribute already written with :, an event, a slot or a th: attribute
		if (!attributeName.startsWith(":") && !attributeName.startsWith("v-") && !attributeName.startsWith("'")
				&& !attributeName.startsWith("@") && !attributeName.startsWith("#") && !isDynamicAttribute(attributeName, StandardDialect.PREFIX)
				&& (attributeValue == null
						|| attributeValue instanceof String
								&& ("true".equalsIgnoreCase((String) attributeValue) //boolean
										|| "false".equalsIgnoreCase((String) attributeValue)))) {
			return "':" + attributeName + "'";
		} else if (!attributeName.startsWith("'") //if not only char and don't already start by ' add them
				&& !SIMPLE_TEXT_PATTERN.matcher(attributeName).matches()) {
			return "'" + attributeName + "'";
		}
		return attributeName;
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
			final boolean computed,
			final IElementModelStructureHandler structureHandler,
			final Map<String, Map<String, Object>> placeholders) {
		Assertion.check().isNotBlank(attributeKey, "Variable name can't be null or empty");
		//-----

		if (!isPlaceholder(attributeKey) && isPlaceholderable(attributeKey)) {
			//We prepared prefixed placeholders variables.
			Object unescapedattributeValue = attributeValue;
			if (attributeValue instanceof String && !computed) { //a computed value is already unescaped
				//We need to unescape placeholder : it will be escaped again when used in component (th:attr="__${other_attrs}__" => escape value)
				unescapedattributeValue = EscapedAttributeUtils.unescapeAttribute(context.getTemplateMode(), (String) attributeValue);
			}
			addPlaceholderVariable(placeholders, attributeKey, unescapedattributeValue, computed);
		} else if (!parameterNames.contains(attributeKey)) {
			Assertion.check().isTrue(
					unnamedPlaceholderPrefix.isPresent(),
					"Component '{0}' can't accept this parameter : '{1}' (accepted params : {2})", componentName, attributeKey, parameterNames);
			//We prepared unnamed placeholder variable
			Object unescapedattributeValue = attributeValue;
			if (attributeValue instanceof String && !computed) { //a computed value is already unescaped
				//We need to unescape placeholder : it will be escaped again when used in component (th:attr="__${other_attrs}__" => escape value)
				unescapedattributeValue = EscapedAttributeUtils.unescapeAttribute(context.getTemplateMode(), (String) attributeValue);
			}
			addPlaceholderVariable(placeholders, unnamedPlaceholderPrefix.get(), attributeKey, unescapedattributeValue, computed);
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
			if (computed && !isBooleanOrNumber((String) attributeValue)) {
				//a computed value is set as it is
				if (engineContext != null) {
					engineContext.setVariable(attributeKey, attributeValue);
				} else {
					structureHandler.setLocalVariable(attributeKey, attributeValue);
				}
				return;
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

	/**
	 * xxx-Yyy-zzzAaa -> xxxYyyZzzAaa
	 *
	 * @param str la chaine de caratéres sur laquelle s'appliquent les transformation
	 * @return Renvoie une chaine de caractére correspondant à la chaine entrante sans - avec le caractère suivant un - en majuscule
	 */
	private static String kebabToCamelCase(final String str) {
		Assertion.check()
				.isNotNull(str)
				.isTrue(str.length() > 0, "Chaine à modifier invalide (ne doit pas être vide)")
				.isFalse(str.contains("--"), "Chaine à modifier invalide : {0} (-- interdit)", str);
		//-----
		final StringBuilder result = new StringBuilder();
		boolean upper = false;
		final int length = str.length();
		char c;
		for (int i = 0; i < length; i++) {
			c = str.charAt(i);
			if (c == '-') {
				upper = true;
			} else if (upper) {
				result.append(Character.toUpperCase(c));
				upper = false;
			} else {
				result.append(c); //on ne force pas lowerCase ici
			}
		}
		return result.toString();
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
