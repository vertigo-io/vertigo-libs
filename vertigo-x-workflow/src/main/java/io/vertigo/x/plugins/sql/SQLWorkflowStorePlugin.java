/**
 *
 */
package io.vertigo.x.plugins.sql;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.x.impl.workflow.WorkflowStorePlugin;
import io.vertigo.x.rules.dao.RuleConditionDefinitionDAO;
import io.vertigo.x.rules.dao.RuleDefinitionDAO;
import io.vertigo.x.rules.dao.RuleFilterDefinitionDAO;
import io.vertigo.x.rules.dao.SelectorDefinitionDAO;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;
import io.vertigo.x.workflow.WfCodeTransition;
import io.vertigo.x.workflow.WfTransitionCriteria;
import io.vertigo.x.workflow.dao.instance.WfActivityDAO;
import io.vertigo.x.workflow.dao.instance.WfDecisionDAO;
import io.vertigo.x.workflow.dao.instance.WfStatusDAO;
import io.vertigo.x.workflow.dao.instance.WfWorkflowDAO;
import io.vertigo.x.workflow.dao.model.WfActivityDefinitionDAO;
import io.vertigo.x.workflow.dao.model.WfMultiplicityDefinitionDAO;
import io.vertigo.x.workflow.dao.model.WfTransitionDefinitionDAO;
import io.vertigo.x.workflow.dao.model.WfWorkflowDefinitionDAO;
import io.vertigo.x.workflow.dao.workflow.WorkflowPAO;
import io.vertigo.x.workflow.domain.DtDefinitions.WfDecisionFields;
import io.vertigo.x.workflow.domain.DtDefinitions.WfWorkflowDefinitionFields;
import io.vertigo.x.workflow.domain.DtDefinitions.WfWorkflowFields;
import io.vertigo.x.workflow.domain.instance.WfActivity;
import io.vertigo.x.workflow.domain.instance.WfDecision;
import io.vertigo.x.workflow.domain.instance.WfWorkflow;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;
import io.vertigo.x.workflow.domain.model.WfTransitionDefinition;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

/**
 * @author OHJAJI
 */
public class SQLWorkflowStorePlugin implements WorkflowStorePlugin {

	@Inject
	private WorkflowPAO workflowPAO;
	@Inject
	private WfTransitionDefinitionDAO wfTransitionDefinitionDAO;
	@Inject
	private WfActivityDefinitionDAO wfActivityDefinitionDAO;
	@Inject
	private WfMultiplicityDefinitionDAO wfMultiplicityDefinitionDAO;
	@Inject
	private WfWorkflowDefinitionDAO wfWorkflowDefinitionDAO;
	@Inject
	private RuleDefinitionDAO ruleDefinitionDAO;
	@Inject
	private RuleConditionDefinitionDAO ruleConditionDefinitionDAO;
	@Inject
	private SelectorDefinitionDAO selectorDefinitionDAO;
	@Inject
	private RuleFilterDefinitionDAO ruleFilterDefinitionDAO;
	@Inject
	private WfActivityDAO wfActivityDAO;
	@Inject
	private WfDecisionDAO wfDecisionDAO;
	@Inject
	private WfWorkflowDAO wfWorkflowDAO;
	@Inject
	private WfStatusDAO wfStatusDAO;

	/** {@inheritDoc} */
	@Override
	public void createWorkflowInstance(final WfWorkflow workflow) {
		wfWorkflowDAO.save(workflow);
	}

	/** {@inheritDoc} */
	@Override
	public WfWorkflow readWorkflowInstanceById(final Long wfwId) {
		return wfWorkflowDAO.get(wfwId);
	}

	/** {@inheritDoc} */
	@Override
	public void updateWorkflowInstance(final WfWorkflow workflow) {
		wfWorkflowDAO.save(workflow);
	}

	/** {@inheritDoc} */
	@Override
	public WfActivity readActivity(final Long wfadId) {
		return wfActivityDAO.get(wfadId);
	}

	/** {@inheritDoc} */
	@Override
	public void createActivity(final WfActivity wfActivity) {
		wfActivityDAO.save(wfActivity);
	}

	/** {@inheritDoc} */
	@Override
	public void updateActivity(final WfActivity wfActivity) {
		wfActivityDAO.update(wfActivity);
	}

	/** {@inheritDoc} */
	@Override
	public void deleteActivity(final WfActivity wfActivity) {
		wfActivityDAO.delete(wfActivity.getWfaId());
	}

	/** {@inheritDoc} */
	@Override
	public void createDecision(final WfDecision wfDecision) {
		wfDecisionDAO.save(wfDecision);
	}

	/** {@inheritDoc} */
	@Override
	public List<WfDecision> findAllDecisionByActivity(final WfActivity wfActivity) {
		final DtList<WfDecision> list = wfDecisionDAO.getListByDtField(WfDecisionFields.WFA_ID.name(),
				wfActivity.getWfaId(), Integer.MAX_VALUE);
		if (list != null && !list.isEmpty()) {
			return list;
		}
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public boolean hasNextActivity(final WfActivity activity) {
		return hasNextActivity(activity, WfCodeTransition.DEFAULT.name().toLowerCase());

	}

	/** {@inheritDoc} */
	@Override
	public boolean hasNextActivity(final WfActivity activity, final String transitionName) {
		Optional<DtList<WfTransitionDefinition>> list = wfTransitionDefinitionDAO
				.hasNextTransition(activity.getWfadId(), transitionName);
		if (list.isPresent() && list.get().size() > 0) {
			return true;
		} else {
			return false;
		}
	}

	/** {@inheritDoc} */
	@Override
	public int countDefaultTransitions(final WfWorkflowDefinition wfWorkflowDefinition) {
		Integer dummyInterger = workflowPAO.countDefaultTransactions(wfWorkflowDefinition.getWfwdId());
		return dummyInterger.intValue();
	}

	/** {@inheritDoc} */
	@Override
	public void createWorkflowDefinition(final WfWorkflowDefinition workflowDefinition) {
		wfWorkflowDefinitionDAO.save(workflowDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public WfWorkflowDefinition readWorkflowDefinition(final Long wfwdId) {
		return wfWorkflowDefinitionDAO.get(wfwdId);
	}

	/** {@inheritDoc} */
	@Override
	public WfWorkflowDefinition readWorkflowDefinition(final String definitionName) {
		WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinition();
		final DtList<WfWorkflowDefinition> list = wfWorkflowDefinitionDAO
				.getListByDtField(WfWorkflowDefinitionFields.NAME.name(), definitionName, 1);
		if (list != null && !list.isEmpty()) {
			wfWorkflowDefinition = list.get(0);
		}
		return wfWorkflowDefinition;
	}

	/** {@inheritDoc} */
	@Override
	public void updateWorkflowDefinition(final WfWorkflowDefinition wfWorkflowDefinition) {
		wfWorkflowDefinitionDAO.save(wfWorkflowDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public void createActivityDefinition(final WfWorkflowDefinition wfWorkflowDefinition,
			final WfActivityDefinition wfActivityDefinition) {
		wfActivityDefinition.setWfwdId(wfWorkflowDefinition.getWfwdId());
		wfActivityDefinitionDAO.save(wfActivityDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public void deleteActivityDefinition(final WfActivityDefinition wfActivityDefinition) {
		wfActivityDefinitionDAO.delete(wfActivityDefinition.getWfadId());
	}

	/** {@inheritDoc} */
	@Override
	public WfActivityDefinition readActivityDefinition(final Long wfadId) {
		return wfActivityDefinitionDAO.get(wfadId);
	}

	/** {@inheritDoc} */
	@Override
	public void updateActivityDefinition(final WfActivityDefinition wfActivityDefinition) {
		wfActivityDefinitionDAO.save(wfActivityDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public WfActivityDefinition findActivityDefinitionByPosition(final WfWorkflowDefinition wfWorkflowDefinition,
			final int position) {
		Optional<WfActivityDefinition> activityDefinition = wfActivityDefinitionDAO
				.findActivityDefinitionByPosition(wfWorkflowDefinition.getWfwdId(), position);
		if (activityDefinition.isPresent()) {
			return activityDefinition.get();
		} else {
			return null;
		}
	}

	/** {@inheritDoc} */
	@Override
	public List<WfActivityDefinition> findAllDefaultActivityDefinitions(
			final WfWorkflowDefinition wfWorkflowDefinition) {
		Optional<DtList<WfActivityDefinition>> activityDefinitionList = wfActivityDefinitionDAO
				.findAllDefaultActivityDefinitions(wfWorkflowDefinition.getWfwdId(),
						WfCodeTransition.DEFAULT.name().toLowerCase());
		if (activityDefinitionList.isPresent()) {
			return activityDefinitionList.get();
		} else {
			return null;
		}
	}

	/** {@inheritDoc} */
	@Override
	public void addTransition(final WfTransitionDefinition transition) {
		wfTransitionDefinitionDAO.save(transition);
	}

	/** {@inheritDoc} */
	@Override
	public void removeTransition(final WfTransitionDefinition transition) {
		wfTransitionDefinitionDAO.delete(transition.getWftdId());
	}

	/** {@inheritDoc} */
	@Override
	public void deleteActivities(final Long arg0) {
		// TODO Auto-generated method stub
	}

	/** {@inheritDoc} */
	@Override
	public void deleteDecision(final WfDecision arg0) {
		wfDecisionDAO.delete(arg0.getWfeId());
	}

	/** {@inheritDoc} */
	@Override
	public List<WfWorkflow> findActiveWorkflows(final WfWorkflowDefinition arg0, final boolean arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public List<WfActivity> findActivitiesByDefinitionId(final WfWorkflow arg0, final List<Long> arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public List<WfActivity> findActivitiesByWorkflowId(final WfWorkflow arg0) {
		return wfActivityDAO.getListByDtField(WfWorkflowFields.WFW_ID.name(), arg0.getWfwId(), Integer.MAX_VALUE);

	}

	/** {@inheritDoc} */
	@Override
	public WfActivity findActivityByDefinitionWorkflow(final WfWorkflow arg0, final WfActivityDefinition arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public List<WfActivity> findAllActivitiesByWorkflowDefinitionId(final WfWorkflowDefinition arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public List<WfDecision> findAllDecisionsByWorkflowDefinitionId(final WfWorkflowDefinition arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public List<WfDecision> findDecisionsByWorkflowId(final WfWorkflow arg0) {
		return wfDecisionDAO.findDecisionsByWorkflowId(arg0.getWfwId());
	}

	/** {@inheritDoc} */
	@Override
	public WfActivityDefinition findNextActivity(final Long arg0) {
		return findNextActivity(arg0, WfCodeTransition.DEFAULT.name().toLowerCase());
	}

	/** {@inheritDoc} */
	@Override
	public WfActivityDefinition findNextActivity(final Long arg0, final String arg1) {
		WfTransitionDefinition wfTransitionDefinition = wfTransitionDefinitionDAO.findNextActivity(arg0, arg1);
		return wfActivityDefinitionDAO.get(wfTransitionDefinition.getWfadIdTo());
	}

	/** {@inheritDoc} */
	@Override
	public WfTransitionDefinition findTransition(final WfTransitionCriteria arg0) {
		Optional<WfTransitionDefinition> wfTransitionDefinition = wfTransitionDefinitionDAO.findTransition(
				arg0.getTransitionName(), Optional.ofNullable(arg0.getWfadIdTo()),
				Optional.ofNullable(arg0.getWfadIdFrom()));
		if (wfTransitionDefinition.isPresent()) {
			return wfTransitionDefinition.get();
		} else {
			return null;
		}
	}

	/** {@inheritDoc} */
	@Override
	public void incrementActivityDefinitionPositionsAfter(final Long arg0, final int arg1) {
		// TODO Auto-generated method stub
	}

	/** {@inheritDoc} */
	@Override
	public List<WfDecision> readDecisionsByActivityId(final Long arg0) {
		// final WfWorkflowDefinition wfWorkflowDefinition = new
		// WfWorkflowDefinition();
		// final DtList<WfWorkflowDefinition> list =
		// wfWorkflowDefinitionDAO.getListByDtField("NAME", definitionName, 1);
		// final List<WfDecision> wfDecisionList = new ArrayList<>();
		// return wfWorkflowDefinition;
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public WfWorkflow readWorkflowInstanceByItemId(final Long arg0, final Long arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public WfWorkflow readWorkflowInstanceForUpdateById(final Long arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public List<WfWorkflow> readWorkflowsInstanceForUpdateById(final Long arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public void shiftActivityDefinitionPositionsBetween(final Long arg0, final int arg1, final int arg2,
			final int arg3) {
		workflowPAO.shiftActivityDefinitionPositionsBetween(arg3, arg1, arg2, Optional.ofNullable(arg0));
	}

	/** {@inheritDoc} */
	@Override
	public void unsetCurrentActivity(final WfActivityDefinition arg0) {
		// TODO Auto-generated method stub
	}

	/** {@inheritDoc} */
	@Override
	public void updateDecision(final WfDecision arg0) {
		wfDecisionDAO.save(arg0);
	}

	/** {@inheritDoc} */
	@Override
	public void updateTransition(final WfTransitionDefinition arg0) {
		wfTransitionDefinitionDAO.save(arg0);
	}

	@Override
	public List<RuleDefinition> findAllRulesByWorkflowDefinitionId(long wfwdId) {
		return ruleDefinitionDAO.findAllRulesByWorkflowDefinitionId(wfwdId);
	}

	@Override
	public List<RuleConditionDefinition> findAllConditionsByWorkflowDefinitionId(long wfwdId) {
		return ruleConditionDefinitionDAO.findAllConditionsByWorkflowDefinitionId(wfwdId);
	}

	@Override
	public List<SelectorDefinition> findAllSelectorsByWorkflowDefinitionId(long wfwdId) {
		return selectorDefinitionDAO.findAllSelectorsByWorkflowDefinitionId(wfwdId);
	}

	@Override
	public List<RuleFilterDefinition> findAllFiltersByWorkflowDefinitionId(long wfwdId) {
		return ruleFilterDefinitionDAO.findAllFiltersByWorkflowDefinitionId(wfwdId);
	}
}
