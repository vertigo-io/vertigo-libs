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
package io.vertigo.datastore.plugins.filestore.s3;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.commons.transaction.VTransactionAfterCompletionFunction;
import io.vertigo.core.lang.Assertion;

/**
 * Handling removal of a list of files in S3.
 *
 * @author xdurand, skerdudou
 */
final class S3ActionDeleteList implements VTransactionAfterCompletionFunction {

	private static final Logger LOG = LogManager.getLogger(S3ActionDeleteList.class);

	private final String bucketName;
	private final List<String> paths;
	private final S3Helper s3Helper;

	/**
	 * Constructor.
	 *
	 * @param bucketName S3 bucket name
	 * @param path Location of the file
	 * @param s3Helper S3 helper
	 */
	public S3ActionDeleteList(final String bucketName, final List<String> paths, final S3Helper s3Helper) {
		Assertion.check().isNotNull(paths);
		//-----
		this.bucketName = bucketName;
		this.paths = paths;
		this.s3Helper = s3Helper;

		// test if files exists in S3
		for (final String path : paths) {
			if (!s3Helper.checkFileExists(bucketName, path)) {
				LOG.warn(() -> "Unable to find S3 object to delete '" + bucketName + ":" + path + "'");
			}

		}
	}

	/** {@inheritDoc} */
	@Override
	public void afterCompletion(final boolean txCommited) {
		if (txCommited) {
			for (final String path : paths) {
				s3Helper.deleteFile(bucketName, path);
			}
		}
	}

}
