package io.vertigo.dynamo.ngdomain;

public interface DataTypeMapper<S, D> {

	S from(D destination, Class<S> type);

	D to(final S source, Class<S> type);
}
