/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.x.impl.comment;

import java.util.List;
import java.util.UUID;

import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Plugin;
import io.vertigo.x.comment.Comment;

/**
 * @author pchretien
 */
public interface CommentPlugin extends Plugin {

	/**
	 * Publishes a comment about a key concept.
	 * @param comment the comment 
	 * @param keyConceptURI the key concept defined by its URI
	 */
	<S extends KeyConcept> void publish(Comment comment, URI<S> keyConceptURI);

	/**
	 * Gets the comment by its uuid. 
	 * @param uuid the uuid of the comment
	 * @return the comment
	 */
	Comment get(UUID uuid);

	/**
	 * Lists the comments as a key concerned is concerned
	 * @param keyConceptURI the key concept defined by its URI
	 * @return the list of comments
	 */
	<S extends KeyConcept> List<Comment> getComments(URI<S> keyConceptURI);

	/**
	 * Updates a comment.
	 * @param comment the comment
	 */
	void update(Comment comment);

}
