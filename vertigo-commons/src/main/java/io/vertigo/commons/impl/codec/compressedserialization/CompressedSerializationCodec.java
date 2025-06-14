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
package io.vertigo.commons.impl.codec.compressedserialization;

import java.io.Serializable;

import io.vertigo.commons.codec.Codec;
import io.vertigo.core.lang.Assertion;

/**
 * Implémentation standard ThreadSafe gérant les mécanismes permettant de
 * sérialiser de façon compressée un objet en format binaire (byte[]).
 *
 * @author pchretien
 */
public final class CompressedSerializationCodec implements Codec<Serializable, byte[]> {
	private final Codec<Serializable, byte[]> serializationCodec;
	private final Codec<byte[], byte[]> compressionCodec;

	/**
	 * Constructor.
	 * @param serializationCodec Codec
	 * @param compressionCodec Codec
	 */
	public CompressedSerializationCodec(final Codec<Serializable, byte[]> serializationCodec, final Codec<byte[], byte[]> compressionCodec) {
		Assertion.check()
				.isNotNull(serializationCodec)
				.isNotNull(compressionCodec);
		//-----
		this.serializationCodec = serializationCodec;
		this.compressionCodec = compressionCodec;
	}

	/** {@inheritDoc} */
	@Override
	public byte[] encode(final Serializable data) {
		Assertion.check().isNotNull(data);
		//-----
		return compressionCodec.encode(serializationCodec.encode(data));

	}

	/** {@inheritDoc} */
	@Override
	public Serializable decode(final byte[] data) {
		Assertion.check().isNotNull(data);
		//-----
		return serializationCodec.decode(compressionCodec.decode(data));
	}
}
