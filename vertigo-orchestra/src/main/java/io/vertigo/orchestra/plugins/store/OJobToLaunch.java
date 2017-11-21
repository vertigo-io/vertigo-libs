package io.vertigo.orchestra.plugins.store;

import java.time.ZonedDateTime;

import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.domain.schedule.OJobCron;
import io.vertigo.orchestra.domain.schedule.OJobSchedule;

final class OJobToLaunch {

	private final OJobCron jobCron;
	private final OJobSchedule jobSchedule;
	private final ZonedDateTime scheduledDate;

	OJobToLaunch(final OJobCron jobCron, final ZonedDateTime scheduledDate) {
		Assertion.checkNotNull(jobCron);
		Assertion.checkNotNull(scheduledDate);
		//---
		this.jobCron = jobCron;
		this.jobSchedule = null;
		this.scheduledDate = scheduledDate;
	}

	OJobToLaunch(final OJobSchedule jobSchedule) {
		Assertion.checkNotNull(jobSchedule);
		//---
		this.jobCron = null;
		this.jobSchedule = jobSchedule;
		this.scheduledDate = jobSchedule.getScheduleDate();
	}

	boolean isCron() {
		return jobCron != null;
	}

	ZonedDateTime getScheduledDate() {
		return scheduledDate;
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
