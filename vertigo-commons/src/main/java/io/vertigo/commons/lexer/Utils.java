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

	/**
	 * @param c character
	 * @return true if the character is a digit
	 */
	static boolean isDigit(char car) {
		return car >= '0' && car <= '9';
	}

	/**
	 * Only latin letters. No accent. No specific characters. 
	 * 
	 * @param c character
	 * @return true if the character is a latin letter
	 */
	static boolean isLetter(char c) {
		return (c >= 'a' && c <= 'z')
				|| (c >= 'A' && c <= 'Z');

	}

}
