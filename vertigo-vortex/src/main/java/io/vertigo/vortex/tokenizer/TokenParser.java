package io.vertigo.vortex.tokenizer;

import java.util.Iterator;
import java.util.List;

public final class TokenParser<X> {
	public void parse(final List<TokenExpected> expectedTokens, final Iterator<Token> tokenIterator, final TokenType spaces) {
		int i = 0;
		TokenExpected expectedToken;
		Token token;
		while (i < expectedTokens.size()) {
			expectedToken = expectedTokens.get(i);
			if (!tokenIterator.hasNext()) {
				throw new IllegalArgumentException("Expected Token " + expectedToken + " ; no more token");
			}
			token = tokenIterator.next();
			expectedToken = expectedTokens.get(i);
			if (token.type() == spaces) {
				continue;
			}
			if (token.type() != expectedToken.tokenType()) {
				throw new IllegalArgumentException("Expected Token " + expectedToken + "; found " + token);
			}
			if (expectedToken.val() != null && !expectedToken.val().equals(token.value())) {
				throw new IllegalArgumentException("Expected Token value " + expectedToken.val() + "; found " + token.value());
			}
			if (expectedToken.consumer() != null) {
				expectedToken.consumer().accept(token.value());
			}

			i++;
		}
	}

	//	public void print() {
	//		System.out.println("parser================");
	//		expectedTokens.stream()
	//				.forEach(t -> System.out.println(t.tokenType + (t.val() == null ? "" : " - " + t.val())));
	//
	//	}
}
