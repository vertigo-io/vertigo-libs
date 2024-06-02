package io.vertigo.ui.impl.quasar.tree;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class TreeNodeData implements Serializable {

	private static final long serialVersionUID = 1L;

	private final Map<String, Object> data;

	public TreeNodeData() {
		data = new HashMap<>();
	}

	public TreeNodeData add(final String key, final Object value) {
		data.put(key, value);
		return this;
	}

	public Map<String, Object> getData() {
		return data;
	}

}
