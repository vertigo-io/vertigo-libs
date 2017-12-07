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
package io.vertigo.workflow;

/**
 *
 * @author xdurand
 *
 */
public final class WfTransitionCriteria {

	private String transitionName;
	private Long wfadIdFrom;
	private Long wfadIdTo;

	/**
	 * @return the transitionName
	 */
	public String getTransitionName() {
		return transitionName;
	}

	/**
	 * @param transitionName the transitionName to set
	 */
	public void setTransitionName(final String transitionName) {
		this.transitionName = transitionName;
	}

	/**
	 * @return the wfadIdFrom
	 */
	public Long getWfadIdFrom() {
		return wfadIdFrom;
	}

	/**
	 * @param wfadIdFrom the wfadIdFrom to set
	 */
	public void setWfadIdFrom(final Long wfadIdFrom) {
		this.wfadIdFrom = wfadIdFrom;
	}

	/**
	 * @return the wfadIdTo
	 */
	public Long getWfadIdTo() {
		return wfadIdTo;
	}

	/**
	 * @param wfadIdTo the wfadIdTo to set
	 */
	public void setWfadIdTo(final Long wfadIdTo) {
		this.wfadIdTo = wfadIdTo;
	}

}
