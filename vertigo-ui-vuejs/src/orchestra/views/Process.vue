<template>
  <q-splitter v-model="splitterModel" style="height: 85vh" :limits="[0, 100]">
    <template v-slot:before>
      <div class="q-pa-md">
        <div class="text-h4 q-mb-md">
          <div v-if="processInfo.label || errorMessage">
            {{ processInfo.label || errorMessage }}
          </div>
          <div v-else>
            <q-spinner-ios color="primary" size="sm"></q-spinner-ios>
          </div>
        </div>

        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{ $q.lang.vui.orchestra.totalExecutions }}</div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section class="row">
            <div class="col">
              <q-list>
                <q-item>
                  <q-item-section>
                    <div class="text-weight-medium">
                      <q-icon color="green" name="done" size="sm"></q-icon>
                      {{ processSummary.successfulCount }}
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col">
              <q-list>
                <q-item>
                  <q-item-section>
                    <div class="text-weight-medium">
                      <q-icon color="red" name="error" size="sm"></q-icon>
                      {{ processSummary.errorsCount }}
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col">
              <q-list>
                <q-item>
                  <q-item-section
                    ><div class="text-weight-medium">
                      <q-icon color="grey" name="timer_off" size="sm"></q-icon>
                      {{ processSummary.misfiredCount }}
                    </div></q-item-section
                  >
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="my-card q-mt-lg">
          <q-card-section>
            <div class="text-h6">
              {{ $q.lang.vui.orchestra.functionalId }}
              <q-btn
                round
                color="indigo"
                icon="edit"
                class="q-ml-sm"
                size="sm"
              ></q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-icon
              name="engineering"
              color="indigo"
              size="xl"
              class="q-ml-lg"
            ></q-icon
          ></q-card-section>
        </q-card>

        <q-card class="my-card q-mt-lg">
          <q-card-section>
            <div class="text-h6">
              {{ $q.lang.vui.orchestra.technicalId }}
              <q-btn
                round
                color="indigo"
                icon="edit"
                class="q-ml-sm"
                size="sm"
              ></q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>
          <q-card-section class="q-gutter-sm">
            <div style="max-width: 400px;">
              <q-list dense>
                <q-item>
                  <q-item-section>
                    <div class="text-weight-medium">
                      {{ $q.lang.vui.orchestra.cronExpression }}
                    </div>
                  </q-item-section>
                  <q-item-section side>
                    {{
                      processInfo.triggeringStrategy
                        ? processInfo.triggeringStrategy.cronExpression
                        : "-"
                    }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <div class="text-weight-medium">
                      {{ $q.lang.vui.orchestra.active }}
                    </div>
                  </q-item-section>
                  <q-item-section side>
                    {{
                      Object.entries(processInfo).length
                        ? processInfo.active
                          ? $q.lang.vui.orchestra.yes
                          : $q.lang.vui.orchestra.no
                        : "-"
                    }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <div class="text-weight-medium">
                      {{ $q.lang.vui.orchestra.multiExecution }}
                    </div>
                  </q-item-section>
                  <q-item-section side>
                    {{
                      processInfo.triggeringStrategy
                        ? processInfo.triggeringStrategy.multiExecution
                          ? $q.lang.vui.orchestra.yes
                          : $q.lang.vui.orchestra.no
                        : "-"
                    }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <div class="text-weight-medium">
                      {{ $q.lang.vui.orchestra.rescuePeriod }}
                    </div>
                  </q-item-section>
                  <q-item-section side>
                    <!-- Temps de validité d'une planification = rescuePeriodInSeconds -->
                    {{
                      processInfo.triggeringStrategy
                        ? processInfo.triggeringStrategy.rescuePeriodInSeconds
                        : "-"
                    }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="my-card q-mt-lg">
          <q-card-section>
            <div class="text-h6">
              {{ $q.lang.vui.orchestra.settings }}
              <q-btn
                round
                color="indigo"
                icon="edit"
                class="q-ml-sm"
                size="sm"
              ></q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-icon
              name="engineering"
              color="indigo"
              size="xl"
              class="q-ml-lg"
            ></q-icon
          ></q-card-section>
        </q-card>
      </div>
    </template>
    <template v-slot:after>
      <div class="q-pa-md">
        <div class="text-h4 q-gutter-x-md q-mx-auto row">
          <div class="col">{{ $q.lang.vui.orchestra.executions }}</div>
          <div class="col-auto">
            <q-tabs
              v-model="filterTab"
              inline-label
              class="text-primary q-mx-auto"
            >
              <q-tab
                name="all"
                icon="list"
                :label="$q.lang.vui.orchestra.all"
                @click="updateExecutions('')"
              ></q-tab>
              <q-tab
                name="done"
                icon="done"
                :label="$q.lang.vui.orchestra.done"
                @click="updateExecutions('DONE')"
                class="text-green"
              ></q-tab>
              <q-tab
                name="error"
                icon="error"
                :label="$q.lang.vui.orchestra.error"
                @click="updateExecutions('ERROR')"
                class="text-red"
              ></q-tab>
            </q-tabs>
          </div>
        </div>
        <q-infinite-scroll
          @load="onLoad"
          :offset="50"
          scroll-target="div.q-splitter__panel.q-splitter__after.col"
        >
          <q-list bordered class="rounded-borders q-mt-sm">
            <div v-for="execution in executions" :key="execution.preId">
              <q-expansion-item
                expand-separator
                @show="fetchActivities(execution.preId)"
              >
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar
                      :icon="
                        execution.status == 'DONE'
                          ? 'done'
                          : execution.status == 'ERROR'
                          ? 'error'
                          : execution.status == 'ABORTED'
                          ? 'flash_on'
                          : 'help'
                      "
                      :color="
                        execution.status == 'DONE'
                          ? 'green'
                          : execution.status == 'ERROR'
                          ? 'red'
                          : execution.status == 'ABORTED'
                          ? 'orange'
                          : 'grey'
                      "
                      text-color="white"
                    ></q-avatar>
                    <q-tooltip>
                      {{ execution.status }}
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section class="text-weight-medium">
                    {{ execution.beginTime }}
                  </q-item-section>
                </template>
                <q-card>
                  <q-separator></q-separator>
                  <q-card-section>
                    <q-splitter v-model="splitterModelExecutions">
                      <template v-slot:before>
                        <q-tabs
                          v-model="tabs[execution.preId]"
                          vertical
                          class="text-primary"
                        >
                          <q-tab
                            name="info"
                            :label="$q.lang.vui.orchestra.informations"
                          ></q-tab>
                          <q-tab
                            name="activities"
                            :label="$q.lang.vui.orchestra.activities"
                          ></q-tab>
                          <q-tab
                            name="support"
                            :label="$q.lang.vui.orchestra.support"
                          ></q-tab>
                        </q-tabs>
                      </template>
                      <template v-slot:after>
                        <q-tab-panels
                          v-model="tabs[execution.preId]"
                          animated
                          vertical
                          transition-prev="jump-up"
                          transition-next="jump-up"
                        >
                          <q-tab-panel name="info">
                            <div class="text-h5">
                              {{ $q.lang.vui.orchestra.informations }}
                            </div>
                            <q-separator class="q-mt-sm q-mb-md"></q-separator>
                            <div style="max-width: 400px;">
                              <q-list dense>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.vui.orchestra.startTime }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    {{ execution.beginTime }}
                                  </q-item-section>
                                </q-item>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.vui.orchestra.endTime }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    {{ execution.endTime }}
                                  </q-item-section>
                                </q-item>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.vui.orchestra.duration }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    {{ execution.executionTime }}
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                          </q-tab-panel>
                          <q-tab-panel name="activities">
                            <div class="text-h5">
                              {{ $q.lang.vui.orchestra.activities }}
                            </div>
                            <q-separator class="q-mt-sm q-mb-md"></q-separator>
                            <q-list bordered class="rounded-borders">
                              <div
                                v-for="activity in activities[execution.preId]"
                                :key="activity.aceId"
                              >
                                <q-expansion-item expand-separator>
                                  <template v-slot:header>
                                    <q-item-section avatar>
                                      <q-avatar
                                        :icon="
                                          activity.status == 'RUNNING'
                                            ? 'help'
                                            : activity.status == 'DONE'
                                            ? 'done'
                                            : activity.status == 'ABORTED'
                                            ? 'flash_on'
                                            : 'error'
                                        "
                                        :color="
                                          activity.status == 'RUNNING'
                                            ? 'grey'
                                            : activity.status == 'DONE'
                                            ? 'green'
                                            : activity.status == 'ABORTED'
                                            ? 'orange'
                                            : 'red'
                                        "
                                        text-color="white"
                                      ></q-avatar>
                                      <q-tooltip>
                                        {{ activity.status }}
                                      </q-tooltip>
                                    </q-item-section>
                                    <q-item-section class="text-weight-medium">
                                      {{ activity.label }}
                                    </q-item-section>
                                  </template>
                                  <q-card>
                                    <q-separator></q-separator>
                                    <q-card-section>
                                      <div style="max-width: 400px;">
                                        <q-list dense>
                                          <q-item>
                                            <q-item-section>
                                              <div class="text-weight-medium">
                                                {{
                                                  $q.lang.vui.orchestra.startTime
                                                }}
                                              </div>
                                            </q-item-section>
                                            <q-item-section side>
                                              {{ activity.beginTime }}
                                            </q-item-section>
                                          </q-item>
                                        </q-list>
                                      </div>
                                    </q-card-section>
                                  </q-card> </q-expansion-item
                                ><q-separator></q-separator>
                              </div>
                            </q-list>
                          </q-tab-panel>
                          <q-tab-panel name="support">
                            <div class="text-h5">
                              {{ $q.lang.vui.orchestra.support }}
                              <q-btn
                                round
                                color="primary"
                                icon="edit"
                                class="q-ml-sm"
                                size="sm"
                              ></q-btn>
                            </div>
                            <q-separator class="q-mt-sm q-mb-md"></q-separator>
                            <div style="max-width: 400px;">
                              <q-list dense>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.vui.orchestra.support }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    To fill !
                                  </q-item-section>
                                </q-item>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.vui.orchestra.supportDate }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    To fill !
                                  </q-item-section>
                                </q-item>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.vui.orchestra.comment }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    To fill !
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                          </q-tab-panel>
                        </q-tab-panels>
                      </template>
                    </q-splitter>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-separator></q-separator>
            </div>
          </q-list>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <div v-if="!errorMessage">
                <q-spinner-ios color="primary" size="2em"></q-spinner-ios>
              </div>
              <div v-else class="text-weight-medium">{{ errorMessage }}</div>
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </template>
  </q-splitter>
</template>

<script>
import Quasar from "quasar";
export default {
  created() {
    this.$http
      .get(`${this.apiUrl}/definitions/${this.$route.params.name}`)
      .then((res) => {
        this.processInfo = res.data;
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          this.errorMessage = `${this.$q.lang.vui.orchestra.noProcess}: ${this.$route.params.name}`;
        } else {
          this.errorMessage = this.$q.lang.vui.orchestra.connectionFailed;
        }
        this.connectionFailure = err.response ? false : true;
      });
    this.$http
      .get(`${this.apiUrl}/executions/summaries/${this.$route.params.name}`)
      .then((res) => {
        this.processSummary = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
    this.updateExecutions("");
  },
  props: ["apiUrl"],
  data() {
    return {
      limit: 0,
      connectionFailure: "?",
      errorMessage: "",
      status: "",
      processInfo: {},
      processSummary: {},
      filterTab: "all", // Tab for filtering executions
      executions: [],
      activities: {},
      expandedExecutions: {},
      tabs: {}, //Tabs for navigating inside execution
      splitterModel: 50,
      splitterModelExecutions: 20,
    };
  },
  watch: {
    "$q.lang": function() {
      // Avoid displaying message when this.connectionFailure == ?
      if (this.errorMessage) {
        if (this.connectionFailure == false) {
          this.errorMessage = `${this.$q.lang.vui.orchestra.noProcess}: ${this.$route.params.name}`;
        } else if (this.connectionFailure == true) {
          this.errorMessage = this.$q.lang.vui.orchestra.connectionFailed;
        }
      }
    },
  },
  methods: {
    formatDate(unformattedDate) {
      // Date is assumed to be in YYYY-MM-DDTHH:mm... format
      let timestamp = Quasar.utils.date.extractDate(
        unformattedDate.substring(0, 16),
        "YYYY-MM-DDTHH:mm"
      );
      return Quasar.utils.date.formatDate(timestamp, "DD/MM/YYYY HH:mm");
    },
    formatExecutions: function(unformattedExecutions) {
      return unformattedExecutions.map((execution) => {
        let formattedBeginTime = this.formatDate(execution.beginTime);
        let formattedEndTime = execution.endTime
          ? this.formatDate(execution.endTime)
          : "...";
        let formattedExecutionTime = execution.executionTime
          ? execution.executionTime + "s"
          : "...";
        return {
          preId: execution.preId,
          beginTime: formattedBeginTime,
          endTime: formattedEndTime,
          executionTime: formattedExecutionTime,
          status: execution.status,
        };
      });
    },
    fetchActivities: function(preId) {
      this.$http
        .get(`${this.apiUrl}/executions/${preId}/activities`)
        .then((res) => {
          this.$set(this.activities, preId, this.formatActivities(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    },
    formatActivities: function(unformattedActivities) {
      return unformattedActivities.map((activity) => {
        activity.beginTime = this.formatDate(activity.beginTime);
        // More to come
        return activity;
      });
    },
    updateExecutions: function(status) {
      this.limit = 20;
      this.status = status;
      this.errorMessage = "";
      this.connectionFailure = "?";
      this.$http
        .get(
          `${this.apiUrl}/executions/?processName=${this.$route.params.name}&status=${this.status}&limit=${this.limit}`
        )
        .then((res) => {
          this.executions = this.formatExecutions(res.data);
          res.data.map((execution) => {
            this.$set(this.tabs, execution.preId, "info");
          });
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            this.errorMessage = `${this.$q.lang.vui.orchestra.noProcess}: ${this.$route.params.name}`;
          } else {
            this.errorMessage = this.$q.lang.vui.orchestra.connectionFailed;
          }
          this.connectionFailure = err.response ? false : true;
        });
    },
    onLoad(index, done) {
      this.limit += 20;
      this.$http
        .get(
          `${this.apiUrl}/executions/?processName=${this.$route.params.name}&status=${this.status}&limit=${this.limit}`
        )
        .then((res) => {
          this.executions = this.formatExecutions(res.data);
          res.data.slice(-20).map((execution) => {
            this.$set(this.tabs, execution.preId, "info");
          });
          done();
        });
    },
  },
};
</script>
