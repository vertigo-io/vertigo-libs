package io.vertigo.orchestra.plugins.services;


import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class JobRunnerUtil {
	
	public static final MapCodec MAP_CODEC = new MapCodec();
	private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss");
	
	public static String generateJobId(ZonedDateTime dateTime, String typeSchedule, long scheduleId) {
		return DTF.format(dateTime) + '_' + typeSchedule + '_' + scheduleId;
	}
	
	public static String generateFormattedDate(ZonedDateTime dateTime) {
		return DTF.format(dateTime);
	}	
	
	
	public static String mapToJson(Map<String, String> map) {
		return MAP_CODEC.encode(map);
	}
	
	public static Map<String, String> jsonToMap(String json) {
		return MAP_CODEC.decode(json);
	}
}

