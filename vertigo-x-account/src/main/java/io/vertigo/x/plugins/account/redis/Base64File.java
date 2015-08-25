package io.vertigo.x.plugins.account.redis;

import io.vertigo.commons.codec.Codec;
import io.vertigo.commons.codec.CodecManager;
import io.vertigo.core.Home;
import io.vertigo.dynamo.file.model.VFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;

/**
 * Objet redis correspondant à un VFile. Le contenu du VFile est stocké sous forme base64.
 *
 * @author jmforhan
 */
final class Base64File implements VFile {

	private static final long serialVersionUID = -6930931781248326088L;

	private final String fileName;
	private final String mimeType;
	private final Long length;
	private final Date lastModified;
	private final String base64Content;

	/**
	 * File read from a base64 content.
	 * @param fileName file name
	 * @param mimeType type mime
	 * @param length File length
	 * @param lastModified file lastModified date
	 * @param base64Content encodage en base64.
	 */
	public Base64File(final String fileName, final String mimeType, final Long length, final Date lastModified, final String base64Content) {
		this.fileName = fileName;
		this.mimeType = mimeType;
		this.length = length;
		this.lastModified = lastModified;
		this.base64Content = base64Content;
	}

	/**
	 * @return fileName.
	 */
	@Override
	public String getFileName() {
		return fileName;
	}

	/**
	 * @return mimeType.
	 */
	@Override
	public String getMimeType() {
		return mimeType;
	}

	/**
	 * @return length.
	 */
	@Override
	public Long getLength() {
		return length;
	}

	/**
	 *@return lastModified.
	 */
	@Override
	public Date getLastModified() {
		return lastModified;
	}

	/**
	 * @return base64Content.
	 */
	public String getBase64Content() {
		String base64HtmlContent = base64Content.replace('_', '+');
		base64HtmlContent = base64HtmlContent.replace('-', '/');
		return base64HtmlContent;
	}

	/** {@inheritDoc} */
	@Override
	public InputStream createInputStream() throws IOException {
		final Codec<byte[], String> base64Codec = Home.getComponentSpace().resolve(CodecManager.class).getBase64Codec();
		return new ByteArrayInputStream(base64Codec.decode(base64Content));
	}

}
