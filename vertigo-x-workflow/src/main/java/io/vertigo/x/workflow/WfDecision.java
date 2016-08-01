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

package io.vertigo.x.workflow;

import java.util.Date;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 *
 * @author xdurand
 *
 */
public class WfDecision implements DtObject {

	private static final long serialVersionUID = 120222353819727138L;

	private final Integer choice;
	private final String user;
	private final Date businessDate;
	private final String comment;

	/**
	 * @param choice
	 * @param user
	 * @param businessDate
	 * @param comment
	 */
	public WfDecision(final Integer choice, final String user, final Date businessDate, final String comment) {
		super();
		this.choice = choice;
		this.user = user;
		this.businessDate = businessDate;
		this.comment = comment;
	}


	/**
	 * @return the choice
	 */
	public Integer getChoice() {
		return choice;
	}


	/**
	 * @return the user
	 */
	public String getUser() {
		return user;
	}


	/**
	 * @return the businessDate
	 */
	public Date getBusinessDate() {
		return businessDate;
	}


	/**
	 * @return the commentaire
	 */
	public String getComment() {
		return comment;
	}

	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}


}