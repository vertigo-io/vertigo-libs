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
 * Time extract and store
 *
 * @author npiedeloup
 */
class BerkeleyTimePrefixDataBinding extends TupleBinding<Serializable> {

	/** {@inheritDoc} */
	@Override
	public Serializable entryToObject(final TupleInput ti) {
		final String prefix = ti.readString();
		Assertion.check().isTrue(BerkeleyTimeCheckDataBinding.PREFIX.equals(prefix), "Can't read this entry {0}", prefix);
		return ti.readLong();
	}

	/** {@inheritDoc} */
	@Override
	public void objectToEntry(final Serializable value, final TupleOutput to) {
		to.writeLong((Long) value);
	}

}
