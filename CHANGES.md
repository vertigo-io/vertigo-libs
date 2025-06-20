Version history
===============

Running 5.0.0
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-431-to-500)
more to come :)


Release 4.3.1 - 2025/06/13
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-430-to-431)

* [UI][Quasar] Improved Accessibility on lots of components
* [UI][DSFR] Improved Accessibility on lots of components
* [UI][DSFR] Fix `dsfr-button` inside a `v-for` loop.
* [UI][DSFR] better facets style
* [UI][DSFR] Fix pagination on facet selection
* [Ui][Wysiwyg] Update Tiptap to 2.12.0
* [Ui][Quasar] Add Reactive components for select, text-field and text-editor (use `th:with="reactive=true"`)
* [Ui] Fix same script declared twice in head, merged conditions
* [Ui] Fix regression on text-field inside table-modifiable
* [Ui] Add additional_defer_libs_slot to vu:head
* [Ui] Fix vui-before-plugins event, now can be use to extends Quasar.lang
* [Ui] fix authz processor (fix multiple comma separator entity operation on object in context)
* [ui-vuejs] fix xss on facets in select mode
* [ui-vuejs] add optional filtering on httpPostAjax response (`options.updatedKeys`)
* [Account][Security] Handle comparison between a field and 'null' value
* [Account] Plugins can be overrided (no more final)
* [Account] add convenience method for use in assertOr
* [Vega] Add missing 'webservices.healthcheck' feature
* [Vega] Add healthCheck readiness (no subcomponents RED)
* [Vega][RateLimiting] Add whitelist parameter pattern (range or CIDR)
* [Vega][Json] Don't set null values to object properties if not present in the json (fail if the attribute is a list)
* [Vega] Fix ResourceResolver api change
* [Datastore][S3] InputStream in S3FileStorePlugin no longer shared (may lead to corrupt file on subsequent reads)
* [Datastore][S3] Add health check
* [datastore] s3FileStorePlugin purge daemon more resilient
* [datastore] dbFileStorePlugin supports expiryPolicy
* [DataStore] Better log is error on delete ByList
* [Datamodel] support up to 60 characters fieldname
* [Database] Fix InfluxDb filter data
* update libs
  - c3p0  0.10.2 -> 0.11.1
  - ojdbc11  23.7.0.25.01 -> 23.8.0.25.04
  - postgresql 42.7.5 -> 42.7.7
  - liquibase 4.31.1 -> 4.32.0
  - tika 3.1.0 -> 3.2.0
  - guava 33.4.6-jre -> 33.4.8-jre
  - spring-webmvc 6.2.5 -> 6.2.8
  - selenium 4.30.0 -> 4.33.0
  - jackson 2.18.3 -> 2.19.0
  - rest-assured 5.5.1 -> 5.5.5



Release 4.3.0 - 2025/03/27
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-420-to-430)

* **[Ui] Add DSFR components**
* **[Ui] EncoderDate now uses ISO format yyyy-MM-dd and yyyy-MM-dd'T'HH:mm**
* **[Ui] Add length constraint on text-area (same as other inputs : from smartType)**
* **[Ui] Add wysiwyg editor based on tiptap** (quasar editor is renamed q-text-editor)
* **[Ui-vuejs] Change i18n to use object instead of string**
    (this.i18n('uploader.progress') to $vui.i18n().uploader.progress)
* [Ui] Various fix
  - Fileupload, add can be triggered by keyboard
  - Select, searchable component state is now correctly cleared on mounting
  - Column fix closing th:block position in default content
* [UI] Facet component : make facetValueTranslatorProvider optional
* [Ui] Change modal default size from 'style' to css & add 'autoHeight' property
* [Ui] Add VFileUpload component (not quasar based)
* [Ui] Scripts are now all located in header
* [Ui] Display formatted numerics in table and text-field-read-reactive
* [Ui] Use displayField if displayField defined in table columns
* [Ui] Extends quasar lang obj instead override it (for i18n)
* [Ui] Fix api viewContext.getSelectedFacetValues (SearchQuery instead of FacetedQuery)
* [Ui] fix button-submit-confirm inside table action slot
* [Ui] Fix select-multiple with rowIndex
* [UI] Search in select list now display "start with" elements first
* [Ui] Add Jetty KVSessionDataStore : can use Redis
* [Ui] Add NoJettySessionCache boot params
* [Ui] Fix delete session at logout
* [Ui] Add error message in log for authorization errors
* [Ui] Better exception for missing new ctxId format
* [Ui] Missing context message distinct (init context vs view context)
* [Ui] Update Axios version & make it configurable (`axiosVersion` on `vu:head`)
* [Ui-vuejs] Better chart barChart and stackedBarChart
* [Ui] add other_attrs on facets
* [Ui] Open getViewContext controller method as getUiMessageStack
* [UI] Transaction handling on UiMdlList
* [Ui] Fail fast on adding field message if object not in context
* [Ui] Fix uploader (quasar) height
* [Ui] Exclude Comment in NamedComponent body
* [Ui] Fix style of selected rows into table
* [Ui] Fix missing reset thymeleaf var (rowIndex) in <vu:table>
* [Ui] rowIndex only on row slots
* [Ui] Extends httpPostAjax options notifyUiMessageStack to support notify uiMmessageStack
* [Ui] Add vNoDefaultErrorHandler axios parameter to disable default notif Error handling on VNotifications (icon change)
* [Ui] Fix handler error in some case (badly show 404, instead of 500)
* [Ui] Add bridge to use dsfr-icons as Quasar iconSet
* [Ui] Add default ressourcekeys on facets labels for external text (like i18n)
* [Ui] Add unit tests abstract for Ui Tests
* [Ui] Change message text color (RGAA)
* [Ui] Improve uiMessageStack conservation (avoid confusion between threads)
* [Ui] Add Jetty started log (time to start)
* [Ui] formatted value is always based on typed value
* [Ui] fix componentUUID (no more brackets)
* [Ui] use `_fmt` suffix for date and numbers
* [Ui] Integrate lodash debounce to replace quasar dependency
* [Ui] Restore curentUserSession on error pages (handled in another thread by Spring), can be use to get currentLocale
* [Ui] Fix geolocation input
* [Vega] WebServiceClientAmplifier No content-type in request when there is no body
* [Vega] Add maxDayRequests and whiteListUsers to RateLimitingManager
* [Vega] Fix logout if no session
* [Vega] WebAuthent redirect(302) for page, but send error (401) with `location` for WebServices json
* [Vega] Keep default max rows in uiListModifiable
* [Vega] Add Log Error HandlerPlugin for WS in case of status 5xx
* [Vega] Log Handler : log body only at Trace level
* [Vega] Update swaggerUi 4.18.3 -> 5.20.1
* [Vega][OIDC] Fix logout parameters (add missing + handle no session)
* [Vega][OIDC] Fix error on browser "back" just after login
* [Vega][OIDC] Refactoring to provide usable OIDC client over the lib
* [Vega][OIDC] Make additional state info in session versatile/neutral
* [Datastore] Add typeMime detector SimpleMagic (lighter than tika)
* [DataStore] Fix FileStoreManager.resolveMimeType using plugin
* [DataStore] Add loadifAbsent and lazyGet to Store Accessors
* [DataStore] Fix to support multiple FsFullFileStore plugin (unicity of daemon)
* [DataStore] Add KVStore removeIfExists
* [DataStore] Add analytics to RedisKvStore
* [Datastore] S3FileStore add purge daemon if CSP don't support it
* [Datastore] Add countByCriteria in DAO (replace count)
* [Datastore] sonar : close speedb options
* [Database] Fix H2 exceptionHandler : exclude schema prefix
* [Database] Sql fix case of GenerationMode.Generated_keys
* [Database] Fix some issus with jdbc Types.BLOB, now use VARBINARY instead
* [DataFactory] Fix clustering with multiple facets
* [Datafactory] Support multiSelectable facets in CollectionManager facets
* **[Datafactory] Update Elastic pom `transport` -> `x-pack-transport`
* [Commons] Refacto Peg & import operator/comparison rules from easyForms
* [Commons] Fix Peg operation with null values
* [Commons] Add base64LegacyCodec (diff than base64UrlCodec)
* [Basics] Add current local to FormatterDate
* [all] Update libs 
  - c3p0 0.10.1 -> 0.10.2
  - ojdbc11 23.4.0.24.05 -> 23.7.0.25.01
  - postgresql 42.7.3 -> 42.7.5
  - liquibase-core 4.28.0 -> 4.31.1
  - org.elasticsearch.client transport -> x-pack-transport
  - tika 2.9.2 -> 3.1.0
  - guava 33.2.1 -> 33.4.6
  - jersey-client 3.1.6 -> 3.0.17 (more recent, lock to jdk17)
  - spring-webmvc 6.1.10 -> 6.2.5
  - thymeleaf-spring6 3.1.2 -> 3.1.3
  - thymeleaf-layout-dialect 3.3.0 -> 3.4.0
  - nashorn 15.4 -> 15.6
  - selenium 4.15.0 -> 4.30.0
  - jackson 2.15.3 -> 2.18.3
  - rest-assured 5.4.0 -> 5.5.1
* [Ui-vuejs] update libs 
  - *JS libs :*
  - vue-dsfr -> 8.3.0
  - axios 1.7.2 -> 1.8.4
  - core-js 3.37.1 -> 3.41.0
  - vite 5.3.1 -> 6.2.3
  - quasar 2.16.5 -> 2.18.1
  - @vitejs/plugin-vue 5.0.5 -> 5.2.3
  - vite-plugin-mkcert 1.17.5 -> 1.17.8
  - vue 3.4.31 -> 3.5.13
  - ol 9.2.4 -> 10.4.0
  - eslint 9.6.0 -> 9.23.0
  - eslint-plugin-vue 9.27.0 -> 10.0.0
  - lodash.debounce 4.0.8
  - *3rd party :*
  - materialdesignicons v142 -> v143
  - fontawesome 6.5.2 -> 6.7.2
  - roboto v20 -> v47

Release 4.2.0 - 2024/07/04
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-410-to-420)
* **Github : split `vertigo-extensions` to `vertigo-libs` and `vertigo-modules`**  
* **[all] Pom declare dependencyManagment to help dependencies versions config**
* **[DataModel] Rename some model classes :**
  - DtObject to DataObject
  - DtField to DataField
  - DtFieldName to DataFieldName
  - DtDefinition to DataDefinition
  - DtObjectUtil to DataModelUtil 
* **[DataModel] Move `io.vertigo.datamodel.structure.*` to `io.vertigo.datamodel.data.*`**
* **[DataModel] Move `Criteria`, `Task`, `property` to [DataFactory]**
* [DataModel] Simpler generics on DtList
* [DataFactory] Sort multiple columns
* [DataStore] Change getKeyAs return <K extends Serializable>
* [DataStore] Delete List on entityStore by batch
* [DataStore] Add redis KVStorePlugin
* [Database] Fix code for H2 referential integrity error code
* [Database] Fix requests for filter = "*", "" and null (<b>null</b> value mean no filter, <b>empty string</b> mean field shouldn't exists, <b>*</b> mean field must exists)
* [Commons] Peg : Rule for space (no empty)
* [Commons] Peg : Improved transmission of "BestUncompleteRule" + fix choice
* [Commons] Peg : Named rules can now define error messages too
* [Basics] Add analytics metrics rowCount to SQL taskEngine
* [Ui] Better handling of missing context with a redirectUrl
* [Ui] Add default handler for notfound error (to stay anonymous)
* [Ui] Update i18n message for MISSING_VIEW_CONTEXT
* [UI] Connect Thymeleaf i18n to Vertigo Locale manager
* [UI] Add warn if multiple components with same ID (component state)
* [UI] Fix error page display in some cases
* [UI] StMultipleId will return empty array if blank
* [UI] Improve constraint error message resolver (simpler and with params)
* [UI] Make `ComponentStates.addPrimitive` fluent
* [Ui] Add RateLimitingHandlerInterceptor using RateLimitingManager
* [Ui] Support ResponseStatusException to fix a status code (like 404)
* [Ui] Add Js UI sourceMap
* [Ui] Fix httpPostAjax error if no parameter
* [UI] Autodetect components in provided folders
* [Ui] Get keyField or idField
* [Ui] Fix autofocus
* [Ui] Add minqueryLength to autocomplete
* [Ui] Fix rendering autocomplete
* [Ui] Fix VMinify showing. And default offset to top/left of maxi element
* [Ui] VMinify accept empty binding
* [UI] Add material icons outlined
* [UI] Add 'searchable' attribute on select & add params to VComments
* [UI] Better VNotification style
* [UI] Fix buttons-group
* [UI] Improve geolocation component (add map picker)
* [UI] Add some missing props on vu:block, v-map and vu:geolocation via map_overview
* [UI] Fix modal responsiveness. 'iframe_width' and 'iframe_height' must be replaced with 'width' and 'height'
* [UI] Search : Add map search, active on vu:geolocation in edit mode. (Need additional JS/CSS, automatically disabled if JS not present in the page)
* [UI] Add 'separator' attribute to vu:list component
* [UI] Table : Don't show action section in grid mode if no actions_slot
* [UI] Fix table top-left-slot output
* [Ui] Fix Css class for column headers
* [Ui] Add support for dynamic title and subtitle in table
* [UI] vu:column, fix error when ' is present in column name
* [UI] Table : Switch header slot to allow v-slot:header-cell-xxx slot 
* [Ui] Fix bad passing attributs (label, title) in form and table
* [Ui] Fix style action column for table modifiable
* [UI] Fix : Remove empty template from table with no title
* [UI] Improve column name handling
* [Ui] Fix vu:label parameter (missing rowIndex)
* [Ui] Better error message for getDisplayField/getIdField
* [UI] Fix checkbox-multiple + add to component demo
* [UI] Add class attribute to messages-dsfr component
* [UI] Trim qualifiers for getErrorMessage and hasFieldsError
* [Ui] Add error message when list is not publish updatable
* [UI] Better handling of transaction in ProtectedValueUtil
* [UI] Remove constraint fileupload component to 320px
* [UI] vu:block : Fix empty q-item-section when no icon
* [Ui] fix block param title passed to content
* [UI] Date component use uiDatetimeFormat SmartType property if present
* [UI] Fix transaction on Mdl loading in AbstractUiListUnmodifiable
* [UiVueJs] Don't constraint "v-modal" if modal is maximized
* [UiVueJs] Fix VScrollSpy width when resizing
* [UiVueJs] Add support of array to vueDataParams (for Ajax post)
* [UiVueJs] Add quasar Tree utilities
* [UiVueJs] Upgrade dashboard chartjs
* [UiVueJs] Add access to global file size in v-file-upload
* [Vega] Support sorting in uiListModifiable (add by index and keep order while validate)
* [Vega] Fix rateLimiting parameter transmission from VegaFeature
* [Vega] Upgrade AbstractFilter.parseParam to support standard type (number, boolean, string), default value and envParameter : ${xxx}
* [Vega] Correction lowerCamelCase json object field (like lists)
* [Vega] Add advanced RateLimitingManager (with banishment)
* [Vega] Add `getFieldsToNullCheck` to Abstract validator
* [Vega] Fix swagger for VFile WS and parameterizedType with wildcard
* [Vega] Auth manager can now transmit redirect URL to auth plugin
* [FileStore] Fix inverted assertion in FsFileStorePlugin
* [FileStore] Add S3FileStorePlugin
* [OIDC] Add loginLocaleParamName to forward locale to SSO (eg keycloak)
* [Account] Add tryLogin to check login/password without login
* [Account] Add assert operation with load
* [Vortex] Work in progress : simple parser
* [all] Update libs 
  - c3p0 0.9.5.5 -> 0.10.1
  - janino 3.1.10 -> 3.1.12
  - log4j-slf4j2-impl 2.23.1 -> (import core)
  - ojdbc10 19.21.0.0 -> ojdbc11 23.4.0.24.05
  - postgresql 42.6.0 -> 42.7.3
  - liquibase-core 4.24.0 -> 4.28.0
  - lucene 8.11.1 -> 8.11.3
  - speedbjni 2.7.0 -> 2.8.0
  - ehcache 3.9.11 -> 3.10.8
  - tika-core 2.9.0 -> 2.9.2
  - guava 32.1.3-jre -> 33.2.1-jre
  - servlet 5.0.0 -> 6.1.0
  - rest-assured 5.3.2 -> 5.4.0
  - spring-webmvc 6.0.13 -> 6.1.10
  - jersey 3.1.3 -> 3.1.6 (not 3.1.7 jdk21)
* [Ui-vuejs] update libs 
  - *JS libs :*
  - axios 1.6.0 -> 1.7.2
  - core-js 3.33.2 -> 3.37.1
  - quasar 2.16.5 -> 2.13.0
  - vue 3.3.7 -> 3.4.31
  - vitejs/plugin-vue 4.4.0 -> 5.0.5
  - eslint 8.53.0 -> 9.6.0
  - eslint-plugin-vue 9.18.1 -> 9.27.0
  - ol 8.1.0 -> 9.2.4
  - vite 4.5.0 -> 5.3.3
  - vite-plugin-mkcert 1.16.0 -> 1.17.5
  - *3rd party :*
  - materialdesignicons 7.3.67 -> 7.4.47
  - materialIcon v140 -> v142
  - fontawesome 6.4.2 -> 6.5.2


Release 4.1.0 - 2023/11/09
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-400-to-410)
* [Core] Add Standard NamedThreadFactory for ExecutorsServices
* [Orchestra] Fix InterruptedException catch : must keep interrupt state in thread
* [Planning] Add planning modules (post-incubating version)
* [Audit] Fix log plugin
* [Account] Add AuthorizationUtil getSearchSecurity
* [Account] Refactor RedisConnector. Refactor keys for minimal cluster compatibility
* [Commons] Fix Error on event execution
* [Commons] AppNodeRegistry : Refactor RedisConnector. Refactor keys for minimal cluster compatibility
* [Social] Refactor RedisConnector. Assert than not used in cluster mode (need to refactor keys and break compatibility)
* [DataFactory] Search add metadata to index, and 2 new reindex modes by supporting version field (reindexDelta and reindexFullModified)
* [Datafactory] Fix reindexAllModified (more than 10 elements from index)
* [Datafactory] throw error if not range syntax error
* [Datafactory] Add a gap for ReindexTask (only for Instant, not for number yet)
* [DataFactory] Fix searchManager onStoreEvent. Before empty list throw error and stop event's bus, without any logs
* [Datamodel] Add DtListState limit
* [Database] Lighter analytics. Add statement as metadata, and only header as tag
* [Ui-vueJs] Remove tag <big> in facets
* [Ui-vuejs] Pass window in httpPostAjax onSuccess and onError : undefined
* [Ui-VueJs] Fix directives vuejs3 migration
* [Ui] Add thymeleaf component support of vueJs dynamic parameter (prefix : and v-)
* [Ui] Use Firefox driver for tests (HtmlUnitDriver don't support vue3)
* [Ui] Fix text-editor : paste should stop event propagation (link to vue3js miggration)
* [Ui] Add custom facetValue translator
* [Ui] Fix directives for vue3
* [Ui] Fix escaped char in namedComponent
* [Datastore] CachePlugin: Refactor RedisConnector. Refactor keys for minimal cluster compatibility
* [Datastore] Add purge KV Berkeley analytics
* [DataStore] Add 3 purges versions of KVStore Berkeley (fullscan, diskordered batch, secondary index per TTL)
* [DataStore] Add SpeedbKVStorePlugin
* [DataStore] Add H2KVStorePlugin
* [DataStore] Add EhCacheKVStorePlugin (beta)
* [Stella] Refactor to use mainly UnifiedJedis. add timeoutSeconds params to workersPlugin
* [Stella] Add deadNode detection (UnifiedRedis)
* [Stella] Add pollFrequency parameter (simpler and replace blocking wait : unsupported by RedisCluster)
* [Stella] Use ExecutorService instead of Thread in Master (better managed exceptions)
* [Stella] Daemon periode of 20s instead of 10 (in case of multiple nodes)
* [Stella] Use Redis set + params instead of deprecated setnx
* [vega] fix #129 rely exclusively on gson public api for dtObject deserialization
* [Vega] Change Nonce to base64 instead of UUID (compatibility issue)
* [Vega] OIDC, optim + forward Tokens instead of useless auth code
* [Vega] OIDC, add support for PKCE (enabled by default)
* [Vega] Fix deltaList compute
* [all] Update libs 
  - h2 2.2.220 -> 2.2.224
  - log4j-slf4j 2.20.0 -> 2.21.1
  - jetty 11.0.15 -> 11.0.18
  - elasticsearch 7.17.12 -> 7.17.14
  - rest-assured 5.3.1 -> 5.3.2
  - liquibase 4.23.0 -> 4.24.0
  - ojdbc 19.19.0.0 -> 19.21.0.0
  - speedbjni -> 2.6.0 -> 2.7.0
  - tika 2.8.0 -> 2.9.0
  - guava 32.1.1 -> 32.1.3
  - poi 5.2.3 -> 5.2.4
  - sods 1.6.2 -> 1.6.4
  - jersey 3.1.0 -> 3.1.3
  - springmvc 6.0.11 -> 6.0.13
  - thymeleaf 3.1.1 -> 3.1.2
  - thymeleaf layout 3.2.1 -> 3.3.0
  - selenium 4.10.0 -> 4.15.0
  - htmlunit 4.10.0 -> 4.13.0
  - jackson 2.15.2 -> 2.15.3
* [Ui-vuejs] update libs 
  - *JS libs :*
  - vue: 3.3.4 ->3.3.7
  - quasar 2.12.3 -> 2.13.0
  - axios 0.24.0 -> 1.6.0
  - core-js 3.20.3 -> 3.33.2
  - @vitejs/plugin-vue: 2.2.2 -> 4.4.0
  - eslint 6.8.0 -> 8.53.0
  - eslint-plugin-vue 6.2.2 -> 9.18.1
  - ol 5.3.3 -> 8.1.0
  - vite 2.8.4 -> 4.5.0
  - vite-plugin-externals 0.4.0 -> 0.6.2
  - *3rd party :*
  - fontawesome 6.4.0 -> 6.4.2
  - @mdi/font 7.2.96 -> 7.3.37


Release 4.0.0 - 2023/08/17
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-360-to-400)
* [Account] Fix security translators when missing/null SecurityKeys
* [Account] Fix Search security translator and tests multiples user values
* [Account] Fix override authorizations when unordered registration
* [Commons] decode html char to (&#...;)
* **[Ui, Vega] jakarta namespace : Spring 6, Javalin 5, Jetty 11**
* [Ui] Add Jetty Boot Param : noSniHostCheck (needed when behind a proxy)
* [Ui] Extract exceptions handling from VSpringMvcControllerAdvice to VSpringMvcExceptionHandler
* **[Ui] Quasar v1 to v2** (see https://quasar.dev/start/upgrade-guide/)
  - update css variable names
    *  `--q-color-*` to `--q-*`
  * Quasar utils : `Quasar.utils.date.getDateDiff` to `Quasar.date.getDateDiff`
  * QTablme rename `:data` to `:rows`
  * QSelect change `@input` to `@update:model-value`
* [Ui] export VertigoUi to window.VertigoUi
* **[Ui] Vue2 -> Vue3** (see https://v3-migration.vuejs.org/)
  * slots syntax `slot="body" slot-scope="props"` to `#body="props"`
  * no need .native event
  * `:key` needed on same tag as `v-for` loop
  * `v-bind:value` to `v-bind:modelValue`
  * `@input` to `@update:model-value`
  * `value` to `modelValue
  * no need of `$set`
    * `this.$set(this.$props.value, '_v_inputValue', newInputValue );`
    * to `this.$props.modelValue['_v_inputValue'] = newInputValue;`
  * pass function instead of a anonymous function
	* `@filter="function(val, update, abort) { autocompleteParam(param, index, val, update, abort);}"`
 	* to `@filter="function(val, update, abort) { autocompleteParam(param, index, val, update, abort);}"`
  * In components : `import Quasar from "quasar"`to `import * as Quasar from "quasar"`
  * Life cycle change :
    * `bind` to `created`
    * `componentUpdated` to `updated`
    * `unbind` to `unmounted`
  * `@hook` to `@vue`
  * (weird) httpPostAjax.onSuccess : `this` and `window` are undefined in function body. To fix: `this` undefined when use fat arrow =>, so use `function(...) {...}`; `window` pass as second onSuccess arg)
* [Ui] Components' param name support kebab-case, context variables are always as CamelCase (ex : buttons support `text-color` and `textColor` input params and declare a `textColor` thymeleaf variable)
* **[Ui] Replace buttons attribute ariaLabel to title** (aria-label wasn't use for a11y in button, title was)
* [datamodel] check required field throw a ConstraintException
* [ui] replace cookie by localstorage in sample menu mini's state 
* [Ui] vui Table : Add rowIndex even if not modifiable
* [Ui] Added attribute sample with conditional
* [Vega] Configure uiListModifiable maximum rows to default max rows
* [vega] move some gson type adapters in core
* [vega] improve swagger for File parameters
* [Ui] Fix doubled escaped chars when using specific attrs
* [Ui] Add aria-required in components
* [Ui] Fix usage of VSpringWebConfig CustomComponentsPathPrefix
* [DataFactory] Inactive spanQuery for string pkfield in collections fulltext filtering
* [DataFactory] Fix Dsl ListFilterBuilder with multifield and support AND, OR with nullable fields
* [DataBase] Switch postgre PK on insert to GENERATED_COLUMNS
* [database] improved clusteredMeasure perf
* [DataStore] add createList and updateList on entityStore (and DAO)
* [datamodel] externalize smarttype validation MessageText
* [orchestra] cannot clean thread local anymore + fix multi node test
* [Ui] Stop attributes propagation on vu:block tag (use `th:with="actions_slot=null, header_attrs=null,content_attrs=null,card_attrs=null"`)
* [Ui] Add UserSessionMethodArgumentResolver : can declare `final UserSession session` parameter in controllers
* [Ui] Support multiple QueryParams as List
* [Ui] Support vu:select into modifiableTable
* [Ui] Fix : no pagination on modifiableTable
* [Ui] Add ellipsis on uploader title, show on hover
* [Ui] clientSide filter in ui selection components add ability to filter a list client side, for selection in ui components
* [ui] add asssertion to prevent all modified fields in context
* [ui] sort date and datetime in table automatically
* [ui] fix autocomplete-multiple (missing after_label_slot param)
* [ui] highest precedence is not for native exception handler
* [ui] add global properties for Vue instance to ease migration
* [Ui] Fix QTables if no subtitle no empty `<div></div>`
* [Ui] Add missing 3rdParty for some uncommon cases
* [Ui] Add parameter loading state on button
* [Ui] Add method to remove pendingAction after a delay (use it with v-on)
* [Ui] Add css sr-only for screen reader elements
* [Ui] [A11y] use heading for title (block and table) support embedded block
* [Ui] [A11y] use heading for title (block and table)
* [Ui] [A11y] Add aria-current="step" to vScrollSpy
* [Ui] Column actions align right
* [Ui] [A11y] add 'Actions' title to actions column
* [Ui] [A11y] Update buttons and table and some DX 
   - button : round if icon only
   - force ariaLabel if icon only
   - add sub span sr-only if necessary
   - table : add scope col on th and aria-sort if sorted
* [Ui] Support kebab-case in namedComposant : param with - : var in camelCase
* [Ui] Fix width of qEditor inside a qLabel
* [Ui] add parameters on head and page to change vueJs, Quasar and vertigoUi versions (you need to put wanted version in same place like `/vertigo-ui/static/3rdParty/cdn.jsdelivr.net/npm/`)
* [Social] Add analytics to SmsManager : matchs whilelistPrefix (max 8 chars)
* [Quarto] Check for forbidden char in filename (much clear execption message)
* [Quarto] filename can't contains path
* [ui] update js libs
  * vue 2.7.14 -> 3.3.4
  * quasar 1.22.9 => 2.12.3
  * @mdi 7.2.96
  * materialIcons v140
  * babel 7.21.4 -> 7.22.7
* [All] update libs
  * h2 2.1.214 -> 2.2.220
  * assertj 3.23.1 -> 3.24.2
  * janino 3.1.9 -> 3.1.10
  * freemarker 2.3.31 -> 2.3.32
  * servlet 4.0.1 -> jakarta 5.0.0
  * jetty 9.4.51 -> 11.0.15
  * lucene 8.11.1 -> 8.11.1 (cant update compatibility with ES 7.17.12)
  * elasticsearch 7.17.9 -> 7.17.12
  * rest-assured 5.2.0 -> 5.3.1
  * liquibase 4.21.1 -> 4.23.0
  * ojdbc 19.18.0.0 -> 19.19.0.0
  * ehcache 3.9.10 -> 3.9.11 (dep errors with 3.10.x)
  * tika 2.7.0 -> 2.8.0
  * guava 31.1-jre -> 32.1.1-jre (for tika cve in 31.1-jre)
  * sods 1.5.3 -> 1.6.2
  * spring-webmvc 5.3.27 -> 6.0.11
  * selenium 4.7.2 -> 4.10.0
  * jackson 2.14.1 -> 2.15.2 

Release 3.6.0 - 2023/05/04
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-350-to-360)
- **[DataModel] Fix criteria precedence : `a or b and c` => `(a or b) and c`** ( *before 3.5.1 : a or b and c => a or (b and c)* )
- [Datamodel] Write criteria operators in uppercase
- [Datastore] support boolean in non bind parameters in criteria (safe)
- [Datastore, Ui] mimetype resolution in fileStoreManager (with plugin)
- [DataFactory] Fix defaultMaxRows (didn't use the maxRows set by setListState)
- [DataFactory] searchManager support sort with geoDistance query
- [Account] Fix criteriaSecurity tree for > and >= (include all keys null)
- [Account] support fixed values in security rules
- [Account] Add log on assertAuthz
- [Account] Fix accept fixedValue on simple or enum authz rules
- [Social] add `SmsManager` and a `OvhSmsSendPlugin` using ovh api (an example of WebServiceProxyAnnotation Amplifier)
- [Orchestra] add threadContext in log on startup
- [Orchestra] distinguish module information in log for the actual job
- [Quarto] Support KeyField when export field with a denorm list
- [Vega] WebAuthentication change session ID for security purpose (session fixation attack)
- [Vega] Permit ; escaping (\;) in ContentSecurityPolicyFilter
- [Vega] add . (dot) support in webservice path
- [Vega] support scanning of WebServiceAnnotation on the interface method if not on the impl class (usefull for `WebServiceProxyAnnotation` stub)
- [Vega] Add analytics on HttpClient amplifier
- [Vega] add `AuthorizationWebFilter` for high level filtering based on global authorizations
- [Vega] appLoginHandler must specify the afterLogin URL and afterLogOutUrl
- [Vega] handle request that are not GET in webauthentication in keycloack
- [Vega] requestedUrl in appLogin
- [Vega] Update swaggerUi version 4.18.3
- [Vega] Fix assertion in uiListModifiable when add then remove elements before checkAndMerge
- [Vega] sonar : fix ReDos
- **[Ui] Add xxx_content_slot on input components to define specific vue's slots (xxx = input, date, or time)**
- [ui] add `after_label_slot` on input components
- [Ui] Fix grid : don't create cell around include-data tags
- [Ui] Fix return reject promise onAjaxError
- [Ui] Add `delayUiMessageStask` to keep message, in case of refresh for redirect
- [Ui] Fix slots propagation (no at all propagation)
- [Ui] Refactor component's content (support slots and contents inside slots and contents)
- [Ui] Extract other_attrs attributes when passed to another component : support overrides used to pass required to label for example
- [Ui] Return 401 on viewContext not found exception (instead of 500)
- [Ui] authz attrs javadoc
- [Ui] Fix regression with axios 1.0+
- [Ui] Add a loading stats with spinner on button-submit(show after a delay, rely on pendingAction map : share with httpPostAjax)
  - on `q-btn`, you may use something like : `th::loading="|isPendingAction('@{_myAction}')|"`
- [ui] add parameter `devMode.authzLogOnly` to toogle secureDevMode
- [Ui] Add a check in Authz tag : don't support `&&` as AND
- [ui] Link protectedValues to Session
- [ui] Fix load of project's thymleaf components on a customPathPrefix
- [ui] modal title is reactive
- [ui] table : add `additional_content_slot` to customise table structure (for exemple multiple `<tr>`)
- [ui] add required attribute on input components
- [Ui] Add Handler for ExpiredViewContextException (like other Ui exceptions)
- [ui] add qcard slot on cards
- [UI] Mimetype detection with 'file.tikaMimeType' and optional lib
- [ui] support autocomplete multiple + custom endpoint
- [ui] support autocomplete in modifiableTable and split autocomplete in dedicated component
- [Ui] Refactor marging on button confirm message
- [Ui] add responseStatus in Analytics tracer
- [ui] add standard boot class for embeddedJetty
- [ui] stop jetty when error at vertigo boot
- [Ui] Fix exceptionHandler : don't response.sendError in Ajax
- [UI] Add checkbox-confirm : for usage like CGU acceptations
- [Ui] Refactor component contents and other_attrs 
- [ui] sanitize options on q-select based components
- [ui] fix required asterisk with after_label_slot
- [ui-vuejs] better ajaxError support *(fix case when response doesn't exist, add case when ajax response is a redirect, add case when a message is built on server side)*
- [ui-vuejs] for httpPostAjax, support dot notation in vueDataParams for selecting some inner fields
- [ui-vuejs] can omit vueDataParam call in httpPostAjax for much simpler usage
- [ui-vuejs] refactor vueDataParams (perf improvements) and skip fields with modifiers
- [ui-vuejs] externalize ajax errorMessages
- [VueJs-UI] update dependencies
  - quasar: 1.22.3 => 1.22.9
- [All] update libs 
  - log4j : 2.19.0 -> 2.20.0
  - jetty : 9.4.50.v20221201 -> 9.4.51.v20230217
  - elasticsearch : 7.17.8 -> 7.17.9
  - liquibase-core : 4.18.0 -> 4.20.0
  - ojdbc10 : 19.17.0.0 -> 19.18.0.0
  - postgresql : 42.5.1 -> 42.6.0
  - SODS : 1.5.2 -> 1.5.3
  - spring : 5.3.24 -> 5.3.27
  
  
Release 3.5.0 - 2023/01/06
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-340-to-350)
- [Datafactory] fix uri.getId to string String.valueOf(Serializable.class.cast(uri.getId())))
- [Datafactory] fix add boostMostRecent on filteredQuery
- [vega] CSP : Rename parameter externalUrl to cspFrameAncestor
- [vega] CSP : add param CSP_REPORT_WS_URI for report URI
- [Vega] CSP : Add 3 more custom params for CSP (to set env parameters) (cspParam1, cspParam2, cspParam3)
- [Vega] Change session ID on login (prevent session fixation attack)
- [Vega] fix missfired exception
- [Vega] Add warn logs for SAML2 authent plugin
- [Vega] Fix missing unmodified added objects in UiListModifiable
- [Ui] fix namedComponent for paramValue with &#xx; (don't double encoding)
- [Liquibase] Add contexts handling
- [Ui] fix css for text-editor
- [Ui] assert attributs vu:select in readonly too
- [Ui] add aria-required on textfield
- [Ui] Add class and aria if field is required
- **[UI] Link CTX to session ID (break old context storage compatibility)**
- [Ui] Update textEditor : add param plainTextOnly and showErrors (and add js method helper for fix FireFox Blockquote and H1-9 don't toggle correctly)
- [Ui] Add libraries_slot in component <vu:page>
- [ui] Add header_slot in component <vu:table>
- [Ui] Add missing q-card around messages, in vu:messages (for better gutter support)
- [Ui] Support slot of an component into slot of another
- [Ui] Send Exception even in case of VUserException (need to rollback)
- [Ui] Add support to link activation of SpringMvcConfig to Vertigo Modules
- [Ui] Add pathPrefix as tag to Analytics
- [Ui] Fix growing context when reused
- [Ui] Add local vuejs ssrRendering in java filter (using nashorn) : could remove unsafe_eval in csp (but with a performance hit)
- [Ui] Add requestMethod in analytics tracer
- [Ui] Fix logout on keycloak
- [Ui] Store main instants of context : creation, and input reuse, "CTX_CREATION_INSTANT"; //instant of initContext; "CTX_REUSE_INSTANT"; //instant of currentCtx reuse; "INPUT_CTX_REUSE_INSTANT"; //instant of inputCtx reuse
- [Ui] Fix error if there is comment in slot
- **[Audit] Refactoring api**
- [Audit] Add Database store plugin
- [Orchestra] Force desynchronization of execution in node (prevent double excecutions, if DB isolation level doesn't garantee lock as same ms) 
- [Orchestra] Fix equals test in request
- [Basics] Sometimes needed i18n FR
- [VueJs-UI] update devDependencies
- [VueJs-UI] update dependencies
  - axios : 1.0.0 => 1.2.1,
  - core-js: 3.20.3 => 3.27.1
  - ionicons: 6.0.1 => 6.0.4
  - ol: 5.3.3 => 7.2.2
  - vue: 2.7.10 => 2.7.14
  - quasar: 1.21.1 => 1.22.3
  - vue-template-compiler: 2.7.10 => 2.7.14
- [All] update libs 
  - janino 3.1.18 -> 3.1.9
  - jetty 9.4.49 -> 9.4.50
  - elasticsearch 7.17.6 -> 7.17.8
  - rest-assured 5.2.0 -> 5.3.0
  - liquibase 4.16.1 -> 4.18.0
  - ehcache 3.9.9 -> 3.9.10
  - com.github.miachm.sods 1.5.1 -> 1.5.2
  - jersey 3.0.8 -> 3.1.0
  - rest-assured 5.2.0 -> 5.3.0

Release 3.4.0 - 2022/10/12
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-330-to-340)
- [database] Add pool parameters to c3p0 plugin (minPoolSize, maxPoolSize,acquireIncrement,configName)
- [ui] Add select-multiple in read-only
- [ui] add <vu:content> in input compoments for deep customization
- [ui] table auto-width and no-wrap
- [ui] add input and text-editor
- [datamodel] taskoutput attribute has a name
- [quarto] use adapters in exports
- [database] Switch postgre to GENERATED_COLUMNS (previously : generated_keys don't work if PK isn't the first column)
- [vega] authentication optional in SecurityFilter
- [Account] Better error msg if securityKey was null
- [DataStore] Build urn : use criteria hashcode => fix cache of some list 
- [Account] Add some utils methods to AuthorizationUtil: getCriteria for operation, and assert with supplier
- [Ui] Add assert if @RequestMapping is missing on controllers
- [Datastore] Fix berkeley purge daemon (great perfs optimisation)
- [Ui] other attrs on grid
- [datamodel] fix loading order for fragment (missing link)
- [ui] add VControllerInterceptors (can alter response by annotations)
- [vega] CSP Filter can use app external url parameter
- [vega] Rename package auth -> authentication
- [ui-vuejs] fix reset of array when ajaxcall
- [ui-vuejs] Fix onAjaxError  (emit unauthorized event, don't notif 422 error message)
- [ui-vuejs] Fix VScrollSpy.js
- [ui-vuejs] add autofocus directive
- [ui-vuejs] add directives to watch usaved updates
- [vega] Add local, azureAD & keycloak WebAuthenticationPlugins
- [vega] Add webauthentication manager with support of multiple connectors (for saml or openid connect)
- [ui] fix uiErrorBuilder use DtFieldName
- [vega] add comparison methods for building uiErrors more easily
- [vega] docker compatibility -> appservletStarter retrieve configuration and flags from env variable or system property
- [ui] UiUtil -> support presence of modifier when querying field
- [ui] add a securedDevMode for checking authorizations
- [quarto] keep \r inside docx
- [account] support securityDimensions with variable depth in security keys
- [account] Allow only one field in tree securityDimension (then null mean all instead of none)
- [Ui] Add component input tree
- [Ui] Remove name from text-area input in readonly
- [Datastore] fix daemondefinition when multiple BerkeleyKVStorePlugin
- [Datamodel] UID, id type is infered by caller
- [Datamodel] Fix dtList.subList
- [Account] Fixed override authorizations when unordered registration
- [Ui] Update ViewContextUpdateSecurity to protect update of primitive param
- [Vega] Add adapters for EmptyMap, EmptySet and EmptyList
- [All] Updated libs
  - h2 2.1.210 -> 2.1.214
  - assertj-core 3.22.0 -> 3.23.1
  - janino 3.1.6 -> 3.1.8
  - jetty-server 9.4.44.v20210927 -> 9.4.49.v20220914
  - lucene-core 8.10.1 -> 8.11.1
  - liquibase-core 4.7.0 -> 4.16.1
  - ojdbc10 19.13.0.0.1 -> 19.16.0.0
  - postgresql 42.3.1 -> 42.5.0
  - poi-ooxml 4.1.2 -> 52.2.3
  - SODS 1.4.0 -> 1.5.1
  - xdocreport 2.0.2 -> 2.0.4
  - rest-assured 4.4.0 -> 5.2.0
  - spring-webmvc 5.3.15 -> 5.3.23
  - thymeleaf-spring5 3.0.14.RELEASE -> 3.0.15.RELEASE
  - selenium-support 4.1.1 -> 4.4.0
  - htmlunit-driver 3.56.0 -> 3.64.0
- [Ui] update js dependencies
  - mdi 6.5.95 -> 7.0.96
  - axios 0.24.0 -> 1.0.0
  - vuejs 2.6.14 -> 2.7.10
  - quasar 1.17.7 -> 1.21.1

Release 3.3.0 - 2022/02/03
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-320-to-330)
* **[Datafactory] Change FacetedQueryDefinition linked to DtIndex instead KeyConcept (support multiple indices)**
* [Datafactory] Upgraded loadList api to search into multiple indices
* [Ui] Add demo of modifiable table, with custom header and columns (sum, group by, etc...)
* [Ui] Add support of select and textarea in table-modifiable
* [Ui-vuejs] Fix issue on FormData with null value converted to "null"
* [ui-vuejs] Fix bug on ajax call
* [ui-vuejs] Fix v-facet for multiple selected facet
* [Ui] Support @Secured annotation on Controller or Controller's Action. No need to prefix authorisation name with `Atz`
* [Ui] Fixed other attrs starting with $ or @ ( only evaluate `${` or `@{` )
* [Ui] Add responsive table : switch to grid
* [Ui] Add a _dense_ mode to grid
* [Search] Fix search log
* [DataStore] Set Fileinfo URI when read DB FileInfo
* [Ui] Add button-link confirm
* [Ui] Fix button-submit apply other_attrs on main button only (no more confirm button)
* [Ui] Add other_attrs support to grid's div row
* [Database] Fix a bug in MSQL Server that reads the stream until it gets a -1
* [Ui] Support any kind of modifier for transformers applied in ViewContextMap
* [Vega] Add ability to authenticate easily with Azure Ad
* [Vega] Update SwaggerApi to support smartTypes Adapter
* [Ui]  Add a download link on fileupload readonly (use downloadUrl parameter)
* [Vega] SwaggerApi use BasicTypeClass for all case, not only in QueryParam
* [Ui] Fix grid-cell col param : number of grid's col (max grid's cols) OR quasar grid css (max 12, ex: lg-8)
* [Ui] Fix how SecurityException was managed : send UNAUTHORIZED or FORBIDDEN hhtp code
* [DataStore] Fix MasterDataList when sort by not persistent field
* [DataFactory] Can specify search sortableNormalizer in indexType : `myAnalyzer{:myDataType}{:stored|notStored}{:sortable{(mySortNormalizer)}|notSortable}{:facetable|notFacetable}`
* [Basics] Add contextProperties to Task script executor's context : use to passed context not declared as a `in attribute`
* [DataStore] Add support of table alias in SqlCriteriaEncoder
* [DataStore] Add support for inlined parameters (instead of binded). Inlined parameters were sometimes usefull to compute a good execute plan. Inlined parameters must be secured : only simple types, and simple chars for String.
* [Account] Add resources for forbidden error message
* [Account] Optimized isAutorized operation check; and change authorizedOperations api from List to Set
* [Account] Add better error messages for auth json config
* __[Account] Rename api withCriteria to withSecurityKeys__
* [Account] Add `AuthorizationUtil` for easier security check in services (throw assertions instead of just returning boolean)
* [Account] Add AuthorizationCriteria : can be declared as SmartTypes and used in Request Task for include security clause in sql requests
* [Ui] Add UiAuthorizationUtil for ui rendering; This util keep a cache per page request
* __[Ui] Add ViewContext update security : only allow data with a writeable input in UI__ : Vertigo Ui inputs components are updated, but you may check if you use direclty `vu:include-data`, add `modifiable` attribute if you send this data to server.
* [Ui] Param name of selectedFacets is now defined by `@ViewAttribut("paramName")` (was 'selectedFacets' by default)
* [Ui] Support form posting of empty value : reset value, even if there is multiple empty input
* [Ui] Added selected facetValue even if there is 0 result for this facetValue
* [Vega] Fix uiObject api for LocalDate, Instant and SmartType's valueObject
* [DataFactory] Add userfriendly api for setting preselected facet value (with `SelectedFacetValuesBuilder `)
* [DataFactory] Fix selected facet term filter : use sub keyword field if sortable
* [DataFactory] Add check of ES error message for fields missing datatype=true (no more _can't parse_ error)
* [Search] Move parsing of listFilterQuery to ListFilterBuilder : the api only took pattern, other impl may don't use DSL
* [Vega] Add getDouble to uiObject
* [DataModel] Add of (add(index, obj) on DtList
* [Ui] Fix bad double html escaping with other_attr
* [Datafactory] Add support of singleValued metric aggregation like sum or avg
* [DataFactory] Rename `innerWriteTo` of customAggregation to `_innerWriteTo`
* [DataFactory] Fix CustomAggregation for Geo and Sum/Avg of RestHLClient and Std Client
* [DataFactory] Fix ES trackTotalHit up to 1 000 000 (was 10 000)
* [Basics] Add i18n support for constraints
* [All] Remove log4j2 conf by default in vertigo jar
* [DataFactory] Fix indexing DT with computed fields (can't stored it in result)
* [DataModel] Add DtList.subList
* [Quarto] Add ODS exporter (use SODS lib)
* [Quarto] Add optional 'charset' parameter for 'exporter.csv' feature
* [UI] Correct readonly text-area (text-area-read) to be readonly
* [DataFactory] Change to support DtObject without id in Indexed collection's operations (use hashcode => can't serialize list)
* [Ui] Fix bug in context keys used to publish error in UiMessageStack
* [Vega] Add @RequireApiKey on webservices (#73) __(Swagger ?)__
* [Ui] Add log message for some security exceptions (not too much details)
* [Ui] Fix UiListUnmodifiable : keyField mandatory in PublishDtList
* [Datamodel] Add a keyField on dtDefinition (KeyField != Id field)
* [Ui] Use keyField on DtDefinition when available for UiListUnmodifiable
* [Ui] Support utf8 thymeleaf template file
* [Datafactory] Use keyword field if present in FacetTerm
* [Vega] Fix deserializing Json of SmartTypes (like geoPoint)
* [Quarto] Secure XML read (docx) 
* [All] Updated libs
  - __h2 1.4.200 -> 2.1.210 (need to rebuild bdd)__
  - assertj-core 3.19.0 -> 3.22.0
  - log4j 2.14.1 -> 2.17.1 (log4shell)
  - janino 3.1.4 -> 3.1.6
  - jetty-server 9.4.40.v20210413 -> 9.4.44.v20210927
  - jersey-client 2.33 -> 3.0.3
  - lucene 8.7.0 -> 8.10.1
  - elasticsearch 7.10.2 -> 7.16.3
  - codelibs embedded ES 7.10.2 -> 7.16.3
  - restassured 4.3.3 -> 4.4.0
  - liquibase 4.3.5 -> 4.7.0
  - ehcache 3.9.4 -> 3.9.9
  - Spring-webmvc 5.3.7 -> 5.3.15
  - Thymeleaf 3.0.12 -> 3.0.14
  - Thymeleaf-layout 2.5.3 -> 3.0.0
  - selenium 3.141.59 -> 4.1.1
  - htmlunit-driver 2.50.0 -> 3.56.0
  - jackson 2.12.3 -> 2.13.1
* [Ui] Update js libs 
  - axios 0.21.1 -> 0.24.0
  - core-js 3.8.3 -> 3.20.3
  - Quasar 1.15.2 -> v1.17.7
  - vue 2.6.13 -> 2.6.14
  - MaterialIcons v50 -> v121
  - fontawesome icons 5.7.1 -> 5.15.4
  - materialDesignIcons 5.5.55 -> 6.5.95
  - ionicons 5.4.0 -> 6.0.1


Release 3.2.0 - 2021/06/21
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-311-to-320)
* [Ui] Fix FileUpload on single value in object.field
* [Ui] FileUpload simpler support of cardinality.ONE FileInfoUri in object, and fix when no file selected
* [Ui] add select-multiple ui component
* [Ui] Add support of Modifiable list. text-field and date component, datetime, checkbox, fileupload (remove label but support errors)
* [Ui] Add readonly mode to fileupload
* [Ui] Dedicated tests for uploadFile and modifiableList
* [Ui] Accept unmodifiable list without key
* [Ui] Support context with Optional FileInfoUri
* [Ui] Refactor map from context array to single/optional parameter
* [Ui] Add a bridge for locale between Vertigo and Spring
* [DataStore] Fix to support multiple DelayedMemoryKVStorePlugin
* [DataStore] Fix unique daemon name (can't use - )
* [DataModel] Fix ProxyMethod with void result should return null
* [Datamodel] criteria is not limited to entities
* [Database] influxdb switch to flux query language
* [DataFactory] Renamed inner attribute to be closer to json form
* [Account] Enforce pbkdf2 iterations from 2^12 to 2^14
* [Account] Authorizations on Entity instead of KeyConcept
* [Account] Fluent clear roles
* [Vega] Update swaggerApi to use include and exclude fields
* [Vega] Added httpClient amplifier, by method or class annotations => can be use to call other system REST WS
* [Vega] Finer exceptions messages
* [All] Code cleaning, refactoring and documenting 
* [Ui] upgrade js depencies 
  - quasar 1.15.2 -> 1.15.19
  - vuejs 2.6.12 -> 2.6.13
* [All] Updated libs
  - gson 2.8.6 -> 2.8.7
  - snakeyaml 1.27 -> 1.28
  - javassist 3.27.0-GA -> 3.28.0-GA
  - javalin 3.13.3 -> 3.13.7
  - jetty 9.4.35.v20201120 -> 9.4.40.v20210413
  - mongo 4.2.0 -> 4.2.3
  - neo4j 4.1.3 -> 4.2.7
  - jedis 3.5.1 -> 3.6.0
  - janino 3.1.2 -> 3.1.4
  - freemarker 2.3.30 -> 2.3.31
  - liquibase 4.2.2 -> 4.3.5
  - ehcache 3.9.0 -> 3.9.4
  - ojdbc 19.8.0.0 -> 19.10.0.0
  - postgresql jdbc 42.2.18 -> 42.2.20
  - spring 5.3.3 -> 5.3.7
  - thymeleaf-layout-dialect 2.5.2 -> 2.5.3
  - selenium 2.46.0 -> 2.50.0
  - jackson 2.11.3 -> 2.12.3

Release 3.1.1 - 2021/02/22
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-310-to-311)
* [UI] Fix named component attributs with myAttr="*" and myAttr="'escaped text'"
* [Ui] Fix select component required class, and use classappend
* [Ui] Remove all inline code to be CSP-compliant (in modal)
* [Ui] Changed thymeleaf named components to pass other_attrs throught components without double escaping
* [Ui] Add Vertigo Ui Text (`vu:text`) attribute processor to add v-pre directive (fix SSR)
* [Ui] fileupload : support error message on upload
* [Ui] Change last attr of label to label_attrs (from other_attrs)
* [Ui] Refactor FileUpload component : UiFileInfo must be kept out of context, only fileInfoUri are in context
* [Ui] Update ViewContext to store typedRef and handle multiple values better. UI could send nothing, String or String[], when value is multiple we want to have a String[] anytime
* [Ui] Simpler ViewAttributeResolver : FileInfoUri are better managed by ViewContext when publishTypedRef is used
* [Ui] Fix to remove duplicate files in upload component (duplicate are not supported)
* [Ui] Add FileUploadSimple bind to object field : use SmartType FileInfoURI

Release 3.1.0 - 2021/02/05
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-300-to-310)
* [Core] Fix the log4j2 configuration, the socketAppender was lost and nothing was sent to analytics server (thanks @skerdudou)
* [Ui] Accept CTX in POST PUT and DELETE request (not only POST)
* [Ui] Lanscape property for Date and DateTime is now responsive (landscape for >xs screen)
* [Ui] Fix xxx_attrs : default to label_attrs (outter component)
* [Ui] Fix select component if value==null
* [Ui] Fix required class on components : autocomplete, date, geoloc, select, textarea
* [Ui] Fix grid-cell col override : add a col-md-xx class (instead of col-xx which mean col-xs-xx)
* [Ui] Refactor fileupload component : change uploader icons, add fileupload-custom with full slots (can be use to override and change rendering)
* [Ui] Fix miscomputed uploaded files size 
* [Ui] Add a dropzone-area for uploader (extended to this dropzone content). Need to ref the same key than its uploader
* [Ui] Add a fileupload-simple (no header and no thumbnail). Can be initialized serverside and support page refresh (like VUser error)
* __[Ui] Refactor fileupload : upload and remove WS must return ViewContext now__
* [Ui] Made date and datetime field stack-label like other field by coherence
* [Ui] Simpler way to override vertigo's thymeleaf components : CheckCustomComponent resolver at 1st
* [Ui] Add server side rendering to comply with standard CSP : Servlet Filter (two modes : inline code or standalone script) + NodeJs service (default to inactive)
* [Ui] Rename head attribute vuejsDevMode to activate the vuejs dev mode (previously vuiDevMode)
* [Ui] Add confirm to submit button (3 apis : by attribute, content or slot)
* [Ui] Fix FileInfoURI converter in pathVariable (FileInfoURI are protected by default in Vertigo)
* [Ui] Fix passing attributes to NamedComponent, when name contains special char
* [Vega] Add a filter to easily control header
* [Vega] Add CSP servlet filter (Content Security Policy) : add CSP directive in header and can generate a nonce uuid per request for specific usage
* [All] Code cleaning, refactoring and documenting 
* [All] Updated libs
  - Quasar 1.14.3 -> v1.15.2
  - Axios -> 0.21.1
  - animate.css -> 4.1.1
  - vue-cookies.js -> 1.7.4
  - log4j 2.13.3 -> 2.14.0
  - elastic search 7.9.3 -> 7.10.2
  - lucene 8.6.2 -> 8.7.0
  - jersey client 2.32 -> 2.33
  - influxdb-java 2.20 -> 2.21
  - javalin 3.12.0 -> 3.13.3
  - jetty 9.4.31.v20200723 -> 9.4.35.v20201120
  - keycloak-servlet-filter-adapter 11.0.3 -> 12.0.2
  - neo4j 4.1.3 -> 4.2.3
  - jedis 3.3.0 -> 3.5.1
  - spring 5.3.0 -> 5.3.3
  - janino 3.1.2 -> 3.1.3
  - restassured 4.3.2 -> 4.3.3
  - liquibase-core 4.1.1 -> 4.2.2
  - thymeleaf-spring5 3.0.11.RELEASE -> 3.0.12.RELEASE
  - thymeleaf-layout-dialect 2.5.1 -> 2.5.2
  - htmlunit-driver 2.45.0 -> 2.46.0


Release 3.0.0 - 2020/11/20
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-210-to-300)
* [all] Use connectors for more ext libs
* [all] fix features to allow connector name param
* [Commons] Assertion refactor API isEmpty -> IsBlank; argNotEmpty -> isNotBlank; isNotNull, isTrue
* [Commons] Using test to avoid exec when(false)
* [Commons] Fixed PegManyRule to match only matched elements
* [Commons] Keep best unparsed rule in optional and many rule
* [Account] Fix getAuthorizedOperations wasn't taking into account neither rules nor overrides.
* [account] @transactional
* [Ui] Url mandatory on fileUpload component
* [ui] switch to a real vuejs library instead of single file components
* [Ui] Changed npm serve port to 3000
* [Ui] Fixed VComments bad closed tag
* [Ui] Fixed search autoreload
* [Ui] Webpack packaging
* [Ui] Added vuiDevMode for debug vertigo-ui.umd
* [Ui] Fixed nullable geoPoint in geoInput
* [Ui] v-map send event of border geoPoint and click location
* [Ui] Updated vertigo-ui.umd.js
* [Ui] fix #37 uimdlist implements it's own listForClient
* [Ui] fixed a bug when using ajax with null field values
* [Ui] Fixed test Ui
* [Ui] Fixed columnClass override
* [Ui] add support of validator via annotation
* [Ui] fixed a bug on check in AbstractDtObjectValidator
* [Ui] Local sort is now accent insensitive #36
* [Ui] include vmap to vuejs bundle
* [Ui] Protected value as randomuuid
* [Ui] Refactor VMap and VMapLayer
* [Ui] added FacetedQueryResult cluster result
* [Ui] Add checkbox-multiple input component
* [Ui] Autocomplete can restore label when value is changed by another component or script
* [Ui] removed inline javascript
* [Ui] orchestra in dedicated project
* [Ui] add VUiExtensions script
* [Ui] Fix use of empty named components end tag wasn't removed correctly, if body was empty
* [Ui] Gridcell simpler  
* [ui] messageStack not flushed on ajax server error
* [ui] don't serialize private fields in ajax params
* [ui-vuejs] Bind callback to element to ease usage
* [ui-vuejs] Switch to axios httpClient
* [ui-vuejs] add orchestra ui
* [Vega,ui] support multiple primitives in UiObjects
* [Orchestra] switch to studio-config.yaml
* [Orchestra] Fixed Vega javasparc to Javalin (removed MimeTypes)
* [orchestra] fix ksp + regen
* [orchestra] fix bug when ending Pending activities cleaned wrong thread which killed analytics
* [Dynamo] Added RestHLElasticSearchPlugin. And moved previous client plugin.
* [Dynamo] Fixed log4j placeholders {} instead of {0}
* [Dynamo] Removed elastic search deprecated 'type'
* [dynamo] add cardinality on DtField and removed multiple behaviour on domain
* [Dynamo] move smart DtList sorting to StoreManager
* [dynamo] split dynamo in 3 modules (model, store, data)
* [dynamo] split StoreManager into EntityStoreManager and FileStoreManager
* [DataStore] Create directories at startup
* [DataStore] FsFileStorePlugin Create directories at startup
* [DataStore] Default mimeType if probeContentType failed
* [Datastore] Lock cache per context
* [datastore] only one FileUtil
* [Database] Added ojdbc driver from maven repo central
* [database] builder => constructor must be package scoped
* [datamodel] add ability to encode logical operators of criteria
* [DataFactory] Added test jar
* [DataFactory] Fixed geoHash facet
* [datafactory, struts2] moved to dedicated repo
* [datafactory] add optional dependency for lucene when used without elasticsearch
* [Vega] Replaced sparkjava per Javalin 2 fails tests to check /docTest match /docTest/ charset body don't default to utf8 if charset is inconsistent
* [Vega] SparkJava to Javalin
* [Vega] Fixed compression filter (check javalin had already gzip) and charset test
* [Vega] No javalin stop when in Tomcat
* [Vega] Updated swaggerUi 3.32.1
* [Vega] Updated swaggerUi to 3.31.1 and better readeable names
* [Vega] Removed used boot params before check ("boot.applicationConfiguration" and LOG4J_CONFIGURATION_PARAM_NAME )
* [Vega] lazy initialisation of buffer uiObjects for size changing uiListModifiable
* [Vega] when serializeNull in jsonEngine disable adapter that transform empty values into null
* [Vega] serialize all dtObject the same way
* [Vega] swagger remove old fix for missing contextPath needed with spark but not with javalin
* [Vega] jsonEngine always treat empty string as null on the web
* [vega] authorize character '-' in webservices routes
* [vega] handler's stack is sorted with a dedicated index (not from the declaration order) allow addition of plugin inside the predefined stack
* [vega] fix instant json serialization
* [quarto] Added FileTypeDetector for quator
* [quarto] correctly encoding line break in docx
* [Quarto] Timeout for conversion
* [File] Refactored FileManager
* [Stella] Refact Vega Javaspark to Javalin
* [Ui] upgrade js depencies 
  - quasar 1.14.3
  - axios 0.21.0
* [Struts2] Updated lib + fix tests with htmlUnit-driver
  - struts2 2.5.20 -> 2.5.22
  - c3p0 0.9.5.4 -> 0.9.5.5
  - org.eclipse.jetty 9.4.21 -> 9.4.31
  - org.apache.lucene 8.2.0 -> 8.5.1
  - commons-io 2.6 -> 2.7
  - slf4j-log4j12 1.7.28 -> 1.7.30
* [All] Updated libs
  - org.apache.logging.log4j 2.12.1 -> 2.13.3
  - com.mchange. c3p0 0.9.5.4 -> 0.9.5.5
  - org.codehaus.janino 3.1.0 -> 3.1.2
  - org.liquibase 3.8.6 -> 4.1.1
  - com.oracle.ojdbc.ojdbc8 19.3.0.0 -> com.oracle.database.jdbc.ojdbc10 19.7.0.0
  - org.postgresql 42.2.8 -> 42.2.18
  - c3p0 0.9.5.4 -> 0.9.5.5
  - org.apache.lucene 8.2.0 -> 8.6.2
  - org.elasticsearch 7.4.1 -> 7.9.3
  - io.rest-assured 3.3.0 -> 4.3.2
  - org.apache.poi 4.1.1 -> 4.1.2
  - jersey-client 2.29.1 -> 2.31
  - org.springframework 5.2.0 -> 5.2.8
  - org.eclipse.jetty 9.4.21 -> 9.4.31
  - com.fasterxml.jackson 2.10.0 -> 2.11.1
  - slf4j-log4j12 1.7.28 -> 1.7.30
  - web3j 3.5.0 -> 5.0.0
  - assertj 3.14.0 -> 3.17.1
  - freemarker 2.3.29 -> 2.3.30
  - ehcache 3.8.1 -> 3.9.0
  - h2 1.4.199 -> 1.4.200
  - javax.servlet 3.1.0 -> 4.0.1
  - selenium htmlunit-driver 2.42.0 -> 2.44.0
  - javalin 3.11.0 -> 3.11.2
  - keycloak-servlet-filter-adapter 11.0.2 -> 11.0.3
  - neo4j 4.1.1 -> 4.1.3
  - spring 5.2.8.RELEASE -> 5.3.0.RELEASE
  - snakeyaml 1.26 -> 1.27
  - junit-jupiter-engine 5.6.2 -> 5.7.0
  - ojdbc10 19.7.0.0 -> 19.8.0.0
  - thymeleaf-layout-dialect 2.4.1 -> 2.5.1

Release 2.1.0 - 2019/11/12
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-200-to-210)
* [Studio] unused attribute
* [Core] More specific temp dir for TempFiles
* [Database] add check for quoted bound param
* [Core] added conditions to filter abstract classes
* [Core] Possibility to have an optional parameter in the configuration
* [core] add support of flag negation in yaml config
* [commons] commands WIP
* [commons] analytics better logger name
* [database] Close DataStream when set as statement params
* [dynamo] BugFix on concurrency saving first file of the day
* [dynamo] UpperCamelCase feature when import domain definition from XMI
* [dynamo] Merge pull request #137
* [dynamo] fix EA and OOM Loaders with UpperCamelCase
* [dynamo] fixed associations conventions in EA and OOM
* [dynamo] move formatterId in dynamox
* [dynamo] handles WIP
* [Vega] Merge pull request #138
* [Vega] Fix #141 Added serializeNulls params to GoogleJsonEngine. Default false
* [Vega] Fixed #142 Swagger parameterized type support only class or parameterizedType
* [Vega] Remaned AppServletStarter2 to AppServletStarterXml
* [Vega] Fixed #147 : can't close app if start fail
* [Vega] Fixed #148 when routes contains digits at end
* [Vega] Updated swagger ui site to v3.24.0
* [studio] fix generated javadoc for xAO
* [all] Updated libs versions
    * junit-jupiter 5.4.2 -> 5.5.2
    * freemarker 2.3.28 -> 2.3.29
    * spark 2.8.0 -> 2.9.1
    * rest-assured 3.3.0 -> 4.1.2
    * log4j-core 2.11.2 -> 2.12.1
    * slf4j 1.7.25 -> 1.7.28
    * cglib 3.2.10 -> 3.3.0
    * gson 2.8.5 -> 2.8.6
    * snakeyaml 1.23 -> 1.25
    * servlet-api 3.1.0 -> 4.0.1
    * h2       1.4.199 -> 1.4.200
    * postgresql 42.2.5 -> 42.2.8
    * c3p0   0.9.5.3 -> 0.9.5.4
    * janino 3.0.8 -> 3.1.0
    * ehcache 2.10.6 -> 3.8.1
    * jedis 2.9.0 -> 3.1.0
    * lucene 8.0.0 -> 8.2.0
    * elasticsearch 7.1.0 -> 7.4.1
* [all] remove all junit 4 (test suites + Plateform)
* [quarto] removed K
* [Ui] fix autocomplete
* [struts2] Fix : Cleaning memory when republishing in context
* [struts2] Renamed AppServletContextListener2 to AppServletContextList
* __[Ui] quasar update from 0.17 to 1.4.1__ 
* [Ui] Changed NamedComponent to support mono boolean attribute (like 'flat') in placeholders
* [Ui] fix DefaultViewName can be disabled (if needed)
* [Ui] Merge pull request #25 from nothingismagick/patch-1
* [Ui] Added support of vu:content override attribute, and class concat
* [Ui] Added support of contentItem getAttribute
* [Ui] Added buttons-group component
* [Ui] i18n in vue components 
* [Ui] Added required support on text-field
* [Ui] ajax improvments
* [Ui] fix internalization
* [Ui] block has action slot
* [Ui] add text-field-read-reactive
* [social] Fixed #27 Splitted SendMailPlugin and MailSessionConnector.

Release 2.0.0 - 2019/03/22
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-113-to-200)
* [Studio] unused attribute
* [Core] More specific temp dir for TempFiles
* [Database] add check for quoted bound param
* [Core] added conditions to filter abstract classes
* [Core] Possibility to have an optional parameter in the configuration
* [all] tests in junit 5 (use AbstractTestCaseJU5)
* __[all] Migrate from CONST_CASE to UpperCamelCase everywhere except in SQL databases__ a tool is provided to help migration
* __[core] all definitions are UpperCamelCase__
* [core] discovery : Added conditions to filter abstract classes
* [core] Removed deprecated Date DataType + remove all use of java.util.Date
* [core] Removed MessageTextBuilder (.of + simple)
* [core] Removed Tuple3, Tuples.Tuple2 renamed to Tuple
* [core] syntaxic sugar : use InjectorUtil instead of DIInjector
* __[core] replaced `@Named` by `@ParamValue`__
* __[core] Removed unused concept of named components__
* __[core] add yaml configuration with flippable features, xml configuration is now discouraged and will be removed in next version (even 2.x)__
* [core] refactored AppConfig -> Renamed in NodeConfig
* [commons] Fixed aggregate health status : 1 or more Red drive to Red
* [commons] Added ability to track non single thread processes
* [database] Added timeseries in database module
* __[database,dynamo,studio] remove hibernate support__
* [dynamo] Added check on association fix #129
* [dynamo] notNull is replaced by required in all ksp (task and entities)
* [dynamo] key is replaced by id in ksp
* [dynamo] URI is replaced by UID
* [dynamo] Made FacetedQueryResult serializable
* __[dynamo] Modified date pattern for ES query (breaking change)__
* [dynamo] localdate support in query
* [dynamo] ES: added optional param for embeded
* [dynamo] ES: Fix urn type, no normalizer
* [dynamo] ES: Fixed reindexall task when removed old elements
* [dynamo] From io.File to nio.Path
* [dynamo] DtListState.of
* [dynamo] Changed default charset ok Ksp loader from iso-8859-1 to utf-8
* [dynamo] Add FileInfoURI convert key for DataStore
* [dynamo] Upgraded ES version from 5.6.8 to 7.0.0, and Lucene from 6.6.0  to 8.0.0
* [dynamo] Fixed Search user DSL to escape bad syntax instead of VUser
* [dynamo] Added ElasticSearch plugin for v5.6
* [dynamo] Added clustering to CollectionsManager
* [dynamo] Fixed empty facets from Json with Vega
* __[dynamo] KSP Definition in CamelCase__
* [dynamo] remove brokerbatch and moved brokerNN in DataStore
* [dynamo] Fixed search by prefix with accents
* [dynamo] Simplified syntax to declare an association in ksp
* [dynamo] Fix domain metrics
* [dynamo] Replaced DAO access with DtListState instead of RowMax only
* [dynamo] Fix masterdatas to comply with with boot order : no more MasterDataInitializer -> replaced by a DefinitionProvider. Devs can use AbstractMasterDataDefinitionProvider
* __[es2.4] Remove ElasticSearch 2.4 plugin__
* [account] Allow comments in textauthentication plugin
* [account] Fixed account store plugin and null value
* [account] Support Id conversion from Account to Entity source
* __[account] Removed deprecated personna__
* [account] Removed definition prefix from authorization aspect
* [vega] fix Bug Content-Type sous JBoss
* [vega] Added support of '.' in exclude and include fieldname
* [vega] App version for swagger is a string
* [vega] Added Instant and LocalDate support to SwaggerApi
* [vega] UID Json encoding now send only key part, and use generics in order to resolved entity class
* [vega] Set attribute 'SessionExpired' true in case of session expiration
* [vega] Fixed iterator of uiListModifiable : remove change the expected count
* [vega] Inactive CacheControlFilter when Cache-Control header is already set
* [vega] Removed securityCheck of URL : may use @secured on WS
* [vega] Removed deprecated UiListState
* [studio] multiple files for sql init of staticmasterdatas
* [studio] dt objects can be splitted by feature
* [studio] fix dao import when dt_index = keyconcept
* [studio] created a SearchClient component dedicated to search access
* [studio] Drop if exists
* [studio] Removed sequences for non numeric PK
* [all] update dependencies log4j2 2.11.0 -> 2.11.2 ; cglib-nodep 3.2.6 -> 3.2.10 ; gson 2.8.2 -> 2.8.5 ; c3p0 0.9.5.2 -> 0.9.5.3 ; janino	3.0.8 -> 3.0.12 ; ehcache 2.10.4 -> 2.10.6 ; berkleydb sleepycat je 7.5.11 -> 18.3.12 ; rest-assured 3.0.7 -> 3.3.0 ; freemarker 2.3.23 -> 2.3.28 ; javax-mail 1.6.0 -> 1.6.2 ; h2 1.4.196 -> 1.4.199 ; struts2 2.5.16 -> 2.5.20 ; fr.opensagres.xdocreport.converter.odt.odfdom 2.0.1 -> 2.0.2 ; fr.opensagres.xdocreport.converter.docx.xwpf 2.0.1 -> 2.0.2 ; org.apache.poi 3.16 -> 4.0.1
* [Social] Add userContent on notification : can be used for favorite or pin (per user features)
* [Social] Move MailManager from vertigo-mail to Vertigo-Social
* [Social] Fix comments memory plugin
* [Social] Fix comment sorting of memory plugin
* [Social] Updated Comment WS api : return Comment, when create or update
* [Ui] Add new frontend stack, modern Ui, great UX and DX, server side rendering Ui (SpringMvc, Thymeleaf and vueJs/Quasar web components) 
* [Orchestra] Add default value for some params
* [Orchestra] On startup clean planifs of current node
* [Orchestra] Fix process termination on throwable (not only exception)
* [All] Rename URI to UDI
* [All] Add/Complete Manifest class of each modules (Features classes)
* **[All] Update JUnit4 to JUnit 5**
* [Ledger] Add new module to easily use blockchain's trust
* [Dashboard] Refactored to easily produce dashboard : timeseries database and awesome charts :)
* [Struts2] Update lib version
* [Struts2] Change some use of io.File to noi.Path
* [Geo] Add Ban (etatlab) plugin for free geoCodage api (france only) 
* [Rules] Some refactoring
* [Workflow] Some refactoring, use PostgreSQL by default
* [Adapater] Some fix on IftttAdapter


Release 1.1.3 - 2019/03/21
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-112-to-113)
* [Studio] unused attribute
* [Core] More specific temp dir for TempFiles
* [Database] add check for quoted bound param
* [Core] added conditions to filter abstract classes
* [Core] Possibility to have an optional parameter in the configuration
* [Social] Fix #21 clean older notifications with time boxing : 10s every minute 


Release 1.1.2 - 2018/06/28
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-111-to-112)
* [all] **Use this version for a java9+ project.**
* [Vega] Moved VSecurityException to Account
* [Account] Added AuthorizationAspect : Warning reentrance not supported
* [Dynamo] Fixed defaut index data type when analyser is set
* [Dynamo] Added berkley database name in logs and fix some purge parameter
* [Account] Changed deprecated use className
* [Core] Fix for java 9+ compatibility in XMLModuleParams.
* [Dynamo] Fixing bug on index name not lowered when a prefix is used
* [vega] fix swaggerUi


Release 1.1.1 - 2018/04/27
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-110-to-111)
* [Dynamo] Fixed IndexType parsing
* [Dynamo] Fixed collections facets
* [Dynamo] Fixed search.sortable fields with specific filter (lowercase, acsiifolding)
* [dynamo] additional params for batch tasks
* [Dynamo] Changed berkeley usage for compatibility 5.x to 7.x
* [Dynamo] Added maven repo for berkeleyDb
* [Dynamo] Fixed #115 use Set for dirtyElements
* [Vega] Fixed selectedFacet by label or by code
* [Vega] Fixed bad contextPath of spark
* [Vega] Fixed accept UiListState (deprecated)
* [Vega] Fixed swaggerUi
* [Vega] Added tests for search json serialisation
* [Vega] Updated swaggerUi version from 2.2.10 to 3.9.2
* [Vega] Fixed check of requests access
* [account] fix bug in textAuthenticationPlugin
* [Account] Fixed when AuthToken isn't a String
* [studio] fix security generator
* [Studio] Fixed TS mda
* [Studio] Fixed computed fields for properties and enum
* [Commons] Add specific base64 to base64url tests
* [core] fix discovery of proxies + added test
* [all] update dependencies 
  * com.h2database/h2 : 1.4.196 -> 1.4.197
  * org.codehaus.janino/janino : 3.0.7 -> 3.0.8
  * org.apache.logging.log4j/log4j-core : 2.9.1 -> 2.11.0
  * cglib/cglib-nodep : 3.2.5 -> 3.2.6
  * org.hibernate/hibernate-core : 5.2.11.Final -> 5.2.15.Final
  * org.elasticsearch/elasticsearch : 5.6.2 -> 5.6.8
  * org.elasticsearch/elasticsearch : 2.4.5 -> 2.4.6
* [quarto] fix creation of final doc (medias etc...) (docx)
* [quarto] fix new paragraphs on line breaks (docx)
* [orchestra] fix params in memoryImpl
* [dashboard] some minor additions (bêta)
* [struts2] Added multiple file upload support
* [struts2] Alternative Struts2 multipart request parser for servlet 3
* [struts2] Added hash on sessionId to secure them
* [struts2] added remove in KActionContext
* [struts2] UiUtil now handle all types of UiList
* [all] update dependencies : org.apache.struts/struts2-core : 2.5.14.1 -> 2.5.16, org.apache.strutsstruts2-spring-plugin : 2.5.14.1 -> 2.5.16, org.eclipse.jetty/all : 9.4.7.v20170914 -> 9.4.9.v20180320, com.machinepublishers/jbrowserdriver : 0.17.9 -> 0.17.11

Release 1.1.0 - 2017/12/07
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-100-to-110)

* [core] stop failed started component + resilience on stop 
* [core] added proxies
* [core] Added ZoneIdProvider like LocaleProvider
* [core] Added defaultZoneId to managers.xml boot tag 
* [commons] healthchecks and metrics are handled by AnalyticsManager 
* [commons] daemons are traced by analytics
* [commons] metric provider are now registered with annotated methods
* [commons] change default port for log4j socket connector 4562 for log4j2 
* [commons] clean ThreadLocals on daemons to avoid non wanted behaviours 
* [commons] fix bug in processTracer tree 
* [database] created features' class
* [database] refac sql : named params are now supported
* [database] [dynamo] moved vendors 
* [database] added sqlMapper 
* [dynamo] Update ElasticSearch to 5.6, and Lucene to 6.6.0 
* [dynamo] Fixed lowercase dtDefinition when index is per type 
* [dynamo] added plugin for ES 2.4
* [dynamo] Removed highlights in clustered result 
* [dynamo] refactoring domain (multiple + valueobjects)
* [dynamo] replaced ZonedDateTime by Instant
* [dynamo, studio] static masterdata are accessed by an enum (via a dedicated accessor)
* [dynamo] Added multi selectable facet support
* [dynamo] Fixed SearchManager for multiple SearchIndexDef on same KeyConcept
* [dynamo] added support of list of primitives in taskengines
* [dynamo] switch to accessor for accessing fks on entities 
* [dynamo]  FsFullFileStorePlugin uses a store path with year, month, day
* [account] Renamed IdentityManager to AccountManager
* [account] Renamed AccountProvider to IdentityProvider 
* [vega] remove serialization of computed fields 
* [vega] added test for embeded entities in post payload
* [studio] added sql generation for masterdata 
* [studio] Updated Typescript generation for Focus4 (Node, Entity and masterData)
* [studio] Task with one input of Data-Object are DAO instead of PAO
* [studio] Changed sequence generator name in JPA annotation to be unique 
* [all] Added healhchecks on multiple components
* [all] Code cleaning, refactoring and documenting 
* [all] Migrated Log4j to Log4j2
* [all] Updated versions (gson, hibernate, junit) : gson 2.8.1 to 2.8.2, hibernate 5.2.10 to 5.2.11, junit 5.0.0-M4 to 5.0.1
* __[all] Execution error with jdk 1.8_51 should use more recent version__
* [dashboard] added module dashboard (bêta)
* [struts2] Added multiple file upload support 
* [quarto] Fixed #12 (LocalDate and DateTime) 
* [all] Updated versions (javax.mail, lucene, selenium) : javaxmail 15.6 to 1.6.0, lucene 5.5.4 to 6.6.1

Release 1.0.0 - 2017/07/07
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-094-to-100)

__In Bold__ : Potential compatibility problems 

* [all] Code cleaning, refactoring and documenting 
*	[all] Added Dependency-check maven plugin
*	[vertigo] Builder Refactoring (General use is now : ObjectToBuild.builder() )
* [core] refactoring
* [core] silent => verbose (silently mode by default)
* [core] Params.of
*	[core] Introduced Proxy (+refactoring componentConfigBuilder)
* [core] Better exception if a looking for class don't extends the class
* [core] removed withApi(boolean) on moduleConfigBuilder
*	[core] replaced long by Instant (start date of app)
*	[core] refactoring MessageText (+ deprecated old api for migration ease)
*	[core] rem describable
* [core] first impl of a NodeManager (still a work in progress)
* [core] refactored LifeCycle
*	[core] components are now definition providers
*	[core] move classes from lang to components and locale
*	[core] definitionProvider +simple in features
* [account] introduced new module to handle security (authentication, authorization...)  
* [account] introduced a multi dimensions protection of entities (first impl ie still a work in progress)
*	[account] Added grants and overrides on advanced security
*	[account] Added support to security enum dimension
*	[account] Added support of tree security dimensions
*	[account] Splited UserSession to simpler UserSession and PersonaUserSession
*	[account] Added Store Realms Authentification and Identity
*	[account] Used salted-PBKDF2 hash algo for password instead of salted-SHA256
* [commons] replaced Listener by Consumer (Java8 style) (EventBus)
*	[commons] Added RedisCachePlugin
*	[commons] refactored eventbusManager
*	[commons] introduced CacheDefinition, EventBusSubscriptionDefinition, DaemonDefinition
*	[commons] introduced @EventSubscribed to register to a event on a component
*	[commons] introduced @DaemonScheduled to register a daemon on a component
*	[commons] Added VTransactionManager as default feature
* [commons] Refactored AnalyticsTracer : ever logs, no stack
* [commons] eventbus and daemon are now registered with annotations
* [database] introduced new module for handling databases (especially sql)
*	[database] refac Sql (use java type instead of DataType)
* [database] added tests for all databases (Oracle, Postgre, H2, SQLServer) 
* [database] added tests for batchs
* [database] insertions in Oracle databases now uses generated keys (no more callableStatements)
* [database] Hsql-> HSql
*	[database] added Java 8 LocalDate
* [database] added test on sql / blob --- java / dataStream
*	[database] sql -> functional style
*	[database] refac generatedKeys
*	[database] Declared ZonedDateTime and LocalDate as primitive types
* [dynamo] removed dynamic behaviour on DtDefinition
*	[dynamo] Made search highlight optional and desactivated by default
*	[dynamo] Show fluent sorting with generics
*	[dynamo] Added markAsDirty one uri for common usage case
* [dynamo] added convenient method .of to build DtList (DtList.of(dt1,dt2,...)
*	[dynamo] added a filter method on VCollectors
*	[dynamo] only true and false for a boolean property
* [dynamo] replaced with by add in FacetedQueryResultBuilder
*	[dynamo] introduced VAccessor concept
* [dynamo] refac CollectionsManager (replaced by java8 equivalents)
*	[dynamo] used Criterions instead Of CollectionsManager
* [dynamo] Renamed FacetedQueryResultBuilder to FacetedQueryResultMerger
* [dynamo] Added sort order support to range facet definition
* [dyanmo] moved criteria from dynamo/store to dynamo/criteria
* [dynamo] _Removed elasticSearch1_7 plugin_
*	[dynamo] removed DtListRangeFilter
*	[dynamo] replaced filterByRange by Criterion.isBetween
*	[dynamo] replaced Collections.filterValue by Criterions.isEqualTo
*	[dynamo] replaced CollectionsManager by Criterions
*	[dynamo] remove SqlCallableStatement and out parameters in sql
*	[dynamo] created object are returned (FileStore, DataStore)
*	[dynamo] lucene index plugins are stored in a map in a fix cache context
*	[dynamo] move database in new module, move transaction in commons
*	[dynamo] added Java 8 LocalDate
* [dynamo] moved parser fom dynamo to database (bound statement)
*	[dynamo] Oracle Unit Tests
* [dynamo] Removed HSQL from tests / used H2 instead
*	[dynamo] Added LocalDate and ZonedDateTime support ot FormatterDate
* [dynamo] Use lambda for comparator
*	[vega] Fixed #88
*	[vega] Added WebServiceDefinitionProvider using ClassSelector
*	[vega] Deprectaed UiListState by DtListState
* [vega] fix for #89
* [vega] added simple healthcheck webservice
* [vega] Fixed #92
*	[vega] Fixed facets term count and streamed it
* [vega] Added json empty property deserialized as null (and add tests)
*	[vega] Added json converter for LocalDate and ZonedDateTime
*	[vega] Added some ZonedDateTime tests
*	[vega] fix validator with server state
* [studio] move in vertigo repo
*	[studio] refactored freemarker
*	[studio] refactored all models (models, source objects and templates are completely independants)
*	[studio] Fixed JPA annotations for Hibernate and its "special" sequences
*	[studio] Added TS generator
* [persona] deprecated module (use accoount for new projects)
*	[tempo] _remove module_ (use vertigo-mail and vertigo-orchestra extensions)
*	[all] Updated dependencies versions  …
 org.codehaus.janino janino 2.7.8 -> 3.0.7
 net.sf.ehcache ehcache 2.10.3 -> 2.10.4
 org.slf4j slf4j-api 1.7.22 -> 1.7.25
 org.slf4j slf4j-simple 1.7.21 -> 1.7.25
 com.google.code.gson gson 2.8.0 -> 2.8.1
 com.h2database h2 1.4.193 -> 1.4.196
 cglib cglib-nodep 3.2.4 -> 3.2.5
 org.reflections reflections 0.9.10 -> 0.9.11
 org.hibernate hibernate-core 5.2.6.Final -> 5.2.10.Final
 org.hibernate hibernate-entitymanager 5.2.6.Final -> 5.2.10.Final
 org.junit 5.0.0-M2 -> 5.0.0-M4
 com.sparkjava spark-core 2.5.5 -> 2.6.0
 io.rest-assured rest-assured 3.0.1 -> 3.0.3
* [all] added an ant target to replace old quarto's ksp by a DefinitionProvider
* [All] Code cleaning, refactoring and documenting 
*	[all] remove x in modules names
* [all] one extensions -> one maven module
* [all] all extensions have the same structure
*	[quarto] Fixed #6
*	[struts2] Added test tag label
* [orchestra] remove unnecessary logger
* [orchestra] move module in extensions
* [orchestra] addded a simple fallback for migration from removed _tempo_ (ProcessDefinition.legacyBuilder)
* [orchestra] fix bug in memory impl
*	[orchestra] bug fix (for update for planif)
*	[orchestra] bug fix (multiple planif) 
*	[orchestra] Fixed activities reservation : only waiting
*	[orchestra] Fixed some pb (reserve already reserved activities, lock )
*	[orchestra] Added MultiNode executors tests
* [workflow] Moving definitions and mda in io/vertigo/workflow
*	[workflow] remove x in all names
* [rules] Moving definitions and mda in io/vertigo/rules
*	[rules] remove x in all names
*	[social] Added notifications TTL support. With cleaner daemon and tests
* [social] Notifications Fixed queue order
*	[social] move redis-conntector to vertigo-commons
* [social] created new module to bundle comment, notification and more to come
*	[social] Fixed notifications Redis TTL 
*	[mail] move tempo/mail into vertigo-mail
* [stella] general refactoring (simpler + java8 primitives + master/worker) 
* [notification] moved to social
* [comment] moved to social
* [All] Updated dependencies versions
  org.assertj assertj-core 2.5.0 -> 3.8.0
  com.sun.mail javax.mail 1.5.5 -> 1.5.6
  com.h2database h2 1.4.193 -> 1.4.196
  io.rest-assured rest-assured 3.0.1 -> 3.0.3
  org.apache.poi poi 3.15 -> 3.16
  fr.opensagres.xdocreport * 1.0.6 -> 2.0.1
  com.google.code.gson gson 1.7 -> 2.8.1
  org.glassfish.jersey.core jersey-client 2.22.2 -> 2.25.1
  org.eclipse.jetty * 9.3.6.v20151106 -> 9.4.6.v20170531
  org.apache.lucene * 5.5.0 -> 5.5.4
  org.slf4j slf4j-log4j12 1.7.21 -> 1.7.25
  org.seleniumhq.selenium * 2.53.1 -> 3.4.0
  com.machinepublishers jbrowserdriver 0.17.3 -> 0.17.8
  commons-io commons-io 2.4 -> 2.5

Release 0.9.4a - 2017/03/15
----------------------
__This release is limited to Studio only__
* [Studio] Fix Studio issue 


Release 0.9.4 - 2017/03/13
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-093-to-094)

__In Bold__ : Potential compatibility problems 

__Warning : You must use 0.9.4a version of Studio module !!__
* [All] Code cleaning, refactoring and documenting (and Stream java8, Optionnal, Methods refs, ...)
* [All] Always use WrappedException (wrap & unwrap), and params order changed
* [All] Moved dsl classes from core to dynamo
* __[Core] Renamed Injector to DIInjector__
* [Core] ComponentConfigBuilder is no more generic
* [Core] Support features in managers.xml
* [Core] Component discovery in features
* [Core] Changed boot config managment (features, added plugins, ...) redundancy__
* [Core] Fixed #80 : We check file exists and canRead before accept this plugin
* [Core] Updated cglib » cglib-nodep from 3.2.2 to 3.2.4
* [Core] Added notepad++ coloration config
* [Core] Changed tests Junit4 Assert to JUnit5 Assertions
* [Core] Simple ParamManager API
* [Commons] Refactor AnalyticsManager, added some plugins to log, aggregate and centralize measures 
* [Commons] Updated minor slf4j-api from 1.7.21 to 1.7.22
* [Dynamo] Adding Collectors in order to create DtList from Java 8 stream
* [Dynamo] Fixed #79 Now fragments loaded by annotations correctly have a FK to the linked entity
* [Dynamo] Closed Jsonbuilder in Search codec
* __[Dynamo] Renamed read to readOne and readNullable__
* __[Dynamo] Renamed loadList to findAll__
* [Dynamo] Updated minor elasticsearch from 1.7.5 to 1.7.6
* [Dynamo] Updated versions of hsqldb 2.3.3 to 2.3.4; lucene 5.5.0 to 5.5.2; elasticsearch 2.3.5 to 2.4.4
* [Dynamo] Updated version of hibernate 5.1.0 to 5.2.6 (break StreamDataType for file store)
* [Dynamo] Renamed H2Database.java to H2DataBase.java
* [Dynamo] Fixed create domain for DTs and Fragments
* [Dynamo] Changed BerkleyDb cleaner config (1000 elements max every minute, cleaner_min_ustilization : 90, cleaner_min_file_utilization:50)
* [Dynamo] Updated BerkleyDb version to 5.0.84
* [Dynamo] Better spaces whereInPreProcessor detection
* [Dynamo] Better search for autocomplete : correct word order is more pertinent
* [Dynamo] Fixed reloadAndMerge when fragment have ui fields
* [Dynamo] Refactored Data access (database dialect moved from StoreManager to DataBaseManager)
* [Dynamo] Changed reindexer task log level to debug, if nothing was updated
* [Dynamo] Added new Criterions class, should replace previous ListFilter and Criteria
* [Dynamo] Fixed ReindexTask to use KeyConcept URI instead of Dt Index which could be unpersistent
* [Dynamo] A DtList can't be optional (especially in Tasks)
* __[Persona] Replaced Security DTD by XSD__
* [Persona] Added Dsl parser for security rule (usefull for next version of security managment)
* [Vega] Fixed #77 (WS routes with numbers)
* __[Vega/Struts2] Merged similarity between Struts2 and Vega, now Struts2 uses Vega to limit 
* __[Vega] Renamed classes prefixed by RestXXX to VegaXXX__
* [Vega] Renamed UiObject getStringValue to getInputValue
* [Vega] Added searchApiVersion param to VegaFeatures (usefull for tests)
* [Vega] Fixed swagger custom url param
* [Vega] Fixed ResponseWrapper for XOR mode Stream or Writer
* [Vega] Made AbstractHttpServletResponseWrapper autocloseable
* [Vega] Updated version gson 2.7 to 2.8.0; spark-core 2.5 to 2.5.4; com.jayway.restassured rest-assured 2.8.0 to io.rest-assured rest-assured 3.0.1
* [Vega] Fixed #76 (Optional inner body param cannot be a DtObject)
* [Vega] Updated version of spark java from 2.5.4 to 2.5.5
* [Vega] Added originCORSFilter params in VegaFeatures
* [Vega] Fixed swaggerUi when using apiPrefix
* [Vega] Updated SwaggerUi to v2.2.8
* [All] Code cleaning, refactoring and documenting (and Stream java8, Optionnal, Methods refs, ...)
* [All] Always use WrappedException (wrap & unwrap), and params order changed
* [All] Updating Workflow, Rules, Audit, Account with the latest sources from Kinetix
* [All] Moved impl package into extension's root package
* __[All] Renamed 	vertigo-x-parent==> vertigo-extensions__
* [WF] Added oom, crebase and DAO for WfEntities
* [WF] Refactored vertigo-x-workflow, many updates, tests and fixes
* [Account] fixed multi accounts with the same id
* [Notif] fixed multi notifs withe the same id
* [Notif] Standardization of Notification Center between Kinetix and Vertigo. Send Notification to a group is now deprecated. Please use send to a set of users instead.
* [Notif] Added Ws to remove many notifications
* __[Notif] Refactored Ws routes__
* __[All] Refactored structures. Rename xxxManager to xxxService__. Extension are little app so WebServices, Services, DAO.


Release 0.9.3 - 2016/10/11
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-092-to-093)

__In Bold__ : Potential compatibility problems 
* __[All] Updated to JDK 8__
* [All] Code cleaning, refactoring and documenting
* [All] Use Lambda when it's possible
* __[Core] Added aspect on plugins + checked unmanaged aspect__
* [Core] Added fluent assertion when( ... ).check(...)
* [Core] Better message for DSL Solver unknown definitions error
* [Core] Clearer message in case of unresolved names
* [Commons] Refactored base64 codec to use jdk
* __[Dynamo] Split DtObject as Entity (persistent) and simple DtObject (non persistent)_
*  __[Dynamo] Added fragment of entity__
* [Dynamo] Added support to unmapped sort field
* [Dynamo] Fixed #60. Use DtListState maxRows and skipRows when clustering result. (limited to 100 elements per group)
* [Dynamo] Fixed ElasticSearch must have a dataType for simple properties type (String, long, BigDecimal,...)
* [Dynamo] Fixed search indexType with optional analyzer
* [Dynamo] Refactor DSL parser (Ksp loader)
* [Dynamo] Removed property about persistence from dtDefinition
* [Dynamo] StoreManager only deals with entities
* __[Dynamo] Added maven module to support ElasticSearch 1.7__
* __[Dynamo] Updated ElasticSearch to 2.3.5 and Lucene to 5.5.0__
* __[Dynamo] Updated FacetedQueryResult JsonSerializer to Focus v3__
* [Dynamo] Added FK to Entity in Fragments
* [Dynamo] Added sort of elements inner a search cluster. Fix #73
* [Dynamo] Fix #73 for ElasticSearch 1.7
* [Dynamo] Fixed #69, now included in SerializerV4
* [Dynamo] Fixed DslListFilter for range query starting by *
* [Dynamo] Fixed sqlexception.getSQLState when it's null
* [Dynamo] Fixed unique constrainte violation on H2 database
* [Dynamo] Made reindex of dirty elements every 1s instead of 5s
* [Dynamo] Renamed stereotype Data to ValueObject (always default sterotype)
* [Dynamo] Updated DataStore and DAO to load and update Fragments
* [Dynamo] DtListProcessor is now typed
* [Vega] __Fixed check selected facet by code instead of label__
* [Vega] Fixed serialization of FacetedQueryResult, removed facet and group if 0 elements (for emptied scope added as facets)
* [Vega] Updated FacetedQueryResultJson as discuss in #69
* [Vega] __Updated spark from 1.1.1 to 2.5 (jdk8/lambda)__
* [Dynamo] __Moved ExportManagerImpl to quarto__
* [All] Fixed URI and persistence on Data/Entity objects
* [All] Updated to java 8
* [Audit] Initial release for vertigo-x-audit
* [Workflow] Initial release for vertigo-x-workflow
* [Rules] Initial release for vertigo-x-rules
* [All] Updated jedis


Release 0.9.2 - 2016/07/04
----------------------

[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-091-to-092)

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning, refactoring and documenting
* [All] Updated 3rd party libs versions (hsqldb, rest assured, gson, janino, ehcache, cglib, mail, slf4j, hibernate, dom4j, jersey, jedis, poi, openoffice)
* __[Core] Aligned vertigo Option api to JDK api__ (`isPresent`, `ofNullable`, `orElse`, `of`)
* [Core] Fixed #56
* [Core] Splitted App and autoCloseable (should use new AutoCloseableApp in unit tests
* __[Dynamo] Renamed DAOBroker to DAO__
* [Dynamo] Fixed #57 in DslListFilterBuilder, and other pb
* [Dynamo] isNumber() on dataType
* __[Dynamo] Renamed CRUD methods__ (get => read , getList => findAll)
* [Dynamo] Made selectForUpdate overridable, and specialized selectForUpdate for Ms SqlServer
* [Dynamo] Fixed missing parenthesis in result with DslListFilterBuilder for some multi fields syntax
* __[Dynamo] Search FacetedQueryResult json v3 (#59)__ (use `searchApiVersion` param on `GoogleJsonEngine` component to select api version)
* [Dynamo] Fixed Berkeley remove too old elements
*  [Dynamo] Fixed HsqlDb rownum
* [Dynamo] Fixed bad cached list size, when rowmax was used
* __[Dynamo] Removed deprecated getConnectionProvider__
* [Dynamo] Renamed methods : `toUrn` to `urn`
* [Dynamo] Create URI public on `DtObjectUtil`
* [Dynamo] Preserve stacktrace if Search Exception
* [Dynamo] Fixed #63 - Errors in JpaDataStore
*  [Dynamo] Fixed #66 Retry indexation 5 times of dirty elements in case of error
* [Vega] Invalidate session when newly created session throws VSecurityException
* [Vega] Added token tests for anonymous users
* [Vega] Fixed Swagger Api for errors
* [Vega] Added test for String in body
* [Vega] Fixed preflight Options (misspelled header name)
* [Vega] Fixed #64 : concat hashcode to truncated name
* [Vega] Added global prefix for Spark route (param `apiPrefix` of `SparkJavaServletFilterWebServerPlugin`)
* [Vega] Added Highlight for search results in FacetedQueryResult json v4


Release 0.9.1 - 2016/02/08
----------------------

[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-090-to-091)

__In Bold__ : Potential compatibility problems 
* __[All] Refactored all (injectable) components must extend Component__
* [All] Code cleaning, refactoring and documenting
* [All] Removed components inheritance from managers.xml (all components are component !!)
* [All] Updated FormatterException to a checkedException
* [Commons] Refactored Analytics, added AnalyticsTracker to replace module listeners
* [Commons] Refactored Daemon
* [Commons] Refactored cache to use CacheConfig instead of Modifiable interface  
* [Commons] Renamed EventManager to EventBusManager
* __[Core] Removed initClass on component in managers.xml__
* __[Core] Removed inheritance on module in managers.xml__
* [Core] Added ListBuilder
* [Core] Added init phase in the config files
* [Core] Changed msg for missing params
* [Core] Fixed #45 : Better message
* [Core] Fixed ClassPathResourceResolver should catch exception when can't resolve ressource
* [Core] Removed modifiable interface
* [Dynamo] Added VFile creator from URL
* [Dynamo] Added after and before commit functions for Transactional operations
* [Dynamo] Added count(collection) and clear(collection) on KvStore
* [Dynamo] Added deamon to remove old tempFiles
* [Dynamo] Added error message for Search syntax
* [Dynamo] Added escape char \ in DslListFilterBuilder
* [Dynamo] Added escape or remove reserved word, query operation (issue #49)
* [Dynamo] Added Search Facet order alpha or count
* [Dynamo] Added listFilter better detection of reserved keywords
* [Dynamo] Added support ][ and {} in DtListPatternFilterUtil for range
* [Dynamo] Added support to elasticsearch copyTo fields
* [Dynamo] Changed KvStore collection spliter to accept spaces
* [Dynamo] Changed ListFilterBuilderTest; Test and fix #47 and #46
* [Dynamo] Changed Tx resources to keep them ordered
* [Dynamo] Continued #38 : better hashcode on Criteria 
* [Dynamo] Created component interfaces StoreServices for Dao, Pao; Manager; SearchLoader
* [Dynamo] Fixed #47 : Bad ES Request for 1 character value
* [Dynamo] Fixed #50 : Bad ES request in case of Exact search query. Detect " " and ( ) and remove added ( )
* [Dynamo] Fixed #53 : FilterCriteriaBuilder withPrefix(DtFieldName,...) is incoherent with withPrefix(String,...)
* [Dynamo] Fixed Dsl syntax of multi fields
* [Dynamo] Fixed Facets type other than String (recreate index mandatory)
* [Dynamo] Fixed ListFilterBuilder when user query is one char
* [Dynamo] Fixed Search Loader when no data
* [Dynamo] Fixed reindex task when more than 1000 uri are dirty
* [Dynamo] Merged BerkeleyKvStore and DelayedBerkeleyKvStore
* [Dynamo] Refactored CollectionManager sort : use DtListState
* [Dynamo] Refactored lockForUpdate to readForUpdate, match main usage (as #48)
* [Dynamo] Removed Low Transactional resources priority
* [Dynamo] Renamed C"R"UD, so load=>read
* [Dynamo] Renamed PRIMARY_KEY by ID on DtDefinition (and pk to id)
* [Dynamo] Renamed fileStorePlugin remove to delete (CRUD : D => delete)
* [Dynamo] Renamed storeName to collection for KvStore and dataSpace for other store
* [Dynamo] Replaced MockConnectionProvider by a C3p0 impl
* [Dynamo] Search : Added dummy FacetDefinition when create dummy cluster
* [Dynamo] Updated elasticSearch to 1.7.5
* [Dynamo] changed count from long to int
* [Dynamo] refactored RAMLuceneindex
* [Studio] Fixed #32 : Add generated route js useable by Focus
* [Studio] Refactored lockForUpdate to readForUpdate, match main usage (as #48)
* [Studio] Renamed PRIMARY_KEY by ID on DtDefinition (and pk to id)
* __[Vega] Fixed Date / DateTime diff in Json ( supposed date if 00:00:00.000 )__
* [Vega] Added ClassPathWebServiceLoaderPlugin with org.reflections
* [Vega] Added UiSelectedFacets with toListFilters for facetted search api 
* [Vega] Added support optional parameters in SwaggerApi
* [Vega] Added support to ( ) in routes (WARN : don't work in swagger yet, don't use it)
* [Vega] Added toDtListState on UiListState
* [Vega] Added unwrap WrappedException before return httpcode
* [Vega] Default sort asc
* [Vega] Fixed #52
* [Vega] Fixed SwaggerAPI
* [Vega] Fixed contentType while preflight Cors request
* [Vega] Fixed requests not mark as succeeded
* [Vega] Refactored JsonSerializer for FacetedQueryResultJson v2      
* [Vega] Removed nullLast and ignorecase in DtListState
* [Vega] Renamed WebServiceIntrospector to WebServiceScanner


Release 0.9.0 - 2016/02/08
----------------------

[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-083-to-090)

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning and refactoring
* [All] Refactored RuntimeExceptions to VSystemException and WrappedException
* [Core] Detect prefix boot. to resolved env properties
* __[Core] Refactored initializers (not generics anymore, should use @Inject)__
* [Vega] Fixed routes order : /x/* are now after more specialized routes
*  __[Dynamo] Renamed DslXxxDefinition to DslXxx and removed deprecated RegExpListFilterBuilder__
* [Dynamo] Replaced RegExpListFilterBuilder by Dsl ones
* [Vega] Made VSecurityException runtime and using MessageText
* __[Vega] Added DtList deserializer support. WARN : no constraints check__
*  [Dynamo] Fixed delete order for TwoTablesDbFileStorePlugin
* [Core] Replaced componentSpace and definitionSpace accesses by Home.getApp().xx instead of Home.xx
* [Core] Changed syntax for params in config => '${xx}' instead of 'conf:xx' or '{xx}'
* [Core] Added method addAll with array on ListBuilder
* [Core] Added ResourceManager, LocaleManager and ConfigManager in the boot phase
* __[Core] Renamed ConfigManager to ParamManager__
* [core] Supported boot params from environment variables
* [Core] Removed EnvironmentManager 
* [core] Refactored DefinitionSpace and ComponentSpace as simple containers
* [Core] Better cyclic dependencies message
* [Dynamo] Splitted KVStoreManager from StoreManager
* [Dynamo] Added DataStoreName on DT and TK to allow multiple databases
* [Dynamo] Refactored Search : indices by conf for env, uses types for clustering documents
* [Dynamo] Fixed tests : DefinitionSpace no more injectable  
* [Dynamo] Fixed managers.xml, add locales on boot tag
* [Dynamo] Fixed search listFilterBuilder range 'to' to 'TO' ES keywords must be uppercase
* [Dynamo] Renamed cores to envIndex on ElasticSearch plugins
* [Dynamo] Changed elasticSearch version from 1.5.2 to 1.7.3 (can be downgraded)
* [All] Rollback to itext 2.1.7 (after they overrided 4.2.1 version on maven repo to scrap it)
* [Dynamo] Fix #38. Added hashCode on FilterCriteria
* [Tempo] Fixed mail starttls support (by @Jerom138)
* Merge pull request #36 from durandx/rename-tool-fix Fix rename issues for v0.8.1 & v0.8.2
* [All] Code cleaning, refactoring and documentations
* [All] Updated to vertigo 0.9.0
* [Comment] Updated manager api : loggedUser is resolved in WebService not in Manager
* [Connector] Upgraded jedis to 2.8.0
* [Connector] Added redis database on RedisConnector
* [Connector] Merge pull request #3


Release 0.8.3 - 2015/10/08
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-082-to-083)

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning and refactoring
* __[All] Updated dependencies libs : gson 2.4, jedis 2.7.3, elasticsearch 1.5.2, poi 3.13__
* [Core] Fix #28 log warn for missing ressource in mono-langage app
* __[Dynamo] Renamed GroupCriteria mode intersec to intersect__
* __[Dynamo] BrokerNN is an helper, accessible from DAOBroker only, no more from StoreManager__
* __[Dynamo] Refactored brokerBatch api.__ (will be deprecated soon)
* __[Dynamo] Added DslListFilterBuilder (preconised) and renamed DefaultListFilterBuilder to RegExpListFilterBuilder (deprecated).__
* __[Dynamo] DslListFilterBuilder support MultiField, Range criteria. Better handle of query syntax.__
* [Dynamo] Renamed attribute notNull to required in DtField and TaskAttribute. (Ksp not impacted yet, only java object)
* [Dynamo] Some refactoring around JPA
* [Dynamo] Added transactional aspect in features
* [Dynamo] Fix #29 reindexAllTask missing some documents ~1/500
* [Vega] Fixed Facets order in json
* [Vega] Refactored Cors for FileUpload (handle Options requests)
* [Vega] Fixed FileUpload from Focus (dropzone)
* [Vega] Refactored JsonConverterHandler to JsonSerializer
* [Struts2] Fix #22
* [Studio] Fix #23. Cast TaskResult when Option.


Release 0.8.2 - 2015/09/10
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-081-to-082)
__In Bold__ : Potential compatibility problems 
* [All] Lots of code cleaning and refactoring
* [All] Changed private methods that can be static to static
* [All] Refactored enties and dsl
* [All] Refactor java.lang.Timer to DeamonManager
* [All] Added Features to make NodeConfig simpler
* [Core] Added putNullable on MapBuilder
* [Core] Param was nullable in builder and checked when injected
* [Core] Removed injection JSR250 support. Use Activeable interface exclusively
* [Core] Added check id type of URI (no more String into numeric PK)
* [Core] Renamed Home into App in tests
* [Commons] Plugged Analytics on WebService, Task, Job and Search
* [Commons] Replaced LocalEventsPlugin by a simple processor
* [Commons] Added DaemonManager for managed daemon task
* __[Dynamo] Added AnalyticsManager when using SearchManager__
* __[Dynamo] Removed inout params (now, a param is 'in' xor 'out')__
* [Dynamo] Added support of multiple values criteria into DefaultListFilterBuilder
* [Dynamo] Assertion to avoid multi TaskEngine invocation
* [Dynamo] Merged jpa into HibernateConnectionProviderPlugin
* [Dynamo] changed FileStore's api to obtain the same api than dataStore
* [Dynamo] Kvdatastore Berkeley can manage Set as HashSet
* [Dynamo] Splitted SearchLoader SQL logic and chunk logic
* __[Dynamo] Renamed DefaultSearchLoader to AbstractSqlSearchLoader__
* __[Dynamo] Renamed Broker to DataStore__
* [Dynamo] Added DtObjectUtil.createUri by class and id
* [Dynamo] Fixed search reindex count
* [Studio] Removed Constants to generate a pretty code
* [Studio] Task has 0 or 1 result  
* [Studio] Fixed if report file already exist
* [Quarto] Error msg clearer
* [Struts2] Fixed stacking previous state of layout in tags (allow div tree, use it carefully :))
* [Persona] Added custom attributes on UserSession to register data from addons
* [Tempo] Added more tests
* [Tempo] Added log for error
* __[Vega] Replaced session attribute key : vertigo.rest.Session to vertigo.webservice.Session__ 
* __[Vega] Replaced SparkApplication by simpler VegaSparkFilter__ 
* [Vega] Fixed swagger for some path
* __[Vega] Renamed ApplicationServletContextListener to AppServletContextListener__, and removed Abstract parent
* __[Vega] Renamed ServletListener to AppServletListener__ 
* [Vega] Renamed HomeServletStarter to AppServletStarter 
* __[Vega] Renamed all RestXXX into WebServiceXXX__
* __[Vega] Renamed all WebServices related objects with WebService prefix__
* [Vega] No more override httpStatusCode if already set by WebService impl
* [Vega] Refactored RoutesRegisterPlugin to WebServerPlugin
* [Vega] Refactored JsonConverterHandler, __extract ServerState behaviour in a new optional plugin__
* [Vega] Renamed DtObjectExtended to a more generic ExtendedObject
* [Vega] Added option support in WS params
* [Vega] Added support to HTTP NotModified 304 response 
* [Vega] Renamed DefaultJsonReader to RequestJsonReader
* [Vega] Added URI json serialization
* [Vega] Added PATCH verb


Release 0.8.1 - 2015/07/31
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-080-to-081)
* [All] Lots of code cleaning and refactoring
* [Core] Renamed io.vertigo.core.Home.App to io.vertigo.core.App
* [Core] Renamed io.vertigo.core.boot to io.vertigo.core.config
* [Core] Renamed io.vertigo.core.di to io.vertigo.core.component.di
* [Core] Refactor XMLNodeConfigBuilder 
* [Core] Refactor modules order/priority in managers.xml. Loading order are more predictible now : 
 1. boot module
 2. definitions
 3. other components module per module (as before)
* [Core] Moved LocalManager and ResourceManager from commons to core.
* [Core] Moved EnvironmentManager from dynamo to core
* [Dynamo] Fixed search case/accent sensitive while using wildcard
* [Dynamo] Fixed search securityFilter
* [Dynamo] Add default value to DefaultListFilterBuilder
* [Dynamo] return Future<Long> on reindexAll to allow join on reindex
* [Dynamo] CSVExporter should kept empty value as empty
* [Dynamo] Renamed ESSearchServicePlugin to ESNodeSearchServicePlugin
* [Dynamo] Fixed store object without index
* [Studio] Fix JS templates style, to fit with ESLint

Release 0.8.0 - 2015/07/02
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-075-to-080)
* [All] Fixed some code style and some refactor to simpler code
* [All] Renamed prefix in Builder with ==> add
* [Core] split BootConfig from NodeConfig
* [Core] Refactoring DI
* [Core] Added better error message for missing definition while solving
* [Commons] Added daemonManager
* [Dynamo] Removed deprecated methods
* [Dynamo] Fixed FsTransactionResource, Temp files not deleted in some case
* [Dynamo] Added possibility to specify a search data type for index (in addition to the analyzer)
Use indexType : "analyzerName:dataTypeName" in domain declaration in KSP
* [Dynamo] Search return hightlights on result's fields only
* [Dynamo] Fixed search clustering create full list
* [Dynamo] Fixed and test #15
* [Dynamo] Renamed stereotype Subject to KeyConcept
* [Dynamo] Refactored and removed SearchIndexFieldNameResolver
* [Dynamo] Added EventsManager required by StoreManager (old PersistenceManager) 
* [Dynamo] Added RedisConnector
* [Dynamo] Complete refactor of SearchManager : integration in broker, KSP declaration of index definitions
* [Dynamo] Added FacetQueryResultMerger
* [Dynamo] Added DefaultSearchLoader and DefaultListFilterBuilder
* [Dynamo] Added ESSearchPlugin with TransportClient
* [Dynamo] Updated elasticSearch to 1.4.5
* [Dynamo] Fixed try with ressource of autonomous transaction
* [Dynamo, Studio] Renamed PersistenceManager to StoreManager
* [Dynamo, Studio] Renamed Broker to DataStore
* [Dynamo] Added Search facetValue sorted by count
* [Studio] Added optionnal dictionaryClassName param to specify dictionaryClassName, default to DtDefinitions (Fix #3)
* [Tempo] Added timeout in DistributedWorkerPlugins for connections from client to server
* [Tempo] Split scheduler and executor
* [Tempo] Added minute to jobManager.scheduleEveryDayAtHour
* [Quarto] Fixed UnitTests
* [Studio] Continue refactor to use stereotype KeyConcept in studio
* [Studio] Continue refactor to Search in generated DAO
* [Struts2] Fixed an error when escaping caracters in JSON
* [Struts2] Select multiple : listCssClass
* [Vega] TokenManager optionnal in JsonConverterHandler
*  [Vega] Fixed content-type name : now use '=' instead of ':'
* [Vega] Updated Swagger-ui to 2.1.0
* [Vega] Added support of FacetedQueryResult in WebService
* [Vega] Started expand jsonConverterHandlerPlugin into simplier JsonConverter per type


Release 0.7.5a - 2015/03/23
----------------------
* Fix of two 0.7.5 issues 


Release 0.7.5 - 2015/03/20
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-074-to-075)
* [Core] Renamed KTransaction to VTransaction
* [Dynamo] Renamed KSecurityManager to VSecurityManager
* [Dynamo] Renamed KFile to VFile
* [Dynamo] Renamed KxFileInfo to VxFileInfo
* [Dynamo] Added DtFieldName to FilterCriteria API
* [Dynamo] Added DtListState for sorting, offset and limit query. Applied on search only
* [Dynamo] Some code style
* [Studio] Fixed Dto generated with DtListURIForXXAssociation
* [Struts2] Fixed FTL : css, checkbox
* [Quarto] XDocReportConverterPlugin : XDocReport based ODT to PDF converter plugin


Release 0.7.4 - 2015/03/12
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-073-to-074)
* [All] Fixed some code style
* [All] Removed some deprecated : PersistenceManager.getBrokerConfiguration, PersistenceManager.getMasterDataConfiguration, UiMessageStack.hasErrorOnField, UiRequestUtil.getHttpServletRequest, UiRequestUtil.getHttpSession
* [Core] Aspects Order preserved
* [Core] Renamed vertigoimpl.commons to vertigo.commons.impl
* [Commons, Dynamo] Fixed index cacheability. For cache not serializable value. 
* [Dynamo] Added index settings check at startup
* [Dynamo] Fixed highlights on full_result field
* [Dynamo] Added Stereotype of DtObject : Data, MasterData or Subject
* [Dynamo] Refactored broker, cacheStore, SearchManager (introducing searchQueryBuilder)
* [Dynamo] Fixed searchQuery serializable
* [Dynamo] Added search clusering by facet, and FacetQuery is now optionnal, SearchQuery serializable
* [Dynamo] Fixed WhereIn with lowercase column name
*  [Dynamo] Fixed user exception detection/extraction
* [Dynamo] Updated ElasticSearch configFile
* [Struts2] Fixed readonly multi select
* [Struts2] Added assert uiMdList used with MasterData DtDefinition
* [Struts2] Renamed HomeServlerStarter to HomeServletStarter
* [Struts2] Added assert fieldName in camelCase
* [Struts2] Refactored formatter (no more FMT_DEFAULT)
* [Struts2][Vega] Added check of boot.applicationConfiguration
* [Struts2] Changed ftl usage as struts2.3.20
* [Struts2] Updated fielderror to add a onclick on error label to focus the field
* [Struts2] Updated to struts 2.3.20
* [Vega] Added encoder FacetedQueryResult to Json
* [Vega] Refactored RouteHandler to RestHandlerPlugin : make more configurable request processor stack
* [Vega] Added check response is commited when managed in controller
* [Studio] Made computed field always transient
* [Studio] Made generator target dir defined by plugins. Now you could generate : javagen, sqlgen, jsgen
* [Studio] Fixed hibernate sequence
* [Tempo] Added dead node detection of rest distributed
* [Quarto] Fixed #14

Release 0.7.3 - 2015/02/02
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-072-to-073)
* [All] Refactored tests to made them more autonomous
* [All] Fixed some code style
* [All] Cleaned some dependencies
* [Dynamo] Split DtListProcessor to dispatch between java or index powered operations
* [Dynamo] Made Id fieldName free for FileStorePlugin
* [Dynamo] Fixed Facet filtering
* [Dynamo] Fixed #12 in ES connection settings
* [Dynamo] Fixed FsFileStorePlugin error when target directory already exists
* [Dynamo] Simpler WhereInPreProcessor using with regexp
* [Dynamo] Fixed sorting crash on null valued field
* [Dynamo] Split fileInfoURI and DtObjectURI
* [Dynamo] Renamed datastore plugin : ...persistence.oracle.OracleDataStorePlugin to ...persistence.datastore.oracle.OracleDataStorePlugin
* [Dynamo] Refactored DaoBroker, Broker and Datastore
* [Studio] Changed hibernate generationType SEQUENCE to AUTO
* [Studio] Fixed crebase.sql a semicolon ommited when no tablespace is defined
* [Quarto] Added timeout to converterTask
* [Quarto] Renamed plugins to be compliant with naming rules (MergerPluginDOCX to DOCXMergerPlugin, same for OpenOffice)
* [Commons] Renamed MapCachePlugin into MemoryCachePlugin
* [Struts2][Vega] Force to prefix servlet parameters with 'boot.' (for orphan detection)
* [Struts2] ValidationUserException accept DtFieldName
* [Struts2] Fixed fieldname in ftl for ajax component
* [Struts2] Removed ``<br>`` in radiomap, should use css instead
* [Struts2] Added getBidDecimal in UiObject for validators use
* [Vega] Refactored CorsAllowers : extended, renamed as Handler, made optional
* [Vega] Changed RateLimiting window from 15mn to 5min
* [Vega] Fixed paginator
* [Vega] Splitted fieldErrors and objectFieldErrors for easier managment client side
* [Core] Renamed XMLNodeConfigBuilder to XMLModulesBuilder
* [Core] Refactored NodeConfig, simpler external LogConfig
* [Core] Merged App and Home
* [Studio,Core] Refactored Env parameters
* [Core] Fixed aspect bug


Release 0.7.2 - 2014/12/16
----------------------
* [Dynamo] Forced Hibernate sequence handler to use DB sequence
* [core] Fixed aspect bug
* [Studio] Fixed js generator, sql generator, updates dectector
* [Studio] Added sql tablespaces (data and index) : use optional params on SqlGenerator tableSpaceData and tableSpaceIndex


Release 0.7.1 - 2014/12/09
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-070-to-071)
* [Studio] Refactored : DomainGeneratorPlugin splited into more Plugins usages dependents (look at SqlGeneratorPlugin and JSGeneratorPlugin)
* [Studio] Fixed sql.ftl
* [Vega] UiListState in query instead of body
* [Dynamo] Fixed #10 and #11
* [Studio] ElasticSearch type mapping
* [Vega] Refacted JsonConverter and added DtList support in body
* [Vega] Added defaultValidator on Xxx&lt;O extends DtObject&gt;
* [Vega] fixed "already commited response" error
* [Vega] Added upload file test
* [Core] Refactored aspects : global scoped, simplier declarations with only one tag &lt;aspect&gt; with an attribute class extends Aspect


Release 0.7.0 - 2014/11/25
----------------------
[Migration help](https://github.com/vertigo-io/vertigo/wiki/Vertigo-Migration-Guide#from-06x-to-070)
A big version :)
* [All] Lots of code style fixes, tests units coverage, cleaning and refactoring
* [Core] Managers.xml syntax changed : Renamed &lt;modules&gt; to &lt;config&gt; (tag module doesn't change)
* [Core] Renamed two packages : io.vertigo.core.util, io.vertigo.core.lang
* [Core] Moved some classes : VUserException, DefinitionSpace, Engine
* [Core] Renamed ComponentSpaceConfigBuilder to NodeConfigBuilder
* [Core] Injector static instead of instance
* [Core] Renamed @PreFixed to @DefinitionPreFixed and Manager to Component
* [Commons] Added CacheConfig
* [Dynamo] Moved search public api from SearchServicePlugin to SearchManager
* [Dynamo] Added possibility to override FormatterDefault rendering
* [Dynamo] Added fluent style with ExportBuilder, PropertiesBuilder
* [Dynamo] DtField is a DtFieldName  
* [Dynamo] Refactored ElasticSearch plugins  
* [Dynamo] **Work** is migrated to tempo
* [Vega] Fixed swagger contextPath, nnerBody params, inline test POST services
* [Vega] Moved DtListDelta and UiListDelta
* [Vega] Updated export api
* [Vega] Renamed UiSecurityTokenManager to TokenManager
* [Vega] Added DtObjectExtended support
* [Vega] Added check to unused pathParams
* [Vega] Added AutoPaginator support
* [Vega] Added CorsAllowerFilter to component (must be in managers.xml). Param originCORSFilter can be set here
* [Studio] Fixed properties generator
* [Struts2] Fixed index dto with FK bind to MDL
* [Struts2] Fixed #9, added a unique uriList when list put in context, and no cache for list without uri
* [Struts2] Multiple select in simple_read
* [Struts2] Added autocompleter popinURL  
* [Struts2 Vega] Fixed file download Content-Disposition
* [Struts2] Changed layout table behaviour  : now can include div in order to declare a single cell

Release 0.6.2 - 2014/10/27
----------------------
* [Struts2] Fixed 0.6.1 broken xxx_read themes inheritance
* [Struts2] Some ftl's tags fixed and improvments (autocompleter popinURL, div in div, reMoved some \n)
* [Vega] Fixed swagger contextPath
* [Studio] Fixed resources.ftl
* Fixed some tests

Release 0.6.1 - 2014/10/17
----------------------
* [Vega] Fixed relative path support with SwaggerUI
* [Vega] Moved DtListDelta and UiListDelta
* [Dynamo] Added possibility to override FormatterDefault rendering
* [Struts2] Added VFreemarkerManager to better override of struts2 FLT (Added this to your struts.xml *&lt;constant name="struts.freemarker.manager.classname" value="io.vertigo.struts2.impl.views.freemarker.VFreemarkerManager" /&gt;*, configure it with *TemplatePath* param in *web.xml*) 
* [Struts2] Moved ftl files to /io/vertigo/struts2/ftl/template 
* [Struts2] Disabled required mark for checkbox
* [Struts2] Added Multiple select tag support
* [Struts2] Fixed index dto with FK bind to MDL
* [Struts2] Fixed autocompleter theme support
* [Studio] Fixed properties generator
* Some CodeStyle fixes

Release 0.6.0 - 2014/10/15
----------------------
* [Core] managers.xml xsd now checks params are declared before plugins
* [Vega] Added support to Swagger Api viewer (see http://swagger.io/)
* [Vega] Added HttpRequest and HttpResponse parameters support
* [Vega] Added Header param support
* [Vega] Fixed some bug with query parameters
* [Dynamo] Some refacts (first step). No major api modifications.
* [Dynamo] Some renamed (DatabaseManager => SqlDatabaseManager)
* [Dynamo] Swap search from Solr to ElasticSearch 
* [Dynamo] Added Batch support to DAOBroker
* [Struts2] Fixed struts2 checkboxlist.ftl 
* [Struts2] Added a ftl jar for overrided ui components ftl
* [Struts2] Added check page access in SecurityFilter 
* [Studio] Refact some generated code for **Focus** compatibility
* [Persona] Refact dependencies
* [Persona] Renamed securityLoaderplugin into securityResourceLoaderPlugin
* [Tempo] Added authentification support in JavaxSendMailPlugin
* [Commons] Fixed CurrentLocale can provide an unsupported Locale
* Some minor fixes

Release 0.5.2 - 2014/09/23
--------------------------
* Some pom updated for MavenCentral Release :)
* Fixed Vega fileUpload support (with Servlet 3.0 API)
* Fixed struts2 .ftl for readonly checkbox, select, radiomap
* Fixed UiList usage
* Renames somes const
* Fixed .properties charset (ISO-8859-1)

Release 0.5.1 - 2014/09/17
--------------------------
* Fixed #7 ConstraintBigDecimal 
* Added Vega DtListDelta support (compatibility with **Focus** project)

Release 0.5.0 - 2014/09/16
--------------------------
* Added Struts2 module
* Added Studio Sql generation 
* Added Vega fileUpload support
* Refact WorkManager Api(Future), Distributed
* Refact CollectionManager Api(DtListProcessor)
* Renamed io.vertigo.kernel to io.vertigo.core
* Fixed CacheManager clear conditions
* Fixed Vega #6 Changed mime type for json entity
* Fixed Vega multiPath params support
* Updated dependencies

Release 0.4.3 - 2014/08/06
--------------------------
* Fixed Vega #5 error mimeType and Json syntaxe
* Fixed Studio annotationNN package
* Fixed Vega autoPagination support
* Fixed tempo dependencies

Release 0.4.2 - 2014/08/01
--------------------------
* Refact vertigo-bundle : added tempo and reMoved studio and labs
* Added metadatas support in DtList
* Added JsDtDefinitionGenerato in vertigo-studio for **Focus** (HTML5-SPA) applications
* Added file encoding parameter of generated files in vertigo-studio
* Fixed file encoding template of loaders in vertigo-studio
* Added vertigo-tempo : Manage background operations and communications
* Merge collections.facet to collections
* Moved back Transactional annotations from stereotype package
* Renamed XxxStorePlugins as XxxDataStorePlugins
* Some refactoring by using List<Plugin> contructor injection
* Some minor internal renames


Release 0.4.1 - 2014/07/29
--------------------------
* Added Multi KvDataStore support
* Added List injection support in constructor
* Changed DateQueryParser use elacticSearch syntax instead of Solr ones
* Moved almost all annotations to a stereotype package
* Fixed missing PathPreFixed bug in Vega/rest component
* Fixed nullValue in facetByTerm


Release 0.4.0 - 2014/07/25
--------------------------
The most notable changes in Vertigo 0.4.0 over previous releases are:  
  * Changed ksp syntax to have a more similar json syntax.  Separator ';' is replaced by ','. Array {} is replaced by [] and  object notation () is replaced by {}
  * Changed declaration of resources is externalized. In this way, each module can declare its own resources (oom, ea, ksp, xml).     
  * Changed KDataType to DataType
  * Changed : Tasks must be processed using TaskManager and not WorkManager. (In fact each component must be able to process sync or async its own works) 
  * Added module labs, contains some usefull components such as mail   
  * Added module persona, built to manage all concepts around a user/persona  
  * Added module quarto, which contains two components : publisher (to create new publications by merging template and data) and converter (to convert a doc, docx into a pdf for example)   
  * Added distributed task management (by redis or http/rest)
  * Added Enterprise Architect support
  * Added vertigo-vega : RESTful WebService support for HTML5 applications
  * Fixed Issues #3 : added a new mandatory vertigo-studio parameter ```domain.dictionaryClassName``` 
  * To maintain compatibility Added : ```domain.dictionaryClassName=DtDefinitions``` in your studio-config.properties
  * Added check on unused components, params during injection  
  * Fixed Issues #2

Release 0.3.0 - 2014/03/13
--------------------------
The most notable changes in Vertigo 0.3.0 over previous releases are:
  * Added vertigo-studio
  * Added Jpa/Hibernate support
  * Added vertigo-dynamo
  * Added vertigo-ccc Command & Control Center
  * Refactor maven modules

Release 0.2.1 - 2014/02/26
--------------------------
  * Simplify Assertion api

Release 0.2.0 - 2014/02/26
--------------------------
The most notable changes in Vertigo 0.2.0 over previous releases are:
  * Refactor package and naming 
  * Added vertigo-commons tools, api and impl split
  * Added autocloseable

Release 0.1.0 - 2014/01/14
--------------------------
  * First release
