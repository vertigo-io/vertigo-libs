package io.vertigo.commons.lexer.old;

public class G {
	public class BLPOP {
		//BLPOP key [key ...] timeout
		String[] keys;
		int timeout;
	}

	public class LPUSH {
		//LPUSH element [element ...]
		String key;
		String[] elements;
	}
}
