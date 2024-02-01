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
package io.vertigo.vega.webservice.data.ws.client;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import io.vertigo.core.node.component.Amplifier;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtObject;
import io.vertigo.vega.engines.webservice.json.UiContext;
import io.vertigo.vega.impl.webservice.client.WebServiceProxyAnnotation;
import io.vertigo.vega.webservice.data.domain.Contact;
import io.vertigo.vega.webservice.data.domain.ContactCriteria;
import io.vertigo.vega.webservice.data.domain.ContactValidator;
import io.vertigo.vega.webservice.data.domain.EmptyPkValidator;
import io.vertigo.vega.webservice.data.domain.MandatoryPkValidator;
import io.vertigo.vega.webservice.model.DtListDelta;
import io.vertigo.vega.webservice.model.UiList;
import io.vertigo.vega.webservice.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.webservice.stereotype.DELETE;
import io.vertigo.vega.webservice.stereotype.Doc;
import io.vertigo.vega.webservice.stereotype.ExcludedFields;
import io.vertigo.vega.webservice.stereotype.GET;
import io.vertigo.vega.webservice.stereotype.InnerBodyParam;
import io.vertigo.vega.webservice.stereotype.POST;
import io.vertigo.vega.webservice.stereotype.PUT;
import io.vertigo.vega.webservice.stereotype.PathParam;
import io.vertigo.vega.webservice.stereotype.PathPrefix;
import io.vertigo.vega.webservice.stereotype.QueryParam;
import io.vertigo.vega.webservice.stereotype.ServerSideSave;
import io.vertigo.vega.webservice.stereotype.SessionInvalidate;
import io.vertigo.vega.webservice.stereotype.SessionLess;
import io.vertigo.vega.webservice.stereotype.Validate;
import io.vertigo.vega.webservice.validation.UiMessageStack;

//basé sur http://www.restapitutorial.com/lessons/httpmethods.html

@WebServiceProxyAnnotation
@PathPrefix("/test")
public interface SimplerClientTestWebServices extends Amplifier {

	@AnonymousAccessAllowed
	@GET("/login")
	void login();

	@SessionInvalidate
	@GET("/logout")
	void logout();

	@SessionLess
	@AnonymousAccessAllowed
	@GET("/anonymousTest")
	List<Contact> anonymousTest();

	@GET("/authentifiedTest")
	List<Contact> authentifiedTest();

	@Doc("send param type='Confirm' or type = 'Contact' \n Return 'OK' or 'Contact'")
	@GET("/twoResult")
	Map<String, Object> testTwoResult(@QueryParam("type") final String type);

	@Doc("Use passPhrase : RtFM")
	@GET("/docTest/{passPhrase}")
	List<Contact> docTest(@PathParam("passPhrase") final String passPhrase);

	@Doc("Use passPhrase : RtFM")
	@GET("/docTest/")
	List<Contact> docTestEmpty();

	@Doc("Not the same than /docTest/")
	@GET("/docTest")
	String docTest();

	@GET("/{conId}")
	Contact testRead(@PathParam("conId") final long conId);

	//PUT is indempotent : ID obligatoire
	@PUT("/contactSyntax")
	Contact testJsonSyntax(final Contact contact);

	//PUT is indempotent : ID obligatoire
	@PUT("/contactUrl99")
	Contact testWsUrl99(final Contact contact);

	//@POST is non-indempotent
	@POST("/contact")
	Contact createContact( //create POST method -> 201 instead of 200 by convention
			final @Validate({ ContactValidator.class, EmptyPkValidator.class }) @ExcludedFields("conId") Contact contact);

	//PUT is indempotent : ID mandatory
	@PUT("/contact")
	Contact testUpdate(
			final @Validate({ ContactValidator.class, MandatoryPkValidator.class }) Contact contact);

	//PUT is indempotent : ID mandatory
	@PUT("/contact/{conId}")
	Contact testUpdateByPath(
			@PathParam("conId") final long conId,
			final @Validate({ ContactValidator.class, EmptyPkValidator.class }) Contact contact);

	@DELETE("/contact/{conId}")
	void delete(@PathParam("conId") final long conId);

	@Doc("Test ws multipart body with objects. Send a body with an object of to field : contactFrom, contactTo. Each one should be an json of Contact.")
	@POST("/innerbody")
	List<Contact> testInnerBodyObject(@InnerBodyParam("contactFrom") final Contact contactFrom, @InnerBodyParam("contactTo") final Contact contactTo);

	@Doc("Test ws multipart body with optional objects. Send a body with an object of to field : contactFrom, Optional<contactTo>. Each one should be an json of Contact.")
	@POST("/innerbodyOptional")
	List<Contact> testInnerBodyOptionalObject(@InnerBodyParam("contactFrom") final Contact contactFrom, @InnerBodyParam("contactTo") final Optional<Contact> contactToOpt);

	@Doc("Test ws multipart body with primitives. Send a body with an object of to field : contactId1, contactId2. Each one should be an json of long.")
	@ExcludedFields({ "address", "tels" })
	@POST("/innerLong")
	List<Contact> testInnerBodyLong(@InnerBodyParam("contactId1") final long contactIdFrom, @InnerBodyParam("contactId2") final long contactIdTo);

	@Doc("Test ws multipart body with primitives. Send a body with an object of to field : contactId1, contactId2. Each one should be an json of long.")
	@ServerSideSave
	@ExcludedFields({ "address", "tels" })
	@POST("/innerLongToDtList")
	DtList<Contact> testInnerBodyLongToDtList(@InnerBodyParam("contactId1") final long contactIdFrom, @InnerBodyParam("contactId2") final long contactIdTo);

	@POST("/uiMessage")
	UiMessageStack testUiMessage(final Contact contact, final UiMessageStack uiMessageStack);

	@POST("/innerBodyValidationErrors")
	List<Contact> testInnerBodyValidationErrors(//
			@InnerBodyParam("contactFrom") final Contact contactFrom, //
			@InnerBodyParam("contactTo") final Contact contactTo);

	@POST("/saveListDelta")
	String saveListDelta(final @Validate({ ContactValidator.class }) DtListDelta<Contact> myList);

	@POST("/saveDtListContact")
	String saveDtListContact(final @Validate({ ContactValidator.class }) DtList<Contact> myList);

	@POST("/saveUiListContact")
	String saveUiListContact(final UiList<Contact> myList, final UiMessageStack uiMessageStack);

	@POST("/saveListContact")
	String saveListContact(final List<Contact> myList);

	@GET("/dtListMeta")
	DtList<Contact> loadListMeta();

	@GET("/dtList10/{id}")
	DtList<Contact> loadListDigitInRoute(@PathParam("id") final long conId);

	@GET("/dtList10elts/{id}")
	DtList<Contact> loadListDigitInRoute2(@PathParam("id") final long conId);

	@GET("/dtListMetaAsList")
	List<Contact> loadListMetaAsList();

	@GET("/listComplexMeta")
	DtList<Contact> loadListComplexMeta();

	//PUT is indempotent : ID obligatoire
	@PUT("/contactAliasName/{conId}")
	Contact testUpdateByPath(
			@PathParam("conId") final long conId,
			final @Validate({ ContactValidator.class, EmptyPkValidator.class }) Contact contact,
			@InnerBodyParam("itsatoolongaliasforfieldcontactname") final String aliasName);

	@POST("/charset")
	Contact testCharset(
			final Contact text);

	@GET("/dates")
	UiContext testDate(@QueryParam("date") final Date date);

	@GET("/localDate")
	LocalDate getLocalDate();

	@PUT("/localDate")
	UiContext putLocalDate(@QueryParam("date") final LocalDate localDate);

	@GET("/zonedDateTime")
	ZonedDateTime getZonedDateTime();

	@GET("/zonedDateTimeUTC")
	ZonedDateTime getZonedDateTimeUTC();

	@PUT("/zonedDateTime")
	UiContext putZonedDateTime(@QueryParam("date") final ZonedDateTime zonedDateTime);

	@GET("/instant")
	Instant getInstant();

	@PUT("/instant")
	UiContext putInstant(@QueryParam("date") final Instant instant);

	@POST("/string")
	String testString(final String bodyString);

	@POST("/string/optionalInnerBodyParam")
	String testOptionalInnerBodyParam(final Contact contact, @InnerBodyParam("token") final Optional<String> token);

	@POST("/string/optionalQueryParam")
	String testOptionalQueryParam(final Contact contact, @QueryParam("token") final Optional<String> token);

	@GET("/searchFacet")
	FacetedQueryResult<DtObject, ContactCriteria> testSearchServiceFaceted(final ContactCriteria contact);

}
