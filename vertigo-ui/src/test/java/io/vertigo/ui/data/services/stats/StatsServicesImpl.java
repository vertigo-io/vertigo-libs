/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.data.services.stats;

import io.vertigo.commons.transaction.Transactional;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.ui.data.domain.stats.StatData;

@Transactional
public class StatsServicesImpl implements StatsServices {

	private DtList<StatData> store = null;
	private StatData statTarget = null;

	private void initStats() {
		final DtList<StatData> statData = new DtList<>(StatData.class);
		statData.add(createStatData(1, 1));
		statData.add(createStatData(2, 1));
		statData.add(createStatData(3, 2));
		statData.add(createStatData(4, 2));
		statData.add(createStatData(5, 3));
		store = statData;
	}

	private StatData createStatData(final long staId, final long proId) {
		final StatData statData = new StatData();
		statData.setStaId(staId);
		statData.setProId(proId);
		return statData;
	}

	@Override
	public DtList<StatData> getStats() {
		if (store == null) {
			initStats();
		}
		final DtList<StatData> statData = new DtList<>(StatData.class);
		statData.addAll(store);
		return statData;
	}

	@Override
	public void save(final DtList<StatData> stats) {
		final DtList<StatData> statData = new DtList<>(StatData.class);
		statData.addAll(stats);
		store = statData;
	}

	@Override
	public StatData getStatTarget() {
		if (statTarget == null) {
			statTarget = new StatData();
			statTarget.setNbHomme(20);
			statTarget.setNbFemme(22);
			statTarget.setNbEnfant(8);
		}
		return statTarget;
	}

}
