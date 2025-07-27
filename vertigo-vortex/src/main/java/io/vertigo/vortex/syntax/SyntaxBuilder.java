package io.vertigo.vortex.syntax;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import io.vertigo.core.lang.Assertion;
import io.vertigo.vortex.tokenizer.TokenExpected;

public final class SyntaxBuilder {
	private final List<TokenExpected> tokenExpecteds = new ArrayList<>();

	private void add(TokenExpected tokenExpected) {
		this.tokenExpecteds.add(tokenExpected);
	}

	public List<TokenExpected> getTokenExpecteds() {
		return tokenExpecteds;
	}

	public SyntaxBuilder pair(String word, String delimiter, Consumer<String> consumer) {
		term(word);
		delimiter(delimiter);
		string(consumer);
		return this;
	}

	public SyntaxBuilder term(String word) {
		add(new TokenExpected(SyntaxType.word, null, null));
		return this;
	}

	public SyntaxBuilder word(Consumer<String> consumer) {
		add(new TokenExpected(SyntaxType.word, null, consumer));
		return this;
	}

	public SyntaxBuilder bracket(String bracket) {
		Assertion.check().isTrue(SyntaxType.bracket.getPattern().matcher(bracket).matches(), "a bracket is expected ");
		add(new TokenExpected(SyntaxType.bracket, bracket, null));
		return this;
	}

	//	public SyntaxBuilder optional() {
	//		int index = tokenExpecteds.size() - 1;
	//		TokenExpected before = tokenExpecteds.get(index);
	//		tokenExpecteds.add(index, new TokenExpected(before.tokenType(), before.val(), before.consumer(), true));
	//		return this;
	//	}

	public SyntaxBuilder delimiter(String delimiter) {
		return delimiterOpt(delimiter, false);
	}

	public SyntaxBuilder delimiterOpt(String delimiter, boolean optional) {
		Assertion.check().isTrue(SyntaxType.delimiters.getPattern().matcher(delimiter).matches(), "a delimiter is expected ");
		add(new TokenExpected(SyntaxType.delimiters, delimiter, null));
		return this;
	}

	public SyntaxBuilder string(Consumer<String> consumer) {
		add(new TokenExpected(SyntaxType.string_basic, null, consumer));
		return this;
	}
}
