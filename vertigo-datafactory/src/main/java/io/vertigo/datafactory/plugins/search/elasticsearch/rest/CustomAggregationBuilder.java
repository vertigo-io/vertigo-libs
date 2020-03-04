package io.vertigo.datafactory.plugins.search.elasticsearch.rest;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;

import org.elasticsearch.common.io.stream.StreamOutput;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.AggregatorFactories;
import org.elasticsearch.search.aggregations.AggregatorFactory;
import org.elasticsearch.search.aggregations.PipelineAggregationBuilder;
import org.elasticsearch.search.internal.SearchContext;

public final class CustomAggregationBuilder extends AggregationBuilder {

	protected Map<String, Object> metaData;
	protected Map<String, String> customParams;

	/**
	 * Constructs a new aggregation builder.
	 *
	 * @param name  The aggregation name
	 */
	public CustomAggregationBuilder(final String name, final Map<String, String> customParams) {
		super(name);
		this.customParams = customParams;
	}

	@Override
	public String getType() {
		return "custom2";
	}

	@Override
	public void writeTo(final StreamOutput out) throws IOException {
		out.writeString(name);
		factoriesBuilder.writeTo(out);
		out.writeMap(metaData);
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
	public CustomAggregationBuilder setMetaData(final Map<String, Object> metaData) {
		if (metaData == null) {
			throw new IllegalArgumentException("[metaData] must not be null: [" + name + "]");
		}
		this.metaData = metaData;
		return this;
	}

	@Override
	public Map<String, Object> getMetaData() {
		return metaData == null ? Collections.emptyMap() : Collections.unmodifiableMap(metaData);
	}

	@Override
	public String getWriteableName() {
		// We always use the type of the aggregation as the writeable name
		return "custom1";
	}

	@Override
	public AggregatorFactory build(final SearchContext context, final AggregatorFactory parent) throws IOException {
		throw new UnsupportedOperationException("not yet");
	}

	@Override
	public XContentBuilder toXContent(final XContentBuilder builder, final Params params) throws IOException {
		builder.startObject(name);

		if (metaData != null) {
			builder.field("meta", metaData);
		}
		for (final Map.Entry<String, String> entry : customParams.entrySet()) {
			builder.rawField(entry.getKey(), new ByteArrayInputStream(entry.getValue().getBytes()), XContentType.JSON);
		}

		if (factoriesBuilder != null && factoriesBuilder.count() > 0) {
			builder.field("aggregations");
			factoriesBuilder.toXContent(builder, params);

		}

		return builder.endObject();
	}

	@Override
	protected AggregationBuilder shallowCopy(final org.elasticsearch.search.aggregations.AggregatorFactories.Builder factoriesBuilder, final Map<String, Object> metaData) {
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
}
