/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.commons.peg;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.peg.PegSolver.PegSolverFunction;
import io.vertigo.commons.peg.rule.PegRule;
import io.vertigo.commons.peg.rule.PegRules;
import io.vertigo.commons.peg.rule.PegWordRuleMode;
import io.vertigo.commons.peg.term.PegCompareTerm;

public class CompareTest {

	private static final PegRule<PegSolver<String, Object, Boolean>> RULE = PegRules.delayedOperationAndComparison(PegRules.word(false, "0123456789", PegWordRuleMode.ACCEPT, "0-9"));

	private static final PegSolverFunction<String, Object> TERM_PARSER = s -> Integer.parseInt(s);

	@Test
	public void testCompareTerm() throws PegParsingValueException {
		final var i12 = Integer.valueOf(12);
		final var i13 = Integer.valueOf(13);

		Assertions.assertTrue(PegCompareTerm.doCompare(i12, i13, PegCompareTerm.LT));
		Assertions.assertTrue(PegCompareTerm.doCompare(i12, i12, PegCompareTerm.EQ));
		Assertions.assertTrue(PegCompareTerm.doCompare(i12, i12, PegCompareTerm.GTE));
		Assertions.assertFalse(PegCompareTerm.doCompare(i12, i13, PegCompareTerm.EQ));

		final var s12 = "12";
		final var s13 = "13";
		Assertions.assertThrows(PegParsingValueException.class, () -> {
			PegCompareTerm.doCompare(s12, s13, PegCompareTerm.LT);
		});
		Assertions.assertTrue(PegCompareTerm.doCompare(s12, s12, PegCompareTerm.EQ));
		Assertions.assertFalse(PegCompareTerm.doCompare(s12, s12, PegCompareTerm.NEQ));

		Assertions.assertFalse(PegCompareTerm.doCompare(s12, s13, PegCompareTerm.EQ));
		Assertions.assertTrue(PegCompareTerm.doCompare(s12, s13, PegCompareTerm.NEQ));

		Assertions.assertThrows(PegParsingValueException.class, () -> {
			PegCompareTerm.doCompare(i12, s13, PegCompareTerm.EQ);
		});
	}

	@Test
	public void testComparisonRule() throws PegNoMatchFoundException, PegParsingValueException {
		Assertions.assertTrue(RULE.parse("5*3 > 12").getValue().apply(TERM_PARSER));

		Assertions.assertFalse(RULE.parse("5*3 >= 3 * (3+2) +1").getValue().apply(TERM_PARSER));
	}

	@Test
	public void testComparisonRuleErrors() {
		// Missing comparator
		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			RULE.parse("12 + 5");
		});

		// Missing second term
		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			RULE.parse("12 + 5 > ");
		});
	}
}
