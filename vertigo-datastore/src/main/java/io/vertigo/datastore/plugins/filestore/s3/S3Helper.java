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

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import io.minio.GetObjectArgs;
import io.minio.GetObjectResponse;
import io.minio.ListObjectsArgs;
import io.minio.MinioClient;
import io.minio.ObjectWriteResponse;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.Result;
import io.minio.SetObjectTagsArgs;
import io.minio.StatObjectArgs;
import io.minio.errors.ErrorResponseException;
import io.minio.errors.MinioException;
import io.minio.messages.Item;
import io.vertigo.connectors.s3.S3Connector;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.TempFile;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.component.Manager;
import io.vertigo.core.util.FileUtil;

/**
 * Usual S3 operations.
 *
 * @author skerdudou, xdurand
 */
class S3Helper implements Manager {
	private static final long PART_SIZE = 10L * 1024L * 1024L; // 10Mo
	private static final long MAX_MEMORY_FILE_SIZE = 100L * 1024L; // 100Ko
	private static final String S3_CATEGORY = "s3";
	private static final String CONTENT_LENGTH = "Content-Length";

	private final S3Connector s3Connector;
	private final AnalyticsManager analyticsManager;

	public S3Helper(final S3Connector s3Connector, final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotNull(s3Connector)
				.isNotNull(analyticsManager);
		//-----
		this.s3Connector = s3Connector;
		this.analyticsManager = analyticsManager;
	}

	public boolean checkFileExists(final String bucketName, final String filePath) {
		return analyticsManager.traceWithReturn(
				S3_CATEGORY,
				"/checkFileExists/" + bucketName + "/" + filePath,
				tracer -> doCheckFileExists(bucketName, filePath));
	}

	private Boolean doCheckFileExists(final String bucketName, final String filePath) {
		try {
			getS3Client().statObject(StatObjectArgs.builder()
					.bucket(bucketName)
					.object(filePath)
					.build());
		} catch (final MinioException | InvalidKeyException | NoSuchAlgorithmException | IllegalArgumentException | IOException e) {
			if (e instanceof ErrorResponseException && "NoSuchKey".equals(((ErrorResponseException) e).errorResponse().code())) {
				return false;
			}
			throw new VSystemException(e, "Unable to access to S3 storage");
		}
		return true;
	}

	public InputStream readObject(final String bucketName, final String filePath) {
		return analyticsManager.traceWithReturn(
				S3_CATEGORY,
				"/readObject/" + bucketName + "/" + filePath,
				tracer -> {
					final var s3Object = doReadObject(bucketName, filePath);
					tracer.setMeasure(CONTENT_LENGTH, Double.parseDouble(s3Object.headers().get(CONTENT_LENGTH)));
					return toLocalInputStream(s3Object);
				});
	}

	private static InputStream toLocalInputStream(final GetObjectResponse s3Object) {
		// GetObjectResponse is an input stream backed to S3 HTTP request
		// S3 object is locked unless consumed and is susceptible to timeout while reading
		// We consume it ourselves to resolves theses issues

		final long contentLength = Long.parseLong(s3Object.headers().get(CONTENT_LENGTH));
		try {
			// Keep in memory for small files
			if (contentLength < MAX_MEMORY_FILE_SIZE) {
				final ByteArrayOutputStream output = new ByteArrayOutputStream((int) contentLength);
				s3Object.transferTo(output);
				return new ByteArrayInputStream(output.toByteArray());
			}
			// dump to temp file
			final File file = TempFile.of("tmp", ".s3");
			FileUtil.copy(s3Object, file);
			return Files.newInputStream(file.toPath());
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

	private GetObjectResponse doReadObject(final String bucketName, final String filePath) {
		try {
			return getS3Client().getObject(
					GetObjectArgs.builder()
							.bucket(bucketName)
							.object(filePath)
							.build());
		} catch (final MinioException | InvalidKeyException | NoSuchAlgorithmException | IllegalArgumentException | IOException e) {
			throw new VSystemException(e, "Unable to read S3 object '" + bucketName + ":" + filePath + "'");
		}
	}

	public Iterable<Result<Item>> listObjects(final String bucketName) {
		try {
			return getS3Client().listObjects(
					ListObjectsArgs.builder()
						.bucket(bucketName)
						.recursive(true)
						.build());
		} catch (final IllegalArgumentException e) {
			throw new VSystemException(e, "Unable to list S3 objects '" + bucketName + "'");
		}

	}

	public void saveFile(final String bucketName, final InputStream inputStream, final String filePath) {
		saveFile(bucketName, filePath, inputStream, null);
	}

	public void saveFile(final String bucketName, final InputStream inputStream, final long fileLength, final String filePath) {
		saveFile(bucketName, filePath, inputStream, fileLength, null);
	}

	public void saveFile(final String bucketName, final String filePath, final InputStream inputStream, final Map<String, String> tags) {
		saveFile(bucketName, filePath, inputStream, -1, tags);
	}

	public ObjectWriteResponse saveFile(final String bucketName, final String filePath, final InputStream inputStream, final long fileLength, final Map<String, String> tags) {
		return analyticsManager.traceWithReturn(
				S3_CATEGORY,
				"/saveFile/" + bucketName + "/" + filePath,
				tracer -> {
					tracer.setMeasure(CONTENT_LENGTH, fileLength);
					return doSaveFile(bucketName, filePath, inputStream, fileLength, tags);
				});
	}

	private ObjectWriteResponse doSaveFile(final String bucketName, final String filePath, final InputStream inputStream, final long fileLength, final Map<String, String> tags) {
		try {
			return getS3Client().putObject(PutObjectArgs.builder()
					.bucket(bucketName)
					.object(filePath)
					.stream(inputStream, fileLength, PART_SIZE)
					.tags(tags)
					.build());
		} catch (MinioException | InvalidKeyException | NoSuchAlgorithmException | IllegalArgumentException | IOException e) {
			throw new VSystemException(e, "Error writing object in S3 '" + bucketName + ":" + filePath + "'.");
		}
	}

	public void updateTags(final String bucketName, final String filePath, final Map<String, String> tags) {
		analyticsManager.trace(
				S3_CATEGORY,
				"/updateTags/" + bucketName + "/" + filePath,
				tracer -> doUpdateTags(bucketName, filePath, tags));
	}

	private void doUpdateTags(final String bucketName, final String filePath, final Map<String, String> tags) {
		try {
			getS3Client().setObjectTags(SetObjectTagsArgs.builder()
					.bucket(bucketName)
					.object(filePath)
					.tags(tags)
					.build());
		} catch (MinioException | InvalidKeyException | NoSuchAlgorithmException | IllegalArgumentException | IOException e) {
			throw new VSystemException(e, "Unable to update tags from object '" + bucketName + ":" + filePath + "'");
		}
	}

	public void deleteFile(final String bucketName, final String filePath) {
		analyticsManager.trace(
				S3_CATEGORY,
				"/deleteFile/" + bucketName + "/" + filePath,
				tracer -> doDeleteFile(bucketName, filePath));
	}

	private void doDeleteFile(final String bucketName, final String filePath) {
		try {
			getS3Client().removeObject(RemoveObjectArgs.builder()
					.bucket(bucketName)
					.object(filePath)
					.build());
		} catch (MinioException | InvalidKeyException | NoSuchAlgorithmException | IllegalArgumentException | IOException e) {
			throw new VSystemException(e, "Unable to remove object '" + bucketName + ":" + filePath + "'");
		}
	}

	private MinioClient getS3Client() {
		return s3Connector.getClient();
	}
}
