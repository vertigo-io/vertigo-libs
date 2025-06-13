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
package io.vertigo.vega.engines.webservice.json;

import java.io.Serializable;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.function.Consumer;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.vega.webservice.model.DtListDelta;
import io.vertigo.vega.webservice.model.UiList;
import io.vertigo.vega.webservice.model.UiObject;
import io.vertigo.vega.webservice.validation.DtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;

/**
 * Version modifiable des UiList.
 * @author npiedeloup
 * @param <D> Type d'objet
 */
public abstract class AbstractUiListModifiable<D extends DataObject> extends AbstractList<UiObject<D>> implements UiList<D>, Serializable {

	private static final long serialVersionUID = 1L;
	private static final int DEFAULT_MAX_ROWS = DtListState.DEFAULT_MAX_ROWS; //could be overrided here
	private final DefinitionId<DataDefinition> dataDefinitionId;
	private final Class<D> objectType;

	private final String inputKey;

	// Index
	private final Map<UiObject<D>, D> dtoByUiObject = new HashMap<>();

	// Buffer
	private final UiListDelta<D> uiListDelta;
	private final List<UiObject<D>> bufferUiObjects;

	// Data

	private final DtListDelta<D> dtListDelta;
	private final DtList<D> dtList;

	/**
	 * Constructor.
	 * @param dtList Inner DtList
	 */
	protected AbstractUiListModifiable(final DtList<D> dtList, final String inputKey) {
		this(dtList, inputKey, nop -> {
		});
	}

	public <U extends AbstractUiListModifiable<D>> AbstractUiListModifiable(final DtList<D> dtList, final String inputKey, final Consumer<U> postInit) {
		Assertion.check().isNotNull(dtList);
		//-----
		this.dtList = dtList;
		this.inputKey = inputKey;
		final DataDefinition dataDefinition = dtList.getDefinition();
		dataDefinitionId = dataDefinition.id();
		objectType = (Class<D>) ClassUtil.classForName(dataDefinition.getClassCanonicalName());
		// ---
		uiListDelta = new UiListDelta<>(objectType, new HashMap<>(), new HashMap<>(), new HashMap<>());
		dtListDelta = new DtListDelta<>(new DtList<>(dataDefinition), new DtList<>(dataDefinition), new DtList<>(dataDefinition));
		bufferUiObjects = new ArrayList<>(dtList.size());
		postInit.accept((U) this);
		rebuildBuffer();
	}

	/* (non-Javadoc)
	 * @see io.vertigo.vega.webservice.model.UiList#getObjectType()
	 */
	@Override
	public Class<D> getObjectType() {
		return objectType;
	}

	protected abstract UiObject<D> createUiObject(final D dto);

	private void rebuildBuffer() {
		uiListDelta.getCreatesMap().clear();
		uiListDelta.getUpdatesMap().clear();
		uiListDelta.getDeletesMap().clear();
		// ---
		dtoByUiObject.clear();
		bufferUiObjects.clear();
		int index = 0;
		for (final D dto : dtList) {
			final UiObject<D> uiObjects = createUiObject(dto);
			uiObjects.setInputKey(toContextKey(inputKey, index));
			bufferUiObjects.add(uiObjects);
			dtoByUiObject.put(uiObjects, dto);
			index++;
		}
	}

	/**
	 * @return DtDefinition de l'objet métier
	 */
	@Override
	public DataDefinition getDtDefinition() {
		return dataDefinitionId.get();
	}

	private String findContextKey(final UiObject<D> uiObject) {
		Assertion.check().isNotNull(uiObject);
		final int index = indexOfUiObject(uiObject);
		Assertion.check().isTrue(index >= 0, "UiObjet {0} not found in UiList with key {1}", uiObject, inputKey);
		// ---
		return toContextKey(inputKey, index);
	}

	protected String toContextKey(final String locInputKey, final int index) {
		return locInputKey + ".get(" + index + ")";
	}

	/**
	 * @param dto Element to removed
	 * @return If element was removed
	 */
	public boolean remove(final UiObject<D> dto) {
		final boolean result = bufferUiObjects.remove(dto);
		if (result) {
			if (uiListDelta.getCreatesMap().containsValue(dto)) {
				//Si on supprime (remove) un objet déjà ajouté (add),
				//alors il suffit de l'enlever de la liste des éléments ajoutés.
				uiListDelta.getCreatesMap().remove(dto.getInputKey());
			} else {
				//Sinon on l'ajoute à la liste des éléments supprimés.
				uiListDelta.getDeletesMap().put(dto.getInputKey(), dto);
			}

			//CHECKME : les inputKey des objets suivant ne sont plus bon
		}
		return result;
	}

	/** {@inheritDoc} */
	@Override
	public UiObject<D> remove(final int index) {
		final UiObject<D> dto = get(index);
		final boolean result = remove(dto);
		Assertion.check().isTrue(result, "Erreur de suppression i={0}", index);
		return dto;
	}

	/**
	 * @param dto Element to add
	 * @return true (as specified by Collection.add)
	 */
	public boolean add(final D dto) {
		return add(createUiObject(dto));
	}

	/**
	 * @param uiObject Element to add
	 * @return true (as specified by Collection.add)
	 */
	@Override
	public boolean add(final UiObject<D> uiObject) {
		final boolean result = bufferUiObjects.add(uiObject);
		uiObject.setInputKey(findContextKey(uiObject));
		if (result) {
			if (uiListDelta.getDeletesMap().containsValue(uiObject)) {
				//Si on ajoute (add) un objet précédemment supprimé (remove),
				//alors il suffit de l'enlever de la liste des éléments supprimés.
				uiListDelta.getDeletesMap().remove(uiObject.getInputKey());
			} else {
				uiListDelta.getCreatesMap().put(uiObject.getInputKey(), uiObject);
			}
		}
		return result;
	}

	/**
	 * @param uiObject Element to add at index
	 * @return true (as specified by List.add)
	 */
	@Override
	public void add(final int index, final UiObject<D> uiObject) {
		bufferUiObjects.add(index, uiObject);
		if (uiObject != null) {
			if (uiListDelta.getDeletesMap().containsValue(uiObject)) {
				//Si on ajoute (add) un objet précédemment supprimé (remove),
				//alors il suffit de l'enlever de la liste des éléments supprimés.
				uiListDelta.getDeletesMap().remove(uiObject.getInputKey());
			} else {
				uiListDelta.getCreatesMap().put(uiObject.getInputKey(), uiObject);
			}
		}
	}

	/**
	 * @return DtListDelta
	 */
	public DtListDelta<D> getDtListDelta() {
		Assertion.check().isNotNull(dtListDelta);
		//
		return dtListDelta;
	}

	/** {@inheritDoc} */
	@Override
	public UiObject<D> get(final int row) {
		//id>=0 : par index dans la UiList (pour boucle, uniquement dans la même request)
		Assertion.check()
				.isTrue(row >= 0, "Used getter isn't the good one")
				.isTrue(row <= DEFAULT_MAX_ROWS, "UiListModifiable is limited to " + DEFAULT_MAX_ROWS + " elements");

		//SKE MLA : lazy initialisation of buffer uiObjects for size changing uiListModifiable
		final DataDefinition dataDefinition = dataDefinitionId.get();
		for (int i = bufferUiObjects.size(); i < row + 1; i++) {
			add((D) DataModelUtil.createDataObject(dataDefinition));
		}

		final UiObject<D> uiObject = bufferUiObjects.get(row);
		Assertion.check().isNotNull(uiObject);
		return uiObject;
	}

	/** {@inheritDoc} */
	@Override
	public int indexOf(final Object o) {
		if (o instanceof DataObject) {
			return indexOfDtObject((DataObject) o);
		} else if (o instanceof UiObject) {
			return indexOfUiObject((UiObject<D>) o);
		}
		return super.indexOf(o);
	}

	/**
	 * @param dtObject DtObject recherché
	 * @return index de l'objet dans la liste
	 */
	private int indexOfDtObject(final DataObject dtObject) {
		Assertion.check().isNotNull(dtObject);
		//-----
		for (int i = 0; i < bufferUiObjects.size(); i++) {
			if (dtObject.equals(bufferUiObjects.get(i).getServerSideObject())) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * @param uiObject UiObject recherché
	 * @return index de l'objet dans la liste
	 */
	private int indexOfUiObject(final UiObject<D> uiObject) {
		Assertion.check().isNotNull(uiObject);
		//-----
		return bufferUiObjects.indexOf(uiObject);
	}

	/** {@inheritDoc} */
	@Override
	public int size() {
		return bufferUiObjects.size();
	}

	/** {@inheritDoc} */
	@Override
	public boolean checkFormat(final UiMessageStack uiMessageStack) {
		//1. check Error => KUserException
		//on valide les éléments internes
		boolean isValid = true;
		for (final UiObject<D> uiObject : bufferUiObjects) {
			uiObject.setInputKey(findContextKey(uiObject));
			isValid = isValid && uiObject.checkFormat(uiMessageStack);
		}
		return isValid;
	}

	/** {@inheritDoc} */
	@Override
	public DtList<D> mergeAndCheckInput(final List<DtObjectValidator<D>> validators, final UiMessageStack uiMessageStack) {
		checkFormat(uiMessageStack);
		dtListDelta.getDeleted().clear();
		dtListDelta.getCreated().clear();
		dtListDelta.getUpdated().clear();

		//1. check Error => KUserException
		//on valide les éléments internes
		int index = 0;
		for (final UiObject<D> uiObject : bufferUiObjects) {
			if (uiObject.isModified()) {
				final D validatedDto = uiObject.mergeAndCheckInput(validators, uiMessageStack);
				if (!uiListDelta.getCreatesMap().containsValue(uiObject)) {
					dtListDelta.getUpdated().add(validatedDto);
					final int prevIndex = dtList.indexOf(validatedDto);
					if (prevIndex >= 0 && prevIndex != index) {
						dtList.remove(prevIndex);
						dtList.add(index, validatedDto); //on le déplace si besoin
					}
				} else {
					dtListDelta.getCreated().add(validatedDto);
					dtList.add(index, validatedDto); //on l'ajoute au bon endroit
				}
			} else if (uiListDelta.getCreatesMap().containsValue(uiObject)) {
				dtListDelta.getCreated().add(uiObject.getServerSideObject()); //on ne force pas la validation
			}
			index++;
		}

		//2. Opérations
		for (final UiObject<D> uiObject : uiListDelta.getDeletesMap().values()) {
			final D dto = dtoByUiObject.get(uiObject);
			if (dto != null) {//on ne garde que les dto qui ETAIENT dans la dtc
				dtListDelta.getDeleted().add(dto);
				//on ne supprime pas tout de suite de la dtc, car cela invalidera les index de originIndexByUiObject
			}
		}

		//on vérifie avant s'il y a des elements pour le cas des listes non modifiable
		//il faudrait plutot que la DtListInput soit non modifiable aussi
		if (!dtListDelta.getDeleted().isEmpty()) {
			dtList.removeAll(dtListDelta.getDeleted());
		}
		//-----
		Assertion.check().isTrue(bufferUiObjects.size() == dtList.size(), "bufferList.size() <> dtList.size() : mauvaise synchronisation dtList / bufferList");

		//3. On reconstruit buffer et indexes
		rebuildBuffer();
		return dtList;
	}

	/** {@inheritDoc} */
	@Override
	public Iterator<UiObject<D>> iterator() {
		return new UiListModifiableIterator();
	}

	/** {@inheritDoc} */
	@Override
	public boolean equals(final Object o) {
		if (o == this) {
			return true;
		}
		if (o == null || this.getClass() != o.getClass()) {
			return false;
		}
		final AbstractUiListModifiable<D> other = AbstractUiListModifiable.class.cast(o);
		return bufferUiObjects.equals(other.bufferUiObjects);
	}

	/** {@inheritDoc} */
	@Override
	public int hashCode() {
		return bufferUiObjects.hashCode();
	}

	/** innerclass, volontairement non static */
	class UiListModifiableIterator implements Iterator<UiObject<D>> {

		private int expectedSize; //count removed elements
		private int currentIndex; //init a 0

		/**
		 * Constructor.
		 */
		UiListModifiableIterator() {
			expectedSize = size();
		}

		/** {@inheritDoc} */
		@Override
		public boolean hasNext() {
			checkForComodification();
			return currentIndex < size();
		}

		/** {@inheritDoc} */
		@Override
		public UiObject<D> next() {
			if (!hasNext()) {
				throw new NoSuchElementException();
			}
			checkForComodification();
			final UiObject<D> next = get(currentIndex);
			currentIndex++;
			return next;
		}

		/** {@inheritDoc} */
		@Override
		public void remove() {
			AbstractUiListModifiable.this.remove(get(currentIndex - 1));
			expectedSize--;
		}

		private void checkForComodification() {
			if (expectedSize != size()) {
				throw new ConcurrentModificationException();
			}
		}
	}

}
