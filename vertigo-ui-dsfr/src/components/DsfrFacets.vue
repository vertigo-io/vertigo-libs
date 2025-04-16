<template>
  <div>
    <div class="fr-mb-2w flex flex-column gap--sm" v-if="isAnyFacetValueSelected()">
      <template v-for="(selectedFacetValues, selectedFacet) in selectedFacets" :key="selectedFacet">
        <template v-if="!facetMultipleByCode(selectedFacet)">
          <DsfrTag class="fr-tag--dismiss"
                   tag-name="button"
                   v-for="selectedFacetValue in selectedFacetValues"
                   :key="selectedFacetValue.code"
                   @click="$emit('toogle-facet', selectedFacet, selectedFacetValue, contextKey)">
            {{ facetLabelByCode(selectedFacet) }}: {{ facetValueLabelByCode(selectedFacet, selectedFacetValue) }}
          </DsfrTag>
        </template>
      </template>
    </div>
    <div v-for="facet in facets" :key="facet.code" class="facets">
      <template v-if="facet.multiple || !isFacetSelected(facet.code)">
        <component :is="heading" class="fr-mb-1w fr-text--md" :id="facet.code">{{ facet.label }}</component>

        <div v-if="selectedInvisibleFacets(facet.code, facet.values).length > 0" role="group"
             :aria-labelledby="facet.code">
          <template v-for="(value) in selectedInvisibleFacets(facet.code)" :key="value.code">
            <div class="facet" v-if="facet.multiple">
              <DsfrCheckbox small v-bind:modelValue="true"
                            @update:modelValue="$emit('toogle-facet', facet.code, value.code, contextKey)">
                <template #label>
                    <span class="flex justify-between w-full fr-mb-0">
                      {{ facetValueLabelByCode(facet.code, value.code) }}
                      <span class="facet--count" aria-hidden="true">{{ value.count }}</span>
                      <span class="fr-sr-only">({{ value.count }} élément(s))</span>
                    </span>
                </template>
              </DsfrCheckbox>
            </div>
            <DsfrButton tertiary no-outline v-else
                        @click="$emit('toogle-facet', facet.code, value.code, contextKey)">
                <span class="flex justify-between w-full">
                  {{ facetValueLabelByCode(facet.code, value.code) }}
                  <span class="facet--count" aria-hidden="true">{{ value.count }}</span>
                  <span class="fr-sr-only">({{ value.count }} élément(s))</span>
                </span>
            </DsfrButton>
          </template>
        </div>

        <div v-if="visibleFacets(facet.code, facet.values).length > 0" role="group" :aria-labelledby="facet.code">
          <template v-for="(value) in visibleFacets(facet.code, facet.values)" :key="value.code">
            <div class="facet" v-if="facet.multiple">
              <DsfrCheckbox small v-bind:modelValue="isFacetValueSelected(facet.code, value.code)" class="facet"
                            @update:modelValue="$emit('toogle-facet', facet.code, value.code, contextKey)">
                <template #label>
                    <span class="flex justify-between w-full fr-mb-0">
                      {{ facetValueLabelByCode(facet.code, value.code) }}
                      <span class="facet--count" aria-hidden="true">{{ value.count }}</span>
                      <span class="fr-sr-only">({{ value.count }} élément(s))</span>
                    </span>
                </template>
              </DsfrCheckbox>
            </div>
            <DsfrButton tertiary no-outline v-else
                        @click="$emit('toogle-facet', facet.code, value.code, contextKey)">
                <span class="flex justify-between w-full">
                  {{ facetValueLabelByCode(facet.code, value.code) }}
                  <span class="facet--count" aria-hidden="true">{{ value.count }}</span>
                  <span class="fr-sr-only">({{ value.count }} élément(s))</span>
                </span>
            </DsfrButton>
          </template>
        </div>

        <div class="fr-mb-2w">
          <DsfrButton size="sm" tertiary v-if="facet.values.length > maxValues && !isFacetExpanded(facet.code)"
                      @click="expandFacet(facet.code)">
            Voir plus
          </DsfrButton>
          <DsfrButton size="sm" tertiary v-if="facet.values.length > maxValues && isFacetExpanded(facet.code)"
                      @click="reduceFacet(facet.code)">
            Voir moins
          </DsfrButton>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {DsfrButton, DsfrCheckbox, DsfrTag} from "@gouvminint/vue-dsfr";

export default {
  name: "DsfrFacets",
  components: {DsfrCheckbox, DsfrTag, DsfrButton},
  props: {
    facets: Array,
    selectedFacets: Object,
    contextKey: String,
    facetValueTranslatorProvider: Function,
    heading: {
      type: String,
      default: "h6"
    },
    maxValues: {
      type: Number,
      default: 5
    }
  },
  emits: ["toogle-facet"],
  computed: {},
  data: function () {
    return {
      expandedFacets: [],
      codeToLabelTranslater: {} /** facetCode : function (facetCode, facetValueCode) return facetValueLabel */
    }
  },
  created: function () {
    if (this.facetValueTranslatorProvider !== undefined) this.facetValueTranslatorProvider(this);
  },
  methods: {
    addFacetValueTranslator(facetCode, facetValueCodeTranslator) {
      this.codeToLabelTranslater[facetCode] = facetValueCodeTranslator;
    },
    facetByCode(facetCode) {
      return this.facets.filter(function (facet) {
        return facet.code === facetCode;
      })[0];
    },
    facetValueByCode(facetCode, facetValueCode) {
      return this.facetByCode(facetCode).values.filter(function (facetValue) {
        return facetValue.code === facetValueCode;
      })[0];
    },
    facetLabelByCode(facetCode) {
      return this.facetByCode(facetCode).label;
    },
    facetMultipleByCode(facetCode) {
      return this.facetByCode(facetCode).multiple;
    },
    facetValueLabelByCode(facetCode, facetValueCode) {
      if (this.codeToLabelTranslater[facetCode]) {
        return this.codeToLabelTranslater[facetCode](facetCode, facetValueCode);
      }
      var facetValueByCode = this.facetValueByCode(facetCode, facetValueCode);
      return facetValueByCode ? facetValueByCode.label : facetValueCode; //might be not found
    },
    isFacetValueSelected(facetCode, facetValueCode) {
      return this.selectedFacets[facetCode].includes(facetValueCode);
    },
    isFacetSelected(facetCode) {
      if (this.selectedFacets[facetCode]) {
        return this.selectedFacets[facetCode].length > 0;
      }
      return false;
    },
    isAnyFacetValueSelected() {
      return Object.keys(this.selectedFacets).some(function (facetCode) {
        return !this.facetMultipleByCode(facetCode);
      }.bind(this));
    },
    expandFacet(facetCode) {
      if (!this.isFacetExpanded(facetCode)) {
        this.$data.expandedFacets.push(facetCode);
      }
    },
    reduceFacet(facetCode) {
      if (this.isFacetExpanded(facetCode)) {
        this.$data.expandedFacets.splice(this.$data.expandedFacets.indexOf(facetCode), 1);
      }
    },
    isFacetExpanded(facetCode) {
      return this.$data.expandedFacets.includes(facetCode);
    },
    selectedInvisibleFacets(facetCode) {
      return this.selectedFacets[facetCode]
          .filter(facetValueCode => !this.facetValueByCode(facetCode, facetValueCode))
          .map(facetValueCode => {
            var obj = {};
            obj.code = facetValueCode;
            obj.label = facetValueCode;
            obj.count = 0;
            return obj;
          });
    },
    visibleFacets(facetCode, facetValues) {
      if (!this.isFacetExpanded(facetCode)) {
        return facetValues.slice(0, this.maxValues);
      }
      return facetValues;
    }
  }
}
</script>

<style scoped>
.facets div[role=group] .fr-btn {
  min-width: 100%;
  padding: .25rem .8rem;
  min-height: 2rem;
}

.facets div[role=group] .fr-btn > :deep(span) {
  min-width: 100%;
  color: var(--text-label-grey);
  font-weight: normal;
  text-align: left;
}

.facets div[role=group] {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 8px;
}

.facets ul {
  --ul-type: none;
  --ul-start: 0.25rem;
}

.facet:hover {
  background-color: var(--hover);
}

.facet > .fr-fieldset__element {
  margin-bottom: unset;
  padding: .25rem .8rem;
}

.facet--count {
  color: var(--text-action-high-blue-france);
  min-width: unset;
}
</style>