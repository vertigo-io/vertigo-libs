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
package io.vertigo.datastore.plugins.kvstore.h2;

/**
 * Collection configuration.
 * @author npiedeloup
 */
final class H2CollectionConfig {

	private final String collectionName;
	private final long timeToLiveSeconds;
	private final boolean inMemory;

	/**
	 * Constructor.
	 * @param collectionName Collection name
	 * @param timeToLiveSeconds Elements time to live in second
	 * @param inMemory Collection store in memory
	 */
	H2CollectionConfig(final String collectionName, final long timeToLiveSeconds, final boolean inMemory) {
		this.collectionName = collectionName;
		this.timeToLiveSeconds = timeToLiveSeconds;
		this.inMemory = inMemory;
	}

	/**
	 * @return collectionName
	 */
	String getCollectionName() {
		return collectionName;
	}

	/**
	 * @return timeToLiveSeconds
	 */
	long getTimeToLiveSeconds() {
		return timeToLiveSeconds;
	}

	/**
	 * @return inMemory
	 */
	boolean isInMemory() {
		return inMemory;
	}
}
