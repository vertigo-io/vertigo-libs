package io.vertigo.database.migration;

import io.vertigo.core.node.component.Manager;
import io.vertigo.database.sql.SqlManager;

/**
 * MigrationManager is used to perform migration tasks on databases.
 * It's mainly a question of creating/migration database schemas.
 * Two type of tasks can be performed  :
 *   <ul>
 *    <li>update : Update your database schema and data to the current version of your app</li>
 *    <li>check :  Check that node and database are in a coherent state</li>
 *   </ul>
 * @author mlaroche
 *
 */
public interface MigrationManager extends Manager {

	/**
	 * Check if database is ok.
	 * @param connectionName ConnectionProviderName (in the Vertigo's way). For example @see {@link SqlManager.MAIN_CONNECTION_PROVIDER_NAME}
	 */
	void check(final String connectionName);

	/**
	 * Perform all taks on database to make it up to date.
	 * @param connectionName ConnectionProviderName (in the Vertigo's way). For example @see {@link SqlManager.MAIN_CONNECTION_PROVIDER_NAME}
	 */
	void update(final String connectionName);

}
