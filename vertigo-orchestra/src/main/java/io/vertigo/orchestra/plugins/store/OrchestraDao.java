package io.vertigo.orchestra.plugins.store;

import io.vertigo.core.component.Component;
import io.vertigo.dynamo.task.proxy.TaskAnnotation;
import io.vertigo.dynamo.task.proxy.TaskInput;
import io.vertigo.dynamo.task.proxy.TaskOutput;
import io.vertigo.dynamox.task.TaskEngineSelect;
import io.vertigo.orchestra.domain.model.OJobModel;

public interface OrchestraDao extends Component {
	@TaskAnnotation(
			name = "TK_DEACTIVATE_JOB_MODEL",
			dataSpace = "orchestra",
			request = "Update O_JOB_MODEL set where jmo_id = #jmoId#"
					+ "select * from super_hero <%}%>",
			taskEngineClass = TaskEngineSelect.class)
	@TaskOutput(domain = "DO_DT_SUPER_HERO_DTC")
	OJobModel deactivateJobModel(
			@TaskInput(name = "jmoId", domain = "DO_STRING") long jmoId);
}
