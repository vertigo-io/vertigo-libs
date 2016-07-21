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

package io.vertigo.x.impl.audit;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.audit.AuditManager;
import io.vertigo.x.audit.AuditTrail;
import io.vertigo.x.audit.AuditTrailCriteria;

/**
 * @author xdurand
 */
public final class AuditManagerImpl implements AuditManager {

	private AuditTrailStorePlugin auditTrailStorePlugin;
	
	@Inject
	public AuditManagerImpl(AuditTrailStorePlugin auditTrailStorePlugin) {
		this.auditTrailStorePlugin = auditTrailStorePlugin;
	}
	
	@Override
	public void addAuditTrail(AuditTrail auditTrail) {
		auditTrailStorePlugin.createAuditTrail(auditTrail);
	}

	@Override
	public List<AuditTrail> searchAuditTrail(AuditTrailCriteria atc) {
		return auditTrailStorePlugin.getAuditTrailByCriteria(atc);
	}

	@Override
	public AuditTrail getAuditTrail(Long idAuditTrail) {
		DtDefinition auditTrailDefinition = DtObjectUtil.findDtDefinition(AuditTrail.class);
		URI<AuditTrail> uriAuditTrail = new URI<>(auditTrailDefinition, idAuditTrail);
		return auditTrailStorePlugin.getAuditTrail(uriAuditTrail);
	}
	
	
}