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
package io.vertigo.account.plugins.identityprovider.text;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.data.model.Entity;

final class IdentityUserInfo {

	private final Entity user;
	private final String photoUrl;

	IdentityUserInfo(final Entity user, final String photoUrl) {
		Assertion.check()
				.isNotNull(user)
				.isNotNull(photoUrl);
		//-----
		this.user = user;
		this.photoUrl = photoUrl;
	}

	Entity getUser() {
		return user;
	}

	String getPhotoUrl() {
		return photoUrl;
	}
}
