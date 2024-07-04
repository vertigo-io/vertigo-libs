/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.impl.quasar.tree.builder;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.ui.impl.quasar.tree.TreeNode;
import io.vertigo.ui.impl.quasar.tree.TreeNodeData;

public final class ListContext<T> {

	private static final BiFunction<Map<String, TreeNode>, List<String>, List<TreeNode>> INDEX_MATCH = (i, l) -> {
		final var tn = i.get(String.join(TreeBuilder.IDX_SEP, l));
		return tn == null ? List.of() : List.of(tn);
	};

	final TreeBuilder parent;
	final List<T> list;
	final Function<T, List<TreeNode>> join;
	final List<LevelContext<T>> levels;
	Consumer<T> rejectHandler;
	Function<T, List<String>> rejectAttachement;
	boolean isInner;
	private List<TreeNode> parentInnerCheckReferences;

	// defaults for levels
	Function<T, Object> headerResolver;
	Function<T, Boolean> disabledPredicate;
	Function<T, Boolean> tickablePredicate;
	Function<T, Boolean> noTickPredicate;
	Function<T, Boolean> tickedPredicate;
	Function<T, Boolean> expandablePredicate;
	Function<T, Boolean> expandedPredicate;
	Function<T, Boolean> selectablePredicate;
	Function<T, Boolean> selectedPredicate;
	Function<T, TreeNodeData> dataResolver;

	private ListContext(final TreeBuilder parent, final List<T> list, final Function<T, List<TreeNode>> join) {
		this.parent = parent;
		this.list = list;
		this.join = join;
		levels = new ArrayList<>();

		if (parent.listContexts.isEmpty()) {
			parentInnerCheckReferences = List.of(parent.rootTN);
		} else {
			final var prevListCtx = parent.listContexts.get(parent.listContexts.size() - 1);
			parentInnerCheckReferences = prevListCtx.levels.get(prevListCtx.levels.size() - 1).buildedNodes;
		}
	}

	static <P> Function<P, Boolean> alwaysTrue() {
		return t -> true;
	}

	static <P> Function<P, Boolean> alwaysFalse() {
		return t -> false;
	}

	static <T> ListContext<T> of(final TreeBuilder parent, final List<T> list) {
		return new ListContext<>(parent, list, null);
	}

	static <T> ListContext<T> ofCrossJoin(final TreeBuilder parent, final List<T> list) {
		final var prevLC = parent.listContexts.get(parent.listContexts.size() - 1);
		final LevelContext<?> previousLevel = prevLC.levels.get(prevLC.levels.size() - 1);

		return new ListContext<>(parent, list, t -> previousLevel.buildedNodes);
	}

	static <T> ListContext<T> ofJoin(final TreeBuilder parent, final List<T> list, final List<Function<T, Object>> joins) {
		return new ListContext<>(parent,
				list,
				t -> INDEX_MATCH.apply(
						parent.rIndex,
						joins.stream()
								.map(f -> f.apply(t))
								.peek(v -> Assertion.check().isNotNull(v, "Object to join can't have null values on provided join attributes"))
								.map(Object::toString)
								.collect(Collectors.toList())));
	}

	ListContext<T> inner() {
		isInner = true;
		return this;
	}

	void evictForInner() {
		final int nbLevels = levels.size();
		if (nbLevels > 1) {
			for (int i = nbLevels - 2; i >= 0; i--) {
				final var listToEvict = levels.get(i).buildedNodes;
				doEvictOrphans(listToEvict);
			}
		}
		doEvictOrphans(parentInnerCheckReferences);
	}

	private static void doEvictOrphans(final List<TreeNode> listToEvict) {
		for (final TreeNode parentNode : listToEvict) {
			final Iterator<TreeNode> it = parentNode.getChildren().iterator();
			while (it.hasNext()) {
				final TreeNode node = it.next();
				if (node.getChildren().isEmpty()) {
					it.remove();
				}
			}
		}
	}

	public LevelContext<T> addLevel(final Function<T, Object> labelAccessor) {
		return addLevel(labelAccessor, labelAccessor);
	}

	public LevelContext<T> addLevel(final Function<T, Object> labelAccessor, final Function<T, Object> valueAccessor) {
		final var lvl = new LevelContext<>(this, valueAccessor, labelAccessor);
		levels.add(lvl);
		return lvl;
	}

	public ListContext<T> withRejectHandler(final Consumer<T> myRejectHandler) {
		this.rejectHandler = myRejectHandler;
		return this;
	}

	public ListContext<T> withRejectTo(final Function<T, List<String>> myRejectAttachement) {
		this.rejectAttachement = myRejectAttachement;
		return this;
	}

	// defaults for levels
	public ListContext<T> withHeader(final String header) {
		return withHeaderResolver(t -> header);
	}

	public ListContext<T> withHeaderResolver(final Function<T, Object> myHeaderResolver) {
		this.headerResolver = myHeaderResolver;
		return this;
	}

	public ListContext<T> disabled() {
		return withDisabledPredicate(alwaysTrue());
	}

	public ListContext<T> withDisabledPredicate(final Function<T, Boolean> myDisabledPredicate) {
		this.disabledPredicate = myDisabledPredicate;
		return this;
	}

	public ListContext<T> tickable() {
		return withTickablePredicate(alwaysTrue());
	}

	public ListContext<T> notTickable() {
		return withTickablePredicate(alwaysFalse());
	}

	public ListContext<T> withTickablePredicate(final Function<T, Boolean> myTickablePredicate) {
		this.tickablePredicate = myTickablePredicate;
		return this;
	}

	public ListContext<T> noTick() {
		return withNoTickPredicate(alwaysTrue());
	}

	public ListContext<T> withTick() {
		return withNoTickPredicate(alwaysFalse());
	}

	public ListContext<T> withNoTickPredicate(final Function<T, Boolean> myNoTickPredicate) {
		this.noTickPredicate = myNoTickPredicate;
		return this;
	}

	public ListContext<T> ticked() {
		return withTickedPredicate(alwaysTrue());
	}

	public ListContext<T> notTicked() {
		return withTickedPredicate(alwaysFalse());
	}

	public ListContext<T> withTickedPredicate(final Function<T, Boolean> myTickedPredicate) {
		this.tickedPredicate = myTickedPredicate;
		return this;
	}

	public ListContext<T> expandable() {
		return withExpandablePredicate(alwaysTrue());
	}

	public ListContext<T> notExpandable() {
		return withExpandablePredicate(alwaysFalse());
	}

	public ListContext<T> withExpandablePredicate(final Function<T, Boolean> myExpandablePredicate) {
		this.expandablePredicate = myExpandablePredicate;
		return this;
	}

	public ListContext<T> expanded() {
		return withExpandedPredicate(alwaysTrue());
	}

	public ListContext<T> withExpandedPredicate(final Function<T, Boolean> myExpandedPredicate) {
		this.expandedPredicate = myExpandedPredicate;
		return this;
	}

	public ListContext<T> selectable() {
		return withSelectablePredicate(alwaysTrue());
	}

	public ListContext<T> withSelectablePredicate(final Function<T, Boolean> mySelectablePredicate) {
		this.selectablePredicate = mySelectablePredicate;
		return this;
	}

	public ListContext<T> withSelectedPredicate(final Function<T, Boolean> mySelectedPredicate) {
		this.selectedPredicate = mySelectedPredicate;
		return this;
	}

	public ListContext<T> withDataResolver(final Function<T, TreeNodeData> myDataResolver) {
		this.dataResolver = myDataResolver;
		return this;
	}

}
