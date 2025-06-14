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
package io.vertigo.stella.work.mock;

import io.vertigo.stella.work.WorkEngine;

public final class SlowWorkEngine implements WorkEngine<SlowWork, Boolean> {

	/** {@inheritDoc} */
	@Override
	public Boolean process(final SlowWork work) {
		try {
			final long sleepTimeAvg = work.getSleepTime();
			final long sleepTimeMax = Math.round(sleepTimeAvg * 1.1d); //+10%
			final long sleepTimeMin = Math.round(sleepTimeAvg * 0.9d); //-10%
			Thread.sleep((sleepTimeMax + sleepTimeMin) / 2);
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt(); // Preserve interrupt status
			return false;
		}
		return true;
	}
}
