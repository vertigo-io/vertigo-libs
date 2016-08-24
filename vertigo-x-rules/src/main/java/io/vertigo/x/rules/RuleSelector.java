package io.vertigo.x.rules;

import java.util.List;

import io.vertigo.x.account.Account;
import io.vertigo.x.impl.rules.RuleContext;
import io.vertigo.x.impl.rules.SelectorDefinition;

/**
 *
 * @author xdurand
 *
 */
public interface RuleSelector {


	/**
	 * Select accounts matching the selector for an activity
	 * @param idActivityDefinition
	 * @param selectors
	 * @param ruleContext
	 * @return a list of account
	 */
	List<Account> selectAccounts(final Long idActivityDefinition, final List<SelectorDefinition> selectors, final RuleContext ruleContext);



}
