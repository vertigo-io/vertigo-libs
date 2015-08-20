package io.vertigo.addons.comment;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;
import io.vertigo.util.DateUtil;
import io.vertigo.x.account.Account;

import java.util.Date;
import java.util.UUID;

/**
 * @author pchretien
 */
public final class CommentBuilder implements Builder<Comment> {
	private final UUID uuid;
	private String myMsg;
	private URI<Account> myAuthor;
	private Date myCreationDate;
	private Date myLastModified;

	/**
	 * Constructor for new comment.
	 */
	public CommentBuilder() {
		uuid = UUID.randomUUID();
	}

	/**
	 * Constructor for a previously created comment.
	 * @param uuid comment uuid
	 */
	public CommentBuilder(final UUID uuid) {
		Assertion.checkNotNull(uuid);
		//-----
		this.uuid = uuid;
	}

	/**
	 * @param author Author account
	 * @return this builder
	 */
	public CommentBuilder withAuthor(final URI<Account> author) {
		Assertion.checkArgument(myAuthor == null, "author already set");
		Assertion.checkNotNull(author);
		//-----
		myAuthor = author;
		return this;
	}

	/**
	 * @param msg Comment
	 * @return this builder
	 */
	public CommentBuilder withMsg(final String msg) {
		Assertion.checkArgument(myMsg == null, "msg already set");
		Assertion.checkArgNotEmpty(msg);
		//-----
		myMsg = msg;
		return this;
	}

	/**
	 * @param creationDate create date time
	 * @return this builder
	 */
	public CommentBuilder withCreationDate(final Date creationDate) {
		Assertion.checkArgument(myCreationDate == null, "creationDate already set");
		Assertion.checkNotNull(creationDate);
		//-----
		myCreationDate = creationDate;
		return this;
	}

	/**
	 * @param lastModified Last modify date time
	 * @return this builder
	 */
	public CommentBuilder withLastModified(final Date lastModified) {
		Assertion.checkNotNull(lastModified);
		//-----
		myLastModified = lastModified;
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public Comment build() {
		if (myCreationDate == null) {
			myCreationDate = DateUtil.newDateTime();
		}
		return new Comment(uuid, myAuthor, myMsg, myCreationDate, myLastModified);
	}
}
