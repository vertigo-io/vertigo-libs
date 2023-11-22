package io.vertigo.vortex.tokenizer;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;

import io.vertigo.core.lang.Assertion;

public final class Tokenizer {
	private final List<TokenType> tokenTypes;

	public Tokenizer(List<TokenType> tokenTypes) {
		Assertion.check().isNotNull(tokenTypes);
		//---
		this.tokenTypes = tokenTypes;
	}

	public List<Token> tokenize(String src) {
		final List<Token> tokens = new ArrayList<>();
		while (!src.equals("")) {
			boolean match = false;
			for (TokenType tokenType : tokenTypes) {
				Matcher matcher = tokenType.pattern.matcher(src);
				if (matcher.find()) {
					match = true;
					String tok = matcher.group();
					src = matcher.replaceFirst("");
					tokens.add(new Token(tokenType, tok));
					break;
				}
			}
			if (!match)
				throw new ParserException("Unexpected character in input(" + src.length() + "): " + src);
		}
		return tokens;
	}

}
