package io.vertigo.planning.agenda.domain;

import io.vertigo.core.lang.Generated;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class DefaultPlageHoraire implements DtObject {
	private static final long serialVersionUID = 1L;

	private Integer jourDeSemaine;
	private Integer minutesDebut;
	private Integer minutesFin;
	private Integer nbGuichet;
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Jour de la semaine'.
	 * @return Integer jourDeSemaine
	 */
	@Field(smartType = "STyPNombre", label = "Jour de la semaine")
	public Integer getJourDeSemaine() {
		return jourDeSemaine;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Jour de la semaine'.
	 * @param jourDeSemaine Integer
	 */
	public void setJourDeSemaine(final Integer jourDeSemaine) {
		this.jourDeSemaine = jourDeSemaine;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Heure de début'.
	 * @return Integer minutesDebut
	 */
	@Field(smartType = "STyPHeureMinute", label = "Heure de début")
	public Integer getMinutesDebut() {
		return minutesDebut;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Heure de début'.
	 * @param minutesDebut Integer
	 */
	public void setMinutesDebut(final Integer minutesDebut) {
		this.minutesDebut = minutesDebut;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Heure de fin'.
	 * @return Integer minutesFin
	 */
	@Field(smartType = "STyPHeureMinute", label = "Heure de fin")
	public Integer getMinutesFin() {
		return minutesFin;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Heure de fin'.
	 * @param minutesFin Integer
	 */
	public void setMinutesFin(final Integer minutesFin) {
		this.minutesFin = minutesFin;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nombre de guichets'.
	 * @return Integer nbGuichet
	 */
	@Field(smartType = "STyPNbGuichet", label = "Nombre de guichets")
	public Integer getNbGuichet() {
		return nbGuichet;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nombre de guichets'.
	 * @param nbGuichet Integer
	 */
	public void setNbGuichet(final Integer nbGuichet) {
		this.nbGuichet = nbGuichet;
	}
	
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}