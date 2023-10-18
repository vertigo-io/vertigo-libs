package io.vertigo.vortex.plugins.bb.memory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * This structure is hybrid and can be used as a stack or a list.

 * @author pchretien
 */
final class BBList {
	static final BBList EMPTY = new BBList(false);

	private final List<String> values;

	BBList() {
		this(true);
	}

	private BBList(final boolean mutable) {
		values = mutable
				? new ArrayList<>()
				: Collections.emptyList();
	}

	int size() {
		return values.size();
	}

	void push(final String value) {
		values.add(value);
	}

	String pop() {
		if (values.isEmpty()) {
			return null;
		}
		return values.remove(values.size() - 1);
	}

	String peek() {
		if (values.isEmpty()) {
			return null;
		}
		return values.get(values.size() - 1);
	}

	String get(final int idx) {
		int index;
		if (idx < 0) {
			index = values.size() + idx;
			if (index < 0) {
				index = 0;
			}
		} else {
			index = idx;
		}
		if (index >= 0 && index < values.size()) {
			return values.get(index);
		}
		return null;
	}

}
