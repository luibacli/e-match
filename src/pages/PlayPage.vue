<template>
  <div v-if="pageLoading"></div>
  <q-page v-else>
    <div v-if="isAuthenticated">
      <div class="row">
        <div class="col text-warning text-center">Hello</div>
      </div>
      <gameCards />
      <CreateMatch :isOpen="isOpen" @update:isOpen="isOpen = $event" />

      <div class="q-pa-md row justify-center">
        <q-btn class="bg-warning" label="Create Match" @click="openModal" />
      </div>
      <div class="bg-primary text-warning">
        <q-tabs>
          <q-tab label="1 vs 1" style="width: 100%" @click="filterOne" />
          <q-tab label="Team Vs Team" style="width: 100%" @click="filterTeam" />
          <!-- <q-tab label="Tournament" style="width: 100%" /> -->
        </q-tabs>
      </div>

      <div v-if="tableLoading" class="row justify-center text-warning">
        <div class="text-warning text-h5">
          <q-spinner-puff color="warning" size="5.5em" />
        </div>
      </div>
      <div v-else v-show="hasData" class="text-warning row text-center">
        <div class="text-warning justify-center text-h5">No match created</div>
      </div>

      <div class="row q-gutter-md justify-center q-pa-sm">
        <q-card
          class="bg-primary text-warning match-card"
          v-for="game in games"
          :key="game.id"
        >
          <div class="row q-pa-sm">
            <div class="col text-subtitle2 text-yellow">
              {{ game.type }}
            </div>
            <div class="col text-caption text-right">id:{{ game.id }}</div>
          </div>
          <q-separator />
          <q-card-section>
            <div class="q-pa-none bg-warning q-col-gutter-sm rounded-borders">
              <div class="q-pa-sm">
                <div
                  class="row justify-center bg-secondary text-warning rounded-borders"
                >
                  {{ game.game }}
                </div>
                <div class="row justify-center text-subtitle1">
                  <span class="text-bold text-dark">
                    <q-icon name="person" />
                  </span>
                  <span class="text-bold text-secondary">:</span>
                  <span class="text-purple q-ml-sm">{{ game.host }}</span>
                </div>
                <div class="row text-dark bg-primary q-pa-sm rounded-borders">
                  <div class="col text-bold text-warning">Bet:</div>
                  <div class="col text-right text-bold text-positive">
                    {{ game.bet }}
                  </div>
                </div>

                <!-- <div class="col-6 text-dark">
                  <span class="text-dark text-bold">
                    <q-icon name="emoji_events" />
                  </span>
                  <span class="text-positive">10</span> /
                  <span class="text-negative">5</span>
                </div> -->
              </div>
              <!-- <div class="row q-pa-sm">
                <div class="col-12">
                  <span class="text-bold text-dark">Bet:</span>
                  <span class="text-secondary text-green text-bold q-ml-sm">{{
                    game.bet
                  }}</span>
                </div>
              </div> -->
            </div>
          </q-card-section>
          <div class="row justify-center q-mb-sm">
            <q-btn
              class="bg-blue"
              flat
              dense
              label="Challenge"
              size="sm"
              @click="openChallengeModal(game.id, game.host)"
            />
          </div>
        </q-card>
      </div>
    </div>

    <!-- challenge dialog -->
    <q-dialog v-model="challengeModal"
      ><q-card class="bg-primary text-warning"
        ><q-card-section
          ><div class="row">Send request challenge to {{ hostName }}?</div>
          <div class="row q-pa-sm justify-between">
            <q-btn flat label="Yes" class="bg-positive" @click="matchRequest" />
            <q-btn flat label="No" class="bg-red" v-close-popup />
          </div> </q-card-section></q-card
    ></q-dialog>
  </q-page>
</template>

<script setup>
import gameCards from "src/components/gameCards.vue";
import CreateMatch from "src/components/CreateMatch.vue";
import { onMounted, ref, watch, onBeforeUnmount, onBeforeMount } from "vue";
import { useMatchStore } from "src/stores/matchStore";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/authStore";
import { useQuasar, QSpinnerPuff } from "quasar";

const $q = useQuasar();
const matchstore = useMatchStore();
const authStore = useAuthStore();

const { matchList, tableLoading, isOpen, challengeModal, hostName } =
  storeToRefs(matchstore);

const { isAuthenticated } = storeToRefs(authStore);
const { realTimeUser, unsubscribeRealTimeUser, getUser } = authStore;
const { filterTeam, filterOne, openModal, openChallengeModal, matchRequest } =
  matchstore;

const games = ref([]);
const hasData = ref(false);
const pageLoading = ref(false);
let timer;

function showLoading() {
  pageLoading.value = true;
  $q.loading.show({
    spinner: QSpinnerPuff,
    spinnerColor: "warning",
    spinnerSize: 140,
    backgroundColor: "indigo",
  });
  timer = setTimeout(() => {
    pageLoading.value = false;
    $q.loading.hide();
    timer = void 0;
  }, 1000);
}

watch(matchList, (newList) => {
  games.value = newList;
  if (games.value.length == 0) {
    hasData.value = true;
  } else {
    hasData.value = false;
  }
});
onMounted(() => {
  // getUser();
  realTimeUser();
  showLoading();
});

onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer);
    $q.loading.hide();
  }
  unsubscribeRealTimeUser();
});
</script>

<style lang="scss" scoped>
.match-card {
  width: 100%;
  height: 50%;
  max-width: 185px;
  max-height: 190px;
}
</style>
