package io.vertigo.x.rules.data;

import io.vertigo.dynamo.domain.model.DtObject;

/**
 *
 * @author xdurand
 *
 */
public class MyDummyDtObject implements DtObject {
	private static final long serialVersionUID = 764927224121145676L;

	private Long id;
	private String entity;
	private String division;
	private String nom;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(final Long id) {
		this.id = id;
	}

	/**
	 * @return the entity
	 */
	public String getEntity() {
		return entity;
	}

	/**
	 * @param entity the entity to set
	 */
	public void setEntity(final String entity) {
		this.entity = entity;
	}

	/**
	 * @return the division
	 */
	public String getDivision() {
		return division;
	}

	/**
	 * @param division the division to set
	 */
	public void setDivision(final String division) {
		this.division = division;
	}

	/**
	 * @return the nom
	 */
	public String getNom() {
		return nom;
	}

	/**
	 * @param nom the nom to set
	 */
	public void setNom(final String nom) {
		this.nom = nom;
	}

}
