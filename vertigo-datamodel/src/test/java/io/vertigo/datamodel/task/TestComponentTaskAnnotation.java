package io.vertigo.datamodel.task;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Component;
import io.vertigo.datamodel.task.definitions.TaskDefinition;
import io.vertigo.datamodel.task.model.Task;
import io.vertigo.datamodel.task.proxy.TaskAnnotation;
import io.vertigo.datamodel.task.proxy.TaskInput;
import io.vertigo.datamodel.task.proxy.TaskOutput;

public class TestComponentTaskAnnotation implements Component {

	@Inject
	private TaskManager taskManager;

	@TaskAnnotation(
			name = "TkMultiplyAnnotation",
			request = "*",
			taskEngineClass = TaskEngineMock2.class)
	@TaskOutput(smartType = "STyInteger")
	public Integer multiply(@TaskInput(name = TaskEngineMock2.ATTR_IN_INTEGERS, smartType = "STyInteger") final List<Integer> values) {
		return taskManager.execute(Task.builder(Node.getNode().getDefinitionSpace().resolve("TkMultiplyAnnotation", TaskDefinition.class))
				.addValue(TaskEngineMock2.ATTR_IN_INTEGERS, values)
				.build())
				.getResult();
	}

}
