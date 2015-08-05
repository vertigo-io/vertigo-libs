package io.vertigo.addons.comment;

import io.vertigo.addons.account.Account;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

import java.util.UUID;

/**
 * @author pchretien
 */
public final class CommentBuilder implements Builder<Comment> {
	//	private URI<? extends DtSubject> mySubjectURI;
	//	private Comment myParent;
	private UUID myUuid;
	private String myMsg;
	private URI<Account> myAuthor;

	//	public <S extends DtSubject> CommentBuilder withSubject(final URI<S> subjectURI) {
	//		Assertion.checkArgument(mySubjectURI == null, "subject already set");
	//		Assertion.checkNotNull(subjectURI);
	//		//-----
	//		this.mySubjectURI = subjectURI;
	//		return this;
	//	}

	//	public CommentBuilder withParent(final Comment comment) {
	//		Assertion.checkArgument(myParent == null, "parent already set");
	//		Assertion.checkNotNull(comment);
	//		//-----
	//		this.myParent = comment;
	//		return this;
	//	}

	public CommentBuilder withAuthor(final URI<Account> author) {
		Assertion.checkArgument(myAuthor == null, "author already set");
		Assertion.checkNotNull(author);
		//-----
		this.myAuthor = author;
		return this;
	}

	public CommentBuilder withMsg(final String msg) {
		Assertion.checkArgument(myMsg == null, "msg already set");
		Assertion.checkArgNotEmpty(msg);
		//-----
		this.myMsg = msg;
		return this;
	}

	public CommentBuilder withUUID(final UUID uuid) {
		Assertion.checkArgument(myUuid == null, "uuid already set");
		Assertion.checkNotNull(uuid);
		//-----
		this.myUuid = uuid;
		return this;
	}

	@Override
	public Comment build() {
		myUuid = myUuid == null ? UUID.randomUUID() : myUuid;
		return new Comment(myUuid, myAuthor, myMsg);
	}
}
