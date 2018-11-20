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
package io.vertigo.social.services.comment;

import java.util.List;

import io.vertigo.account.account.Account;
import io.vertigo.core.component.Component;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.UID;

/**
 * @author pchretien
 */
public interface CommentServices extends Component {

	/**
	 * Gets a list of sorted comments published on this keyConcept.
	 * @param keyConceptUID the UID of the keyConcept
	 * @return the list of sorted comments
	 */
	List<Comment> getComments(UID<? extends KeyConcept> keyConceptUID);

	/**
	 * Publishes a comment on a key concept.
	 * @param accountUID the account defined by its UID
	 * @param comment  the comment
	 * @param keyConceptUID the UID of the keyConcept
	 */
	void publish(final UID<Account> accountUID, Comment comment, UID<? extends KeyConcept> keyConceptUID);

	/**
	 * Updates a comment.
	 * @param accountUID the account defined by its UID
	 * @param comment the updated comment
	 */
	void update(final UID<Account> accountUID, Comment comment);
}
