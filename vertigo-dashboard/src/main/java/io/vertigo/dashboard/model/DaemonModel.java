package io.vertigo.dashboard.model;

import io.vertigo.commons.daemon.DaemonDefinition;
import io.vertigo.commons.daemon.DaemonStat;

public class DaemonModel {
	private final DaemonDefinition daemonDefinition;
	private final DaemonStat daemonStat;

	public DaemonModel(final DaemonDefinition daemonDefinition, final DaemonStat daemonStat) {
		this.daemonDefinition = daemonDefinition;
		this.daemonStat = daemonStat;
	}

	public String getName() {
		return daemonDefinition.getName();
	}

	public int getPeriodInSeconds() {
		return daemonDefinition.getPeriodInSeconds();
	}

	public boolean isLastExecSuccess() {
		if (daemonStat.getCount() > 0) {
			return daemonStat.isLastExecSuccess();
		}
		return true;
	}

}
