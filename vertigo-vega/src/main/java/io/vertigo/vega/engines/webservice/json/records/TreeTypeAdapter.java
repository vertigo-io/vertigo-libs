package io.vertigo.vega.engines.webservice.json.records;

import java.io.IOException;
import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.TypeAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

// Similar to com.google.gson.internal.bind.TreeTypeAdapter
class TreeTypeAdapter<T> extends TypeAdapter<T> {
	private final JsonSerializer<T> serializer;
	private final JsonDeserializer<T> deserializer;
	private final Gson gson;
	private final TypeToken<T> type;
	private final TypeAdapter<JsonElement> jsonElementAdapter;
	private final GsonContext context;

	// Looked up lazily to avoid exceptions during lookup when delegate is not actually needed
	private volatile TypeAdapter<T> delegate;

	TreeTypeAdapter(final JsonSerializer<T> serializer, final JsonDeserializer<T> deserializer, final Gson gson, final TypeToken<T> type) {
		this.serializer = serializer;
		this.deserializer = deserializer;
		this.gson = gson;
		this.type = type;
		this.jsonElementAdapter = gson.getAdapter(JsonElement.class);
		this.context = new GsonContext(gson);
	}

	private TypeAdapter<T> delegate() {
		TypeAdapter<T> delegate = this.delegate;
		// Allow racy initialization by multiple threads
		if (delegate == null) {
			this.delegate = delegate = gson.getAdapter(type);
		}
		return delegate;
	}

	@Override
	public void write(final JsonWriter out, final T value) throws IOException {
		if (serializer == null) {
			delegate().write(out, value);
		} else {
			// Not exactly the same as Gson's TreeTypeAdapter implementation, but close enough
			// Can't use JsonParser.parseReader because it makes the reader lenient
			final JsonElement jsonElement = serializer.serialize(value, type.getType(), context);
			jsonElementAdapter.write(out, jsonElement);
		}
	}

	@Override
	public T read(final JsonReader in) throws IOException {
		if (deserializer == null) {
			return delegate().read(in);
		} else {
			// Not exactly the same as Gson's TreeTypeAdapter implementation, but close enough
			final JsonElement jsonElement = jsonElementAdapter.read(in);
			return deserializer.deserialize(jsonElement, type.getType(), context);
		}
	}

	private static class GsonContext implements JsonSerializationContext, JsonDeserializationContext {
		private final Gson gson;

		private GsonContext(final Gson gson) {
			this.gson = gson;
		}

		@Override
		public <T> T deserialize(final JsonElement json, final Type typeOfT) throws JsonParseException {
			return gson.fromJson(json, typeOfT);
		}

		@Override
		public JsonElement serialize(final Object src) {
			return gson.toJsonTree(src);
		}

		@Override
		public JsonElement serialize(final Object src, final Type typeOfSrc) {
			return gson.toJsonTree(src, typeOfSrc);
		}
	}
}
