package io.vertigo.addons.comment;

import io.vertigo.addons.account.Account;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;

import java.util.UUID;

/**
 * @author pchretien
 */
public final class Comment {
	private final UUID uuid;
	private final URI<Account> author;
	private final String msg;

	//	private final Date creationDate;

	Comment(final UUID uuid, final URI<Account> author, final String msg) {
		Assertion.checkNotNull(uuid);
		Assertion.checkNotNull(author);
		Assertion.checkArgNotEmpty(msg);
		//-----
		this.uuid = uuid;
		this.author = author;
		this.msg = msg;
		//	this.creationDate = DateUtil.newDateTime();
	}

	public URI<Account> getAuthor() {
		return author;
	}

	//	public Date getCreationDate() {
	//		return creationDate;
	//	}

	public String getMsg() {
		return msg;
	}

	public UUID getUuid() {
		return uuid;
	}
}
