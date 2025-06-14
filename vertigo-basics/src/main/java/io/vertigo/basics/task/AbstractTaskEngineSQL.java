/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.basics.task;

import java.sql.BatchUpdateException;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.OptionalInt;

import io.vertigo.commons.script.ScriptManager;
import io.vertigo.commons.script.SeparatorType;
import io.vertigo.commons.transaction.VTransaction;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionResourceId;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.database.sql.connection.SqlConnectionProvider;
import io.vertigo.database.sql.statement.SqlStatement;
import io.vertigo.database.sql.statement.SqlStatementBuilder;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.task.definitions.TaskAttribute;
import io.vertigo.datamodel.task.model.TaskEngine;

/**
 * Fournit des méthodes de haut niveau pour les services de type SQL.<br>
 * Un Service SQL est composé de paramètre de type primitif, DTO ou DTC, en IN, OUT ou INOUT et d'une requête SQL
 * sous forme de texte.
 * La requête est parsée puis préparée pour replacer les paramètres dynamo  par des variables bindées.
 * Grammaire des requêtes :<br>
 * <code>#<parametre>#</code> : paramètre IN <br>
 * <code>%<parametre>%</code> : paramètre OUT <br>
 * <code>@<parametre>@</code> : paramètre INOUT <br>
 * où <parametre> est : <br>
 * "primitif"     : LON_IDENTIFIANT_ID ou DAT_DATE_SAISIE <br>
 * "champ de dto" : <nom_du_DTO>.<nom_du_champ> : DTO_PERSONNE.NOM ou encore DTO_PERSONNE.PER_ID <br>
 * "champ de dtc" : <nom_du_DTC>.<n°_de_ligne>.<nom_du_champ> : DTC_PERSONNE.2.NOM ou encore DTC_PERSONNE.0.PER_ID <br>
 *  <br>
 * Les DTO et DTC n'ont pas besoin d'être en OUT ou en INOUT pour être mutées. <br>
 *  <br>
 * Intérêt de gérer des paramètres DTC : il existe maintenant un moyen d'accéder aux champs
 * d'une DTC, qui peut être utilisé pour créer des ServiceProviderSQL pseudo-dynamiques (ajout de mots clefs
 * dans la requête SQL du KSP pour gérer des itérations sur DTC par ex). <br>
 *
 * Exemple de requête : <br>
 *
 * SELECT TOTO_ID, NOM  <br>
 * FROM TOTO  <br>
 * WHERE TOTO_ID = #LON_TOTO_ID# <br>
 * AND   NOM like #DTO_FILTRE.NOM#||'%' <br>
 * AND   TYPE_ID IN (#DTC_TYPE.0.TYPE_ID#,#DTC_TYPE.1.TYPE_ID#,#DTC_TYPE.2.TYPE_ID#) <br>
 *
 * De plus permet de créer du SQL dynamiquement interprété.
 * Les paramètres IN de la tache peuvent être invoqués pour construire
 * la requête SQL.
 * Exemple :
 * request = " Select *
 *       From PRODUIT
 *       <%if (dtoProduitCritere.getPrdLibelle()!=null) {%>
 *               Where PRD_LIBELLE like #DTO_PRODUIT_CRITERE.PRD_LIBELLE#||'%%'
 *       <%}%> order by <%=1%>";
 *
 * @author  pchretien, npiedeloup
 */
public abstract class AbstractTaskEngineSQL extends TaskEngine {
	/**
	 * Identifiant de ressource SQL par défaut.
	 */
	public static final VTransactionResourceId<SqlConnection> SQL_MAIN_RESOURCE_ID = new VTransactionResourceId<>(VTransactionResourceId.Priority.TOP, "Sql-main");

	/**
	 * Nom de l'attribut recevant le nombre de lignes affectées par un Statement.
	 * Dans le cas des Batchs ce nombre correspond à la somme de toutes les lignes affectées par le batch.
	 */
	//Qui utilise ça ?? // peut on revenir à une forme explicite
	public static final String SQL_ROWCOUNT = "intSqlRowcount";
	private static final String MAIN_DATASPACE = "main";

	private final ScriptManager scriptManager;
	private final VTransactionManager transactionManager;
	private final SqlManager sqlManager;
	private final SmartTypeManager smartTypeManager;
	private final AnalyticsManager analyticsManager;

	/**
	 * Constructor.
	 * @param scriptManager Manager de traitment de scripts
	 */
	protected AbstractTaskEngineSQL(
			final ScriptManager scriptManager,
			final VTransactionManager transactionManager,
			final SqlManager sqlManager,
			final SmartTypeManager smartTypeManager,
			final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotNull(scriptManager)
				.isNotNull(transactionManager)
				.isNotNull(sqlManager)
				.isNotNull(smartTypeManager)
				.isNotNull(analyticsManager);
		//-----
		this.scriptManager = scriptManager;
		this.transactionManager = transactionManager;
		this.sqlManager = sqlManager;
		this.smartTypeManager = smartTypeManager;
		this.analyticsManager = analyticsManager;
	}

	/**
	 * Exécution de la requête.
	 * @param connection Connexion BDD
	 * @return Nombre de lignes affectées (Insert/ Update / Delete)
	 * @throws SQLException Erreur sql
	 */
	protected abstract OptionalInt doExecute(
			final SqlStatement sqlStatement,
			final SqlConnection connection) throws SQLException;

	/** {@inheritDoc} */
	@Override
	public void execute() {
		final SqlConnection connection = obtainConnection();

		final SqlStatementBuilder statementBuilder = SqlStatement.builder(getSqlQuery().trim());
		setNamedParameters(statementBuilder);
		final SqlStatement sqlStatement = statementBuilder.build();
		try {
			//Execute le Statement JDBC.
			final OptionalInt sqlRowcountOpt = doExecute(sqlStatement, connection);
			//On positionne le nombre de lignes affectées.
			sqlRowcountOpt.ifPresent(this::setRowCount);
		} catch (final BatchUpdateException sqle) { //some exception embedded the usefull one
			// Gère les erreurs d'exécution Batch JDBC.
			throw handleSQLException(connection, sqle.getNextException(), sqlStatement.getSqlQuery());
		} catch (final SQLException sqle) {
			//Gère les erreurs d'exécution JDBC.
			throw handleSQLException(connection, sqle, sqlStatement.getSqlQuery());
		}

	}

	private void setRowCount(final int sqlRowcount) {
		analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer.setMeasure("sqlRowCount", sqlRowcount));
		getTaskDefinition().getOutAttributeOption().ifPresent(
				outTaskAttribute -> {
					if (SQL_ROWCOUNT.equals(outTaskAttribute.name())) {
						setResult(sqlRowcount);
					}
				});
	}

	//-----
	/**
	 * Retourne la Query qui sera parsée
	 * Par défaut il s'agit de la request définie sur le service
	 * @return Chaine de configuration
	 */
	protected String getSqlQuery() {
		//On ajoute dans la requête SQL le nom de la tache utilisée
		return preProcessQuery("/* TaskEngine : " +
				getTaskDefinition().getName() +
				" */\n" +
				getTaskDefinition().getRequest());
	}

	/**
	 * Permet de créer du SQL dynamiquement interprété.
	 * Les paramètres IN de la tache peuvent être invoqués pour construire
	 * la requête SQL.
	 * Exemple :
	 * request = " Select *
	 *       From PRODUIT
	 *       <%if (dtoProduitCritere.getPrdLibelle()!=null) {%>
	 *               Where PRD_LIBELLE like #DTO_PRODUIT_CRITERE.PRD_LIBELLE#||'%%'
	 *       <%}%> order by <%=1%>";
	 * @param sqlQuery Requete à évaluer
	 * @return Requete évaluée
	 **/
	protected final String preProcessQuery(final String sqlQuery) {
		final Collection<TaskAttribute> inAttributes = getTaskDefinition().getInAttributes();
		final Map<TaskAttribute, Object> inTaskAttributes = new HashMap<>();
		for (final TaskAttribute taskAttribute : inAttributes) {
			inTaskAttributes.put(taskAttribute, getValue(taskAttribute.name()));
		}
		//-----
		final ScriptPreProcessor scriptPreProcessor = new ScriptPreProcessor(scriptManager, inTaskAttributes, getContextProperties(), SeparatorType.CLASSIC);
		final TrimPreProcessor trimPreProcessor = new TrimPreProcessor(SeparatorType.BEGIN_SEPARATOR_CLASSIC, SeparatorType.END_SEPARATOR_CLASSIC);
		final WhereInPreProcessor whereInPreProcessor = new WhereInPreProcessor(inTaskAttributes);
		//--
		String sql = sqlQuery;
		sql = scriptPreProcessor.evaluate(sql);
		sql = trimPreProcessor.evaluate(sql);
		sql = whereInPreProcessor.evaluate(sql);
		return sql;
	}

	protected void setNamedParameters(final SqlStatementBuilder sqlStatementBuilder) {
		getTaskDefinition().getInAttributes()
				.forEach(taskInAttribute -> sqlStatementBuilder.bind(
						taskInAttribute.name(),
						taskInAttribute.smartTypeDefinition().getJavaClass(),
						getValue(taskInAttribute.name())));
	}

	/**
	 * Retourne la connexion SQL de cette transaction en la demandant au pool de connexion si nécessaire.
	 * @return Connexion SQL
	 */
	private SqlConnection obtainConnection() {
		final VTransaction transaction = transactionManager.getCurrentTransaction();
		SqlConnection connection = transaction.getResource(getVTransactionResourceId());
		if (connection == null) {
			// On récupère une connexion du pool
			// Utilise le provider de connexion déclaré sur le Container.
			connection = getConnectionProvider().obtainConnection();
			transaction.addResource(getVTransactionResourceId(), connection);
		}
		return connection;
	}

	/**
	 * @return Id de la Ressource Connexion SQL dans la transaction
	 */
	protected VTransactionResourceId<SqlConnection> getVTransactionResourceId() {
		final String dataSpace = getTaskDefinition().getDataSpace();
		return MAIN_DATASPACE.equals(dataSpace)
				? SQL_MAIN_RESOURCE_ID
				: new VTransactionResourceId<>(VTransactionResourceId.Priority.TOP, "Sql-" + dataSpace);
	}

	/**
	 * @return Manager de base de données
	 */
	protected final SqlManager getSqlManager() {
		return sqlManager;
	}

	/**
	 * @return Manager du modèle
	 */
	protected final SmartTypeManager getSmartTypeManager() {
		return smartTypeManager;
	}

	/**
	 * Il est possible de surcharger la configuration SQL d'un service.
	 * @return Configuration SQL.
	 */
	protected SqlConnectionProvider getConnectionProvider() {
		return getSqlManager().getConnectionProvider(Optional.ofNullable(getContextProperty("connectionName")).orElse(SqlManager.MAIN_CONNECTION_PROVIDER_NAME));
	}

	/**
	 * Gestion centralisée des exceptions SQL.
	 * @param connection Connexion
	 * @param sqle Exception SQL
	 */
	private static RuntimeException handleSQLException(final SqlConnection connection, final SQLException sqle, final String statementInfos) {
		return connection.getDataBase().getSqlExceptionHandler()
				.handleSQLException(sqle, statementInfos);
	}
}
