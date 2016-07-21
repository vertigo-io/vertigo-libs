package io.vertigo.x.audit;


import java.util.Date;
import java.util.List;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

public class AuditTrailBuilder implements Builder<AuditTrail> {

	private Long id;
	private String category;
	private String user;
	private Date dateBusiness;
	private Date dateExecution;
	private Long item;
	private String context;
	
	/**
	 * Builder for AuditTrail
	 * @param id 
	 * @param category
	 * @param user
	 * @param item
	 */
	AuditTrailBuilder(String category, String user, Long item) {
		Assertion.checkNotNull(item);
		Assertion.checkArgNotEmpty(category);
		Assertion.checkArgNotEmpty(user);
		
		this.category = category;
		this.user = user;
		this.item = item;
		this.dateExecution = new Date();
	}
	
	/**
	 * Optionnal business date 
	 * @param dateBusiness
	 * @return
	 */
	public AuditTrailBuilder withDateBusiness(Date dateBusiness) {
		Assertion.checkNotNull(dateBusiness);
		this.dateBusiness = dateBusiness;
		return this;
	}

	/**
	 * Optionnal business date 
	 * @param dateBusiness
	 * @return
	 */
	public AuditTrailBuilder withContext(List<String> context) {
		Assertion.checkNotNull(context);
		Assertion.checkArgument(context.isEmpty() == false, "The provided context is empty");
		//---
		StringBuilder sb = new StringBuilder(); 
		for (String string : context) {
			sb.append(string).append("|");
		}
		this.context = sb.toString();
		return this;
	}
	
	@Override
	public AuditTrail build() {
		return new AuditTrail(this.id, this.category, this.user, this.dateBusiness, this.dateExecution, this.item, this.context);
	}
	
}