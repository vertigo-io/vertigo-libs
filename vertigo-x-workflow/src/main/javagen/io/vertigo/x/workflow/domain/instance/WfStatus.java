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
package io.vertigo.x.workflow.domain.instance;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données WfStatus
 */
public final class WfStatus implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String wfsCode;
	private String label;

	/** {@inheritDoc} */
	@Override
	public URI<WfStatus> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Code Status'.
	 * @return String wfsCode <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_CODE", type = "ID", required = true, label = "Code Status")
	public String getWfsCode() {
		return wfsCode;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Code Status'.
	 * @param wfsCode String <b>Obligatoire</b>
	 */
	public void setWfsCode(final String wfsCode) {
		this.wfsCode = wfsCode;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'label'.
	 * @return String label
	 */
	@Field(domain = "DO_X_WORKFLOW_LABEL", label = "label")
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'label'.
	 * @param label String
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	// Association : WfWorkflow non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
