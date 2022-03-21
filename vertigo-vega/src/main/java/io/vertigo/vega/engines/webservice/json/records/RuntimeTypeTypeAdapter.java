package io.vertigo.vega.engines.webservice.json.records;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

// Does not match com.google.gson.internal.bind.TypeAdapterRuntimeTypeWrapper behavior
// but instead always uses runtime type to be more deterministic
class RuntimeTypeTypeAdapter<T> extends TypeAdapter<T> {
	private final Gson gson;
	private final TypeAdapter<T> delegate;

	RuntimeTypeTypeAdapter(final Gson gson, final TypeAdapter<T> delegate) {
		this.gson = gson;
		this.delegate = delegate;
	}

	@Override
	public void write(final JsonWriter out, final T value) throws IOException {
		if (value == null) {
			// Let compile time type adapter handle it; might write custom value
			delegate.write(out, null);
		} else {
			@SuppressWarnings("unchecked")
			final TypeAdapter<T> adapter = (TypeAdapter<T>) gson.getAdapter(TypeToken.get(value.getClass()));
			adapter.write(out, value);
		}
	}

	@Override
	public T read(final JsonReader in) throws IOException {
		return delegate.read(in);
	}
}
