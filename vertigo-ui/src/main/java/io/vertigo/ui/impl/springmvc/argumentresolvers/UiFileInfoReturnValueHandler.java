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
package io.vertigo.ui.impl.springmvc.argumentresolvers;

import java.lang.reflect.ParameterizedType;
import java.util.Collections;
import java.util.List;

import org.springframework.core.MethodParameter;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.mvc.method.annotation.AbstractMessageConverterMethodProcessor;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.ui.core.UiFileInfo;

public class UiFileInfoReturnValueHandler extends AbstractMessageConverterMethodProcessor {

	public UiFileInfoReturnValueHandler() {
		super(Collections.singletonList(DIInjector.newInstance(VegaJsonHttpMessageConverter.class, Node.getNode().getComponentSpace())));
	}

	@Override
	public boolean supportsReturnType(final MethodParameter returnType) {
		return UiFileInfo.class.isAssignableFrom(returnType.getParameterType())
				|| List.class.isAssignableFrom(returnType.getParameterType()) && UiFileInfo.class.isAssignableFrom(Class.class.cast(((ParameterizedType) returnType.getGenericParameterType()).getActualTypeArguments()[0]));
	}

	@Override
	public void handleReturnValue(final Object returnValue, final MethodParameter returnType, final ModelAndViewContainer mavContainer, final NativeWebRequest webRequest) throws Exception {
		Assertion.check()
				.isNotNull(mavContainer)
				.isNotNull(returnValue);
		//---
		mavContainer.setRequestHandled(true);
		final ServletServerHttpRequest inputMessage = createInputMessage(webRequest);
		final ServletServerHttpResponse outputMessage = createOutputMessage(webRequest);
		writeWithMessageConverters(returnValue, returnType, inputMessage, outputMessage);
	}

	@Override
	public boolean supportsParameter(final MethodParameter parameter) {
		return false;
	}

	@Override
	public Object resolveArgument(final MethodParameter parameter, final ModelAndViewContainer mavContainer, final NativeWebRequest webRequest, final WebDataBinderFactory binderFactory) throws Exception {
		return null;
	}

}
