package io.vertigo.easyforms.metaformulaire.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.easyforms.metaformulaire.domain.ControleDeChampDefinitionProvider.ControleDeChampEnum;

public class ModeleFormulaire implements Serializable {

	private List<Champ> champs = new ArrayList<>();

	private static final long serialVersionUID = 1L;

	public ModeleFormulaire(final List<Champ> champs) {
		this.champs = Collections.unmodifiableList(champs);
	}

	public List<Champ> getChamps() {
		return champs.stream().sorted(Comparator.comparing(Champ::getOrdre)).collect(Collectors.toUnmodifiableList());
	}

	public static class Champ implements Serializable {
		private static final long serialVersionUID = 1L;

		private String codeChamp;
		private String typeChamp;
		/**
		 * Id of the sub list when TypeDeChamp::getListName may refer to multiple sub lists
		 */
		private long listId;
		private String listValue;
		private String libelle;
		private String infobulle;
		private Integer ordre;
		private boolean isDefault;
		private boolean isDisplay;
		private List<String> controleDeChamps;

		public String getCodeChamp() {
			return codeChamp;
		}

		public void setCodeChamp(final String codeChamp) {
			this.codeChamp = codeChamp;
		}

		public String getTypeChamp() {
			return typeChamp;
		}

		public void setTypeChamp(final String typeChamp) {
			this.typeChamp = typeChamp;
		}

		public Long getListId() {
			return listId;
		}

		public String getListValue() {
			return listValue;
		}

		public void setListId(final long listId) {
			this.listId = listId;
		}

		public String getLibelle() {
			return libelle;
		}

		public void setLibelle(final String libelle) {
			this.libelle = libelle;
		}

		public String getInfobulle() {
			return infobulle;
		}

		public void setInfobulle(final String infobulle) {
			this.infobulle = infobulle;
		}

		public Integer getOrdre() {
			return ordre;
		}

		public void setOrdre(final Integer ordre) {
			this.ordre = ordre;
		}

		public boolean isDefault() {
			return isDefault;
		}

		public void setDefault(final boolean isDefault) {
			this.isDefault = isDefault;
		}

		public boolean isDisplay() {
			return isDisplay;
		}

		public void setDisplay(final boolean isDisplay) {
			this.isDisplay = isDisplay;
		}

		public List<String> getControleDeChamps() {
			return controleDeChamps;
		}

		public void setControleDeChamps(final List<String> controleDeChamps) {
			this.controleDeChamps = controleDeChamps;
		}

		public boolean isOptionel() {
			return controleDeChamps.contains(ControleDeChampEnum.Optionel.name());
		}

	}

}
