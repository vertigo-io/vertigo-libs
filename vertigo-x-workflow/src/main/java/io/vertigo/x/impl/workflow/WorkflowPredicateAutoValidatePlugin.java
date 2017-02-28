/**
 * 
 */
package io.vertigo.x.impl.workflow;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.lang.Plugin;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;

/**
 * @author xdurand
 *
 */
public interface WorkflowPredicateAutoValidatePlugin extends Plugin {

	/**
	 * Predicate to determine if the current activityDefinition can be autovalidated for the provided object
	 * @param activityDefinition the activityDefinition to test
	 * @param object the object to test
	 * @return true if the current activity can be auto validated, false otherwise
	 */
	boolean canAutoValidateActivity(final WfActivityDefinition activityDefinition, final DtObject object);

}
