package io.vertigo.ui.impl.quasar.tree.builder;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import io.vertigo.ui.impl.quasar.tree.Tree;
import io.vertigo.ui.impl.quasar.tree.TreeNode;
import io.vertigo.ui.impl.quasar.tree.TreeNodeData;

public final class LevelContext<T> {
	private final ListContext<T> parent;
	final List<TreeNode> buildedNodes;

	final Function<T, Object> valueAccessor;
	final Function<T, Object> labelAccessor;

	private Function<T, Object> headerResolver;
	private Function<T, Boolean> disabledPredicate;
	private Function<T, Boolean> tickablePredicate;
	private Function<T, Boolean> noTickPredicate;
	private Function<T, Boolean> tickedPredicate;
	private Function<T, Boolean> expandablePredicate;
	private Function<T, Boolean> expandedPredicate;
	private Function<T, Boolean> selectablePredicate;
	private Function<T, Boolean> selectedPredicate;
	private Function<T, Boolean> filterPredicate;
	private Function<T, TreeNodeData> dataResolver;

	LevelContext(final ListContext<T> parent, final Function<T, Object> valueAccessor, final Function<T, Object> labelAccessor) {
		buildedNodes = new ArrayList<>();

		this.parent = parent;
		this.valueAccessor = valueAccessor;
		this.labelAccessor = labelAccessor;

		headerResolver = parent.headerResolver;
		disabledPredicate = parent.disabledPredicate;
		tickablePredicate = parent.tickablePredicate;
		noTickPredicate = parent.noTickPredicate;
		tickedPredicate = parent.tickedPredicate;
		expandablePredicate = parent.expandablePredicate;
		expandedPredicate = parent.expandedPredicate;
		selectablePredicate = parent.selectablePredicate;
		selectedPredicate = parent.selectedPredicate;
		dataResolver = parent.dataResolver;
	}

	public LevelContext<T> withHeader(final String header) {
		return withHeaderResolver(t -> header);
	}

	public LevelContext<T> withHeaderResolver(final Function<T, Object> myHeaderResolver) {
		this.headerResolver = myHeaderResolver;
		return this;
	}

	public LevelContext<T> disabled() {
		return withDisabledPredicate(ListContext.alwaysTrue());
	}

	public LevelContext<T> withDisabledPredicate(final Function<T, Boolean> myDisabledPredicate) {
		this.disabledPredicate = myDisabledPredicate;
		return this;
	}

	public LevelContext<T> tickable() {
		return withTickablePredicate(ListContext.alwaysTrue());
	}

	public LevelContext<T> notTickable() {
		return withTickablePredicate(ListContext.alwaysFalse());
	}

	public LevelContext<T> withTickablePredicate(final Function<T, Boolean> myTickablePredicate) {
		this.tickablePredicate = myTickablePredicate;
		return this;
	}

	public LevelContext<T> noTick() {
		return withNoTickPredicate(ListContext.alwaysTrue());
	}

	public LevelContext<T> withTick() {
		return withNoTickPredicate(ListContext.alwaysFalse());
	}

	public LevelContext<T> withNoTickPredicate(final Function<T, Boolean> myNoTickPredicate) {
		this.noTickPredicate = myNoTickPredicate;
		return this;
	}

	public LevelContext<T> ticked() {
		return withTickedPredicate(ListContext.alwaysTrue());
	}

	public LevelContext<T> notTicked() {
		return withTickedPredicate(ListContext.alwaysFalse());
	}

	public LevelContext<T> withTickedPredicate(final Function<T, Boolean> myTickedPredicate) {
		this.tickedPredicate = myTickedPredicate;
		return this;
	}

	public LevelContext<T> expandable() {
		return withExpandablePredicate(ListContext.alwaysTrue());
	}

	public LevelContext<T> notExpandable() {
		return withExpandablePredicate(ListContext.alwaysFalse());
	}

	public LevelContext<T> withExpandablePredicate(final Function<T, Boolean> myExpandablePredicate) {
		this.expandablePredicate = myExpandablePredicate;
		return this;
	}

	public LevelContext<T> expanded() {
		return withExpandedPredicate(ListContext.alwaysTrue());
	}

	public LevelContext<T> withExpandedPredicate(final Function<T, Boolean> myExpandedPredicate) {
		this.expandedPredicate = myExpandedPredicate;
		return this;
	}

	public LevelContext<T> selectable() {
		return withSelectablePredicate(ListContext.alwaysTrue());
	}

	public LevelContext<T> withSelectablePredicate(final Function<T, Boolean> mySelectablePredicate) {
		this.selectablePredicate = mySelectablePredicate;
		return this;
	}

	public LevelContext<T> withSelectedPredicate(final Function<T, Boolean> mySelectedPredicate) {
		this.selectedPredicate = mySelectedPredicate;
		return this;
	}

	public LevelContext<T> filter(final Function<T, Boolean> myFilterPredicate) {
		this.filterPredicate = myFilterPredicate;
		return this;
	}

	public LevelContext<T> withDataResolver(final Function<T, TreeNodeData> myDataResolver) {
		this.dataResolver = myDataResolver;
		return this;
	}

	boolean needProcess(final T item) {
		return labelAccessor.apply(item) != null
				&& (filterPredicate == null || filterPredicate.apply(item));
	}

	TreeNode convert(final T item) {
		final TreeNode node = new TreeNode();

		node.setLabel(labelAccessor.apply(item).toString());
		final String value = valueAccessor.apply(item).toString();
		node.setValue(value);

		if (headerResolver != null) {
			node.setHeader(headerResolver.apply(item).toString());
		}
		if (dataResolver != null) {
			node.setData(dataResolver.apply(item).getData());
		}
		if (disabledPredicate != null) {
			node.setDisabled(disabledPredicate.apply(item));
		}
		if (tickablePredicate != null) {
			node.setTickable(tickablePredicate.apply(item));
		}
		if (noTickPredicate != null) {
			node.setNoTick(noTickPredicate.apply(item));
		}
		if (tickedPredicate != null && Boolean.TRUE.equals(tickedPredicate.apply(item))) {
			parent.parent.tree.getTicked().add(value);
		}
		if (expandablePredicate != null) {
			node.setExpandable(expandablePredicate.apply(item));
		}
		if (expandedPredicate != null && Boolean.TRUE.equals(expandedPredicate.apply(item))) {
			parent.parent.tree.getExpanded().add(value);
		}
		if (selectablePredicate != null) {
			node.setSelectable(selectablePredicate.apply(item));
		}
		if (selectedPredicate != null) {
			parent.parent.tree.setSelected(value);
		}

		return node;
	}

	// delegates
	public LevelContext<T> addLevel(final Function<T, Object> myLabelAccessor) {
		return parent.addLevel(myLabelAccessor);
	}

	public LevelContext<T> addLevel(final Function<T, Object> myLabelAccessor, final Function<T, Object> myValueAccessor) {
		return parent.addLevel(myLabelAccessor, myValueAccessor);
	}

	public <O> ListContext<O> joinList(final List<O> list, final Function<O, Object> join) {
		return parent.parent.joinList(list, List.of(join), false);
	}

	public <O> ListContext<O> joinList(final List<O> list, final List<Function<O, Object>> joins) {
		return parent.parent.joinList(list, joins, false);
	}

	public <O> ListContext<O> joinList(final List<O> list, final List<Function<O, Object>> joins, final Boolean isInner) {
		return parent.parent.joinList(list, joins, isInner);
	}

	public <O> ListContext<O> innerJoinList(final List<O> list, final Function<O, Object> join) {
		return parent.parent.joinList(list, List.of(join), true);
	}

	public <O> ListContext<O> innerJoinList(final List<O> list, final List<Function<O, Object>> joins) {
		return parent.parent.joinList(list, joins, true);
	}

	public <O> ListContext<O> crossJoinList(final List<O> list) {
		return parent.parent.crossJoinList(list);
	}

	public Tree build() {
		return parent.parent.build();
	}

}
