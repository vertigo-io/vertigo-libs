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
package io.vertigo.commons.codec;

/**
 * Utilitaire permettant de passer d'un format à un autre format.
 * - format source > encodage > format cible
 *
 * La plupart des codecs sont bijectifs (encodage/ décodage).
 * Certains codecs peuvent ne pas implémenter la fonction de décodage.
 * C'est notamment le cas des calculs d'empreinte.
 *
 * @author  pchretien
 * @param <S> Type Source à encoder
 * @param <T> Type cible, résultat de l'encodage
 */
public interface Encoder<S, T> {
	/**
	 * Encodage.
	 * @param toEncode Object à encoder
	 * @return Chaîne codée
	 */
	T encode(S toEncode);
}
