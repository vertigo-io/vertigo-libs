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
package io.vertigo.vega.webservice.data.ws;

import javax.inject.Inject;

import io.vertigo.account.security.VSecurityManager;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.vega.webservice.data.domain.ContactViewPojo;
import io.vertigo.vega.webservice.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.webservice.stereotype.ExcludedFields;
import io.vertigo.vega.webservice.stereotype.GET;
import io.vertigo.vega.webservice.stereotype.IncludedFields;
import io.vertigo.vega.webservice.stereotype.POST;
import io.vertigo.vega.webservice.stereotype.PathPrefix;
import io.vertigo.vega.webservice.stereotype.SessionInvalidate;

//basé sur http://www.restapitutorial.com/lessons/httpmethods.html

@PathPrefix("/testPojo")
public final class PojoTestWebServices implements WebServices {

	@Inject
	private VSecurityManager securityManager;

	@AnonymousAccessAllowed
	@GET("/login")
	public void login() {
		//code 200
		securityManager.getCurrentUserSession().get().authenticate();
	}

	@SessionInvalidate
	@GET("/logout")
	public void logout() {
		//code 200
	}

	@POST("/contact")
	public ContactViewPojo testJsonSyntax(final ContactViewPojo contact) {
		//200
		return contact;
	}

	@POST("/contactExcludeFieldsOut")
	@ExcludedFields({ "honorificCode", "email" })
	public ContactViewPojo testExcludeFieldsOut(final ContactViewPojo contact) {
		return contact;
	}

	@POST("/contactExcludeFieldsIn")
	public ContactViewPojo testExcludeFieldsIn(final @ExcludedFields({ "honorificCode", "email" }) ContactViewPojo contact) {
		return contact;
	}

	@POST("/contactIncludedFieldsOut")
	@IncludedFields({ "name", "firstName" })
	public ContactViewPojo testIncludedFieldsOut(final ContactViewPojo contact) {
		return contact;
	}

	@POST("/contactIncludedFieldsIn")
	public ContactViewPojo testIncludedFieldsIn(final @IncludedFields({ "name", "firstName" }) ContactViewPojo contact) {
		return contact;
	}

}
