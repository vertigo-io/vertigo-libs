/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.ui.impl.springmvc.argumentresolvers;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.nio.charset.Charset;
import java.util.Collections;
import java.util.Optional;

import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.mvc.method.annotation.AbstractMessageConverterMethodProcessor;

import io.vertigo.dynamo.domain.model.FileInfoURI;
import io.vertigo.lang.Assertion;
import io.vertigo.ui.core.ProtectedValueUtil;

public final class FileInfoURIConverterValueHandler extends AbstractMessageConverterMethodProcessor {

	public FileInfoURIConverterValueHandler() {
		super(Collections.singletonList(new StringHttpMessageConverter(Charset.forName("utf-8"))));
	}

	@Override
	public boolean supportsReturnType(final MethodParameter returnType) {
		return FileInfoURI.class.isAssignableFrom(returnType.getParameterType());
	}

	@Override
	public void handleReturnValue(final Object returnValue, final MethodParameter returnType, final ModelAndViewContainer mavContainer, final NativeWebRequest webRequest) throws Exception {
		mavContainer.setRequestHandled(true);
		final ServletServerHttpRequest inputMessage = createInputMessage(webRequest);
		final ServletServerHttpResponse outputMessage = createOutputMessage(webRequest);

		// Try even with null return value. ResponseBodyAdvice could get involved.
		writeWithMessageConverters(ProtectedValueUtil.generateProtectedValue((FileInfoURI) returnValue), returnType, inputMessage, outputMessage);
	}

	@Override
	public boolean supportsParameter(final MethodParameter parameter) {
		Class<?> parameterClazz = parameter.getParameterType();
		if (Optional.class.isAssignableFrom(parameterClazz)) {
			parameterClazz = castAsClass(((ParameterizedType) parameter.getGenericParameterType()).getActualTypeArguments()[0]); //we known that Optional has one parameterized type
		}
		return FileInfoURI.class.isAssignableFrom(parameterClazz);
	}

	public static Class<?> castAsClass(final Type testedType) {
		if (testedType instanceof Class) {
			return (Class<?>) testedType;
		} else if (testedType instanceof ParameterizedType) {
			return (Class<?>) ((ParameterizedType) testedType).getRawType();
		}
		throw new IllegalArgumentException("Parameters Type must be Class or ParameterizedType, unsupported type:" + testedType);
	}

	@Override
	public Object resolveArgument(final MethodParameter parameter, final ModelAndViewContainer mavContainer, final NativeWebRequest webRequest, final WebDataBinderFactory binderFactory) throws Exception {
		final HttpServletRequest request = getRequest(webRequest);
		final Named requestParam = parameter.getParameterAnnotation(Named.class);
		Assertion.checkNotNull(requestParam, "Parameter name wasnt't found. Use @Named('myFileParam') in your controller.");
		final String fileUriProtected = request.getParameter(requestParam.value());
		final boolean isOptional = Optional.class.isAssignableFrom(parameter.getParameterType());
		if (!isOptional) {
			Assertion.checkNotNull(fileUriProtected, "Parameter {0} wasnt't found in Request.", requestParam.value());
			return ProtectedValueUtil.readProtectedValue(fileUriProtected, Serializable.class);
		} else if (!StringUtils.isEmpty(fileUriProtected)) {
			return Optional.of(ProtectedValueUtil.readProtectedValue(fileUriProtected, Serializable.class));
		} else {
			return Optional.empty();
		}
	}

	/**
	 * Create a new {@link HttpInputMessage} from the given {@link NativeWebRequest}.
	 * @param webRequest the web request to create an input message from
	 * @return the input message
	 */
	private HttpServletRequest getRequest(final NativeWebRequest webRequest) {
		final HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
		Assert.state(servletRequest != null, "No HttpServletRequest");
		return servletRequest;
	}
}