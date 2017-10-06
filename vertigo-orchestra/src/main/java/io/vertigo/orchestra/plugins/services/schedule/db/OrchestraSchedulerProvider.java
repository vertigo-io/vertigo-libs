package io.vertigo.orchestra.plugins.services.schedule.db;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.commons.daemon.DaemonDefinition;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.orchestra.dao.schedule.OJobScheduleDAO;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;
import io.vertigo.orchestra.plugins.store.OrchestraStore;


public class OrchestraSchedulerProvider implements SimpleDefinitionProvider {

	private static final Logger LOGGER = LogManager.getLogger(OrchestraSchedulerProvider.class);

	private int myPlanningPeriod;

	@Inject
	private OJobScheduleDAO jobShedulePAO;

	@Inject
	private OrchestraStore orchestraStore;
	
	@Inject
	private VTransactionManager vTransactionManager;

	@Inject
	public OrchestraSchedulerProvider(@Named("planningPeriod") int planningPeriod) {
		this.myPlanningPeriod = planningPeriod;
	}


	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return Collections.singletonList(new DaemonDefinition("DMN_O_DB_PROCESS_SCHEDULER_DAEMON", () -> this::scheduleAndInit, myPlanningPeriod));
	}

	private void scheduleAndInit() {
		try (VTransactionWritable t = vTransactionManager.createCurrentTransaction()){
			initNewProcessesToLaunch();
			t.commit();
		} catch (final Exception e) {
			// We log the error and we continue the timer
			LOGGER.error("Exception planning recurrent processes", e);
		}

	}

	private void initNewProcessesToLaunch() {
		final DtList<OJobSchedule> jobs = getPlanificationsToTrigger();

		for (OJobSchedule oJobSchedule : jobs) {
			orchestraStore.startJobSchedule(oJobSchedule.getJscId());
		}

	}

	private DtList<OJobSchedule> getPlanificationsToTrigger() {
		return jobShedulePAO.getJobsScheduleToRun(ZonedDateTime.now());
	}

}