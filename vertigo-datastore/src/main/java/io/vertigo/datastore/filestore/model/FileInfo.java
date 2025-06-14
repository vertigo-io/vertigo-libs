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
package io.vertigo.datastore.filestore.model;

import java.io.Serializable;

import io.vertigo.datastore.filestore.definitions.FileInfoDefinition;

/**
 * Représentation d'un Fichier logique persistant.
 * Ce FileInfo fournit :
 * - le contenu du fichier
 * - son nom d'origine
 * - son type mime
 * - sa taille
 * - sa dernière date de modification

 * @author npiedeloup
 */
public interface FileInfo extends Serializable {
	/**
	 * @return Définition de la resource.
	 */
	FileInfoDefinition getDefinition();

	/**
	 * @return URI de la ressource
	 */
	FileInfoURI getURI();

	/**
	 * Fixe l'uri de stockage. Cette action n'est possible que si l'URI n'etait pas encore définie.
	 * @param uri uri de stockage, non null.
	 */
	void setURIStored(FileInfoURI uri);

	/**
	 * @return Fichier enrichi
	 */
	VFile getVFile();
}
