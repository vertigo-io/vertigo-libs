package io.vertigo.x.impl.account;

import io.vertigo.app.config.DefinitionProvider;
import io.vertigo.core.spaces.definiton.Definition;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtDefinitionBuilder;
import io.vertigo.util.ListBuilder;

import java.util.Iterator;

public final class AccountDefinitionProvider implements DefinitionProvider {
	@Override
	public Iterator<Definition> iterator() {
		final Domain domainAccountId = new Domain("DO_X_ACCOUNT_ID", DataType.String);
		final Domain domainAccountName = new Domain("DO_X_ACCOUNT_NAME", DataType.String);
		final Domain domainAccountEmail = new Domain("DO_X_ACCOUNT_EMAIL", DataType.String);

		final DtDefinition accountDtDefinition = new DtDefinitionBuilder("DT_ACCOUNT")
				.addIdField("ID", "id", domainAccountId, false, false)
				.addDataField("DISPLAY_NAME", "displayName", domainAccountName, false, true, true, true)
				.addDataField("EMAIL", "email", domainAccountEmail, false, true, false, false)
				.build();

		final DtDefinition accountGroupDtDefinition = new DtDefinitionBuilder("DT_ACCOUNT_GROUP")
				.addIdField("ID", "id", domainAccountId, false, false)
				.addDataField("DISPLAY_NAME", "displayName", domainAccountName, false, true, true, true)
				.build();

		return new ListBuilder<Definition>()
				.add(domainAccountId)
				.add(domainAccountName)
				.add(domainAccountEmail)
				.add(accountDtDefinition)
				.add(accountGroupDtDefinition)
				.build()
				.iterator();
	}
}
