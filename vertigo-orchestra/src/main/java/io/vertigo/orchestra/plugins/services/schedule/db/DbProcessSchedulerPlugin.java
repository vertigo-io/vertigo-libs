/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import java.lang.reflect.Field;
import java.text.ParseException;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;

import io.vertigo.app.Home;
import io.vertigo.commons.daemon.DaemonDefinition;
import io.vertigo.commons.transaction.VTransaction;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.component.Activeable;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.WrappedException;
import io.vertigo.orchestra.dao.definition.OActivityDAO;
import io.vertigo.orchestra.dao.definition.OProcessDAO;
import io.vertigo.orchestra.dao.execution.ExecutionPAO;
import io.vertigo.orchestra.dao.execution.OActivityExecutionDAO;
import io.vertigo.orchestra.dao.execution.OActivityLogDAO;
import io.vertigo.orchestra.dao.execution.OActivityWorkspaceDAO;
import io.vertigo.orchestra.dao.execution.OJobRunningDAO;
import io.vertigo.orchestra.dao.execution.OProcessExecutionDAO;
import io.vertigo.orchestra.dao.planification.OProcessPlanificationDAO;
import io.vertigo.orchestra.definitions.OrchestraDefinitionManager;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.definitions.ProcessType;
import io.vertigo.orchestra.domain.definition.OActivity;
import io.vertigo.orchestra.domain.definition.OProcess;
import io.vertigo.orchestra.domain.execution.OActivityExecution;
import io.vertigo.orchestra.domain.execution.OActivityLog;
import io.vertigo.orchestra.domain.execution.OActivityWorkspace;
import io.vertigo.orchestra.domain.execution.OJobRunning;
import io.vertigo.orchestra.domain.execution.OProcessExecution;
import io.vertigo.orchestra.domain.planification.OProcessNextRun;
import io.vertigo.orchestra.domain.planification.OProcessPlanification;
import io.vertigo.orchestra.impl.node.ONodeManager;
import io.vertigo.orchestra.impl.services.execution.AbstractActivityEngine;
import io.vertigo.orchestra.impl.services.execution.ActivityLogger;
import io.vertigo.orchestra.impl.services.schedule.CronExpression;
import io.vertigo.orchestra.impl.services.schedule.ProcessSchedulerPlugin;
import io.vertigo.orchestra.plugins.services.MapCodec;
import io.vertigo.orchestra.plugins.services.execution.db.ActivityTokenGenerator;
import io.vertigo.orchestra.services.execution.ActivityEngine;
import io.vertigo.orchestra.services.execution.ActivityExecutionWorkspace;
import io.vertigo.orchestra.services.execution.ExecutionState;
import io.vertigo.orchestra.services.execution.ExecutionStateOld;
import io.vertigo.orchestra.services.execution.ProcessExecutor;
import io.vertigo.util.ClassUtil;
import io.vertigo.util.DateBuilder;

/**
 * Plugin de gestion de la planification.
 *
 * @author mlaroche.
 * @version $Id$
 */
public class DbProcessSchedulerPlugin implements ProcessSchedulerPlugin, Activeable, SimpleDefinitionProvider {

	private static final Logger LOGGER = Logger.getLogger(DbProcessSchedulerPlugin.class);

	@Inject
	private OProcessPlanificationDAO processPlanificationDAO;
	/*@Inject
	private PlanificationPAO planificationPAO;*/

	/*@Inject
	private OProcessExecutionDAO processExecutionDAO;*/
	@Inject
	private OJobRunningDAO jobRunningDAO;
	@Inject
	private ExecutionPAO executionPAO;
	@Inject
	private OProcessDAO processDAO;

	/*@Inject
	private StoreManager storeManager;*/

	private final String nodeName;
	private Long nodId;
	private final int planningPeriodSeconds;
	//private final int forecastDurationSeconds;
	private final ONodeManager nodeManager;
	private ProcessExecutor myProcessExecutor;

	private final VTransactionManager transactionManager;
	private final OrchestraDefinitionManager definitionManager;

	private final MapCodec mapCodec = new MapCodec();

	////
	@Inject
	private OProcessExecutionDAO processExecutionDAO;
	@Inject
	private OActivityExecutionDAO activityExecutionDAO;
	@Inject
	private OActivityDAO activityDAO;
	@Inject
	private OActivityWorkspaceDAO activityWorkspaceDAO;
	@Inject
	private StoreManager storeManager;
	private final ExecutorService workers;
	@Inject
	private OActivityLogDAO activityLogDAO;

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
		//this.forecastDurationSeconds = forecastDurationSeconds;
		this.nodeName = nodeName;
		workers = Executors.newFixedThreadPool(10);
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return Collections.singletonList(new DaemonDefinition("DMN_O_DB_PROCESS_SCHEDULER_DAEMON", () -> this::scheduleAndInit, planningPeriodSeconds));
	}

	private void scheduleAndInit() {
		try {
			//plannRecurrentProcesses();
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
		//cleanPastPlanification();
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

	/*
	private void doScheduleWithCron(final ProcessDefinition processDefinition) {
		final Optional<Date> nextPlanification = findNextPlanificationTime(processDefinition);
		if (nextPlanification.isPresent()) {
			scheduleAt(processDefinition, nextPlanification.get(), processDefinition.getTriggeringStrategy().getInitialParams());
		}
	}*/

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
		//changeState(processPlanification, SchedulerState.WAITING);
		processPlanification.setInitialParams(mapCodec.encode(initialParams));
		processPlanificationDAO.save(processPlanification);
	}

	private void initToDo(final ProcessExecutor processExecutor) {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			initNewProcessesToLaunch(processExecutor);
			transaction.commit();
		}
	}

	private OProcessExecution initProcessExecution(final ProcessDefinition processDefinition) {
		Assertion.checkNotNull(processDefinition);
		// ---
		final OProcessExecution newProcessExecution = new OProcessExecution();
		newProcessExecution.setProId(processDefinition.getId());
		newProcessExecution.setBeginTime(new Date());
		changeProcessExecutionState(newProcessExecution, ExecutionState.STARTED);
		processExecutionDAO.save(newProcessExecution);

		return newProcessExecution;
	}

	private static OActivityExecution initActivityExecutionWithActivity(final OActivity activity, final Long preId, final Long nodId) {
		Assertion.checkNotNull(preId);
		// ---
		final OActivityExecution activityExecution = new OActivityExecution();

		activityExecution.setPreId(preId);
		activityExecution.setActId(activity.getActId());
		activityExecution.setCreationTime(new Date());
		activityExecution.setEngine(activity.getEngine());
		//changeActivityExecutionState(activityExecution, ExecutionState2.WAITING);
		activityExecution.setToken(ActivityTokenGenerator.getToken());
		activityExecution.setNodId(nodId);
		//TODO Avoir un EstCd propre à Activity et ajouter l'état started.
		activityExecution.setEstCd(ExecutionStateOld.WAITING.name());

		return activityExecution;

	}

	private void initFirstActivityExecution(final OProcessExecution processExecution, final Optional<String> initialParams) {
		Assertion.checkNotNull(processExecution.getProId());
		Assertion.checkNotNull(processExecution.getPreId());
		// ---
		final OActivity firstActivity = activityDAO.getFirstActivityByProcess(processExecution.getProId());
		final OActivityExecution firstActivityExecution = initActivityExecutionWithActivity(firstActivity, processExecution.getPreId(), nodId);

		activityExecutionDAO.save(firstActivityExecution); //LOCK

		final ActivityExecutionWorkspace initialWorkspace = new ActivityExecutionWorkspace(mapCodec.decode(processExecution
				.getProcess()
				.getInitialParams()));
		if (initialParams.isPresent()) {
			// If Plannification specifies initialParams we take them in addition
			initialWorkspace.addExternalParams(mapCodec.decode(initialParams.get()));
		}
		// We set in the workspace essentials params
		initialWorkspace.setProcessName(processExecution.getProcess().getName());
		initialWorkspace.setProcessExecutionId(processExecution.getPreId());
		initialWorkspace.setActivityExecutionId(firstActivityExecution.getAceId());
		initialWorkspace.setToken(firstActivityExecution.getToken());
		// ---
		saveActivityExecutionWorkspace(firstActivityExecution.getAceId(), initialWorkspace, true);

	}

	private void saveActivityExecutionWorkspace(final Long aceId, final ActivityExecutionWorkspace workspace, final Boolean in) {
		Assertion.checkNotNull(aceId);
		Assertion.checkNotNull(in);
		Assertion.checkNotNull(workspace);
		// ---
		lockActivityExecution(aceId);
		// we need at most one workspace in and one workspace out
		final OActivityWorkspace activityWorkspace = activityWorkspaceDAO.getActivityWorkspace(aceId, in).orElse(new OActivityWorkspace());
		activityWorkspace.setAceId(aceId);
		activityWorkspace.setIsIn(in);
		activityWorkspace.setWorkspace(mapCodec.encode(workspace.asMap()));

		activityWorkspaceDAO.save(activityWorkspace);
	}

	private void lockActivityExecution(final Long aceId) {
		final URI<OActivityExecution> activityExecutionURI = DtObjectUtil.createURI(OActivityExecution.class, aceId);
		storeManager.getDataStore().readOneForUpdate(activityExecutionURI);
	}

	private DtList<OActivityExecution> getActivitiesToLaunch() {
		//final int maxNumber = getUnusedWorkersCount();
		final int maxNumber = 10;
		// ---
		executionPAO.reserveActivitiesToLaunch(nodId, maxNumber);
		return activityExecutionDAO.getActivitiesToLaunch(nodId);
	}

	private ActivityExecutionWorkspace getWorkspaceForActivityExecution(final Long aceId, final Boolean in) {
		Assertion.checkNotNull(aceId);
		Assertion.checkNotNull(in);
		// ---
		final OActivityWorkspace activityWorkspace = activityWorkspaceDAO.getActivityWorkspace(aceId, in).get();
		return new ActivityExecutionWorkspace(mapCodec.decode(activityWorkspace.getWorkspace()));
	}

	private void initNewProcessesToLaunch(final ProcessExecutor processExecutor) {

		final DtList<OProcessNextRun> processesNextRun = getPlanificationsToTrigger();

		final int nbExec = executionPAO.reserveProcessToLaunch(nodId, processesNextRun);

		if (nbExec > 0) {
			final DtList<OJobRunning> jobs = jobRunningDAO.getJobsToRun(nodId);
			for (final OJobRunning oJobRunning : jobs) {
				final ProcessDefinition processDefinition = definitionManager.getProcessDefinition(oJobRunning.getJobname());
				final OProcess process = processDAO.get(processDefinition.getId());

				//processExecutor.execute(processDefinition, Optional.ofNullable(process.getInitialParams()));

				///////
				final OProcessExecution processExecution = initProcessExecution(processDefinition);
				initFirstActivityExecution(processExecution, Optional.ofNullable(process.getInitialParams()));

				final DtList<OActivityExecution> activitiesToLaunch;
				//try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				activitiesToLaunch = getActivitiesToLaunch();
				//	transaction.commit();
				//}
				for (final OActivityExecution activityExecution : activitiesToLaunch) { //We submit only the process we can handle, no queue
					ActivityExecutionWorkspace workspace;
					//try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
					workspace = getWorkspaceForActivityExecution(activityExecution.getAceId(), true);
					//doChangeExecutionState(activityExecution, ExecutionState2.SUBMITTED);
					// We set the beginning time of the activity
					activityExecution.setBeginTime(new Date());
					//	transaction.commit();
					//}
					workers.submit(() -> doRunActivity(activityExecution, workspace));
				}

			}
		}

	}

	private void doRunActivity(final OActivityExecution activityExecution, final ActivityExecutionWorkspace workspace) {
		clearAllThreadLocals();
		ActivityExecutionWorkspace result;
		try {
			result = execute(activityExecution, workspace);
			putResult(activityExecution, result, null);
		} catch (final Exception e) {
			LOGGER.info("Error executing activity", e);
			putResult(activityExecution, null, e.getCause());
		}
	}

	private static void clearAllThreadLocals() {
		try {
			final Field threadLocals = Thread.class.getDeclaredField("threadLocals");
			threadLocals.setAccessible(true);
			threadLocals.set(Thread.currentThread(), null);
		} catch (final Exception e) {
			throw new AssertionError(e);
		}
	}

	private ActivityExecutionWorkspace execute(final OActivityExecution activityExecution, final ActivityExecutionWorkspace workspace) {
		ActivityExecutionWorkspace resultWorkspace = workspace;

		try {
			// ---
			final ActivityEngine activityEngine = DIInjector.newInstance(
					ClassUtil.classForName(activityExecution.getEngine(), ActivityEngine.class), Home.getApp().getComponentSpace());

			try {

				// If the engine extends the abstractEngine we can provide the services associated (LOGGING,...) so we log the workspace
				if (activityEngine instanceof AbstractActivityEngine) {
					final String workspaceInLog = new StringBuilder("Workspace in :").append(mapCodec.encode(workspace.asMap())).toString();
					((AbstractActivityEngine) activityEngine).getLogger().info(workspaceInLog);
				}
				// We try the execution and we keep the result
				resultWorkspace = activityEngine.execute(workspace);
				Assertion.checkNotNull(resultWorkspace);
				Assertion.checkNotNull(resultWorkspace.getValue("status"), "Le status est obligatoire dans le résultat");
				// if pending we delegated the treatment to a third party so we are not sure that we are successful
				if (!resultWorkspace.isPending()) {
					// we call the posttreament
					resultWorkspace = activityEngine.successfulPostTreatment(resultWorkspace);
				}

			} catch (final Exception e) {
				// In case of failure we keep the current workspace
				resultWorkspace.setFailure();
				LOGGER.error("Erreur de l'activité : " + activityExecution.getEngine(), e);
				// we call the posttreament
				resultWorkspace = activityEngine.errorPostTreatment(resultWorkspace, e);

			} finally {
				handleOtherServices(activityEngine, activityExecution, resultWorkspace);
			}

		} catch (final Exception e) {
			// Informative log
			resultWorkspace.setFailure();
			LOGGER.error("Erreur de l'activité : " + activityExecution.getEngine(), e);
		}

		return resultWorkspace;
	}

	private void handleOtherServices(final ActivityEngine activityEngine, final OActivityExecution activityExecution, final ActivityExecutionWorkspace resultWorkspace) {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			// We save the workspace which is the minimal state
			saveActivityExecutionWorkspace(activityExecution.getAceId(), resultWorkspace, false);
			if (activityEngine instanceof AbstractActivityEngine) {
				// If the engine extends the abstractEngine we can provide the services associated (LOGGING,...)
				saveActivityLogs(activityExecution.getAceId(), ((AbstractActivityEngine) activityEngine).getLogger(), resultWorkspace);
			}
			transaction.commit();
		}
	}

	private void saveActivityLogs(final Long aceId, final ActivityLogger activityLogger, final ActivityExecutionWorkspace resultWorkspace) {
		Assertion.checkNotNull(aceId);
		Assertion.checkNotNull(activityLogger);
		// ---
		// we need at most on log per activityExecution
		final OActivityLog activityLog = activityLogDAO.getActivityLogByAceId(aceId).orElse(new OActivityLog());
		activityLog.setAceId(aceId);
		final String log = new StringBuilder(activityLog.getLog() == null ? "" : activityLog.getLog()).append(activityLogger.getLogAsString())//
				.append("ResultWorkspace : ").append(mapCodec.encode(resultWorkspace.asMap())).append("\n")//
				.toString();
		activityLog.setLog(log);
		if (resultWorkspace.getAttachment() != null) {
			activityLog.setAttachment(resultWorkspace.getAttachment());
		}
		activityLogDAO.save(activityLog);
	}

	private void putResult(final OActivityExecution activityExecution, final ActivityExecutionWorkspace workspaceOut, final Throwable error) {
		if (error != null) {
			// We log the error and we continue the timer
			LOGGER.info("Error in activity " + activityExecution.getActId() + " execution", error);
			endActivityExecution(activityExecution, ExecutionState.ERROR, activityExecution.getNodId());
		} else {
			Assertion.checkNotNull(workspaceOut);
			Assertion.checkNotNull(workspaceOut.getValue("status"), "Le status est obligatoire dans le résultat");
			//---
			if (workspaceOut.isSuccess()) {
				endActivityExecution(activityExecution, ExecutionState.DONE, activityExecution.getNodId());
			} else if (workspaceOut.isFinished()) {
				// If finished we tag the whole process as DONE and dont launch next activities
				finishProcessExecution(activityExecution);
			} else if (workspaceOut.isPending()) {
				// We do nothing because we already delegated the change of status in the AbstractActivityEngine
			} else {
				endActivityExecution(activityExecution, ExecutionState.ERROR, activityExecution.getNodId());
			}
		}

	}

	private void finishProcessExecution(final OActivityExecution activityExecution) {
		if (transactionManager.hasCurrentTransaction()) {
			doFinishProcessExecution(activityExecution);
		} else {
			try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				doFinishProcessExecution(activityExecution);
				transaction.commit();
			}
		}
	}

	private void doFinishProcessExecution(final OActivityExecution activityExecution) {
		Assertion.checkNotNull(activityExecution);
		// ---
		endActivity(activityExecution);
		endProcessExecution(activityExecution.getPreId(), ExecutionState.DONE);
	}

	private void reserveActivityExecution(final OActivityExecution activityExecution) {
		activityExecution.setEstCd(ExecutionStateOld.SUBMITTED.name());
		activityExecution.setNodId(nodId);
	}

	private void endActivityExecutionAndInitNext(final OActivityExecution activityExecution, final Long nodId) {
		final VTransaction transaction = transactionManager.getCurrentTransaction();

		endActivity(activityExecution);

		final Optional<OActivity> nextActivity = activityDAO.getNextActivityByActId(activityExecution.getActId());
		if (nextActivity.isPresent()) {
			final OActivityExecution nextActivityExecution;
			final ActivityExecutionWorkspace nextWorkspace;
			nextActivityExecution = initActivityExecutionWithActivity(nextActivity.get(), activityExecution.getPreId(), nodId);
			// We keep the previous worker (Not the same but the slot) for the next Activity Execution
			reserveActivityExecution(nextActivityExecution);
			activityExecutionDAO.save(nextActivityExecution);

			// We keep the old workspace for the nextTask
			final ActivityExecutionWorkspace previousWorkspace = getWorkspaceForActivityExecution(activityExecution.getAceId(), false);
			// We remove the status and update the activityExecutionId and token
			previousWorkspace.resetStatus();
			previousWorkspace.resetAttachment();
			previousWorkspace.setActivityExecutionId(nextActivityExecution.getAceId());
			previousWorkspace.setToken(nextActivityExecution.getToken());
			// ---
			saveActivityExecutionWorkspace(nextActivityExecution.getAceId(), previousWorkspace, true);
			nextActivityExecution.setBeginTime(new Date());
			nextWorkspace = previousWorkspace;
			//we close the transaction now
			transaction.addAfterCompletion(
					succeeded -> {
						if (succeeded) {
							doRunActivity(nextActivityExecution, nextWorkspace);
						}
					});

		} else {
			endProcessExecution(activityExecution.getPreId(), ExecutionState.DONE);
		}
		//transaction.commit();
		//}
	}

	private void endActivityExecution(final OActivityExecution activityExecution, final ExecutionState executionState, final Long nodId) {
		Assertion.checkNotNull(activityExecution);
		Assertion.checkNotNull(executionState);
		// ---

		switch (executionState) {
			case DONE:
				endActivityExecutionAndInitNext(activityExecution, nodId);
				break;
			case ERROR:
				changeExecutionState(activityExecution, ExecutionState.ERROR);
				break;
			default:
				throw new IllegalArgumentException("Unknwon case for ending activity execution :  " + executionState.name());
		}

	}

	private void changeExecutionState(final OActivityExecution activityExecution, final ExecutionState executionState) {
		if (transactionManager.hasCurrentTransaction()) {
			doChangeExecutionState(activityExecution, executionState);
		} else {
			try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				doChangeExecutionState(activityExecution, executionState);
				transaction.commit();
			}
		}
	}

	private void doChangeExecutionState(final OActivityExecution activityExecution, final ExecutionState executionState) {
		Assertion.checkNotNull(activityExecution);
		// ---
		changeActivityExecutionState(activityExecution, executionState);
		activityExecutionDAO.save(activityExecution);

		// If it's an error the entire process is in Error
		if (ExecutionState.ERROR.equals(executionState)) {
			endProcessExecution(activityExecution.getPreId(), ExecutionState.ERROR);
		}

	}

	private void endActivity(final OActivityExecution activityExecution) {
		activityExecution.setEndTime(new Date());
		changeActivityExecutionState(activityExecution, ExecutionState.DONE);
		activityExecutionDAO.save(activityExecution);

	}

	private void endProcessExecution(final Long preId, final ExecutionState executionState) {
		final OProcessExecution processExecution = processExecutionDAO.get(preId);

		processExecution.setEndTime(new Date());
		changeProcessExecutionState(processExecution, executionState);
		processExecutionDAO.save(processExecution);

		executionPAO.deleteJobRunning(processExecution.getProId());
	}

	/*private void lockProcess(final ProcessDefinition processDefinition) {
		final URI<OProcess> processURI = DtObjectUtil.createURI(OProcess.class, processDefinition.getId());
		storeManager.getDataStore().readOneForUpdate(processURI);
	}*/

	/*
	private void plannRecurrentProcesses() {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			for (final ProcessDefinition processDefinition : getAllScheduledProcesses()) {
				doScheduleWithCron(processDefinition);
			}
			transaction.commit();
		}
	
	}*/

	private DtList<OProcessNextRun> getPlanificationsToTrigger() {
		/*final GregorianCalendar lowerLimit = new GregorianCalendar(Locale.FRANCE);
		lowerLimit.add(Calendar.MILLISECOND, -planningPeriodSeconds * 1000 * 5 / 4); //Just to be sure that nothing will be lost
		
		final GregorianCalendar upperLimit = new GregorianCalendar(Locale.FRANCE);
		
		planificationPAO.reserveProcessToExecute(lowerLimit.getTime(), upperLimit.getTime(), nodId);
		return processPlanificationDAO.getProcessToExecute(nodId);*/
		final DtList<OProcess> processes = processDAO.getAllActiveProcesses();

		final DtList<OProcessNextRun> nextRuns = new DtList<>(OProcessNextRun.class);

		for (final OProcess oProcess : processes) {
			final ProcessDefinition processDefinition = definitionManager.getProcessDefinition(oProcess.getName());

			if (processDefinition.getTriggeringStrategy().getCronExpression().isPresent()) {
				CronExpression cronExpression;
				try {
					cronExpression = new CronExpression(processDefinition.getTriggeringStrategy().getCronExpression().get());
				} catch (final ParseException e) {
					throw WrappedException.wrap(e, "Process' cron expression is not valid, process cannot be planned");
				}

				final Date now = new Date();
				//final Date compatibleNow = new Date(now.getTime() + (planningPeriodSeconds * 1000L / 2));// Normalement ca doit être bon quelque soit la synchronisation entre les deux timers (même fréquence)
				final OProcessNextRun oProcessNextRun = new OProcessNextRun();
				oProcessNextRun.setExpectedTime(cronExpression.getNextValidTimeAfter(now));
				oProcessNextRun.setInitialParams(oProcess.getInitialParams());
				oProcessNextRun.setProId(oProcess.getProId());
				oProcessNextRun.setJobname(oProcess.getName());
				nextRuns.add(oProcessNextRun);
			} else {

				final Date upperLimit = new Date();
				final Date lowerLimit = new DateBuilder(upperLimit).addSeconds(-planningPeriodSeconds).build();

				final Optional<OProcessPlanification> optionPlanif = processPlanificationDAO.getProcessToExecute(oProcess.getProId(), lowerLimit, upperLimit);

				if (optionPlanif.isPresent()) {
					final OProcessPlanification oPlanif = optionPlanif.get();
					final OProcessNextRun oProcessNextRun = new OProcessNextRun();
					oProcessNextRun.setExpectedTime(oPlanif.getExpectedTime());
					oProcessNextRun.setInitialParams(oPlanif.getInitialParams());
					oProcessNextRun.setProId(oProcess.getProId());
					oProcessNextRun.setJobname(oProcess.getName());
					nextRuns.add(oProcessNextRun);
				}
			}
		}
		return nextRuns;
	}

	/*
	private boolean canExecute(final ProcessDefinition processDefinition) {
		// We check if process allow multiExecutions
		if (!processDefinition.getTriggeringStrategy().isMultiExecution()) {
			// TODO we are in the case of a process that allows a single execution at the time
			//      -> the previous was too long so we kill it (mark has aborted) and keep the new one
			return processExecutionDAO.getActiveProcessExecutionByProId(processDefinition.getId()).isEmpty();
		}
		return true;
	}*/

	/*private Optional<OProcessPlanification> getLastPlanificationsByProcess(final Long proId) {
		Assertion.checkNotNull(proId);
		// ---
		return processPlanificationDAO.getLastPlanificationByProId(proId);
	}*/

	/*
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
	
		LOGGER.error(forecastDurationSeconds);
		LOGGER.error(nodId);
	
		return Optional.<Date> empty();
	}*/

	/*
	private List<ProcessDefinition> getAllScheduledProcesses() {
		final ProcessType processTypeHandled = getHandledProcessType();
		final List<ProcessDefinition> processDefinitionHandled = definitionManager.getAllProcessDefinitionsByType(processTypeHandled);
		return processDefinitionHandled.stream()
				.filter(processDefinition -> processDefinition.isActive())// We only want actives
				.filter(processDefinition -> processDefinition.getTriggeringStrategy().getCronExpression().isPresent())// We only want the processes to schedule
				.collect(Collectors.toList());
	}*/

	/*
	private void changeState(final OProcessPlanification processPlanification, final SchedulerState planificationState) {
		Assertion.checkNotNull(processPlanification);
		Assertion.checkNotNull(planificationState);
		// ---
		processPlanification.setSstCd(planificationState.name());
	}*/

	/*
	private void triggerPlanification(final OProcessPlanification processPlanification) {
		changeState(processPlanification, SchedulerState.TRIGGERED);
		processPlanificationDAO.save(processPlanification);
	}*/

	/*
	private void misfirePlanification(final OProcessPlanification processPlanification) {
		changeState(processPlanification, SchedulerState.MISFIRED);
		processPlanificationDAO.save(processPlanification);
	}*/

	// clean Planification on startup

	/*private void cleanPastPlanification() {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			doCleanPastPlanification();
			transaction.commit();
		}
	}*/

	/*
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
	*/

	private static void changeActivityExecutionState(final OActivityExecution activityExecution, final ExecutionState executionState) {
		// we need to check if the transistion is valid
		activityExecution.setEstCd(executionState.name());
	}

	private static void changeProcessExecutionState(final OProcessExecution processExecution, final ExecutionState executionState) {
		// we need to check if the transistion is valid
		processExecution.setEstCd(executionState.name());
	}

}
