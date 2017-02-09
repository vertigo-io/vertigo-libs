/**
 *
 */
package io.vertigo.x.plugins.workflow.sql;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.dynamo.store.criteria.Criteria;
import io.vertigo.dynamo.store.criteria.Criterions;
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
import io.vertigo.x.workflow.dao.instance.WfWorkflowDAO;
import io.vertigo.x.workflow.dao.model.WfActivityDefinitionDAO;
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
	public void createDecision(final WfDecision wfDecision) {
		wfDecisionDAO.save(wfDecision);
	}

	/** {@inheritDoc} */
	@Override
	public List<WfDecision> findAllDecisionByActivity(final WfActivity wfActivity) {
		return wfDecisionDAO.getListByDtFieldName(WfDecisionFields.WFA_ID, wfActivity.getWfaId(), Integer.MAX_VALUE);
	}

	/** {@inheritDoc} */
	@Override
	public boolean hasNextActivity(final WfActivity activity) {
		return hasNextActivity(activity, WfCodeTransition.DEFAULT.getTransitionName());

	}

	/** {@inheritDoc} */
	@Override
	public boolean hasNextActivity(final WfActivity activity, final String transitionName) {
		return workflowPAO.hasNextTransition(activity.getWfadId(), transitionName) > 0;
	}

	/** {@inheritDoc} */
	@Override
	public int countDefaultTransitions(final WfWorkflowDefinition wfWorkflowDefinition) {
		return workflowPAO.countDefaultTransactions(wfWorkflowDefinition.getWfwdId());
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
		final Criteria<WfWorkflowDefinition> criteria = Criterions.isEqualTo(WfWorkflowDefinitionFields.NAME, definitionName);
		WfWorkflowDefinition wfWorkflowDefinition = wfWorkflowDefinitionDAO.find(criteria);
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
	public WfActivityDefinition readActivityDefinition(final Long wfadId) {
		return wfActivityDefinitionDAO.get(wfadId);
	}

	/** {@inheritDoc} */
	@Override
	public Optional<WfActivityDefinition> findActivityDefinitionByPosition(final WfWorkflowDefinition wfWorkflowDefinition,
			final int position) {
		return wfActivityDefinitionDAO
				.findActivityDefinitionByPosition(wfWorkflowDefinition.getWfwdId(), position);
	}

	/** {@inheritDoc} */
	@Override
	public List<WfActivityDefinition> findAllDefaultActivityDefinitions(
			final WfWorkflowDefinition wfWorkflowDefinition) {
		return wfActivityDefinitionDAO.findAllDefaultActivityDefinitions(wfWorkflowDefinition.getWfwdId(),
				WfCodeTransition.DEFAULT.getTransitionName());
	}

	/** {@inheritDoc} */
	@Override
	public void addTransition(final WfTransitionDefinition transition) {
		wfTransitionDefinitionDAO.save(transition);
	}


	/** {@inheritDoc} */
	@Override
	public List<WfActivity> findActivitiesByWorkflowId(final WfWorkflow wfWorkflow) {
		return wfActivityDAO.getListByDtFieldName(WfWorkflowFields.WFW_ID, wfWorkflow.getWfwId(), Integer.MAX_VALUE);

	}

	/** {@inheritDoc} */
	@Override
	public Optional<WfActivity> findActivityByDefinitionWorkflow(final WfWorkflow wfWorkflow, final WfActivityDefinition wfActivityDefinition) {
		return wfActivityDAO.findActivityByDefinitionWorkflow(wfWorkflow.getWfwId(),
				wfActivityDefinition.getWfadId());
	}

	/** {@inheritDoc} */
	@Override
	public List<WfDecision> findDecisionsByWorkflowId(final WfWorkflow wfWorkflow) {
		return wfDecisionDAO.findDecisionsByWorkflowId(wfWorkflow.getWfwId());
	}

	/** {@inheritDoc} */
	@Override
	public WfActivityDefinition findNextActivity(final Long wfadId) {
		return findNextActivity(wfadId, WfCodeTransition.DEFAULT.getTransitionName());
	}

	/** {@inheritDoc} */
	@Override
	public WfActivityDefinition findNextActivity(final Long wfadId, final String transitionName) {
		final WfTransitionDefinition wfTransitionDefinition = wfTransitionDefinitionDAO.findNextActivity(wfadId, transitionName);
		return wfActivityDefinitionDAO.get(wfTransitionDefinition.getWfadIdTo());
	}

	/** {@inheritDoc} */
	@Override
	public Optional<WfTransitionDefinition> findTransition(final WfTransitionCriteria wfTransitionCriteria) {
		return wfTransitionDefinitionDAO.findTransition(
				wfTransitionCriteria.getTransitionName(), Optional.ofNullable(wfTransitionCriteria.getWfadIdTo()),
				Optional.ofNullable(wfTransitionCriteria.getWfadIdFrom()));
	}

	/** {@inheritDoc} */
	@Override
	public void incrementActivityDefinitionPositionsAfter(final Long wfwdId, final int position) {
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public List<WfDecision> readDecisionsByActivityId(final Long wfaId) {
		return wfDecisionDAO.getListByDtFieldName(WfDecisionFields.WFA_ID, wfaId, Integer.MAX_VALUE);
	}

	/** {@inheritDoc} */
	@Override
	public WfWorkflow readWorkflowInstanceByItemId(final Long wfwdId, final Long itemId) {
		return wfWorkflowDAO.readWorkflowInstanceByItemId(wfwdId, itemId);
	}

	/** {@inheritDoc} */
	@Override
	public WfWorkflow readWorkflowInstanceForUpdateById(final Long wfwId) {
		return wfWorkflowDAO.readWorkflowForUpdate(wfwId);
	}

	/** {@inheritDoc} */
	@Override
	public void updateDecision(final WfDecision wfDecision) {
		wfDecisionDAO.save(wfDecision);
	}

	/** {@inheritDoc} */
	@Override
	public void updateTransition(final WfTransitionDefinition wfTransitionDefinition) {
		wfTransitionDefinitionDAO.save(wfTransitionDefinition);
	}

	@Override
	public List<RuleDefinition> findAllRulesByWorkflowDefinitionId(final long wfwdId) {
		return ruleDefinitionDAO.findAllRulesByWorkflowDefinitionId(wfwdId);
	}

	@Override
	public List<RuleConditionDefinition> findAllConditionsByWorkflowDefinitionId(final long wfwdId) {
		return ruleConditionDefinitionDAO.findAllConditionsByWorkflowDefinitionId(wfwdId);
	}

	@Override
	public List<SelectorDefinition> findAllSelectorsByWorkflowDefinitionId(final long wfwdId) {
		return selectorDefinitionDAO.findAllSelectorsByWorkflowDefinitionId(wfwdId);
	}

	@Override
	public List<RuleFilterDefinition> findAllFiltersByWorkflowDefinitionId(final long wfwdId) {
		return ruleFilterDefinitionDAO.findAllFiltersByWorkflowDefinitionId(wfwdId);
	}
	
	

	

}
