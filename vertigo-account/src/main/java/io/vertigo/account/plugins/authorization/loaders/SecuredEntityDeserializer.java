/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.account.plugins.authorization.loaders;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import io.vertigo.account.authorization.definitions.Authorization;
import io.vertigo.account.authorization.definitions.SecuredEntity;
import io.vertigo.account.authorization.definitions.SecurityDimension;
import io.vertigo.account.authorization.definitions.SecurityDimensionType;
import io.vertigo.account.authorization.definitions.rulemodel.RuleMultiExpression;
import io.vertigo.account.impl.authorization.dsl.rules.DslParserUtil;
import io.vertigo.commons.peg.PegNoMatchFoundException;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.util.DataModelUtil;

/**
 * Deserializer json
 *
 * @author npiedeloup
 */
public final class SecuredEntityDeserializer implements JsonDeserializer<SecuredEntity> {

	private static final Set<String> SECURED_ENTITY_SUPPORTED_ATTRIBUTES = Set.of("entity", "securityFields", "securityDimensions", "operations", "__comment");
	private static final Set<String> OPERATIONS_SUPPORTED_ATTRIBUTES = Set.of("name", "label", "grants", "overrides", "rules", "__comment");

	/** {@inheritDoc} */
	@Override
	public SecuredEntity deserialize(final JsonElement json, final Type typeOfT, final JsonDeserializationContext context) {
		final JsonObject jsonSecuredEntity = json.getAsJsonObject();
		final DataDefinition entityDefinition = DataModelUtil.findDataDefinition(jsonSecuredEntity.get("entity").getAsString());
		//----
		asserUnsupportedAttributes("SecuredEntity " + entityDefinition.getClassSimpleName(), jsonSecuredEntity, SECURED_ENTITY_SUPPORTED_ATTRIBUTES);
		//----
		final List<DataField> securityFields = new ArrayList<>();
		for (final JsonElement securityField : jsonSecuredEntity.get("securityFields").getAsJsonArray()) {
			securityFields.add(deserializeDataField(entityDefinition, securityField.getAsString()));
		}

		final List<SecurityDimension> advancedDimensions = new ArrayList<>();
		for (final JsonElement advancedDimension : jsonSecuredEntity.get("securityDimensions").getAsJsonArray()) {//TODO if null ?
			advancedDimensions.add(deserializeSecurityDimensions(entityDefinition, advancedDimension.getAsJsonObject(), context));
		}

		final Map<String, Authorization> permissionPerOperations = new HashMap<>();// on garde la map des operations pour resoudre les grants
		for (final JsonElement operation : jsonSecuredEntity.get("operations").getAsJsonArray()) { //TODO if null ?
			final Authorization permission = deserializeOperations(entityDefinition, operation.getAsJsonObject(), context, permissionPerOperations);
			Assertion.check().isFalse(permissionPerOperations.containsKey(permission.getOperation().get()),
					"Operation {0} already declared on {1}", permission.getOperation().get(), entityDefinition.getName());
			permissionPerOperations.put(permission.getOperation().get(), permission);
		}

		return new SecuredEntity(entityDefinition, securityFields, advancedDimensions, new ArrayList<>(permissionPerOperations.values()));
	}

	private static Authorization deserializeOperations(
			final DataDefinition entityDefinition,
			final JsonObject operation,
			final JsonDeserializationContext context,
			final Map<String, Authorization> permissionPerOperations) {
		final String code = operation.get("name").getAsString();
		//----
		asserUnsupportedAttributes("Operation " + code, operation, OPERATIONS_SUPPORTED_ATTRIBUTES);
		//----
		final String label = operation.get("label").getAsString();

		final Optional<String> comment = Optional.ofNullable(operation.get("__comment"))
				.map(JsonElement::getAsString);

		Set<String> overrides = context.deserialize(operation.get("overrides"), createParameterizedType(Set.class, String.class));
		if (overrides == null) {
			overrides = Collections.emptySet();
		}
		final Set<Authorization> grants = resolveAuthorizations(context.deserialize(operation.get("grants"), createParameterizedType(Set.class, String.class)),
				permissionPerOperations, entityDefinition);

		final List<RuleMultiExpression> rules;
		final List<String> strRules = context.deserialize(operation.get("rules"), createParameterizedType(List.class, String.class));
		if (!strRules.isEmpty()) {
			rules = strRules.stream()
					.map(SecuredEntityDeserializer::parseRule)
					.toList();
		} else {
			rules = Collections.emptyList(); //if empty -> always true
		}
		return new Authorization(code, label, overrides, grants, entityDefinition, rules, comment);
	}

	private static void asserUnsupportedAttributes(final String objectName, final JsonObject jsonObject, final Set<String> supportedAttributes) {
		final Set<String> unsupportedAttributes = jsonObject.entrySet().stream()
				.map(e -> e.getKey())
				.collect(Collectors.toSet());
		unsupportedAttributes.removeAll(supportedAttributes);
		Assertion.check().isTrue(unsupportedAttributes.isEmpty(), "Json declaration of {0} can't support some attribut(s) : {1}. You may use one of {2}", objectName, unsupportedAttributes,
				supportedAttributes);
	}

	private static Set<Authorization> resolveAuthorizations(final Set<String> authorizationNames, final Map<String, Authorization> permissionPerOperations, final DataDefinition entityDefinition) {
		final Set<Authorization> authorizations;
		if (authorizationNames == null) {
			authorizations = Collections.emptySet();
		} else {
			authorizations = authorizationNames.stream()
					.map((authorizationName) -> resolvePermission(authorizationName, permissionPerOperations, entityDefinition))
					.collect(Collectors.toSet());
		}
		return authorizations;
	}

	private static Authorization resolvePermission(final String operationName, final Map<String, Authorization> permissionPerOperations, final DataDefinition entityDefinition) {
		Assertion.check().isTrue(permissionPerOperations.containsKey(operationName),
				"Operation {0} not declared on {1} (may check declaration order)", operationName, entityDefinition.getName());
		//-----
		return permissionPerOperations.get(operationName);
	}

	private static RuleMultiExpression parseRule(final String securityRule) {
		Assertion.check().isNotNull(securityRule);
		//-----
		try {
			return DslParserUtil.parseMultiExpression(securityRule);
		} catch (final PegNoMatchFoundException e) {
			final String message = StringUtil.format("Echec de lecture de la securityRule {0}\n{1}", securityRule, e.getFullMessage());
			throw WrappedException.wrap(e, message);
		} catch (final Exception e) {
			final String message = StringUtil.format("Echec de lecture de la securityRule {0}\n{1}", securityRule, e.getMessage());
			throw WrappedException.wrap(e, message);
		}
	}

	private static SecurityDimension deserializeSecurityDimensions(
			final DataDefinition entityDefinition,
			final JsonObject advancedDimension,
			final JsonDeserializationContext context) {
		final String name = advancedDimension.get("name").getAsString();
		final SecurityDimensionType type = SecurityDimensionType.valueOf(advancedDimension.get("type").getAsString());
		final List<String> fieldNames = deserializeList(advancedDimension.get("fields"), String.class, context);
		final List<DataField> fields = fieldNames.stream()
				.map(fieldName -> deserializeDataField(entityDefinition, fieldName))
				.toList();
		final List<String> values = deserializeList(advancedDimension.get("values"), String.class, context);
		return new SecurityDimension(name, type, fields, values);
	}

	private static Type createParameterizedType(final Class<?> rawClass, final Type paramType) {
		final Type[] typeArguments = { paramType };
		return new KnownParameterizedType(rawClass, typeArguments);
	}

	private static DataField deserializeDataField(final DataDefinition entityDefinition, final String fieldName) {
		return entityDefinition.getField(fieldName);
	}

	private static <T> List<T> deserializeList(
			final JsonElement jsonElement,
			final Class<T> elementClass,
			final JsonDeserializationContext context) {
		if (jsonElement == null) {
			return Collections.emptyList();
		}
		return context.deserialize(jsonElement, createParameterizedType(List.class, elementClass));
	}

}
