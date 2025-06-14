/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
