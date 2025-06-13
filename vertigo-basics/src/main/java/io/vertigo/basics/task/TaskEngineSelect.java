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

import java.sql.SQLException;
import java.util.List;
import java.util.OptionalInt;

import javax.inject.Inject;

import io.vertigo.commons.script.ScriptManager;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.database.sql.statement.SqlStatement;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.util.VCollectors;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.task.definitions.TaskAttribute;

/**
 * Permet de réaliser des requêtes sur un base de données.<br>
 * <br>
 * Paramètres d'entrée : n String, Date, Boolean, Double, Integer ou DTO, DTC<br>
 * Paramètres de sorties : 1 DTO <u>ou</u> DTC <u>
 * <br>
 * Dans le cas d'un DtObject en sortie, la requête SQL doit ramener un et un seul
 * enregistrement. Dans le cas contraire, la méthode execute() de la classe service
 * remontera un SQLException().<br>
 * <br>
 * Chaine de configuration :<br>
 * La chaine de configuration utilise les délimiteurs #NOM# pour les paramètres.
 * L'utilisation d'une valeur d'un DtObject est déclarée par #DTOBJECT.FIELD#.
 * Le paramètre de sortie n'apparaît pas dans la chaine de configuration.<br>
 * <br>
 * Un DtObject d'entrée peut être utilisé pour la sortie et est alors déclaré en
 * entrée/sortie.
 *
 * @author  FCONSTANTIN
 */
public class TaskEngineSelect extends AbstractTaskEngineSQL {

	/**
	 * Constructor.
	 * @param scriptManager scriptManager
	 * @param transactionManager transactionManager
	 * @param sqlManager sqlDataBaseManager
	 */
	@Inject
	public TaskEngineSelect(
			final ScriptManager scriptManager,
			final VTransactionManager transactionManager,
			final SqlManager sqlManager,
			final SmartTypeManager smartTypeManager,
			final AnalyticsManager analyticsManager) {
		super(scriptManager, transactionManager, sqlManager, smartTypeManager, analyticsManager);
	}

	/*
	 * Récupération de l'attribut OUT. Il doit être unique.
	 */
	private TaskAttribute getOutTaskAttribute() {
		return getTaskDefinition().getOutAttributeOption()
				.orElseThrow(() -> new VSystemException("TaskEngineSelect must have at least one DtObject or one DtList!"));
	}

	/** {@inheritDoc} */
	@Override
	protected OptionalInt doExecute(
			final SqlStatement sqlStatement,
			final SqlConnection connection) throws SQLException {
		final TaskAttribute outAttribute = getOutTaskAttribute();
		final List<?> result;
		final Integer limit = outAttribute.cardinality().hasMany() ? null : 1;
		result = getSqlManager().executeQuery(sqlStatement, outAttribute.smartTypeDefinition().getJavaClass(), getSmartTypeManager().getTypeAdapters("sql"), limit, connection);
		switch (outAttribute.smartTypeDefinition().getScope()) {
			case DATA_TYPE:
				if (outAttribute.cardinality().hasMany()) {
					final DtList<?> dtList = (DtList<?>) result
							.stream()
							.map(DataObject.class::cast)
							.collect(VCollectors.toDtList(outAttribute.smartTypeDefinition().getJavaClass()));
					setResult(dtList);
				} else {
					Assertion.check().isTrue(result.size() <= 1, "Limit exceeded");
					setResult(result.isEmpty() ? null : result.get(0));
				}
				break;
			case BASIC_TYPE:
			case VALUE_TYPE:
				if (outAttribute.cardinality().hasMany()) {
					setResult(result);
				} else {
					Assertion.check().isTrue(result.size() <= 1, "Limit exceeded");
					setResult(result.isEmpty() ? null : result.get(0));
				}
				break;
			default:
				throw new IllegalStateException();
		}
		return OptionalInt.of(result.size());
	}

}
