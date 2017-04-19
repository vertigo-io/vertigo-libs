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
package io.vertigo.orchestra.plugins.services.schedule.memory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.log4j.Logger;

import io.vertigo.lang.Activeable;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.WrappedException;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.definitions.ProcessType;
import io.vertigo.orchestra.impl.services.schedule.CronExpression;
import io.vertigo.orchestra.impl.services.schedule.ProcessSchedulerPlugin;
import io.vertigo.orchestra.services.execution.ProcessExecutor;
import io.vertigo.util.DateUtil;

public class MemoryProcessSchedulerPlugin implements ProcessSchedulerPlugin, Activeable {
	private ProcessExecutor myProcessExecutor;
	/**
	 * Pool de timers permettant l'exécution des Jobs.
	 */
	private final TimerPool timerPool = new TimerPool();

	/** {@inheritDoc} */
	@Override
	public void start() {
		//
	}

	@Override
	public void start(final ProcessExecutor processExecutor) {
		Assertion.checkNotNull(processExecutor);
		//---
		myProcessExecutor = processExecutor;
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		timerPool.close();
	}

	/** {@inheritDoc} */
	@Override
	public void scheduleWithCron(final ProcessDefinition processDefinition) {
		scheduleAtRecurrent(processDefinition, DateUtil.newDateTime(), Collections.emptyMap());

	}

	void scheduleAtRecurrent(final ProcessDefinition processDefinition, final Date planifiedTime, final Map<String, String> initialParams) {
		//a chaque exécution il est nécessaire de reprogrammer l'execution.
		final Date nextExecutionDate = getNextExecutionDateFrom(processDefinition, planifiedTime);
		scheduleAt(processDefinition, nextExecutionDate, Collections.emptyMap());

		//a chaque exécution il est nécessaire de reprogrammer l'execution.
		final Date nextReschedulerDate = new Date(nextExecutionDate.getTime() + 1 * 1000); //on reprogramme à l'heure dite + 1seconde (comme on est sur le m^me timer elle passera après
		final TimerTask task = createRescheduledTimerTask(processDefinition, nextExecutionDate);
		timerPool.getTimer(processDefinition.getName()).schedule(task, nextReschedulerDate);
		log("Tache de reprogrammation du Job ", processDefinition, nextReschedulerDate);

	}

	/** {@inheritDoc} */
	@Override
	public void scheduleAt(final ProcessDefinition processDefinition, final Date planifiedTime, final Map<String, String> initialParams) {
		Assertion.checkNotNull(processDefinition);
		Assertion.checkNotNull(planifiedTime);
		Assertion.checkNotNull(initialParams);
		//---
		final TimerTask task = createTimerTask(processDefinition);
		timerPool.getTimer(processDefinition.getName()).schedule(task, planifiedTime);
		log("Job ", processDefinition, planifiedTime);

	}

	@Override
	public ProcessType getHandledProcessType() {
		return ProcessType.UNSUPERVISED;
	}

	private static Date getNextExecutionDateFrom(final ProcessDefinition processDefinition, final Date fromDate) {
		try {
			final CronExpression cronExpression = new CronExpression(processDefinition.getTriggeringStrategy().getCronExpression().get());
			return Optional.of(cronExpression.getNextValidTimeAfter(fromDate))
					.orElseThrow(() -> new IllegalStateException("Cannot find a next execution date for process :" + processDefinition));
		} catch (final ParseException e) {
			throw WrappedException.wrap(e, "Process' cron expression is not valid, process cannot be planned");
		}
	}

	private TimerTask createTimerTask(final ProcessDefinition processDefinition) {
		return new BasicTimerTask(processDefinition, myProcessExecutor);
	}

	private TimerTask createRescheduledTimerTask(final ProcessDefinition processDefinition, final Date nextExecutionDate) {
		return new ReschedulerTimerTask(this, processDefinition, nextExecutionDate);
	}

	private static void log(final String info, final ProcessDefinition processDefinition, final Date date) {
		final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss", Locale.FRANCE);
		getLogger(processDefinition.getName()).info(info + processDefinition.getName() + " programmé pour " + dateFormat.format(date));
	}

	private static Logger getLogger(final String jobName) {
		return Logger.getLogger(jobName);
	}

	//=========================================================================
	//=============================POOL de TIMER===============================
	//=========================================================================
	static class TimerPool {
		// cette implémentation est simplement basée sur la classe java.util.Timer du JDK
		private final Map<String, Timer> timerMap = new HashMap<>();

		// pour interrupt
		private final Map<String, Thread> threadMap = new HashMap<>();

		synchronized Timer getTimer(final String jobName) {
			//Synchronized car appelée lors de la programation des Timers,
			//la plupart sont programmés dans lors de l'initialisation,
			//mais il est possible de programmer sur des evenements métiers.
			//Utilisé QUE lors des programmations, pas à l'exec.
			Timer timer = timerMap.get(jobName);
			if (timer == null) {
				// le timer est démon pour ne pas empêcher l'arrêt de la jvm,
				// timerName est utilisé comme nom du thread java
				timer = new Timer(jobName, true);
				timerMap.put(jobName, timer);
				final TimerTask registrerThreadTimerTask = new TimerTask() {
					/** {@inheritDoc} */
					@Override
					public void run() {
						registrerTimerThread(Thread.currentThread());
					}
				};
				timer.schedule(registrerThreadTimerTask, new Date());
			}
			return timer;
		}

		void registrerTimerThread(final Thread thread) {
			threadMap.put(thread.getName(), thread);
		}

		void close() {
			//La méthode close est appelée par le gestionnaire des managers.
			//Elle n'a pas besoin d'être synchronisée.
			// on cancel les timers pour qu'ils n'aient plus de schedule
			for (final Timer timer : timerMap.values()) {
				timer.cancel();
			}
			timerMap.clear();
			// on appelle interrupt() sur les threads pour qu'un job en cours
			// puisse tester Thread.currentThread().isInterrupted() et s'arrêter promptement
			for (final Thread thread : threadMap.values()) {
				thread.interrupt();
			}
			threadMap.clear();
		}
	}

}
