package io.vertigo.commons.lexer;

final class Utils {
	static boolean isEOL(char car) {
		switch (car) {
			case '\n':
			case '\r':
				return true;
			default:
				return false;
		}
	}

	static boolean isBlank(char car) {
		switch (car) {
			case ' ':
			case '\t':
			case '\n':
			case '\r':
				return true;
			default:
				return false;
		}
	}

	static boolean isDigit(char car) {
		return car >= '0' && car <= '9';
	}

	static boolean isLetter(char car) {
		return (car >= 'a' && car <= 'z')
				|| (car >= 'A' && car <= 'Z');

	}

}
