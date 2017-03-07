/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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

package io.vertigo.x.rules.services;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.List;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.x.rules.MyAppConfig;
import io.vertigo.x.rules.data.MyDummyDtObject;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;

/**
 * Junit for rule manager
 *
 * @author xdurand
 *
 */
public class RuleServicesValidatorTest extends DbTest {

	private AutoCloseableApp app;

	@Inject
	private RuleServices ruleServices;

	/**
	 * Setup
	 */
	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config());
		DIInjector.injectMembers(this, app.getComponentSpace());
		doSetUp();
	}

	/**
	 * Teardown
	 */
	@After
	public void tearDown() {
		doTearDown();
		if (app != null) {
			app.close();
		}
	}

	/**
	 * Add/Find Rules for RulesManager
	 */
	@Test
	public void testAddRule() {
		final RuleDefinition rule1 = new RuleDefinition();
		rule1.setItemId(1L);
		final RuleDefinition rule2 = new RuleDefinition();
		rule2.setItemId(2L);
		final RuleDefinition rule3 = new RuleDefinition();
		rule3.setItemId(2L);

		ruleServices.addRule(rule1);
		ruleServices.addRule(rule2);
		ruleServices.addRule(rule3);

		// Only 1 rule
		final List<RuleDefinition> rulesFetch1 = ruleServices.getRulesForItemId(1L);

		assertNotNull(rulesFetch1);
		assertThat(rulesFetch1.size(), is(1));
		assertThat(rulesFetch1.get(0).getId(), is(rule1.getId()));
		assertThat(rulesFetch1.get(0).getCreationDate(), is(rule1.getCreationDate()));
		assertThat(rulesFetch1.get(0).getItemId(), is(rule1.getItemId()));
		assertThat(rulesFetch1.get(0).getLabel(), is(rule1.getLabel()));

		// 2 rules
		final List<RuleDefinition> rulesFetch2 = ruleServices.getRulesForItemId(2L);

		assertNotNull(rulesFetch2);
		assertThat(rulesFetch2.size(), is(2));

	}

	/**
	 * One simple rule for RulesManager
	 */
	@Test
	public void testValidationOneRuleOneCondition() {
		// Rule created to Item 1
		final RuleDefinition rule = new RuleDefinition();
		rule.setItemId(1L);
		ruleServices.addRule(rule);
		final RuleConditionDefinition condition = new RuleConditionDefinition();
		condition.setField("DIVISION");
		condition.setOperator("=");
		condition.setExpression("BTL");
		condition.setRudId(rule.getId());
		ruleServices.addCondition(condition);

		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		RuleContext ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The division field is null here
		boolean isValid = ruleServices.isRuleValid(1L, ruleContext);
		// The rule should NOT be valid here.
		assertThat(isValid, is(false));

		// The division is set to "BTL" here
		myDummyDtObject.setDivision("BTL");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should be valid now
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(true));
	}

	/**
	 * No rule for RulesManager
	 */
	@Test
	public void testValidationNoRuleNoCondition() {
		// Rule created to Item 1
		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		RuleContext ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The division field is null here
		boolean isValid = ruleServices.isRuleValid(1L, ruleContext);
		// The rule should NOT be valid here.
		assertThat(isValid, is(false));

		// The division is set to "BTL" here
		myDummyDtObject.setDivision("BTL");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should NOT be valid too
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(false));

		// The division is set to "ABC" here
		myDummyDtObject.setDivision("ABC");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should be valid too
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(false));
	}

	/**
	 * Combining many condition in one rule for RulesManager
	 */
	@Test
	public void testValidationOneRuleManyCondition() {
		// Rule created to Item 1
		final RuleDefinition rule = new RuleDefinition();
		rule.setItemId(1L);
		ruleServices.addRule(rule);
		final RuleConditionDefinition condition1 = new RuleConditionDefinition();
		condition1.setField("DIVISION");
		condition1.setOperator("=");
		condition1.setExpression("BTL");
		condition1.setRudId(rule.getId());
		ruleServices.addCondition(condition1);
		final RuleConditionDefinition condition2 = new RuleConditionDefinition();
		condition2.setField("ENTITY");
		condition2.setOperator("=");
		condition2.setExpression("ENT_1");
		condition2.setRudId(rule.getId());
		ruleServices.addCondition(condition2);

		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();

		RuleContext ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		// The division field is null here
		boolean isValid = ruleServices.isRuleValid(1L, ruleContext);
		// The rule should NOT be valid here.
		assertThat(isValid, is(false));

		// The division is set to "BTL" here
		myDummyDtObject.setDivision("BTL");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should NOT be valid (no entity defined)
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(false));

		// The entity is set to "ENT_1" here
		myDummyDtObject.setEntity("ENT_1");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should be valid now
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(true));

		// The division is set to "UNKNOWN_ENT" here
		myDummyDtObject.setEntity("UNKNOWN_ENT");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should NOT be valid anymore
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(false));
	}

	/**
	 * Combining many rules with one condition for RulesManager
	 */
	@Test
	public void testValidationManyRulesOneCondition() {
		// Rule created to Item 1
		final RuleDefinition rule_1 = new RuleDefinition();
		rule_1.setItemId(1L);
		ruleServices.addRule(rule_1);
		final RuleConditionDefinition condition_1 = new RuleConditionDefinition();
		condition_1.setField("DIVISION");
		condition_1.setOperator("=");
		condition_1.setExpression("BTL");
		condition_1.setRudId(rule_1.getId());
		ruleServices.addCondition(condition_1);

		final RuleDefinition rule_2 = new RuleDefinition();
		rule_2.setItemId(1L);
		ruleServices.addRule(rule_2);

		final RuleConditionDefinition condition_2 = new RuleConditionDefinition();
		condition_2.setField("ENTITY");
		condition_2.setOperator("=");
		condition_2.setExpression("ENT_1");
		condition_2.setRudId(rule_2.getId());
		ruleServices.addCondition(condition_2);

		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		RuleContext ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The division and entity field are null here
		boolean isValid = ruleServices.isRuleValid(1L, ruleContext);
		// The rule should NOT be valid here.
		assertThat(isValid, is(false));

		// The division is set to "BTL" here
		myDummyDtObject.setDivision("BTL");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should be valid as it match 1 rule
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(true));

		// The entity is set to "ENT_1" here
		myDummyDtObject.setEntity("ENT_1");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should be valid now (2 rules valid)
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(true));

		// The division is set to "UNKNOWN_ENT" here
		myDummyDtObject.setEntity("UNKNOWN_ENT");
		myDummyDtObject.setDivision("DIV");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should NOT be valid anymore
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(false));
	}

	/**
	 * Combining many rules with many rules for RulesManager
	 */
	@Test
	public void testValidationManyRulesManyCondition() {
		// Rule created to Item 1
		final RuleDefinition rule_1 = new RuleDefinition();
		rule_1.setItemId(1L);
		ruleServices.addRule(rule_1);

		final RuleConditionDefinition condition_1_1 = new RuleConditionDefinition();
		condition_1_1.setField("DIVISION");
		condition_1_1.setOperator("=");
		condition_1_1.setExpression("BTL");
		condition_1_1.setRudId(rule_1.getId());
		ruleServices.addCondition(condition_1_1);

		final RuleConditionDefinition condition_2_1 = new RuleConditionDefinition();
		condition_2_1.setField("ENTITY");
		condition_2_1.setOperator("=");
		condition_2_1.setExpression("ENT");
		condition_2_1.setRudId(rule_1.getId());

		ruleServices.addCondition(condition_2_1);
		final RuleDefinition rule_2 = new RuleDefinition();
		rule_2.setItemId(1L);
		ruleServices.addRule(rule_2);
		final RuleConditionDefinition condition_1_2 = new RuleConditionDefinition();
		condition_1_2.setField("DIVISION");
		condition_1_2.setOperator("=");
		condition_1_2.setExpression("BTL");
		condition_1_2.setRudId(rule_2.getId());
		ruleServices.addCondition(condition_1_2);

		final RuleConditionDefinition condition_2_2 = new RuleConditionDefinition();
		condition_2_2.setField("ENTITY");
		condition_2_2.setOperator("=");
		condition_2_2.setExpression("MAR");
		condition_2_2.setRudId(rule_2.getId());
		ruleServices.addCondition(condition_2_2);

		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		RuleContext ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The division and entity field are null here
		boolean isValid = ruleServices.isRuleValid(1L, ruleContext);
		// The rule should be valid here.
		assertThat(isValid, is(false));

		// The division is set to "BTL" here
		myDummyDtObject.setDivision("BTL");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should NOT be valid as no rule match
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(false));

		// The entity is set to "MAR" here
		myDummyDtObject.setEntity("MAR");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should NOT be valid (only one condition in each rules is
		// valid)
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(true));

		// The entity is set to "ENT" here
		myDummyDtObject.setEntity("ENT");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should be valid (match all conditions of rule 1)
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(true));

		// The division is set to "UNKNOWN_ENT" here
		myDummyDtObject.setEntity("UNKNOWN_ENT");
		myDummyDtObject.setDivision("DIV");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The rule should NOT be valid anymore
		isValid = ruleServices.isRuleValid(1L, ruleContext);
		assertThat(isValid, is(false));
	}

}
