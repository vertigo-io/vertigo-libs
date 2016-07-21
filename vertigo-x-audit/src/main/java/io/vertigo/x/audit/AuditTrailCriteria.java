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
package io.vertigo.x.audit;

import java.util.Date;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * This class defines the Audit Trail for an Object.
 *
 * @author xdurand
 */
@DtDefinition
public final class AuditTrailCriteria implements DtObject {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private final String category;
	
	private final String user;

	private final Date dateBusinessStart;
	
	private final Date dateBusinessEnd;

	private final Date dateExecutionStart;
	
	private final Date dateExecutionEnd;
	
	private final Long item;

	AuditTrailCriteria(
			final String category, 
			final String user, 
			final Date dateBusinessDebut, 
			final Date dateBusinessFin, 
			final Date dateExecutionDebut, 
			final Date dateExecutionFin, 
			final Long item) {
		this.category = category;
		this.user = user;
		this.dateBusinessStart= dateBusinessDebut;
		this.dateBusinessEnd = dateBusinessFin;
		this.dateExecutionStart = dateExecutionDebut;
		this.dateExecutionEnd = dateExecutionFin;
		this.item = item;
	}
	
	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * @return the user
	 */
	public String getUser() {
		return user;
	}

	/**
	 * @return the dateBusinessDebut
	 */
	public Date getDateBusinessDebut() {
		return dateBusinessStart;
	}

	/**
	 * @return the dateBusinessFin
	 */
	public Date getDateBusinessFin() {
		return dateBusinessEnd;
	}

	/**
	 * @return the dateExecutionDebut
	 */
	public Date getDateExecutionDebut() {
		return dateExecutionStart;
	}

	/**
	 * @return the dateExecutionFin
	 */
	public Date getDateExecutionFin() {
		return dateExecutionEnd;
	}

	/**
	 * @return the item
	 */
	public Long getItem() {
		return item;
	}
	
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
