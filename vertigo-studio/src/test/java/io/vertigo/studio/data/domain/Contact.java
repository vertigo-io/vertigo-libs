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
package io.vertigo.studio.data.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

public final class Contact implements Entity {
	private static final long serialVersionUID = 2074906343392206381L;

	@Field(domain = "DO_LONG", type = "ID", required = true, label = "Contact Id")
	private Long conId;
	@Field(domain = "DO_STRING", label = "Honorific title")
	private String honorificCode;
	//mandatory
	@Field(domain = "DO_STRING", required = true, label = "Name")
	private String name;
	@Field(domain = "DO_STRING", label = "Firstname")
	private String firstName;
	@Field(domain = "DO_DATE", label = "Birthday")
	private Date birthday;
	@Field(domain = "DO_STRING", label = "Email")
	private String email;

	private List<String> tels;

	/** {@inheritDoc} */
	@Override
	public URI<Contact> getURI() {
		return DtObjectUtil.createURI(this);
	}

	public Long getConId() {
		return conId;
	}

	public void setConId(final Long conId) {
		this.conId = conId;
	}

	public String getHonorificCode() {
		return honorificCode;
	}

	public void setHonorificCode(final String honorificCode) {
		this.honorificCode = honorificCode;
	}

	public String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(final String firstName) {
		this.firstName = firstName;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(final Date birthday) {
		this.birthday = birthday;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(final String email) {
		this.email = email;
	}

	public List<String> getTels() {
		return Collections.unmodifiableList(tels);
	}

	public void setTels(final List<String> tels) {
		this.tels = new ArrayList<>(tels);
	}

}
