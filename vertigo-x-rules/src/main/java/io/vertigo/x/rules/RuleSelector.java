package io.vertigo.x.rules;

import java.util.List;

import io.vertigo.x.account.Account;

/**
 *
 * @author xdurand
 *
 */
public interface RuleSelector {


	/**
	 * Select accounts matching the selector for an activity
	 * @param idActivityDefinition
	 * @param item
	 * @return the list of account
	 */
	List<Account> selectAccounts(Long idActivityDefinition, Object item);

}
