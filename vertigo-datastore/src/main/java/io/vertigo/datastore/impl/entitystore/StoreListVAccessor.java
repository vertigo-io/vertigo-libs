package io.vertigo.datastore.impl.entitystore;

import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.node.Home;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.ListVAccessor;
import io.vertigo.datastore.entitystore.EntityStoreManager;

public class StoreListVAccessor<E extends Entity> extends ListVAccessor<E> {

	private static final long serialVersionUID = -4840484505809842010L;

	public StoreListVAccessor(final Entity entity, final String associationDefinitionName, final String roleName) {
		super(entity, associationDefinitionName, roleName);
	}

	/**
	 * Loads the value if needed.
	 */
	public final void load() {
		// we are not lazy the uid of the parent might have changed
		if (getSourceUID() != null) {
			final EntityStoreManager entityStoreManager = Home.getApp().getComponentSpace().resolve(EntityStoreManager.class);
			final DtList<E> dtList = entityStoreManager.findAll(getDtListURI());
			super.set(dtList);
		} else {
			// if the uid is null we return an empty dtList
			super.set(new DtList<>(getTargetDefinitionReference().get()));
		}
	}

	@Override
	public final void set(final DtList<E> dtList) {
		throw new VSystemException("StoreListVAccessor cannot be set, you can only load it");
	}

}
