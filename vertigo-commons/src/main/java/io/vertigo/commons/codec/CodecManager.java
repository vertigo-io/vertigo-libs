/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.commons.codec;

import java.io.Serializable;

import io.vertigo.core.node.component.Manager;

/**
 * Gestion centralisée des mécanismes de codage/décodage.
 * Tous les codecs sont threadSafe et StateLess.
 *
 * - CSV null donne ""
 * - HTML null donne ""
 * - les fonctions de Hachage MD5 et SHA1 n'autorisent pas les null.
 * - pour tous les autres cas null donne null
 *
 * @author pchretien
 */
public interface CodecManager extends Manager {

	/**
	 * @return Codec HTML.
	 */
	Codec<String, String> getHtmlCodec();

	/**
	 * @return Encoder CSV.
	 */
	Encoder<String, String> getCsvEncoder();

	//-----
	/**
	 * @return Encoder MD5. (128 bits)
	 */
	Encoder<byte[], byte[]> getMD5Encoder();

	/**
	 * @return Encoder SHA-1. (160 bits)
	 */
	Encoder<byte[], byte[]> getSha1Encoder();

	/**
	 * @return Encoder SHA-2. (256 bits)
	 */
	Encoder<byte[], byte[]> getSha256Encoder();

	/**
	 * @return Codec Hexadecimal.
	 */
	Encoder<byte[], String> getHexEncoder();

	/**
	 * Le codage base 64 proposé autorise l'utilisation dans les URL en restreignant certains caractères.
	 * Attention : A utiliser sur la totalité des données ou sur un multiple de 3 octets (un buffer de 1024 NE MARCHE PAS)
	 * @return Codec Base 64.
	 */
	Codec<byte[], String> getBase64Codec();

	/**
	 * Le codage base 64 original
	 * Attention : A ne pas utiliser sur des URLs devant être utilisées dans un navigateur.
	 * A utiliser sur la totalité des données ou sur un multiple de 3 octets (un buffer de 1024 NE MARCHE PAS)
	 * @return Codec Base 64.
	 */
	Codec<byte[], String> getBase64LegacyCodec();

	/**
	 * @return Codec cryptographique.
	 */
	Codec<byte[], byte[]> getTripleDESCodec();

	/**
	 * @return Codec cryptographique.
	 */
	Codec<byte[], byte[]> getAES128Codec();

	/**
	 * @return Codec de compression de données.
	 */
	Codec<byte[], byte[]> getCompressionCodec();

	/**
	 * @return Codec de sérialisation de données.
	 */
	Codec<Serializable, byte[]> getSerializationCodec();

	/**
	 * @return Codec de sérialisation compressée de données.
	 */
	Codec<Serializable, byte[]> getCompressedSerializationCodec();

}
