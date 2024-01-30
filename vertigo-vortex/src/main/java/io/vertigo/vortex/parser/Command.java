package io.vertigo.vortex.parser;

import java.util.List;

public final class Command {

	public enum Type {
		create, alter
	}

	public Command(Type type, String name, List<Token> tokens) {

	}

}
