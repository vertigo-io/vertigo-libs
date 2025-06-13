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
package io.vertigo.datastore.plugins.filestore.s3;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import io.vertigo.commons.transaction.VTransactionAfterCompletionFunction;
import io.vertigo.core.lang.Assertion;

/**
 * Handling saving file to S3.
 *
 * @author skerdudou
 */
final class S3ActionSave implements VTransactionAfterCompletionFunction {
	//ref the file before this save action
	private final List<String> txSaveFiles = new ArrayList<>();

	private final S3Helper s3Helper;
	private final String bucketName;
	private final boolean useTags;

	/**
	 * Constructor.
	 *
	 * @param bucketName S3 bucket name
	 * @param path Location of the file
	 * @param inputStream File inputStream
	 * @param fileLength file length (Optional, -1 if unknown)
	 * @param useTags do use tag to flag uncommited/commited state of the file. Cf S3FileStorePlugin.
	 * @param s3Helper S3 helper
	 */
	public S3ActionSave(final String bucketName, final String path, final InputStream inputStream, final long fileLength, final boolean useTags, final S3Helper s3Helper) {
		Assertion.check()
				.isNotNull(s3Helper)
				.isNotBlank(bucketName);
		//-----
		this.s3Helper = s3Helper;
		this.bucketName = bucketName;
		this.useTags = useTags;
		add(path, inputStream, fileLength);
	}

	/**
	 * Add a file to on the previously defined bucket. All files are commited or rollbacked together.
	 *
	 * @param path Location of the file
	 * @param inputStream File inputStream
	 * @param fileLength file length (Optional, -1 if unknown)
	 */
	public S3ActionSave add(final String path, final InputStream inputStream, final long fileLength) {
		Assertion.check()
				.isNotNull(inputStream)
				.isNotBlank(path);
		//-----
		s3Helper.saveFile(bucketName, path, inputStream, fileLength, useTags ? Map.of("state", "uncommited") : null);

		txSaveFiles.add(path);

		return this;
	}

	/** {@inheritDoc} */
	@Override
	public void afterCompletion(final boolean txCommited) {
		if (txCommited) {
			doCommit();
		} else {
			doRollback();
		}
	}

	private void doCommit() {
		if (useTags) {
			for (final String path : txSaveFiles) {
				s3Helper.updateTags(bucketName, path, Map.of("state", "commited"));
			}
		}
	}

	private void doRollback() {
		// cleaning file on error
		for (final String path : txSaveFiles) {
			s3Helper.deleteFile(bucketName, path);
		}

	}
}
