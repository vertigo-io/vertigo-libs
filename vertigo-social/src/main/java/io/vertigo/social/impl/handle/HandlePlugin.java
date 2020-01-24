package io.vertigo.social.impl.handle;

import java.util.List;

import io.vertigo.core.node.component.Plugin;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.social.services.handle.Handle;

public interface HandlePlugin extends Plugin {

	void add(List<Handle> handles);

	List<Handle> search(String prefix);

	Handle getByCode(String handleCode);

	Handle getByUid(UID uid);

	void remove(List<UID> uids);

	void removeAll();

}
