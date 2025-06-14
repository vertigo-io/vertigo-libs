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
package io.vertigo.vega.webservice.definitions;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.vega.webservice.WebServiceTypeUtil;
import io.vertigo.vega.webservice.validation.DtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * WebService param infos :
 * - source type (query, path, body, innerBody or implicit)
 * - name
 * - type (class)
 * - includedField (for DtObjet or DtList)
 * - excludedField (for DtObjet or DtList)
 * - if object kept serverSide
 * - if one time token
 * - specific validators
 *
 * @author npiedeloup
 */
public final class WebServiceParam {

	/**
	 * Parameter's source types.
	 */
	public enum WebServiceParamType {
		Query, Path, Header, Body, InnerBody, Implicit
	}

	public enum ImplicitParam {
		UiMessageStack(UiMessageStack.class), Request(HttpServletRequest.class), Response(HttpServletResponse.class),;

		private final Class<?> implicitType;

		ImplicitParam(final Class<?> implicitType) {
			this.implicitType = implicitType;
		}

		public Class getImplicitType() {
			return implicitType;
		}

	}

	private final WebServiceParamType paramType;
	private final String name;
	private final Type type;
	private final boolean optional;
	private final String fullName;
	private final Set<String> includedFields;
	private final Set<String> excludedFields;
	private final boolean needServerSideToken;
	private final boolean consumeServerSideToken;
	private final List<Class<? extends DtObjectValidator>> dtObjectValidatorClasses;

	/**
	 * Constructor.
	 * @param paramType Parameter type
	 * @param name Parameter name
	 * @param type Parameter class
	 * @param excludedFields List of excluded fieldNames
	 * @param needServerSideToken if access token mandatory
	 * @param consumeServerSideToken if access token is consume (one time token)
	 * @param dtObjectValidatorClasses List of validator classes (order is keep)
	 */
	WebServiceParam(
			final WebServiceParamType paramType,
			final String name,
			final Type type,
			final boolean optional,
			final Set<String> includedFields,
			final Set<String> excludedFields,
			final boolean needServerSideToken,
			final boolean consumeServerSideToken,
			final List<Class<? extends DtObjectValidator>> dtObjectValidatorClasses) {

		this(":" + paramType.name() + ":" + name,
				paramType,
				name,
				type,
				optional,
				includedFields,
				excludedFields,
				needServerSideToken,
				consumeServerSideToken,
				dtObjectValidatorClasses);

		Assertion.check()
				.isNotNull(name)
				.when(paramType == WebServiceParamType.Implicit, () -> Assertion.check()
						.isTrue(isImplicitParam(name), "When ImplicitParam, name ({1}) must be one of {0}", ImplicitParam.values(), name))
				.when(name.isEmpty(), () -> Assertion.check()
						.isTrue(WebServiceTypeUtil.isAssignableFrom(DtListState.class, type)
								|| WebServiceTypeUtil.isAssignableFrom(DataObject.class, type),
								"Only DtObject and DtListState can be map from Query parameters")); //msg don't talk about deprecated class
	}

	/**
	 * Static method factory for WebServiceDefinitionBuilder
	 * @param paramType param type
	 * @return WebServiceDefinitionBuilder
	 */
	public static WebServiceParamBuilder builder(final Type paramType) {
		return new WebServiceParamBuilder(paramType);
	}

	private WebServiceParam(
			final String fullName,
			final WebServiceParamType paramType,
			final String name,
			final Type type,
			final boolean optional,
			final Set<String> includedFields,
			final Set<String> excludedFields,
			final boolean needServerSideToken,
			final boolean consumeServerSideToken,
			final List<Class<? extends DtObjectValidator>> dtObjectValidatorClasses) {
		Assertion.check()
				.isNotNull(paramType)
				.isNotNull(type)
				.isNotNull(includedFields)
				.isNotNull(excludedFields)
				.isNotNull(dtObjectValidatorClasses)
				.isTrue(dtObjectValidatorClasses.isEmpty()
						|| WebServiceTypeUtil.isAssignableFrom(DataObject.class, type)
						|| WebServiceTypeUtil.isParameterizedBy(DataObject.class, type), "Validators aren't supported for {0}", type);
		//-----
		this.paramType = paramType;
		this.type = type;
		this.optional = optional;
		this.name = name;
		this.fullName = fullName;
		this.includedFields = Collections.unmodifiableSet(new LinkedHashSet<>(includedFields));
		this.excludedFields = Collections.unmodifiableSet(new LinkedHashSet<>(excludedFields));
		this.needServerSideToken = needServerSideToken;
		this.consumeServerSideToken = consumeServerSideToken;
		this.dtObjectValidatorClasses = Collections.unmodifiableList(new ArrayList<>(dtObjectValidatorClasses));
	}

	private static boolean isImplicitParam(final String testedName) {
		return Arrays.stream(ImplicitParam.values())
				.anyMatch(implicitParam -> implicitParam.name().equals(testedName));
	}

	/**
	 * @return Parameter's source type
	 */
	public WebServiceParamType getParamType() {
		return paramType;
	}

	/**
	 * @return Full name of this param.
	 */
	public String getFullName() {
		return fullName;
	}

	/**
	 * @return Parameter name in source
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return Parameter class
	 */
	public Class<?> getType() {
		if (type instanceof ParameterizedType) {
			return (Class<?>) ((ParameterizedType) type).getRawType();
		}
		return (Class<?>) type;
	}

	/**
	 * @return generics Type
	 */
	public Type getGenericType() {
		return type;
	}

	/**
	 * @return is optional
	 */
	public boolean isOptional() {
		return optional;
	}

	/**
	 * @return List of included fieldNames
	 */
	public Set<String> getIncludedFields() {
		return includedFields;
	}

	/**
	 * @return List of excluded fieldNames
	 */
	public Set<String> getExcludedFields() {
		return excludedFields;
	}

	/**
	 * @return if access token mandatory
	 */
	public boolean isNeedServerSideToken() {
		return needServerSideToken;
	}

	/**
	 * @return if access token is consume (one time token)
	 */
	public boolean isConsumeServerSideToken() {
		return consumeServerSideToken;
	}

	/**
	 * @return List of validator classes (order is keep)
	 */
	public List<Class<? extends DtObjectValidator>> getDtObjectValidatorClasses() {
		return dtObjectValidatorClasses;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return type +
				" " +
				fullName;
	}
}
