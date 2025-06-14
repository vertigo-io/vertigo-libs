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
package io.vertigo.account.plugins.identityprovider.text;

import java.io.Serializable;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.inject.Inject;

import io.vertigo.account.impl.identityprovider.IdentityProviderPlugin;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.core.util.FileUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.FormatterException;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.FSFile;

/**
 * A simple implementation of the Realm interface that
 * uses a set of configured user accounts and roles to support authentication and authorization.  Each account entry
 * specifies the username, password, and roles for a user.  Roles can also be mapped
 * to permissions and associated with users.
 * <p/>
 * User accounts and roles are stored in two {@code Map}s in memory, so it is expected that the total number of either
 * is not sufficiently large.
 *
 * @since 0.1
 */
public class TextIdentityProviderPlugin implements IdentityProviderPlugin, Activeable {
	private static final String PHOTO_URL_RESERVED_FIELD = "photoUrl";
	private static final Pattern PATTERN_FIELD_PARSER = Pattern.compile("\\(?<([^>]+)>[^)]*\\)");
	private final Pattern filePattern;
	private final List<String> filePatternFieldsOrdered;

	private final Map<String, IdentityUserInfo> authToUsers; //auth-to-Account
	private final Map<Serializable, IdentityUserInfo> idsToUsers; //id-to-Account
	private final ResourceManager resourceManager;
	private final SmartTypeManager smartTypeManager;
	private final String filePath;
	private final String userIdentityEntity;
	private final String userAuthField;

	/**
	 * Constructor.
	 * @param resourceManager Resource Manager
	 * @param filePath File path
	 * @param filePatternStr File Pattern (id, displayName, email, authToken, photoUrl)
	 * @param userAuthField Authent token field name
	 * @param userIdentityEntity User dataDefinition name
	 */
	@Inject
	public TextIdentityProviderPlugin(
			@ParamValue("identityFilePath") final String filePath,
			@ParamValue("identityFilePattern") final String filePatternStr,
			@ParamValue("userAuthField") final String userAuthField,
			@ParamValue("userIdentityEntity") final String userIdentityEntity,
			final ResourceManager resourceManager,
			final SmartTypeManager smartTypeManager) {
		Assertion.check()
				.isNotNull(resourceManager)
				.isNotNull(smartTypeManager)
				.isNotBlank(filePatternStr)
				.isTrue(filePatternStr.contains("(?<"),
						"filePattern should be a regexp of named group for each User's entity fields plus reserved field '{0}' "
								+ "(like : '(?<id>\\S+);(?<name>\\S+);(?<email>\\S+);;(?<{0}>\\S+)' )",
						PHOTO_URL_RESERVED_FIELD)
				.isTrue(filePatternStr.contains("(?<" + PHOTO_URL_RESERVED_FIELD + ">"),
						"filePattern should be a regexp of named group for each User's entity fields plus reserved field '{0}' "
								+ "(like : '(?<id>\\S+);(?<name>\\S+);(?<email>\\S+);;(?<{0}>\\S+)' )",
						PHOTO_URL_RESERVED_FIELD)
				.isTrue(filePatternStr.contains("(?<" + userAuthField + ">"),
						"filePattern should contains the userAuthField : {0}", userAuthField)
				.isNotBlank(userIdentityEntity)
				.isNotBlank(userAuthField);
		// -----
		this.resourceManager = resourceManager;
		this.smartTypeManager = smartTypeManager;
		this.filePath = filePath;
		//SimpleAccountRealms are memory-only realms
		authToUsers = new LinkedHashMap<>();
		idsToUsers = new LinkedHashMap<>();
		filePattern = Pattern.compile(filePatternStr);
		filePatternFieldsOrdered = parsePatternFields(filePatternStr);
		this.userIdentityEntity = userIdentityEntity;
		this.userAuthField = userAuthField;
	}

	private static List<String> parsePatternFields(final String filePatternStr) {
		final List<String> fields = new ArrayList<>();
		final Matcher matcher = PATTERN_FIELD_PARSER.matcher(filePatternStr);
		while (matcher.find()) {
			fields.add(matcher.group(1));
		}
		return fields;
	}

	/** {@inheritDoc} */
	@Override
	public long getUsersCount() {
		return authToUsers.size();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> List<E> getAllUsers() {
		return (List<E>) authToUsers.values().stream()
				.map(IdentityUserInfo::getUser)
				.toList();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E getUserByAuthToken(final String userAuthToken) {
		return (E) authToUsers.get(userAuthToken).getUser();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> Optional<VFile> getPhoto(final UID<E> accountURI) {
		final IdentityUserInfo identityAccountInfo = idsToUsers.get(accountURI.getId());
		Assertion.check().isNotNull(identityAccountInfo, "No identity found for {0}", accountURI);
		final String photoUrl = identityAccountInfo.getPhotoUrl();
		if (photoUrl == null || photoUrl.isEmpty()) {
			return Optional.empty();
		}
		final URL fileURL;
		if (photoUrl.startsWith(".")) {//si on est en relatif, on repart du prefix du fichier des identities
			final String accountFilePrefix = filePath.substring(0, filePath.lastIndexOf('/')) + "/";
			fileURL = resourceManager.resolve(accountFilePrefix + photoUrl);
		} else {
			fileURL = resourceManager.resolve(photoUrl);
		}

		return createVFile(accountURI, fileURL, photoUrl);
	}

	private static <E extends Entity> Optional<VFile> createVFile(final UID<E> accountURI, final URL fileURL, final String photoUrl) {
		Path photoFile;
		try {
			photoFile = Paths.get(fileURL.toURI());
		} catch (final URISyntaxException e) {
			return Optional.empty();
		}
		Assertion.check()
				.isTrue(photoFile.toFile().exists(), "Identity {0} photo {1} not found", accountURI, photoUrl)
				.isTrue(photoFile.toFile().isFile(), "Identity {0} photo {1} must be a file", accountURI, photoUrl);
		return Optional.of(FSFile.of(photoFile));
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		final DataDefinition userDtDefinition = Node.getNode().getDefinitionSpace().resolve(userIdentityEntity, DataDefinition.class);
		Assertion.check().isTrue(userDtDefinition.contains(userAuthField), "User definition ({0}) should contains the userAuthField ({1})", userIdentityEntity, userAuthField);

		final URL realmURL = resourceManager.resolve(filePath);
		final String confTest = FileUtil.read(realmURL);
		try (final Scanner scanner = new Scanner(confTest)) {
			while (scanner.hasNextLine()) {
				final String line = scanner.nextLine();
				parseAndPopulateUserInfo(line, userDtDefinition);
			}
		}
	}

	private void parseAndPopulateUserInfo(final String line, final DataDefinition userDtDefinition) {
		final Matcher matcher = filePattern.matcher(line);
		if (!matcher.find()) {
			throw new IllegalArgumentException("Can't parse textIdentity file , pattern can't match");
		}

		String photoUrl = null;
		String userAuthToken = null;

		final Entity user = Entity.class.cast(DataModelUtil.createDataObject(userDtDefinition));
		for (final String fieldName : filePatternFieldsOrdered) {
			final String valueStr = matcher.group(fieldName);
			if (PHOTO_URL_RESERVED_FIELD.equals(fieldName)) {
				photoUrl = valueStr;
			} else {
				setTypedValue(userDtDefinition, user, fieldName, valueStr);
				if (userAuthField.equals(fieldName)) {
					userAuthToken = valueStr;
				}
			}
		}
		Assertion.check().isNotBlank(userAuthToken, "User AuthToken not found in file");
		final IdentityUserInfo userInfo = new IdentityUserInfo(user, photoUrl);
		authToUsers.put(userAuthToken, userInfo);
		idsToUsers.put(user.getUID().getId(), userInfo);
	}

	private void setTypedValue(final DataDefinition userDtDefinition, final Entity user, final String fieldName, final String valueStr) {
		final DataField dtField = userDtDefinition.getField(fieldName);
		final Serializable typedValue;
		try {
			typedValue = (Serializable) smartTypeManager.stringToValue(dtField.smartTypeDefinition(), valueStr);
		} catch (final FormatterException e) {
			throw WrappedException.wrap(e);
		}
		dtField.getDataAccessor().setValue(user, typedValue);
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		authToUsers.clear();
		idsToUsers.clear();
	}

}
