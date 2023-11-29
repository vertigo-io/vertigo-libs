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
import io.vertigo.easyforms.domain.DtDefinitions.TaxonomieFields;
import io.vertigo.easyforms.metaformulaire.dao.TaxonomieDAO;
import io.vertigo.easyforms.metaformulaire.dao.TaxonomieTypeDAO;
import io.vertigo.easyforms.metaformulaire.domain.Taxonomie;
import io.vertigo.easyforms.metaformulaire.domain.TaxonomieType;

@Transactional
public class TaxonomyListServices implements Component {

	private static final int MAX_LIST = 100;

	@Inject
	private TaxonomieTypeDAO taxonomieTypeDAO;
	@Inject
	private TaxonomieDAO taxonomieDAO;

	public DtList<TaxonomieType> getAllLists() {
		final var result = taxonomieTypeDAO.findAll(Criterions.alwaysTrue(), DtListState.of(MAX_LIST + 1));
		Assertion.check().isTrue(result.size() <= MAX_LIST, "Trop de liste (>" + MAX_LIST + ")");
		return result;
	}

	public TaxonomieType getTaxonomieTypeById(final UID<TaxonomieType> tatUid) {
		Assertion.check().isNotNull(tatUid);
		return taxonomieTypeDAO.get(tatUid);
	}

	public DtList<Taxonomie> getTaxonomiesByType(final UID<TaxonomieType> tatUid) {
		Assertion.check().isNotNull(tatUid);
		return taxonomieDAO.findAll(Criterions.isEqualTo(TaxonomieFields.tatId, tatUid.getId()),
				DtListState.defaultOf(Taxonomie.class));
	}

	public TaxonomieType initTaxonomieType() {
		return new TaxonomieType();
	}

	public TaxonomieType saveTaxonomieType(final TaxonomieType taxonomieType) {
		taxonomieTypeDAO.save(taxonomieType);
		return taxonomieType;
	}

	public void deleteTaxonomieType(final TaxonomieType taxonomieType) {
		taxonomieType.setActive(Boolean.FALSE);
		taxonomieTypeDAO.save(taxonomieType);
	}

	public void saveTaxonomies(final TaxonomieType taxonomieType, final DtList<Taxonomie> taxonomies) {
		final var tatId = taxonomieType.getTatId();
		Assertion.check().isNotNull(tatId);
		// ---
		final var sort = new AtomicInteger();
		taxonomies.stream().forEach(tax -> {
			tax.setTatId(tatId);
			tax.setSort(sort.getAndIncrement());
			tax.setActive(Boolean.TRUE);
		});
		taxonomies.stream().forEach(taxonomieDAO::save);
	}

}
