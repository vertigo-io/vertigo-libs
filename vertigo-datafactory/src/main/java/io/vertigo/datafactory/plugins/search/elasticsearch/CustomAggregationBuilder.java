/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2021, Vertigo.io, team@vertigo.io
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
package io.vertigo.datafactory.plugins.search.elasticsearch;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.io.stream.StreamOutput;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryShardContext;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.AggregatorFactories;
import org.elasticsearch.search.aggregations.AggregatorFactory;
import org.elasticsearch.search.aggregations.PipelineAggregationBuilder;

import io.vertigo.core.lang.Assertion;

public final class CustomAggregationBuilder extends AggregationBuilder {

	public static final Object DECIMAL_PRECISION_TO_PARAM = "_decimalPrecision";
	private static final Object INNER_WRITE_TO_PARAM = "_innerWriteTo";
	private static final Object TYPE_PARAM = "_type";

	private Map<String, Object> metaData;
	private final Map<String, String> customParams;
	private final Optional<String[]> innerWriteToOperations;
	private final Optional<String> type;

	/**
	 * Constructs a new aggregation builder.
	 *
	 * @param name  The aggregation name
	 */
	public CustomAggregationBuilder(final String name, final Map<String, String> customParams) {
		super(name);
		final String innerWriteToParam = customParams.get(INNER_WRITE_TO_PARAM);
		if (innerWriteToParam != null) {
			innerWriteToOperations = Optional.of(innerWriteToParam.split("\\s*;\\s*"));
		} else {
			innerWriteToOperations = Optional.empty();
		}
		String typeParam = customParams.get(TYPE_PARAM);
		this.customParams = new HashMap<>(customParams);
		this.customParams.remove(TYPE_PARAM);
		this.customParams.remove(INNER_WRITE_TO_PARAM);
		if (typeParam == null && this.customParams.size() > 0) {
			//looking for default type : use the first param (type of Agg for ES)
			typeParam = this.customParams.keySet().iterator().next();
		}
		type = Optional.ofNullable(typeParam);

	}

	@Override
	public String getType() {
		Assertion.check().isTrue(type.isPresent(), "Need to set an {0} param to declare the agg type (like : sum)", TYPE_PARAM);
		return type.get(); //mandatory in this case
	}

	@Override
	public void writeTo(final StreamOutput out) throws IOException {
		out.writeString(name);
		factoriesBuilder.writeTo(out);
		out.writeMap(metaData);
		out.writeOptionalString(getType());
		out.writeBoolean(false); //hasScript
		out.writeBoolean(false); //hasValueType
		out.writeOptionalString(null); //format
		out.writeGenericValue(null); //missing
		out.writeOptionalZoneId(null); //timeZone
		if (innerWriteToOperations.isPresent()) {
			innerWriteTo(out); //type dependent
		}
	}

	private void innerWriteTo(final StreamOutput out) throws NumberFormatException, IOException {
		Assertion.check().isTrue(innerWriteToOperations.isPresent(), "Need to set an {0} param to declare how to set agg in ES specific protocol (like : writeVInt(#queryParam#);writeVInt(1000);writeVInt(-1);)", INNER_WRITE_TO_PARAM);
		//----
		for (final String operation : innerWriteToOperations.get()) {
			final String value = operation.substring(operation.indexOf('(') + 1, operation.indexOf(')'));
			if (operation.startsWith("writeVInt(")) {
				out.writeVInt(Integer.parseInt(value));
			} else if (operation.startsWith("writeInt(")) {
				out.writeInt(Integer.parseInt(value));
			} else if (operation.startsWith("writeVLong(")) {
				out.writeVLong(Long.parseLong(value));
			} else if (operation.startsWith("writeLong(")) {
				out.writeLong(Long.parseLong(value));
			} else if (operation.startsWith("writeBoolean(")) {
				out.writeBoolean(Boolean.parseBoolean(value));
			} else if (operation.startsWith("writeDouble(")) {
				out.writeDouble(Double.parseDouble(value));
			} else if (operation.startsWith("writeString(")) {
				out.writeString(value);
			} else if (operation.startsWith("writeGeoPoint(")) {
				if (value.isBlank()) {
					out.writeGeoPoint(new GeoPoint());
				} else {
					out.writeGeoPoint(new GeoPoint(value));
				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public CustomAggregationBuilder subAggregation(final AggregationBuilder aggregation) {
		if (aggregation == null) {
			throw new IllegalArgumentException("[aggregation] must not be null: [" + name + "]");
		}
		factoriesBuilder.addAggregator(aggregation);
		return this;
	}

	/**
	 * Add a sub aggregation to this aggregation.
	 */
	@SuppressWarnings("unchecked")
	@Override
	public CustomAggregationBuilder subAggregation(final PipelineAggregationBuilder aggregation) {
		if (aggregation == null) {
			throw new IllegalArgumentException("[aggregation] must not be null: [" + name + "]");
		}
		factoriesBuilder.addPipelineAggregator(aggregation);
		return this;
	}

	/**
	 * Registers sub-factories with this factory. The sub-factory will be
	 * responsible for the creation of sub-aggregators under the aggregator
	 * created by this factory.
	 *
	 * @param subFactories
	 *            The sub-factories
	 * @return this factory (fluent interface)
	 */
	@SuppressWarnings("unchecked")
	@Override
	public CustomAggregationBuilder subAggregations(final AggregatorFactories.Builder subFactories) {
		if (subFactories == null) {
			throw new IllegalArgumentException("[subFactories] must not be null: [" + name + "]");
		}
		factoriesBuilder = subFactories;
		return this;
	}

	@SuppressWarnings("unchecked")
	@Override
	public CustomAggregationBuilder setMetadata(final Map<String, Object> metaData) {
		if (metaData == null) {
			throw new IllegalArgumentException("[metaData] must not be null: [" + name + "]");
		}
		this.metaData = metaData;
		return this;
	}

	@Override
	public Map<String, Object> getMetadata() {
		return metaData == null ? Collections.emptyMap() : Collections.unmodifiableMap(metaData);
	}

	@Override
	public String getWriteableName() {
		// We always use the type of the aggregation as the writeable name
		return getType();
	}

	@Override
	public AggregatorFactory build(final QueryShardContext context, final AggregatorFactory parent) {
		throw new UnsupportedOperationException("not yet");
	}

	@Override
	public XContentBuilder toXContent(final XContentBuilder builder, final Params params) throws IOException {
		builder.startObject(name);

		if (metaData != null) {
			builder.field("meta", metaData);
		}
		for (final Map.Entry<String, String> entry : customParams.entrySet()) {
			if (!DECIMAL_PRECISION_TO_PARAM.equals(entry.getKey())) {
				builder.rawField(entry.getKey(), new ByteArrayInputStream(entry.getValue().getBytes(StandardCharsets.UTF_8)), XContentType.JSON);
			}
		}

		if (factoriesBuilder != null && factoriesBuilder.count() > 0) {
			builder.field("aggregations");
			factoriesBuilder.toXContent(builder, params);
		}

		return builder.endObject();
	}

	@Override
	protected AggregationBuilder shallowCopy(final org.elasticsearch.search.aggregations.AggregatorFactories.Builder originalFactoriesBuilder, final Map<String, Object> originalMetaData) {
		throw new UnsupportedOperationException("not yet");
	}

	@Override
	public int hashCode() {
		return Objects.hash(factoriesBuilder, metaData, name);
	}

	@Override
	public boolean equals(final Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null || getClass() != obj.getClass()) {
			return false;
		}
		final CustomAggregationBuilder other = (CustomAggregationBuilder) obj;

		return Objects.equals(name, other.name)
				&& Objects.equals(metaData, other.metaData)
				&& Objects.equals(factoriesBuilder, other.factoriesBuilder);
	}

	@Override
	public BucketCardinality bucketCardinality() {
		return BucketCardinality.MANY;
	}
}
