package io.vertigo.addons.plugins.account.ldap;

import io.vertigo.lang.Assertion;

import java.util.Iterator;
import java.util.Map.Entry;

/**
 * Created by sbernard on 19/03/2015.
 */
public class LDAPEntryIterator implements Iterator<DocumentVersion> {
	private final Iterator<Entry> entryIterator;
	private final String dataSourceId;

	public LDAPEntryIterator(final Iterator<Entry> entryIterator, final String dataSourceId) {
		Assertion.checkNotNull(entryIterator);
		Assertion.checkArgNotEmpty(dataSourceId);
		//------
		this.entryIterator = entryIterator;
		this.dataSourceId = dataSourceId;
	}

	/**
	 * Returns {@code true} if the iteration has more elements.
	 * (In other words, returns {@code true} if {@link #next} would
	 * return an element rather than throwing an exception.)
	 *
	 * @return {@code true} if the iteration has more elements
	 */
	@Override
	public boolean hasNext() {
		return entryIterator.hasNext();
	}

	/**
	 * Returns the next element in the iteration.
	 *
	 * @return the next element in the iteration
	 * @throws java.util.NoSuchElementException if the iteration has no more elements
	 */
	@Override
	public DocumentVersion next() {
		final Entry entry = entryIterator.next();
		final DocumentVersionBuilder documentVersionBuilder = new DocumentVersionBuilder();
		try {
			documentVersionBuilder
					.withDataSourceId(dataSourceId)
					.withLastModified(DateUtils.getDate(entry.get("whenChanged").getString()))
					.withSourceUrl(entry.get("distinguishedName").getString());
		} catch (LdapInvalidAttributeValueException e) {
			throw new RuntimeException(e);
		}
		return documentVersionBuilder.build();
	}

	/**
	 * Removes from the underlying collection the last element returned
	 * by this iterator (optional operation).  This method can be called
	 * only once per call to {@link #next}.  The behavior of an iterator
	 * is unspecified if the underlying collection is modified while the
	 * iteration is in progress in any way other than by calling this
	 * method.
	 *
	 * @throws UnsupportedOperationException if the {@code remove}
	 *                                       operation is not supported by this iterator
	 * @throws IllegalStateException         if the {@code next} method has not
	 *                                       yet been called, or the {@code remove} method has already
	 *                                       been called after the last call to the {@code next}
	 *                                       method
	 */
	@Override
	public void remove() {
		entryIterator.remove();
	}
}
