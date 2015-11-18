package io.vertigo.x.comment;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.x.account.Account;

import java.util.Date;
import java.util.UUID;

/**
 * @author pchretien
 */
public final class Comment {
	private final UUID uuid;
	private final URI<Account> author;
	private final String authorDisplayName;
	private final String msg;
	private final Date creationDate;
	private final Date lastModified;

	Comment(final UUID uuid, final URI<Account> author, final String authorDisplayName, final String msg, final Date creationDate, final Date lastModified) {
		Assertion.checkNotNull(uuid);
		Assertion.checkNotNull(author);
		Assertion.checkArgNotEmpty(authorDisplayName);
		Assertion.checkArgNotEmpty(msg);
		Assertion.checkNotNull(creationDate);
		//lastModified is nullable
		//-----
		this.uuid = uuid;
		this.author = author;
		this.authorDisplayName = authorDisplayName;
		this.msg = msg;
		this.creationDate = creationDate;
		this.lastModified = lastModified;
	}

	public UUID getUuid() {
		return uuid;
	}

	public URI<Account> getAuthor() {
		return author;
	}

	public String getAuthorDisplayName() {
		return authorDisplayName;
	}

	public String getMsg() {
		return msg;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public Date getLastModified() {
		return lastModified;
	}

}
