/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.orchestra.plugins.services.schedule.db;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.commons.daemon.DaemonDefinition;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.component.Activeable;
import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.WrappedException;
import io.vertigo.orchestra.dao.execution.OProcessExecutionDAO;
import io.vertigo.orchestra.dao.planification.OProcessPlanificationDAO;
import io.vertigo.orchestra.dao.planification.PlanificationPAO;
import io.vertigo.orchestra.definitions.OrchestraDefinitionManager;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.definitions.ProcessType;
import io.vertigo.orchestra.domain.definition.OProcess;
import io.vertigo.orchestra.domain.planification.OProcessPlanification;
import io.vertigo.orchestra.impl.node.ONodeManager;
import io.vertigo.orchestra.impl.services.schedule.CronExpression;
import io.vertigo.orchestra.impl.services.schedule.ProcessSchedulerPlugin;
import io.vertigo.orchestra.plugins.services.MapCodec;
import io.vertigo.orchestra.services.execution.ProcessExecutor;
import io.vertigo.orchestra.services.schedule.SchedulerState;

/**
 * Plugin de gestion de la planification.
 *
 * @author mlaroche.
 * @version $Id$
 */
public class DbProcessSchedulerPlugin implements ProcessSchedulerPlugin, Activeable, SimpleDefinitionProvider {

	private static final Logger LOGGER = LogManager.getLogger(DbProcessSchedulerPlugin.class);

	@Inject
	private OProcessPlanificationDAO processPlanificationDAO;
	@Inject
	private PlanificationPAO planificationPAO;
	@Inject
	private OProcessExecutionDAO processExecutionDAO;
	@Inject
	private StoreManager storeManager;

	private final String nodeName;
	private Long nodId;
	private final int planningPeriodSeconds;
	private final int forecastDurationSeconds;
	private final ONodeManager nodeManager;
	private ProcessExecutor myProcessExecutor;

	private final VTransactionManager transactionManager;
	private final OrchestraDefinitionManager definitionManager;

	private final MapCodec mapCodec = new MapCodec();

	/**
	 * Constructeur.
	 * @param nodeManager le gestionnaire de noeud
	 * @param transactionManager vertigo transaction manager
	 * @param definitionManager orchestra definitions manager
	 * @param nodeName le nom du noeud
	 * @param planningPeriodSeconds le timer de planfication
	 * @param forecastDurationSeconds la durée de prévision des planifications
	 */
	@Inject
	public DbProcessSchedulerPlugin(
			final ONodeManager nodeManager,
			final VTransactionManager transactionManager,
			final OrchestraDefinitionManager definitionManager,
			@Named("nodeName") final String nodeName,
			@Named("planningPeriodSeconds") final int planningPeriodSeconds,
			@Named("forecastDurationSeconds") final int forecastDurationSeconds) {
		Assertion.checkNotNull(nodeManager);
		Assertion.checkNotNull(transactionManager);
		Assertion.checkNotNull(definitionManager);
		Assertion.checkArgNotEmpty(nodeName);
		Assertion.checkNotNull(planningPeriodSeconds);
		Assertion.checkNotNull(forecastDurationSeconds);
		//-----
		this.nodeManager = nodeManager;
		this.transactionManager = transactionManager;
		this.definitionManager = definitionManager;
		this.planningPeriodSeconds = planningPeriodSeconds;
		this.forecastDurationSeconds = forecastDurationSeconds;
		this.nodeName = nodeName;
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return Collections.singletonList(new DaemonDefinition("DMN_O_DB_PROCESS_SCHEDULER_DAEMON", () -> this::scheduleAndInit, planningPeriodSeconds));
	}

	private void scheduleAndInit() {
		try {
			plannRecurrentProcesses();
			initToDo(myProcessExecutor);
		} catch (final Exception e) {
			// We log the error and we continue the timer
			LOGGER.error("Exception planning recurrent processes", e);
		}

	}

	@Override
	public void start() {
		// We register the node
		nodId = nodeManager.registerNode(nodeName);
		// We clean the planification
		cleanPastPlanification();
	}

	@Override
	public void setProcessExecutor(final ProcessExecutor processExecutor) {
		Assertion.checkNotNull(processExecutor);
		//---
		myProcessExecutor = processExecutor;
	}

	@Override
	public void stop() {
		// rien
	}

	@Override
	public ProcessType getHandledProcessType() {
		return ProcessType.SUPERVISED;
	}
	//--------------------------------------------------------------------------------------------------
	//--- Package
	//--------------------------------------------------------------------------------------------------

	private void doScheduleWithCron(final ProcessDefinition processDefinition) {
		final Optional<Date> nextPlanification = findNextPlanificationTime(processDefinition);
		if (nextPlanification.isPresent()) {
			scheduleAt(processDefinition, nextPlanification.get(), processDefinition.getTriggeringStrategy().getInitialParams());
		}
	}

	@Override
	public void scheduleAt(final ProcessDefinition processDefinition, final Date planifiedTime, final Map<String, String> initialParams) {
		Assertion.checkNotNull(processDefinition);
		Assertion.checkNotNull(planifiedTime);
		Assertion.checkNotNull(initialParams);
		//---
		if (transactionManager.hasCurrentTransaction()) {
			doScheduleAt(processDefinition, planifiedTime, initialParams);
		} else {
			try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				doScheduleAt(processDefinition, planifiedTime, initialParams);
				transaction.commit();
			}
		}
	}

	//--------------------------------------------------------------------------------------------------
	//--- Private
	//--------------------------------------------------------------------------------------------------

	private void doScheduleAt(final ProcessDefinition processDefinition, final Date planifiedTime, final Map<String, String> initialParams) {
		Assertion.checkNotNull(processDefinition);
		// ---
		final OProcessPlanification processPlanification = new OProcessPlanification();
		processPlanification.setProId(processDefinition.getId());
		processPlanification.setExpectedTime(planifiedTime);
		changeState(processPlanification, SchedulerState.WAITING);
		processPlanification.setInitialParams(mapCodec.encode(initialParams));
		processPlanificationDAO.save(processPlanification);

	}

	private void initToDo(final ProcessExecutor processExecutor) {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			initNewProcessesToLaunch(processExecutor);
			transaction.commit();
		}
	}

	private void initNewProcessesToLaunch(final ProcessExecutor processExecutor) {
		for (final OProcessPlanification processPlanification : getPlanificationsToTrigger()) {
			final ProcessDefinition processDefinition = definitionManager.getProcessDefinition(processPlanification.getProcessus().getName());
			lockProcess(processDefinition);

			if (canExecute(processDefinition)) {
				triggerPlanification(processPlanification);
				processExecutor.execute(processDefinition, Optional.ofNullable(processPlanification.getInitialParams()));
			} else {
				misfirePlanification(processPlanification);
			}
		}
	}

	private void lockProcess(final ProcessDefinition processDefinition) {
		final URI<OProcess> processURI = DtObjectUtil.createURI(OProcess.class, processDefinition.getId());
		storeManager.getDataStore().readOneForUpdate(processURI);
	}

	private void plannRecurrentProcesses() {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			for (final ProcessDefinition processDefinition : getAllScheduledProcesses()) {
				doScheduleWithCron(processDefinition);
			}
			transaction.commit();
		}

	}

	private DtList<OProcessPlanification> getPlanificationsToTrigger() {
		final GregorianCalendar lowerLimit = new GregorianCalendar(Locale.FRANCE);
		lowerLimit.add(Calendar.MILLISECOND, -planningPeriodSeconds * 1000 * 5 / 4); //Just to be sure that nothing will be lost

		final GregorianCalendar upperLimit = new GregorianCalendar(Locale.FRANCE);

		planificationPAO.reserveProcessToExecute(lowerLimit.getTime(), upperLimit.getTime(), nodId);
		return processPlanificationDAO.getProcessToExecute(nodId);
	}

	private boolean canExecute(final ProcessDefinition processDefinition) {
		// We check if process allow multiExecutions
		if (!processDefinition.getTriggeringStrategy().isMultiExecution()) {
			// TODO we are in the case of a process that allows a single execution at the time
			//      -> the previous was too long so we kill it (mark has aborted) and keep the new one
			return processExecutionDAO.getActiveProcessExecutionByProId(processDefinition.getId()).isEmpty();
		}
		return true;
	}

	private Optional<OProcessPlanification> getLastPlanificationsByProcess(final Long proId) {
		Assertion.checkNotNull(proId);
		// ---
		return processPlanificationDAO.getLastPlanificationByProId(proId);
	}

	private Optional<Date> findNextPlanificationTime(final ProcessDefinition processDefinition) {
		final Optional<OProcessPlanification> lastPlanificationOption = getLastPlanificationsByProcess(processDefinition.getId());

		try {
			final CronExpression cronExpression = new CronExpression(processDefinition.getTriggeringStrategy().getCronExpression().get());

			if (!lastPlanificationOption.isPresent()) {
				final Date now = new Date();
				final Date compatibleNow = new Date(now.getTime() + (planningPeriodSeconds / 2 * 1000L));// Normalement ca doit être bon quelque soit la synchronisation entre les deux timers (même fréquence)
				return Optional.of(cronExpression.getNextValidTimeAfter(compatibleNow));
			}
			final OProcessPlanification lastPlanification = lastPlanificationOption.get();
			final Date nextPotentialPlainification = cronExpression.getNextValidTimeAfter(lastPlanification.getExpectedTime());
			if (nextPotentialPlainification.before(new Date(System.currentTimeMillis() + forecastDurationSeconds * 1000L))) {
				return Optional.of(nextPotentialPlainification);
			}
		} catch (final ParseException e) {
			throw WrappedException.wrap(e, "Process' cron expression is not valid, process cannot be planned");
		}

		return Optional.<Date> empty();

	}

	private List<ProcessDefinition> getAllScheduledProcesses() {
		return definitionManager.getAllProcessDefinitionsByType(getHandledProcessType()).stream()
				.filter(processDefinition -> processDefinition.isActive())// We only want actives
				.filter(processDefinition -> processDefinition.getTriggeringStrategy().getCronExpression().isPresent())// We only want the processes to schedule
				.collect(Collectors.toList());
	}

	private void changeState(final OProcessPlanification processPlanification, final SchedulerState planificationState) {
		Assertion.checkNotNull(processPlanification);
		Assertion.checkNotNull(planificationState);
		// ---
		processPlanification.setSstCd(planificationState.name());
	}

	private void triggerPlanification(final OProcessPlanification processPlanification) {
		changeState(processPlanification, SchedulerState.TRIGGERED);
		processPlanificationDAO.save(processPlanification);
	}

	private void misfirePlanification(final OProcessPlanification processPlanification) {
		changeState(processPlanification, SchedulerState.MISFIRED);
		processPlanificationDAO.save(processPlanification);
	}

	// clean Planification on startup

	private void cleanPastPlanification() {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			doCleanPastPlanification();
			transaction.commit();
		}
	}

	private void doCleanPastPlanification() {
		final Date now = new Date();
		planificationPAO.cleanPlanificationsOnBoot(now);
		// ---
		for (final OProcessPlanification planification : processPlanificationDAO.getAllLastPastPlanifications(now)) {
			// We check the process policy of validity
			final OProcess process = planification.getProcessus();
			final long ageOfPlanification = (now.getTime() - planification.getExpectedTime().getTime()) / (60 * 1000L);// in seconds
			if (ageOfPlanification < process.getRescuePeriod()) {
				changeState(planification, SchedulerState.RESCUED);
			} else {
				changeState(planification, SchedulerState.MISFIRED);
			}
			processPlanificationDAO.save(planification);
		}

	}

}
