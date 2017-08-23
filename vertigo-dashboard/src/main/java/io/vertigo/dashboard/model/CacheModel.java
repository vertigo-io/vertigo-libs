package io.vertigo.dashboard.model;

import io.vertigo.commons.cache.CacheDefinition;

public class CacheModel {
	private final CacheDefinition cacheDefinition;

	public CacheModel(final CacheDefinition cacheDefinition) {
		this.cacheDefinition = cacheDefinition;
	}

	public String getName() {
		return cacheDefinition.getName();
	}

	public int getTtlIdle() {
		return cacheDefinition.getTimeToIdleSeconds();
	}

	public int getTtl() {
		return cacheDefinition.getTimeToLiveSeconds();
	}

	public int getMaxElements() {
		return cacheDefinition.getMaxElementsInMemory();
	}

}
