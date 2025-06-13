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
package io.vertigo.datastore.plugins.kvstore.berkeley;

import java.io.Serializable;

import com.sleepycat.bind.tuple.TupleBinding;
import com.sleepycat.bind.tuple.TupleInput;
import com.sleepycat.bind.tuple.TupleOutput;

import io.vertigo.core.lang.Assertion;

/**
 * Time checker, entryToObject return true if data is still valid against ttl.
 *
 * @author skerdudou
 */
class BerkeleyTimeCheckDataBinding extends TupleBinding<Serializable> {
	public static final String PREFIX = "TimedValue:";
	private final long timeToLiveSeconds;

	/**
	 * @param timeToLiveSeconds Time to live, is data too old return false
	 */
	BerkeleyTimeCheckDataBinding(final long timeToLiveSeconds) {
		this.timeToLiveSeconds = timeToLiveSeconds;
	}

	/** {@inheritDoc} */
	@Override
	public Serializable entryToObject(final TupleInput ti) {
		final String prefix = ti.readString();
		Assertion.check().isTrue(PREFIX.equals(prefix), "Can't read this entry {0}", prefix);
		final long createTime = ti.readLong();
		return !isValueTooOld(createTime);
	}

	/** {@inheritDoc} */
	@Override
	public void objectToEntry(final Serializable value, final TupleOutput to) {
		throw new UnsupportedOperationException("This data binding is for read-only.");
	}

	protected boolean isValueTooOld(final long createTime) {
		return timeToLiveSeconds > 0 && System.currentTimeMillis() - createTime >= timeToLiveSeconds * 1000;
	}

}
