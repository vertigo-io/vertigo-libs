<script >

import {DsfrCheckbox} from "@gouvminint/vue-dsfr";

export default {
  name: "DsfrVTable",
  components: {DsfrCheckbox},
  props: {
    rows: Array,
    columns: Object,
    title: String,
    resultsPerPage: {
      type: Number,
      default: 10
    },
    small: Boolean,
    bordered: Boolean,
    selectable: Boolean
  },
  computed: {},
  data: function () {
    return {
      selectableRows: [],
      currentPage: 1
    }
  },
  created: function () {
  },
  methods: {}
}
</script>

<template>
  <div
      class="fr-table"
      :class="{
        'fr-table--sm': small,
        'fr-table--bordered': bordered
      }">
    <div class="fr-table__wrapper">
      <div class="fr-table__container">
        <div class="fr-table__content">
          <table>
            <caption>
              {{ title }}
            </caption>
            <thead>
            <tr>
              <th v-if="selectable" class="fr-cell--fixed" role="columnheader">
                <span class="fr-sr-only">Sélectionner</span>
              </th>
              <th
                  v-for="header of columns"
                  :key="typeof header === 'object' ? header.key : header"
                  scope="col"
              >
                <slot
                    name="header"
                    v-bind="typeof header === 'object' ? header : { key: header, label: header }"
                >
                  {{ typeof header === 'object' ? header.label : header }}
                </slot>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(row, idx) of rows"
                :key="`row-${idx}`"
                :data-row-key="idx + 1"
            >
              <th v-if="selectable" class="fr-cell--fixed" scope="row">
                <dsfr-checkbox small :label="'Sélectionner la ligne ' + (idx + 1)"/>
              </th>
              <slot :props="{ 'row': row, 'idx': idx }"></slot>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>