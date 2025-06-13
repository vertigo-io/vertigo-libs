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
package io.vertigo.account.plugins.account.store.text;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;
import java.util.Set;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.account.account.Account;
import io.vertigo.account.account.AccountGroup;
import io.vertigo.account.impl.account.AccountStorePlugin;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.core.util.FileUtil;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.FSFile;

/**
 * A simple implementation of the Realm interface that
 * uses a set of configured account accounts and roles to support authentication and authorization.  Each account entry
 * specifies the accountname, password, and roles for a account.  Roles can also be mapped
 * to permissions and associated with accounts.
 * <p/>
 * Account accounts and roles are stored in two {@code Map}s in memory, so it is expected that the total number of either
 * is not sufficiently large.
 *
 * @since 0.1
 */
public class TextAccountStorePlugin implements AccountStorePlugin, Activeable {
	private final Pattern accountFilePattern;
	private final Pattern groupFilePattern;

	private final Map<String, AccountInfo> accounts; //id-to-Account
	private final Map<String, List<Account>> accountsPerGroup; //groupId-to-Accounts
	private final Map<String, AccountGroup> groups; //id-to-Groups
	private final Map<String, List<AccountGroup>> groupsPerAccount; //accountId-to-Groups
	private final ResourceManager resourceManager;
	private final String accountFilePath;
	private final String groupFilePath;

	private enum AccountProperty {
		id, displayName, email, authToken, photoUrl
	}

	private enum GroupProperty {
		id, displayName, accountIds
	}

	/**
	 * Constructor.
	 * @param resourceManager Resource Manager
	 * @param accountFilePath File path
	 * @param accountFilePatternStr File Pattern (id, displayName, email, authToken, photoUrl)
	 */
	@Inject
	public TextAccountStorePlugin(
			@ParamValue("accountFilePath") final String accountFilePath,
			@ParamValue("accountFilePattern") final String accountFilePatternStr,
			@ParamValue("groupFilePath") final String groupFilePath,
			@ParamValue("groupFilePattern") final String groupFilePatternStr,
			final ResourceManager resourceManager) {
		Assertion.check()
				.isNotNull(resourceManager)
				.isNotBlank(accountFilePatternStr)
				.isTrue(accountFilePatternStr.contains("(?<"),
						"accountFilePattern should be a regexp of named group for each Account's fields "
								+ "(like : '(?<id>[^\\s;]+);(?<displayName>[^\\s;]+);(?<email>)(?<authToken>[^\\s;]+);(?<photoUrl>[^\\s;]+)' )");
		Assertion.check().isTrue(groupFilePatternStr.contains("(?<"),
				"groupFilePattern should be a regexp of named group for each group's fields "
						+ "(like : '(?<id>[^\\s;]+);(?<displayName>[^\\s;]+);(?<accountIds>([^\\s;]+(;[^\\s;]+)*)' )");
		for (final AccountProperty accountProperty : AccountProperty.values()) {
			Assertion.check().isTrue(accountFilePatternStr.contains("(?<" + accountProperty.name() + ">"),
					"filePattern should be a regexp of named group for each Account fields (missing {0} field) "
							+ "(like : '(?<id>\\S+);(?<displayName>\\S+);(?<email>)(?<authToken>\\S+);(?<photoUrl>\\S+)' )",
					accountProperty.name());
		}
		for (final GroupProperty groupProperty : GroupProperty.values()) {
			Assertion.check().isTrue(groupFilePatternStr.contains("(?<" + groupProperty.name() + ">"),
					"filePattern should be a regexp of named group for each Group fields (missing {0} field) "
							+ "(like : '(?<id>[^\\s;]+);(?<displayName>[^\\s;]+);(?<accountIds>([^\\s;]+(;[^\\s;]+)*)' )",
					groupProperty.name());
		}
		// -----
		this.resourceManager = resourceManager;
		this.accountFilePath = accountFilePath.replace(File.separatorChar, '/');
		this.groupFilePath = groupFilePath.replace(File.separatorChar, '/');
		//SimpleAccountRealms are memory-only realms
		accounts = new LinkedHashMap<>();
		groups = new LinkedHashMap<>();
		groupsPerAccount = new LinkedHashMap<>();
		accountsPerGroup = new HashMap<>();
		accountFilePattern = Pattern.compile(accountFilePatternStr);
		groupFilePattern = Pattern.compile(groupFilePatternStr);
	}

	@Override
	public Account getAccount(final UID<Account> accountURI) {
		return accounts.get(accountURI.getId()).account();
	}

	@Override
	public Set<UID<AccountGroup>> getGroupUIDs(final UID<Account> accountUID) {
		return groupsPerAccount.get(accountUID.getId()).stream()
				.map(AccountGroup::getUID)
				.collect(Collectors.toSet());
	}

	@Override
	public AccountGroup getGroup(final UID<AccountGroup> groupURI) {
		return groups.get(groupURI.getId());
	}

	@Override
	public Set<UID<Account>> getAccountUIDs(final UID<AccountGroup> groupURI) {
		return accountsPerGroup.get(groupURI.getId()).stream()
				.map(Account::getUID)
				.collect(Collectors.toSet());
	}

	/** {@inheritDoc} */
	@Override
	public Optional<Account> getAccountByAuthToken(final String accountAuthToken) {
		final Optional<AccountInfo> accountInfoOpt = accounts.values().stream()
				.filter(accountInfo -> accountAuthToken.equals(accountInfo.account().getAuthToken()))
				.findFirst();
		return accountInfoOpt.map(AccountInfo::account);
	}

	/** {@inheritDoc} */
	@Override
	public Optional<VFile> getPhoto(final UID<Account> accountURI) {
		final AccountInfo accountInfo = accounts.get(accountURI.getId());
		Assertion.check().isNotNull(accountInfo, "No account found for {0}", accountURI);
		if (accountInfo.photoUrl() == null || accountInfo.photoUrl().isEmpty()) {
			return Optional.empty();
		}
		final URL fileURL;
		if (accountInfo.photoUrl().startsWith(".")) {//si on est en relatif, on repart du prefix du fichier des accounts
			final String accountFilePrefix = accountFilePath.substring(0, accountFilePath.lastIndexOf('/')) + "/";
			fileURL = resourceManager.resolve(accountFilePrefix + accountInfo.photoUrl());
		} else {
			fileURL = resourceManager.resolve(accountInfo.photoUrl());
		}

		return createVFile(accountURI, fileURL, accountInfo.photoUrl());
	}

	private static Optional<VFile> createVFile(final UID<Account> accountURI, final URL fileURL, final String photoUrl) {
		Path photoFile;
		try {
			photoFile = Paths.get(fileURL.toURI());
		} catch (final URISyntaxException e) {
			return Optional.empty();
		}
		Assertion.check()
				.isTrue(photoFile.toFile().exists(), "Account {0} photo {1} not found", accountURI, photoUrl)
				.isTrue(photoFile.toFile().isFile(), "Account {0} photo {1} must be a file", accountURI, photoUrl);
		return Optional.of(FSFile.of(photoFile));
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		readData(this::parseAccounts, accountFilePath);
		readData(this::parseGroups, groupFilePath);
	}

	private void readData(final Consumer<String> parser, final String filePath) {
		final URL fileURL = resourceManager.resolve(filePath);
		final String confTest = FileUtil.read(fileURL);
		try (final Scanner scanner = new Scanner(confTest)) {
			while (scanner.hasNextLine()) {
				final String line = scanner.nextLine();
				parser.accept(line);
			}
		}
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		accounts.clear();
	}

	private void parseAccounts(final String line) {
		final Matcher matcher = accountFilePattern.matcher(line);
		final boolean matches = matcher.matches();
		Assertion.check().isTrue(matches, "AccountFile ({2}) can't be parse by this regexp :\nline:{0}\nregexp:{1}", line, matches, accountFilePath);
		final String id = matcher.group(AccountProperty.id.name());
		final String displayName = matcher.group(AccountProperty.displayName.name());
		final String email = matcher.group(AccountProperty.email.name());
		final String authToken = matcher.group(AccountProperty.authToken.name());
		final String photoUrl = matcher.group(AccountProperty.photoUrl.name());
		final Account account = Account.builder(id)
				.withDisplayName(displayName)
				.withEmail(email)
				.withAuthToken(authToken)
				.build();
		accounts.put(id, new AccountInfo(account, photoUrl));
	}

	private void parseGroups(final String line) {
		final Matcher matcher = groupFilePattern.matcher(line);
		final boolean matches = matcher.matches();
		Assertion.check().isTrue(matches, "GroupFile ({2}) can't be parse by this regexp :\nline:{0}\nregexp:{1}", line, matches, groupFilePath);
		final String groupId = matcher.group(GroupProperty.id.name());
		final String displayName = matcher.group(GroupProperty.displayName.name());
		final String accountIds = matcher.group(GroupProperty.accountIds.name());

		final AccountGroup accountGroup = new AccountGroup(groupId, displayName);
		groups.put(groupId, accountGroup);
		final List<Account> groupAccounts = new ArrayList<>();
		for (final String accountId : accountIds.split(";")) {
			groupsPerAccount.computeIfAbsent(accountId, k -> new ArrayList<>()).add(accountGroup);
			final Account account = accounts.get(accountId).account();
			Assertion.check().isNotNull(account, "Group {0} reference an undeclared account {1}", groupId, accountId);
			groupAccounts.add(account);
		}
		accountsPerGroup.put(groupId, groupAccounts);

	}
}
