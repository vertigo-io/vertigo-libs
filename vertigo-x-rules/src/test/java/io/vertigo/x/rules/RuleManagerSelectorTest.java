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

package io.vertigo.x.rules;

import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.List;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.x.impl.rules.RuleDefinition;
import io.vertigo.x.impl.rules.SelectorDefinition;


/**
 * Junit for rule manager
 * @author xdurand
 *
 */
public class RuleManagerSelectorTest {

	private AutoCloseableApp app;

	@Inject
	private RuleManager ruleManager;

	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config());
		Injector.injectMembers(this, app.getComponentSpace());
	}

	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	/**
	 * Add/Find Rules for RulesManager
	 */
	@Test
	public void testAddRule() {
		final SelectorDefinition rule1 = new SelectorDefinition(null, 1L);
		final SelectorDefinition rule2 = new SelectorDefinition(null, 2L);
		final SelectorDefinition rule3 = new SelectorDefinition(null, 2L);

		ruleManager.addSelector(rule1);
		ruleManager.addSelector(rule2);
		ruleManager.addSelector(rule3);

		// Only 1 rule
		final List<SelectorDefinition> selectorFetch1 = ruleManager.getSelectorsForItemId(1L);

		assertNotNull(selectorFetch1);
		assertThat(selectorFetch1.size(), is(1));
		assertThat(selectorFetch1, hasItem(rule1));

		// 2 rules
		final List<SelectorDefinition> selectorFetch2 = ruleManager.getSelectorsForItemId(2L);

		assertNotNull(selectorFetch2);
		assertThat(selectorFetch2.size(), is(2));
		assertThat(selectorFetch2, hasItems(rule2, rule3));
	}


	/**
	 * Add/Update/Delete Rules for RulesManager
	 */
	@Test
	public void testAddUpdateDelete() {

		// Rule created to Item 1
		final SelectorDefinition selector = new SelectorDefinition(null, 1L);
		ruleManager.addSelector(selector);

		final List<SelectorDefinition> rulesFetch_1_1 = ruleManager.getSelectorsForItemId(1L);

		assertNotNull(rulesFetch_1_1);
		assertThat(rulesFetch_1_1.size(), is(1));
		assertThat(rulesFetch_1_1, hasItem(selector));

		// Update rule. This is now associated with Item 2
		selector.setItemId(2L);
		ruleManager.updateSelector(selector);

		// The rule is not associated to item 1 anymore
		final List<SelectorDefinition> rulesFetch_1_0 = ruleManager.getSelectorsForItemId(1L);

		assertNotNull(rulesFetch_1_0);
		assertThat(rulesFetch_1_0.size(), is(0));

		// The rule should be associated with item 2
		final List<SelectorDefinition> rulesFetch_2_1 = ruleManager.getSelectorsForItemId(2L);

		assertNotNull(rulesFetch_2_1);
		assertThat(rulesFetch_2_1.size(), is(1));
		assertThat(rulesFetch_2_1, hasItem(selector));

		// Update rule. This is now associated with Item 2
		ruleManager.removeSelector(selector);

		// No rule should be associated with item 2
		final List<RuleDefinition> rulesFetch_2_0 = ruleManager.getRulesForItemId(2L);

		assertNotNull(rulesFetch_2_0);
		assertThat(rulesFetch_2_0.size(), is(0));
	}


}