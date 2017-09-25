package io.vertigo.dashboard.ui.commons.model;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.commons.eventbus.EventBusSubscriptionDefinition;
import io.vertigo.lang.Assertion;

public final class EventBusModel {
	private final Class eventType;
	private final List<EventBusSubscriptionDefinition> subscriptions;

	public EventBusModel(
			final Class eventType,
			final List<EventBusSubscriptionDefinition> subscriptions) {
		Assertion.checkNotNull(eventType);
		Assertion.checkNotNull(subscriptions);
		//---
		this.eventType = eventType;
		this.subscriptions = subscriptions;
	}

	public String getName() {
		return eventType.getSimpleName();
	}

	public boolean isDeadEvent() {
		return subscriptions.isEmpty();
	}

	public List<String> getSubscribers() {
		return subscriptions
				.stream()
				.map(EventBusSubscriptionDefinition::getName)
				.collect(Collectors.toList());
	}

}
