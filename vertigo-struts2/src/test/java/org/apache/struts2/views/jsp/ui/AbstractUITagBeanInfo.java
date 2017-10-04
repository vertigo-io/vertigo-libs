/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package org.apache.struts2.views.jsp.ui;

import java.beans.PropertyDescriptor;
import java.beans.SimpleBeanInfo;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import com.opensymphony.xwork2.util.logging.Logger;
import com.opensymphony.xwork2.util.logging.LoggerFactory;

/**
 * Describes properties supported by the AbstractUITag - base class for all UI tags
 * This bases on HtmlTagSupportBeanInfo class from StripesFramework - thanks!
 * Fix by Klee : Added a fix for jacoco coverage
 */
public class AbstractUITagBeanInfo extends SimpleBeanInfo {

	private static final Logger LOG = LoggerFactory.getLogger(AbstractUITagBeanInfo.class);

	@Override
	public PropertyDescriptor[] getPropertyDescriptors() {
		try {
			final List<PropertyDescriptor> descriptors = new ArrayList<>();

			// Add the tricky one first
			final Method classSetter = AbstractUITag.class.getMethod("setCssClass", String.class);
			final Method styleSetter = AbstractUITag.class.getMethod("setCssStyle", String.class);

			descriptors.add(new PropertyDescriptor("class", null, classSetter));
			descriptors.add(new PropertyDescriptor("cssClass", null, classSetter));

			descriptors.add(new PropertyDescriptor("style", null, styleSetter));
			descriptors.add(new PropertyDescriptor("cssStyle", null, styleSetter));

			for (final Field field : AbstractUITag.class.getDeclaredFields()) {
				final String fieldName = field.getName();
				if (!"dynamicAttributes".equals(fieldName) && !field.isSynthetic()) {//NPI : we need to exclude synthetic fields for jacoco coverage
					final String setterName = "set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
					final Method setter = AbstractUITag.class.getMethod(setterName, String.class);
					descriptors.add(new PropertyDescriptor(fieldName, null, setter));
				}
			}

			final PropertyDescriptor[] array = new PropertyDescriptor[descriptors.size()];
			return descriptors.toArray(array);
		} catch (final Exception e) {
			// This is crazy talk, we're only doing things that should always succeed
			LOG.fatal("Could not construct bean info for AbstractUITag. This is very bad.", e);
			return null;
		}
	}

}
