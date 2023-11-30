package io.vertigo.easyforms.metaformulaire.services;

import java.util.concurrent.atomic.AtomicInteger;

import javax.inject.Inject;

import io.vertigo.commons.transaction.Transactional;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.component.Component;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.easyforms.domain.DtDefinitions.TaxonomyFields;
import io.vertigo.easyforms.metaformulaire.MetaformulairePAO;
import io.vertigo.easyforms.metaformulaire.dao.TaxonomyDAO;
import io.vertigo.easyforms.metaformulaire.dao.TaxonomyTypeDAO;
import io.vertigo.easyforms.metaformulaire.domain.Taxonomy;
import io.vertigo.easyforms.metaformulaire.domain.TaxonomyType;

@Transactional
public class TaxonomyListServices implements Component {

	private static final int MAX_LIST = 100;
	public static final int MAX_VALUE_PER_LIST = 100;

	@Inject
	private TaxonomyTypeDAO taxonomyTypeDAO;
	@Inject
	private TaxonomyDAO taxonomyDAO;
	@Inject
	private MetaformulairePAO metaformulairePAO;

	public DtList<TaxonomyType> getAllLists() {
		final var result = taxonomyTypeDAO.findAll(Criterions.alwaysTrue(), DtListState.of(MAX_LIST + 1));
		Assertion.check().isTrue(result.size() <= MAX_LIST, "Trop de liste (>" + MAX_LIST + ")");
		return result;
	}

	public TaxonomyType getTaxonomyTypeById(final UID<TaxonomyType> tatUid) {
		Assertion.check().isNotNull(tatUid);
		return taxonomyTypeDAO.get(tatUid);
	}

	public DtList<Taxonomy> getTaxonomysByType(final UID<TaxonomyType> tatUid) {
		Assertion.check().isNotNull(tatUid);
		return taxonomyDAO.findAll(Criterions.isEqualTo(TaxonomyFields.tatId, tatUid.getId()),
				DtListState.defaultOf(Taxonomy.class));
	}

	public TaxonomyType initTaxonomyType() {
		final var taxonomyType = new TaxonomyType();
		taxonomyType.setActive(Boolean.TRUE);
		return taxonomyType;
	}

	public void enableTaxonomyType(final TaxonomyType taxonomyType, final boolean active) {
		taxonomyType.setActive(active);
		taxonomyTypeDAO.save(taxonomyType);
	}

	public void deleteTaxonomyType(final TaxonomyType taxonomyType) {
		taxonomyType.setActive(Boolean.FALSE);
		taxonomyTypeDAO.save(taxonomyType);
	}

	public TaxonomyType saveTaxonomyType(final TaxonomyType taxonomyType) {
		taxonomyTypeDAO.save(taxonomyType);
		return taxonomyType;
	}

	public void deleteTaxonomyValue(final Taxonomy taxonomyValue) {
		Assertion.check().isNotNull(taxonomyValue);
		taxonomyDAO.delete(taxonomyValue.getTaxId());
	}

	public void saveTaxonomies(final TaxonomyType taxonomyType, final DtList<Taxonomy> taxonomys) {
		final var tatId = taxonomyType.getTatId();
		Assertion.check().isNotNull(tatId);
		// ---
		taxonomyTypeDAO.save(taxonomyType);
		metaformulairePAO.deleteListTaxonomyValuesByTatId(tatId);

		final var sort = new AtomicInteger();
		taxonomys.stream().forEach(tax -> {
			tax.setTatId(tatId);
			tax.setTaxId(null);// all values have been deleted, we recreate them
			tax.setSort(sort.getAndIncrement());
			tax.setActive(Boolean.TRUE);
		});
		taxonomyDAO.createList(taxonomys);
	}

}
