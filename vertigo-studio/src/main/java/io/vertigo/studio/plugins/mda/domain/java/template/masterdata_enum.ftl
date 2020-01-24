package ${entity.packageName};

import java.io.Serializable;

import io.vertigo.datamodel.structure.model.MasterDataEnum;
import io.vertigo.datamodel.structure.model.UID;

public enum ${entity.classSimpleName}Enum implements MasterDataEnum<${entity.className}> {

<#list entity.enumValues as enumValue>
	${enumValue.name}("${enumValue.id}")<#sep>, //</#sep>
</#list>	;

	private final Serializable entityId;

	private ${entity.classSimpleName}Enum(final Serializable id) {
		entityId = id;
	}

	@Override
	public UID<${entity.className}> getEntityUID() {
		return UID.of(${entity.className}.class, entityId);
	}

}
