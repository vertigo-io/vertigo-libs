<script lang="ts" setup>
/**
 * /// SURCHARGE ///
 * Ce composant est une surcharge temporaire du composant dsfr-data-table
 * - [L126] Modification du paramètre du slot `cell` pour que celui-ci soit toujours l’objet de notre ligne
 *   Cela est nécessaire car renommer la key d’une colonne dans sa définition provoque bien d’autres problèmes
 * - [L78] Prise en compte de la colonne trié lors du tri
 * - [L269] Ajoute la notion du rang de la ligne dans le slot de modification d’une cellule, nécessaire pour des raisons d’accessibilité
 * - Ajoute un slot pour le titre (caption)
 * - Ajoute le nombre de page dans le footer
 * - Ajoute la possibilité de changer la taille de la pagination
 * - Ajoute la possibilité de masquer le libellé d’une colonne via un sr-only
 *
 */

import {getRandomId} from '@/utils/random-utils'

import {computed, ref} from 'vue'
import {DsfrPagination, VIcon} from "@gouvminint/vue-dsfr";

export type Page = { href?: string, label: string, title: string }

export type DsfrDataTableRow = (string | number | boolean | bigint | symbol)[]
    | Record<string | symbol | number, unknown>

export type DsfrDataTableHeaderCellObject = { key: string, label: string, headerAttrs?: Record<string, unknown> }
export type DsfrDataTableHeaderCell = (string | DsfrDataTableHeaderCellObject)

export type DsfrDataTableProps = {
  id?: string
  title: string
  rowKey?: string | number
  headersRow: DsfrDataTableHeaderCell[]
  rows: DsfrDataTableRow[]
  topActionsRow?: string[]
  bottomActionsRow?: string[]
  selectableRows?: boolean
  showToggleAll?: boolean
  showNbRows?: boolean
  sortableRows?: boolean | string[]
  sorted: string
  sortFn?: (a: unknown, b: unknown) => number
  verticalBorders?: boolean
  bottomCaption?: boolean
  noCaption?: boolean
  pages?: Page[]
  footerSize: 'sm' | 'small' | 'md' | 'medium'
  pagination?: boolean
  paginationOptions?: number[]
  currentPage?: number
  rowsPerPage?: number
  noResultLabel?: string
  bottomActionBarClass?: string | Record<string, boolean> | Array<string | Record<string, boolean>>
  paginationWrapperClass?: string | Record<string, boolean> | Array<string | Record<string, boolean>>
}

const props = withDefaults(defineProps<DsfrDataTableProps>(), {
  id: () => getRandomId('table'),
  topActionsRow: () => [],
  bottomActionsRow: () => [],
  currentPage: 0,
  rowsPerPage: 10,
  rowKey: 0,
  showToggleAll: true,
  showNbRows: false,
  paginationOptions: () => [
    5,
    10,
    20,
  ],
})

const emit = defineEmits<{
  'update:current-page': [page: number]
}>()

const selection = defineModel<string[]>('selection', {default: []})
const rowsPerPage = defineModel<number>('rowsPerPage', {default: 10})
const currentPage = defineModel<number>('currentPage', {default: 1})
const pageCount = computed(() => Math.max(Math.ceil(props.rows.length / rowsPerPage.value), 1))
const pages = computed<Page[]>(() => props.pages ?? Array.from({length: pageCount.value}).map((x, i) => ({
  label: `${i + 1}`,
  title: `Page ${i + 1}`,
  href: `#${i + 1}`
})))

const lowestLimit = computed(() => currentPage.value * rowsPerPage.value)
const highestLimit = computed(() => (currentPage.value + 1) * rowsPerPage.value)

const isFooterSizeSm = computed(() => ['sm', 'small'].includes(props.footerSize));


function defaultSortFn(a: string | DsfrDataTableRow, b: string | DsfrDataTableRow) {
  const key = sortedBy.value
  // @ts-expect-error TS7015
  if (((a as DsfrDataTableRow)[key] ?? a) < ((b as DsfrDataTableRow)[key] ?? b)) {
    return -1
  }
  // @ts-expect-error TS7015
  if (((a as DsfrDataTableRow)[key] ?? a) > ((b as DsfrDataTableRow)[key] ?? b)) {
    return 1
  }
  return 0
}

const sortedBy = defineModel<string | undefined>('sortedBy', {default: undefined})
sortedBy.value = props.sorted

const sortedDesc = defineModel('sortedDesc', {default: false})

function sortBy(key: string) {
  if (!props.sortableRows || (Array.isArray(props.sortableRows) && !props.sortableRows.includes(key))) {
    return
  }
  if (sortedBy.value === key) {
    if (sortedDesc.value) {
      sortedBy.value = undefined
      sortedDesc.value = false
      return
    }
    sortedDesc.value = true
    return
  }
  sortedDesc.value = false
  sortedBy.value = key
}

const sortedRows = computed(() => {
  const _sortedRows = sortedBy.value ? props.rows.slice().sort(props.sortFn ?? defaultSortFn) : props.rows.slice()
  if (sortedDesc.value) {
    _sortedRows.reverse()
  }
  return _sortedRows
})
const finalRows = computed(() => {
  const rowKeys = props.headersRow.map((header) => {
    if (typeof header !== 'object') {
      return header
    }
    return header.key
  })

  const rows = sortedRows.value.map((row) => {
    if (Array.isArray(row)) {
      return row
    }
    return rowKeys.map(key => row)
  })

  if (props.pagination) {
    return rows.slice(lowestLimit.value, highestLimit.value)
  }

  return rows
})

function selectAll(bool: boolean) {
  if (bool) {
    selection.value = finalRows.value.map(row => row[0][props.rowKey] as string)
  }
  selection.value!.length = 0
}

const wholeSelection = ref(false)

function checkSelection() {
  wholeSelection.value = selection.value.length === finalRows.value.length
}

function onPaginationOptionsChange() {
  emit('update:current-page', 0)
  wholeSelection.value = false
  selection.value.length = 0
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div
      class="fr-table"
  >
    <div class="fr-table__wrapper">
      <div class="fr-table__container">
        <div class="fr-table__content">
          <table :id="id">
            <caption :class="{ 'fr-sr-only' : noCaption }">{{ title }}</caption>
            <thead>
            <tr>
              <th
                  v-if="selectableRows"
                  class="fr-cell--fixed"
                  role="columnheader"
              >
                <div class="fr-checkbox-group fr-checkbox-group--sm" v-if="showToggleAll">
                  <!-- @vue-expect-error TS2538 -->
                  <input
                      :id="`table-select--${id}-all`"
                      :checked="wholeSelection"
                      type="checkbox"
                      @input="selectAll($event.target.checked)"
                  >
                  <label
                      class="fr-label"
                      :for="`table-select--${id}-all`"
                  >
                    Sélectionner tout
                  </label>
                </div>
              </th>
              <th
                  v-for="(header, idx) of headersRow"
                  :key="typeof header === 'object' ? header.key : header"
                  scope="col"
                  v-bind="typeof header === 'object' && header.headerAttrs"
                  :class="{
                    'text-right': header.align === 'right',
                    'text-left': header.align === 'left'
                  }"
                  :tabindex="sortableRows ? 0 : undefined"
                  @click="sortBy((header as DsfrDataTableHeaderCellObject).key ?? (Array.isArray(rows[0]) ? idx : header))"
                  @keydown.enter="sortBy((header as DsfrDataTableHeaderCellObject).key ?? header)"
                  @keydown.space="sortBy((header as DsfrDataTableHeaderCellObject).key ?? header)"
              >
                <div
                    :class="{ 'sortable-header': sortableRows === true || (Array.isArray(sortableRows) && sortableRows.includes((header as DsfrDataTableHeaderCellObject).key ?? header)),
                              'fr-sr-only': typeof header === 'object' ? header.hideLabel : false,
                              'flex-row-reverse': typeof header === 'object' ? header.align === 'right' : false,
                            }"
                >
                  <slot
                      name="header"
                      v-bind="typeof header === 'object' ? header : { key: header, label: header }"
                  >
                    {{ typeof header === 'object' ? header.label : header }}
                  </slot>

                  <span
                      v-if="sortedBy !== ((header as DsfrDataTableHeaderCellObject).key ?? header) && (sortableRows === true || (Array.isArray(sortableRows) && sortableRows.includes((header as DsfrDataTableHeaderCellObject).key ?? header)))">
                      <VIcon
                          name="ri-sort-asc"
                          color="var(--grey-625-425)"
                      />
                    </span>
                  <span v-else-if="sortedBy === ((header as DsfrDataTableHeaderCellObject).key ?? header)">
                      <VIcon :name="sortedDesc ? 'ri-sort-desc' : 'ri-sort-asc'"/>
                    </span>
                </div>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(row, idx) of finalRows"
                :key="`row-${idx}`"
                :data-row-key="idx + 1"
            >
              <th
                  v-if="selectableRows"
                  class="fr-cell--fixed"
                  role="columnheader"
              >
                <div class="fr-checkbox-group fr-checkbox-group--sm">
                  <!-- @vue-expect-error TS2538 -->
                  <input
                      :id="`row-select-${id}-${idx}`"
                      v-model="selection"
                      :value="row[0][rowKey] ?? `row-${idx}`"
                      type="checkbox"
                      @change="checkSelection()"
                  >
                  <label
                      class="fr-label"
                      :for="`row-select-${id}-${idx}`"
                  >
                    Sélectionner la ligne {{ idx + 1 }}
                  </label>
                </div>
              </th>

              <!-- @vue-expect-error TS2538 -->
              <td
                  v-for="(cell, cellIdx) of row"
                  :key="typeof cell === 'object' ? cell[rowKey] : cell"
                  :class="{
                    'text-right': headersRow[cellIdx].align === 'right',
                    'text-left': headersRow[cellIdx].align === 'left'
                  }"
                  @keydown.ctrl.c="copyToClipboard(typeof cell === 'object' ? cell[rowKey] : cell)"
                  @keydown.meta.c="copyToClipboard(typeof cell === 'object' ? cell[rowKey] : cell)"
              >
                <slot
                    name="cell"
                    v-bind="{
                      colKey: typeof headersRow[cellIdx] === 'object'
                        ? headersRow[cellIdx].key
                        : headersRow[cellIdx],
                      cell,
                      idx: idx+1
                    }"
                >
                  <!-- @vue-expect-error TS2538 -->
                  {{ typeof cell === 'object' ? cell[rowKey] : cell }}
                </slot>
              </td>
            </tr>
            <tr v-if="finalRows.length === 0">
              <td :colspan="selectableRows ? headersRow.length + 1 : headersRow.length">{{ props.noResultLabel }}</td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
        :class="bottomActionBarClass"
    >
      <slot name="pagination">
        <template
            v-if="pagination && !$slots.pagination"
        >
          <div
              class="flex justify-between items-center"
              :class="paginationWrapperClass"
          >
            <p class="fr-mb-0 fr-ml-1v"
               :class="{ 'fr-text--sm': isFooterSizeSm }"
               v-if="showNbRows">{{ rows.length }} résulat(s)</p>

            <div class="flex gap-2 items-center">
              <label
                  class="fr-label"
                  :class="{ 'fr-text--sm': isFooterSizeSm }"
                  for="pagination-options"
              >
                Résultats par page :
              </label>
              <select
                  id="pagination-options"
                  v-model="rowsPerPage"
                  class="fr-select"
                  @change="onPaginationOptionsChange()"
              >
                <option
                    value=""
                    :selected="!paginationOptions.includes(rowsPerPage)"
                    disabled="true"
                    hidden="hidden"
                >
                  Sélectionner une option
                </option>
                <option
                    v-for="(option, idx) in paginationOptions"
                    :key="idx"
                    :value="option"
                    :selected="+option === rowsPerPage"
                >
                  {{ option }}
                </option>
              </select>
            </div>
            <div class="flex ml-1">
              <span class="self-center"
                    :class="{ 'fr-text--sm': isFooterSizeSm }"
              >
                Page {{ currentPage + 1 }} sur {{ pageCount }}</span>
            </div>
            <DsfrPagination
                v-model:current-page="currentPage"
                :pages="pages"
                next-page-title="Précédent"
                prev-page-title="Suivant"
            />
          </div>
        </template>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 0.5rem;
}

:deep(.fr-pagination__link) {
  margin-bottom: 0 !important;
}

.sortable-header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
</style>
