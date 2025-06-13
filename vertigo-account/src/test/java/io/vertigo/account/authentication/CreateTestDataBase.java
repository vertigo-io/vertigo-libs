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
package io.vertigo.account.authentication;

import java.util.List;
import java.util.Optional;

import io.vertigo.account.SqlUtil;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.lang.ListBuilder;
import io.vertigo.core.node.Node;
import io.vertigo.datamodel.task.TaskManager;

final class CreateTestDataBase {

	private CreateTestDataBase() {
		//private
	}

	public static void initMainStore() {
		final VTransactionManager transactionManager = Node.getNode().getComponentSpace().resolve(VTransactionManager.class);
		final TaskManager taskManager = Node.getNode().getComponentSpace().resolve(TaskManager.class);

		//A chaque test on recrée la table famille
		SqlUtil.execRequests(
				transactionManager,
				taskManager,
				getCreateMainStoreRequests(),
				"TkInitMain",
				Optional.empty());
	}

	private static List<String> getCreateMainStoreRequests() {
		return new ListBuilder<String>()
				.addAll(getCreateUserCredentialRequests())
				.build();
	}

	private static List<String> getCreateUserCredentialRequests() {
		return List.of(
				" create table USER_CREDENTIAL(UCR_ID varchar(50), LOGIN varchar(100), PASSWORD varchar(100), MAIL varchar(100))",
				" create sequence SEQ_USER_CREDENTIAL start with 10001 increment by 1",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (0, 'admin', '5vIy0buT0cyhh7ODeWKEv5fvaWN1mdoNE_rmkCkjvhN8u05S_Et_Q=', 'admin@yopmail.com')",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (1, 'jdoe', '', 'john.doe@yopmail.com')",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (2, 'pluckey', '', 'palmer.luckey@yopmail.com')",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (3, 'bclinton', '', 'bill.clinton@yopmail.com')",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (4, 'pmormon', '', 'phil.mormon@yopmail.com')",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (5, 'npi', '', 'npi@vertigo.io')",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (10, 'bdufour', '', 'bdufour@yopmail.com')",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (11, 'nlegendre', '', 'nicolas.legendre@yopmail.com')",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (12, 'mgarnier', '', 'marie.garnier@yopmail.com')",
				"insert into USER_CREDENTIAL(UCR_ID, LOGIN, PASSWORD, MAIL) values (13, 'hbertrand', '', 'hb@yopmail.com')");
	}

}
