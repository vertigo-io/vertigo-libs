package io.vertigo.ui.impl.quasar.tree.builder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import io.vertigo.core.locale.LocaleMessageKey;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.ui.impl.quasar.tree.Tree;
import io.vertigo.ui.impl.quasar.tree.TreeNode;

/**
 *
 */
public final class TreeBuilder {

	static final String IDX_SEP = "¤";
	final List<ListContext<?>> listContexts;

	final Map<String, TreeNode> rIndex;
	private final Map<TreeNode, String> nodeIdIndex;

	final Tree tree;
	TreeNode rootTN;

	private TreeBuilder() {
		listContexts = new ArrayList<>();
		rIndex = new HashMap<>();
		nodeIdIndex = new HashMap<>();

		rootTN = new TreeNode();// create dummy root TN to simplify building

		tree = new Tree();
		tree.setChildren(rootTN.getChildren());
	}

	public static <T> ListContext<T> of(final List<T> list) {
		final var builder = new TreeBuilder();
		return builder.withList(list);
	}

	public static TreeBuilder ofRoot(final String label) {
		return ofRoot(label, label);
	}

	public static Tree emptyTree(final LocaleMessageKey label) {
		return ofRoot(label)
				.withList(List.of())
				.addLevel(Function.identity(), Function.identity())
				.build();
	}

	public static TreeBuilder ofRoot(final LocaleMessageKey key) {
		final var str = LocaleMessageText.of(key).getDisplay();
		return ofRoot(str, str);
	}

	public static TreeBuilder ofRoot(final String label, final String value) {
		return new TreeBuilder()
				.withRoot(label, value);
	}

	private TreeBuilder withRoot(final String label, final String value) {
		final TreeNode root = new TreeNode();
		root.setLabel(label);
		root.setValue(value);

		root.setChildren(rootTN.getChildren());
		tree.setChildren(List.of(root));
		rootTN = root;
		return this;
	}

	public TreeBuilder rootTickable() {
		return withRootTickable(true);
	}

	public TreeBuilder rootNotTickable() {
		return withRootTickable(false);
	}

	public TreeBuilder withRootTickable(final Boolean tickable) {
		rootTN.setTickable(Boolean.TRUE.equals(tickable));
		return this;
	}

	public TreeBuilder rootExpanded() {
		return withRootExpanded(true);
	}

	public TreeBuilder withRootExpanded(final Boolean expanded) {
		if (Boolean.TRUE.equals(expanded)) {
			tree.getExpanded().add(rootTN.getValue());
		}
		return this;
	}

	public TreeBuilder rootSelectable() {
		rootTN.setSelectable(true);
		return this;
	}

	public TreeBuilder rootNotSelectable() {
		rootTN.setSelectable(false);
		return this;
	}

	public TreeBuilder rootDisabled() {
		return withRootDisabled(true);
	}

	public TreeBuilder withRootDisabled(final Boolean disabled) {
		rootTN.setDisabled(Boolean.TRUE.equals(disabled));
		return this;
	}

	public <T> ListContext<T> withList(final List<T> list) {
		final var lc = ListContext.of(this, list);
		listContexts.add(lc);
		return lc;
	}

	<T> ListContext<T> joinList(final List<T> list, final List<Function<T, Object>> joins, final Boolean isInner) {
		final var lc = ListContext.ofJoin(this, list, joins);
		if (Boolean.TRUE.equals(isInner)) {
			lc.inner();
		}
		listContexts.add(lc);
		return lc;
	}

	<T> ListContext<T> crossJoinList(final List<T> list) {
		final var lc = ListContext.ofCrossJoin(this, list);
		listContexts.add(lc);
		return lc;
	}

	Tree build() {
		ListContext<?> prevLc = null;
		for (final ListContext<?> lc : listContexts) {
			doAddItems(lc);
			if (prevLc != null && lc.isInner) {
				prevLc.evictForInner();
			}
			prevLc = lc;
		}
		return tree;
	}

	private <O> void doAddItems(final ListContext<O> lc) {
		// join with previous nodes or else with root node list
		final Function<O, List<TreeNode>> join = lc.join == null ? (o -> List.of(rootTN)) : lc.join;
		for (final O item : lc.list) {
			// for every lines of current list of data
			List<TreeNode> parents = join.apply(item);
			if (parents.isEmpty()) {
				if (lc.rejectHandler != null) {
					lc.rejectHandler.accept(item);
				}
				if (lc.rejectAttachement != null) {
					final var idListDefault = lc.rejectAttachement.apply(item);
					final TreeNode defaultTreeNode = rIndex.get(String.join(IDX_SEP, idListDefault));
					parents = defaultTreeNode == null ? List.of() : List.of(defaultTreeNode);
				}
			}
			for (final TreeNode parent : parents) {
				// for each resolved parent (may be duplication of data for cross join)
				doAddItem(lc, item, parent);
			}
		}
	}

	@SuppressWarnings("java:S1643") // On append au début de la string
	private <O> void doAddItem(final ListContext<O> lc, final O item, final TreeNode parent) {
		List<TreeNode> curentParentChildList = parent.getChildren(); // where to add the new child
		String key = nodeIdIndex.getOrDefault(parent, ""); // get absolute id of parent to construct our ID

		for (final LevelContext<O> lvl : lc.levels) {
			// each value can have multiple levels of data
			if (!lvl.needProcess(item)) {
				// No data at this level, stop processing this line of data
				break;
			}

			if (!key.isEmpty()) {
				key = IDX_SEP + key;
			}
			key = lvl.valueAccessor.apply(item) + key;

			TreeNode itemToAdd = rIndex.get(key);
			if (itemToAdd == null) { // n'existe pas déjà
				itemToAdd = lvl.convert(item);
				curentParentChildList.add(itemToAdd);
				addToReverseIndex(itemToAdd, key);
				nodeIdIndex.put(itemToAdd, key);
				lvl.buildedNodes.add(itemToAdd);
			}

			curentParentChildList = itemToAdd.getChildren();
		}
	}

	private void addToReverseIndex(final TreeNode itemToAdd, final String newKey) {
		final String[] ids = newKey.split(IDX_SEP);
		final StringBuilder key = new StringBuilder();
		for (final String s : ids) {
			if (key.length() > 0) {
				key.append(IDX_SEP);
			}
			key.append(s);
			rIndex.put(key.toString(), itemToAdd);
		}
	}

}
