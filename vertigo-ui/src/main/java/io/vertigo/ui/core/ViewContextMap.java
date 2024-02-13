/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.core;

import java.io.Serializable;
import java.lang.reflect.GenericArrayType;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.IdentityHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListURIForMasterData;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.webservice.model.UiList;
import io.vertigo.vega.webservice.model.UiObject;
import io.vertigo.vega.webservice.validation.DefaultDtObjectValidator;
import io.vertigo.vega.webservice.validation.DtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;

/**
 * Liste des couples (clé, object) enregistrés.
 * @author npiedeloup
 */
public final class ViewContextMap extends HashMap<String, Serializable> {
	private static final long serialVersionUID = 2850788652438173312L;

	/** Clée de l'id de context dans le context. */
	public static final String CTX = "CTX";
	public static final String INPUT_CTX = "INPUT_CTX";

	/** Clée de la creation de context dans le context. */
	public static final String CTX_CREATION_INSTANT = "CTX_CREATION_INSTANT"; //instant of initContext
	public static final String CTX_REUSE_INSTANT = "CTX_REUSE_INSTANT"; //instant of currentCtx reuse
	public static final String INPUT_CTX_REUSE_INSTANT = "INPUT_CTX_REUSE_INSTANT"; //instant of inputCtx reuse

	private static final String PROTECTED_VALUE_TRANSFORMER = "protected";
	private static final String MAP_VALUE_TRANSFORMER = "map";
	private static final Logger LOGGER = LogManager.getLogger(ViewContextMap.class);

	//Index UiObject et DtObject vers clé de context.
	private final Map<Serializable, String> reverseUiObjectIndex = new HashMap<>();
	//Index UiList et DtList vers clé de context. //identity HashMap because two empty list aren't the same
	private final Map<UiList<?>, String> reverseUiListIndex = new IdentityHashMap<>();
	private boolean unmodifiable; //initialisé à false
	private boolean dirty;
	private final ViewContextUpdateSecurity viewContextUpdateSecurity = new ViewContextUpdateSecurity();

	private transient JsonEngine jsonEngine;
	private final Map<String, Type> typesByKey = new HashMap<>();
	private final Map<String, Set<String>> keysForClient = new HashMap<>();
	private final Map<String, Map<String, List<String>>> valueTransformers = new HashMap<>();

	/** {@inheritDoc} */
	@Override
	public Serializable get(final Object key) {
		Assertion.check().isNotNull(key);
		//-----
		Serializable o = super.get(key);
		if (o == null) {
			LOGGER.error("Objet :{} non trouvé! Vérifier que l objet est bien enregistré avec la clé. Clés disponibles {}", key, keySet());
		}
		Assertion.check().isNotNull(o, "Objet :{0} non trouvé", key);
		final Type typeOfKey = typesByKey.get(key);
		if (typeOfKey != null) {
			if (o instanceof String) {
				o = jsonEngine.fromJson((String) o, typeOfKey);
			} else if (o instanceof String[]) {
				final String concat = Arrays.stream((String[]) o)
						.filter(v -> !v.isEmpty()) //empty html input means : no value; there are use to send removed value
						.map(v -> "\"" + v + "\"")
						.collect(Collectors.joining(",", "[", "]"));
				o = jsonEngine.fromJson(concat, typeOfKey);
			}
		}
		return o;
	}

	/**
	 * @param key Clé de context
	 * @return UiObject du context
	 */
	public <O extends DataObject> UiObject<O> getUiObject(final String key) {
		return (UiObject<O>) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return UiList du context
	 */
	public <O extends DataObject> UiList<O> getUiList(final String key) {
		return (UiList<O>) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return UiListModifiable du context
	 */
	public <O extends DataObject> BasicUiListModifiable<O> getUiListModifiable(final String key) {
		return (BasicUiListModifiable<O>) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return String du context
	 */
	public String getString(final String key) {
		final Object value = get(key);
		if (value instanceof String[] && ((String[]) value).length > 0) {
			//Spring set des String[] au lieu des String
			//on prend le premier
			return ((String[]) value)[0];
		}
		return (String) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return Long du context
	 */
	public Long getLong(final String key) {
		return (Long) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return Integer du context
	 */
	public Integer getInteger(final String key) {
		return (Integer) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return Boolean du context
	 */
	public Boolean getBoolean(final String key) {
		return (Boolean) get(key);
	}

	/** {@inheritDoc} */
	@Override
	public boolean containsKey(final Object key) {
		Assertion.check().isNotNull(key);
		//-----
		return super.containsKey(key);
	}

	/**
	 * @param uiObject UiObject recherché
	 * @return Clé de context de l'élément (null si non trouvé)
	 */
	public String findKey(final UiObject<?> uiObject) {
		Assertion.check().isNotNull(uiObject);
		//-----
		final String contextKey = reverseUiObjectIndex.get(uiObject);
		if (contextKey != null) {
			return contextKey;
		}
		for (final Map.Entry<UiList<?>, String> entry : reverseUiListIndex.entrySet()) {
			final int index = entry.getKey().indexOf(uiObject);
			if (index >= 0) {
				return entry.getValue() + "[" + index + "]";
			}
		}
		return null;
	}

	/**
	 * @param dtObject DtObject recherché
	 * @return Clé de context de l'élément (null si non trouvé)
	 */
	public String findKey(final DataObject dtObject) {
		Assertion.check().isNotNull(dtObject);
		//-----
		final String contextKey = reverseUiObjectIndex.get(dtObject);
		if (contextKey != null) {
			return contextKey;
		}
		for (final Map.Entry<UiList<?>, String> entry : reverseUiListIndex.entrySet()) {
			final int index = entry.getKey().indexOf(dtObject);
			if (index >= 0) {
				return entry.getValue() + "[" + index + "]";
			}
		}
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public Serializable put(final String key, final Serializable value) {
		Assertion.check()
				.isFalse(unmodifiable, "Ce context ({0}) a été figé et n'est plus modifiable.", super.get(CTX))
				.isNotBlank(key)
				.isNotNull(value, "la valeur doit être renseignée pour {0}", key)
				.isFalse(value instanceof DataObject, "Vous devez poser des uiObject dans le context pas des objets métiers ({0})", key)
				.isFalse(value instanceof DtList, "Vous devez poser des uiList dans le context pas des listes d'objets métiers ({0})", key);
		viewContextUpdateSecurity.assertIsUpdatable(key);
		//-----
		if (value instanceof UiObject) {
			// keep track of indexes
			reverseUiObjectIndex.values().removeIf(key::equals);
			// ---
			reverseUiObjectIndex.put(value, key);
			reverseUiObjectIndex.put(((UiObject<?>) value).getServerSideObject(), key);
		} else if (value instanceof UiList) {
			// keep track of indexes
			reverseUiListIndex.values().removeIf(key::equals);
			//---
			reverseUiListIndex.put((UiList<?>) value, key);
		}
		if ((value instanceof String || value instanceof String[]) && isMultiple(key)) {
			if (value instanceof String) {
				return super.put(key, convertMultipleValue((String) value));
			}
			return super.put(key, convertMultipleValue((String[]) value));
		}
		return super.put(key, value);

	}

	private boolean isMultiple(final String key) {
		final Type type = typesByKey.get(key);
		if (type != null) {
			if (type instanceof Class<?>) {
				return Iterable.class.isAssignableFrom((Class<?>) type);
			} else if (type instanceof ParameterizedType) {
				return Iterable.class.isAssignableFrom((Class<?>) ((ParameterizedType) type).getRawType());
			} else if (type instanceof GenericArrayType) {
				return true;
			}
		}
		return false;
	}

	private static Serializable convertMultipleValue(final String strValue) {
		if (!(strValue.startsWith("[") && strValue.endsWith("]"))) {
			String[] values;
			if (strValue.isEmpty()) {
				values = new String[0];
			} else {
				values = new String[] { strValue };
			}
			return values;
		}
		return strValue;
	}

	private static Serializable convertMultipleValue(final String[] strValues) {
		//we removed empty values, they mean "no value" and was use to send removed state to server
		boolean hasEmpty = false;
		for (final String value : strValues) {
			if (value.isEmpty()) {
				hasEmpty = true;
				break;
			}
		}
		if (hasEmpty) {
			final List<String> values = Arrays.stream(strValues)
					.filter(v -> !v.isEmpty())
					.toList();
			return values.toArray(new String[values.size()]);
		}
		return strValues;
	}

	/** {@inheritDoc} */
	@Override
	public Serializable remove(final Object key) {
		Assertion.check()
				.isFalse(unmodifiable, "Ce context ({0}) a été figé et n'est plus modifiable.", super.get(CTX))
				.isTrue(key instanceof String, "La clé doit être de type String");
		//---
		final String keyString = (String) key;
		Assertion.check().isNotBlank(keyString);
		//---
		// keep track of indexes
		reverseUiObjectIndex.values().removeIf(keyString::equals);
		reverseUiListIndex.values().removeIf(keyString::equals);
		// we actually remove
		return super.remove(key);
	}

	/**
	 * @return Clé de ce context
	 */
	public String getId() {
		return getString(CTX);
	}

	/**
	 * Fixe le mode d'update : filtré ou non (par les champs éditables de l'ihm).
	 */
	public ViewContextUpdateSecurity viewContextUpdateSecurity() {
		return viewContextUpdateSecurity;
	}

	/**
	 * Génère un nouvel Id et passe le context en modifiable.
	 */
	public void makeModifiable() {
		unmodifiable = false;
		super.remove(CTX);
	}

	/**
	 * passe le context en non-modifiable.
	 */
	public void makeUnmodifiable() {
		Assertion.check().isFalse(dirty, "Can't fixed a dirty context");
		//-----
		unmodifiable = true;
	}

	/**
	 * Mark this context as Dirty : shouldn't be stored and keep old id.
	 */
	public void markDirty() {
		super.put(CTX, super.get(INPUT_CTX));
		unmodifiable = true;
		dirty = true;
	}

	/**
	 * @return if context dirty : shouldn't be stored and keep old id
	 */
	public boolean isDirty() {
		return dirty;
	}

	public ViewContextMap getVContext() {
		return this;
	}

	/**
	 * Ajoute un objet de type form au context.
	 * @param dto Objet à publier
	 */
	public <O extends DataObject> void publish(final String contextKey, final O dto) {
		final UiObject<O> mapUiObject = new MapUiObject<>(dto, viewContextUpdateSecurity);
		mapUiObject.setInputKey(contextKey);
		put(contextKey, mapUiObject);
	}

	/**
	 * Vérifie les erreurs de l'objet. Celles-ci sont ajoutées à l'uiMessageStack si nécessaire.
	 */
	public void checkErrors(final String contextKey, final UiMessageStack uiMessageStack) {
		getUiObject(contextKey).checkFormat(uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
	}

	/**
	 * @return objet métier validé. Lance une exception si erreur.
	 */
	public <O extends DataObject> O readDto(final String contextKey, final UiMessageStack uiMessageStack) {
		return readDto(contextKey, new DefaultDtObjectValidator<>(), uiMessageStack);
	}

	/**
	 * @return objet métier validé. Lance une exception si erreur.
	 */
	public <O extends DataObject> O readDto(final String contextKey, final DtObjectValidator<O> validator, final UiMessageStack uiMessageStack) {
		checkErrors(contextKey, uiMessageStack);
		// ---
		final O validatedDto = ((UiObject<O>) getUiObject(contextKey)).mergeAndCheckInput(Collections.singletonList(validator), uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
		return validatedDto;
	}

	public void addKeyForClient(final String object, final String fieldName, final String rowIndex, final boolean modifiable) {
		Assertion.check()
				.isTrue(containsKey(object), "No {0} in context", object)
				.when(modifiable, () -> Assertion.check().isFalse("*".equals(fieldName), "Cannot make modifiable all fields of object '{0}' in ViewContext ", object));
		//----
		keysForClient.computeIfAbsent(object, k -> new HashSet<>()).add(fieldName);
		if (modifiable) {
			viewContextUpdateSecurity.addUpdatableKey(object, fieldName, rowIndex);
		}
	}

	public void addKeyForClient(final String object, final boolean modifiable) {
		Assertion.check().isTrue(containsKey(object), "No {0} in context", object);
		//----
		keysForClient.put(object, Collections.emptySet());// notmodifiable because used only for primitives
		if (modifiable) {
			viewContextUpdateSecurity.addUpdatableKey(object);
		}
	}

	public void addProtectedValueTransformer(final String objectKey, final String objectFieldName) {
		Assertion.check().isTrue(containsKey(objectKey), "No {0} in context", objectKey);
		//----
		valueTransformers.computeIfAbsent(objectKey,
				k -> new HashMap<>()).put(objectFieldName,
						List.of(PROTECTED_VALUE_TRANSFORMER));
	}

	public String obtainFkList(final String objectKey, final String objectFieldName) {
		Assertion.check()
				.isTrue(containsKey(objectKey), "No {0} in context", objectKey)
				.isTrue(objectFieldName.endsWith("_display"), "Can't accept {0}, only '_display' transformer is accepted", objectKey);
		//----
		final String fieldName = objectFieldName.substring(0, objectFieldName.length() - "_display".length());
		final DataDefinition fkDefinition = getUiObject(objectKey).getDtDefinition().getField(fieldName).getFkDtDefinition();
		final String uiMdListContextKey = fkDefinition.getClassSimpleName() + "MdList";
		if (!containsKey(uiMdListContextKey)) {
			unmodifiable = false; //hem :(
			put(uiMdListContextKey, new UiMdList<>(new DtListURIForMasterData(fkDefinition, null)));
			unmodifiable = true;
		}
		return uiMdListContextKey;
	}

	public void addListValueTransformer(final String objectKey, final String objectFieldName, final String listKey, final String listKeyFieldName, final String listDisplayFieldName) {
		valueTransformers.computeIfAbsent(objectKey, k -> new HashMap<>()).put(objectFieldName,
				Arrays.asList(MAP_VALUE_TRANSFORMER, listKey, listKeyFieldName, listDisplayFieldName));
	}

	ViewContextMap getFilteredViewContext(final Optional<Set<String>> subFilterOpt) {
		final ViewContextMap viewContextMapForClient = new ViewContextMap();
		viewContextMapForClient.put(CTX, get(CTX));
		for (final Map.Entry<String, Serializable> entry : entrySet()) {
			final String key = entry.getKey();
			final Serializable value = entry.getValue();
			if (keysForClient.containsKey(key) && (subFilterOpt.isEmpty() || subFilterOpt.get().contains(key))) {
				if (value instanceof MapUiObject) {
					viewContextMapForClient.put(entry.getKey(), ((MapUiObject) value).mapForClient(keysForClient.get(key), createTransformers(key)));
				} else if (value instanceof AbstractUiListUnmodifiable) {
					//handle lists
					viewContextMapForClient.put(entry.getKey(), ((AbstractUiListUnmodifiable) value).listForClient(keysForClient.get(key), createTransformers(key)));
				} else if (value instanceof BasicUiListModifiable) {
					//handle lists modifiable
					viewContextMapForClient.put(entry.getKey(), ((BasicUiListModifiable) value).listForClient(keysForClient.get(key), createTransformers(key)));
				} else if (value instanceof ArrayList && !((ArrayList) value).isEmpty() && ((ArrayList) value).get(0) instanceof ClusterUiList) {
					//handle List Of ClusterUiList
					final ArrayList<HashMap<String, Serializable>> result = new ArrayList();
					for (final ClusterUiList clusterUiList : (List<ClusterUiList>) value) {
						final HashMap<String, Serializable> cluster = new HashMap<>();
						cluster.put("code", clusterUiList.getCode());
						cluster.put("label", clusterUiList.getLabel());
						//cluster.put("listType", clusterUiList.getListType()); //present le json de Vega
						cluster.put("totalCount", clusterUiList.getTotalCount());
						cluster.put("list", clusterUiList.listForClient(keysForClient.get(key), createTransformers(key)));
						result.add(cluster);
					}
					viewContextMapForClient.put(entry.getKey(), result);
				} else if (value instanceof String && typesByKey.containsKey(entry.getKey())) {
					// it was json
					viewContextMapForClient.put(entry.getKey(), get(entry.getKey()));
				} else {
					// just copy it
					viewContextMapForClient.put(entry.getKey(), value);
				}
			}
		}
		return viewContextMapForClient;
	}

	private Map<String, Function<Serializable, String>> createTransformers(final String key) {
		if (valueTransformers.containsKey(key)) {
			final Map<String, Function<Serializable, String>> resultMap = new HashMap<>();
			valueTransformers.get(key).entrySet()
					.forEach(entry -> resultMap.put(entry.getKey(), createValueTransformer(entry.getValue())));
			return resultMap;
		}
		return Collections.emptyMap();
	}

	private Function<Serializable, String> createValueTransformer(final List<String> params) {
		Assertion.check().isFalse(params.isEmpty(), "ValueTransformer should be typed in first param, provided params {0}", params);
		final String transformerType = params.get(0);

		if (PROTECTED_VALUE_TRANSFORMER.equals(transformerType)) {
			return ProtectedValueUtil::generateProtectedValue;
		} else if (MAP_VALUE_TRANSFORMER.equals(transformerType)) {
			Assertion.check().isTrue(params.size() == 3 + 1, "ListValueTransformer requires 3 params, provided params {0}", params);
			// ---
			final String listKey = params.get(1);
			final String listKeyFieldName = params.get(2);
			final String listDisplayFieldName = params.get(3);

			// if value is null the transformer return null
			return value -> value != null ? ((AbstractUiListUnmodifiable) getUiList(listKey)).getById(listKeyFieldName, value).getSingleInputValue(listDisplayFieldName) : null;
		}
		throw new IllegalStateException(StringUtil.format("Unsupported ValueTransformer type {0}", transformerType));
	}

	public void addTypeForKey(final String key, final Type paramType) {
		typesByKey.put(key, paramType);
	}

	public void setJsonEngine(final JsonEngine jsonEngine) {
		this.jsonEngine = jsonEngine;
	}

}
