package io.vertigo.commons.peg.rule;

import java.util.function.Function;

public interface PegComparisonRuleSolver extends Function<Function<String, Object>, Boolean> {
}