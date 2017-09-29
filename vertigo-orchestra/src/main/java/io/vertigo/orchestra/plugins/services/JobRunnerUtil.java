package io.vertigo.orchestra.plugins.services;


import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class JobRunnerUtil {
	
	private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss");
	
	public static String generateJobId(ZonedDateTime dateTime, String typeSchedule, long scheduleId) {
		return DTF.format(dateTime) + '_' + typeSchedule + '_' + scheduleId;
	}
	
	public static String generateFormattedDate(ZonedDateTime dateTime) {
		return DTF.format(dateTime);
	}	
	
}

