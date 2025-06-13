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

import io.vertigo.commons.codec.Codec;
import io.vertigo.core.lang.Assertion;

/**
 * @author npiedeloup
 */
final class BerkeleySerializableBinding extends TupleBinding<Serializable> {
	private static final String PREFIX = "Serialized:";
	private final Codec<Serializable, byte[]> codec;

	/**
	 * @param codec codec de serialization
	 */
	BerkeleySerializableBinding(final Codec<Serializable, byte[]> codec) {
		Assertion.check().isNotNull(codec);
		//-----
		this.codec = codec;
	}

	/** {@inheritDoc} */
	@Override
	public Serializable entryToObject(final TupleInput ti) {
		final String prefix = ti.readString();
		Assertion.check().isTrue(PREFIX.equals(prefix), "Can't read this entry {0}", prefix);
		//-----
		final int size = ti.readInt();
		final byte[] buffer = new byte[size];
		ti.readFast(buffer);
		return codec.decode(buffer);
	}

	/** {@inheritDoc} */
	@Override
	public void objectToEntry(final Serializable value, final TupleOutput to) {
		to.writeString(PREFIX);
		final byte[] buffer = codec.encode(value);
		to.writeInt(buffer.length);
		to.writeFast(buffer);
	}
}
