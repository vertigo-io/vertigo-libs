package io.vertigo.adapters.ifttt;

import org.junit.Test;

public class IftttTest {

	@Test
	public void testGmail() {
		final MakerEvent event = new MakerEvent("myTest");
		event.getEventMetadatas().setValue1("youpi");

		//IftttAdapter.sendMakerEvent(event, "https://maker.ifttt.com/trigger", "", Optional.<String> of("172.20.0.9"), Optional.<String> of("3128"));

	}

}
