package io.vertigo.social.handle;

import java.util.List;

import io.vertigo.core.node.component.Component;
import io.vertigo.datamodel.structure.model.UID;

public interface HandleManager extends Component {

	List<Handle> searchHandles(final String handlePrefix);

	List<String> getHandlePrefixes();

	Handle getHandleByUid(UID uid);

	Handle getHandleByCode(String code);

	void reindexAll();

}
