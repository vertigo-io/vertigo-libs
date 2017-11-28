package io.vertigo.orchestra.plugins.store;

import java.time.Instant;

import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.domain.schedule.OJobCron;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;

final class OJobToLaunch {

	private final OJobCron jobCron;
	private final OJobSchedule jobSchedule;
	private final Instant scheduledInstant;

	OJobToLaunch(final OJobCron jobCron, final Instant scheduledInstant) {
		Assertion.checkNotNull(jobCron);
		Assertion.checkNotNull(scheduledInstant);
		//---
		this.jobCron = jobCron;
		this.jobSchedule = null;
		this.scheduledInstant = scheduledInstant;
	}

	OJobToLaunch(final OJobSchedule jobSchedule) {
		Assertion.checkNotNull(jobSchedule);
		//---
		this.jobCron = null;
		this.jobSchedule = jobSchedule;
		this.scheduledInstant = jobSchedule.getScheduleInstant();
	}

	boolean isCron() {
		return jobCron != null;
	}

	Instant getScheduledInstant() {
		return scheduledInstant;
	}

	long getJmoId() {
		return isCron() ? getJobCron().getJmoId() : getJobSchedule().getJmoId();
	}

	OJobCron getJobCron() {
		Assertion.checkNotNull(jobCron);
		return jobCron;
	}

	OJobSchedule getJobSchedule() {
		Assertion.checkNotNull(jobSchedule);
		return jobSchedule;
	}

}
