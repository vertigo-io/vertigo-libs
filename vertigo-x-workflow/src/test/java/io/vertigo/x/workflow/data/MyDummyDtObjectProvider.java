package io.vertigo.x.workflow.data;

import java.util.Iterator;

import io.vertigo.app.config.DefinitionProvider;
import io.vertigo.core.spaces.definiton.Definition;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DomainBuilder;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtDefinitionBuilder;
import io.vertigo.util.ListBuilder;

/**
 * Provides the definitions for the DummyDtObject used in unit tests .
 * @author xdurand
 */
public class MyDummyDtObjectProvider implements DefinitionProvider {

	@Override
	public Iterator<Definition> iterator() {
		final Domain domainDummyId = new DomainBuilder("DO_X_DUMMY_ID", DataType.Long).build();
		final Domain domainDummyCode = new DomainBuilder("DO_X_DUMMY_CODE", DataType.String).build();
		final Domain domainDummyLabel = new DomainBuilder("DO_X_DUMMY_LABEL", DataType.String).build();

		final DtDefinition wfDummyObjectDtDefinition = new DtDefinitionBuilder("DT_MY_DUMMY_DT_OBJECT")
				.addIdField("ID", "id", domainDummyId, false, false)
				.addDataField("ENTITY", "entity", domainDummyCode, true, true, false, false)
				.addDataField("DIVISION", "division", domainDummyCode, true, true, false, false)
				.addDataField("NOM", "nom", domainDummyLabel, true, true, false, false)
				.build();

		return new ListBuilder<Definition>()
				.add(domainDummyId)
				.add(domainDummyCode)
				.add(domainDummyLabel)
				.add(wfDummyObjectDtDefinition)
				.build()
				.iterator();
	}

}