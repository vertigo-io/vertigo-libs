package io.vertigo.datastore.plugins.filestore.s3;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.commons.transaction.VTransactionAfterCompletionFunction;
import io.vertigo.core.lang.Assertion;

/**
 * Handling removal of a file in S3.
 *
 * @author skerdudou
 */
final class S3ActionDelete implements VTransactionAfterCompletionFunction {
	private static final Logger LOG = LogManager.getLogger(S3ActionDelete.class);

	private final String bucketName;
	private final String path;
	private final S3Helper s3Helper;

	/**
	 * Constructor.
	 *
	 * @param bucketName S3 bucket name
	 * @param path Location of the file
	 * @param s3Helper S3 helper
	 */
	public S3ActionDelete(final String bucketName, final String path, final S3Helper s3Helper) {
		Assertion.check().isNotNull(path);
		//-----
		this.bucketName = bucketName;
		this.path = path;
		this.s3Helper = s3Helper;

		// test if file exists in S3
		if (!s3Helper.checkFileExists(bucketName, path)) {
			LOG.warn(() -> "Unable to find S3 object to delete '" + bucketName + ":" + path + "'");
		}
	}

	/** {@inheritDoc} */
	@Override
	public void afterCompletion(final boolean txCommited) {
		if (txCommited) {
			s3Helper.deleteFile(bucketName, path);
		}
	}

}
