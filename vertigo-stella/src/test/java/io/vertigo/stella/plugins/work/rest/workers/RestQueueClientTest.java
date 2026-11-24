/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.stella.plugins.work.rest.workers;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.impl.codec.CodecManagerImpl;

/**
 * Params of the REST workers (no server needed).
 */
public class RestQueueClientTest {
	private static final String SERVER_URL = "http://localhost:10998/backend/workQueue";
	private final CodecManager codecManager = new CodecManagerImpl();

	@Test
	void testNodeTimeoutLongerThanHeartBeat() {
		// the node timeout is the time without sign of life before the master sees the node dead : the heartBeat (every 20s) must fit in it
		assertThrows(IllegalStateException.class, () -> new RestQueueClient(SERVER_URL, 10, 10, codecManager));
		assertThrows(IllegalStateException.class, () -> new RestQueueClient(SERVER_URL, 20, 10, codecManager));
		assertThrows(IllegalStateException.class, () -> new RestQueueClient(SERVER_URL, 3601, 10, codecManager));
		assertDoesNotThrow(() -> new RestQueueClient(SERVER_URL, 60, 10, codecManager));
	}
}
