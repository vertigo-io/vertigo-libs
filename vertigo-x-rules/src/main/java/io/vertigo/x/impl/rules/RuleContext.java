package io.vertigo.x.impl.rules;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 *
 * @author xdurand
 *
 */
public class RuleContext {

	/**
	 *
	 */
	public Map<String, String> context = null;

	/**
	 *
	 * @param dtObject
	 * @param constants
	 */
	public RuleContext(final DtObject dtObject, final RuleConstants constants) {
		// Merging Object fields with constants

		final Map<String, String> mapMerge = new HashMap<>();

		//Merge of data fields
		final DtDefinition definition = DtObjectUtil.findDtDefinition(dtObject);
		final List<DtField> fields = definition.getFields();

		for (final DtField dtField : fields) {
			mapMerge.put(dtField.name(), String.valueOf(dtField.getDataAccessor().getValue(dtObject))); //TODO: ne pas utiliser toString
		}

		//Merge of constants
		for (final Map.Entry<String, String> entry: constants.getValues()) {
			mapMerge.put(entry.getKey(), entry.getValue());
		}

		context = Collections.unmodifiableMap(mapMerge);
	}


	/**
	 * @return the context
	 */
	public Map<String, String> getContext() {
		return context;
	}


}