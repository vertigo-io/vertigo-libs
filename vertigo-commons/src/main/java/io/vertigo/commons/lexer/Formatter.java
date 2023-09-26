package io.vertigo.commons.lexer;

import java.util.List;

import io.vertigo.core.lang.Assertion;

public final class Formatter {
	private static String SPACE = " ";
	private static String INDENT = "    ";
	private static String NEW_LINE = "\r\n";
	private int level = 0;
	private boolean indent = false;

	void toText(List<Token> tokens) {
		Assertion.check().isNotNull(tokens);
		//---
		System.out.println();
		for (Token token : tokens) {
			System.out.print(before(token));
			System.out.print(token.value().toString());
			System.out.print(after(token));
		}
	}

	public String before(Token token) {
		String before = "";
		if (indent) {
			before += INDENT;
			indent = false;
		}

		switch (token.type()) {
			case bracket:
				if (isBeginBlockSeparator(token)) {
					level++;
					indent = true;
				}
				return before;
			case separator:
				return before;
			//			case command:
			//				return before;
			case word:
				return before;
			case bool:
				return before;
			case string:
				return before + "\"";
			case integer:
				return before;
			case comment:
				return before + "#";
			default:
				throw new UnsupportedOperationException("Unexpected token " + token.type());
		}
	}

	public String after(Token token) {
		switch (token.type()) {
			case bracket:
				if (isEndBlockSeparator(token)) {
					level--;
				}
				indent = level > 0;
				return NEW_LINE;
			case separator:
				return SPACE;
			//			case command:
			//				return SPACE;
			case word:
				return SPACE;
			case bool:
				return level > 1
						? SPACE
						: NEW_LINE;
			case string:
				return level > 1
						? "\"" + SPACE
						: "\"" + NEW_LINE;
			case integer:
				return level > 1
						? SPACE
						: NEW_LINE;
			case comment:
				return NEW_LINE;
			default:
				throw new UnsupportedOperationException("Unexpected token " + token.type());
		}
	}

	private static boolean isBeginBlockSeparator(Token token) {
		return token.type().equals(TokenType.bracket)
				&& ("{".equals(token.value())
						||
						"[".equals(token.value()));

	}

	private static boolean isEndBlockSeparator(Token token) {
		return token.type().equals(TokenType.bracket)
				&& ("]".equals(token.value())
						||
						"}".equals(token.value()));

	}
}
