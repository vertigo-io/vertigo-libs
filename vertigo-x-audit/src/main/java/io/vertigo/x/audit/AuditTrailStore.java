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

import java.util.List;

import io.vertigo.dynamo.domain.model.URI;

/**
 * This class defines the storage of audit trails.
 * @author xdurand
 */
public interface AuditTrailStore {
	
	/**
	 * Get an audit trail.
	 * @param auditTrailURI the audit trail defined by its URI.
	 * @return
	 */
	AuditTrail getAuditTrail(URI<AuditTrail> auditTrailURI);

	/**
	 * Save a new audit trail.
	 * Attention: The audit MUST NOT have an id.
	 * @param auditTrail the audit trail to save. 
	 * @return the audit trail created
	 */
	URI<AuditTrail> createAuditTrail(AuditTrail auditTrail);
	
	/**
	 * Fetch all Audit Trail mathing the provided criteria 
	 * @param atc
	 * @return
	 */
	List<AuditTrail> getAuditTrailByCriteria(AuditTrailCriteria atc);
	
}