package io.vertigo.adapters.ifttt;

public final class MakerEvent {

	private final String eventName;
	private final MakerEventMetadatas eventMetadatas = new MakerEventMetadatas();

	public MakerEvent(final String eventName) {
		this.eventName = eventName;
	}

	String getEventName() {
		return eventName;
	}

	public MakerEventMetadatas getEventMetadatas() {
		return eventMetadatas;
	}

}
