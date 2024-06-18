<template>
  <div v-if="isAuthenticated">
    <gameCards />
    <CreateMatch :isOpen="isOpen" @update:isOpen="isOpen = $event" />

    <div class="q-pa-md row justify-center">
      <q-btn class="bg-warning" label="Create Match" @click="store.openModal" />
    </div>
    <div class="bg-primary text-warning">
      <q-tabs>
        <q-tab label="1 vs 1" style="width: 100%" @click="store.filterOne" />
        <q-tab
          label="Team Vs Team"
          style="width: 100%"
          @click="store.filterTeam"
        />
        <!-- <q-tab label="Tournament" style="width: 100%" /> -->
      </q-tabs>
    </div>
    <!-- <div v-if="tableLoading">Loading....</div>
    <div v-else class="q-mt-md">
      <q-table
        class="bg-primary text-warning"
        dense
        :columns="matchColumns"
        :rows="matchList"
        separator="cell"
      ></q-table>
    </div>
    <q-btn class="bg-warning" label="test" @click="store.getMatches" />
    <q-btn class="bg-warning" label="dota2" @click="store.getDota2" /> -->
    <!-- <div v-if="tableLoading">Loading...</div>
    <div v-else class="q-mt-md">
      <q-table
        class="bg-primary text-warning"
        dense
        :columns="matchColumns"
        :rows="matchList"
        separator="cell"
      ></q-table>
    </div>
    <q-btn class="bg-warning" label="test" @click="store.getMatches" />
    <q-btn class="bg-warning" label="dota2" @click="store.getDota2" /> -->

    <div v-if="tableLoading" class="text-warning">
      <div class="text-warning text-h5">Loading....</div>
    </div>

    <div v-else class="row q-pa-sm">
      <div v-show="hasData" class="text-warning row text-center">
        <div class="text-warning justify-center text-h5">No match created</div>
      </div>
      <div class="row q-gutter-sm justify-center">
        <div class="row" v-for="game in games" :key="game.id">
          <q-card class="bg-primary text-warning match-card">
            <div class="row q-pa-sm">
              <div class="col-12 text-subtitle2">{{ game.type }}</div>
              <div class="col-12 text-caption">{{ game.id }}</div>
            </div>
            <q-separator />
            <q-card-section>
              <div class="q-pa-none bg-warning q-col-gutter-sm rounded-borders">
                <div class="q-pa-sm">
                  <div class="col-6">
                    <span class="text-bold text-dark">
                      <q-icon name="person" />
                    </span>
                    <span class="text-purple"> {{ game.host }}</span>
                  </div>
                  <div class="col-6 text-dark">
                    <span class="text-dark text-bold">
                      <q-icon name="emoji_events" />
                    </span>
                    <span class="text-positive">10</span> /
                    <span class="text-negative">5</span>
                  </div>
                </div>
                <div class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-bold text-dark">Bet:</span>
                    <span class="text-secondary">{{ game.bet }}</span>
                  </div>
                </div>
              </div>
            </q-card-section>
            <div class="row justify-center q-mb-sm">
              <q-btn
                class="bg-green"
                flat
                dense
                label="Challenge"
                size="sm"
                :to="`/play/${game.id}`"
              />
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gameCards from "src/components/gameCards.vue";
import CreateMatch from "src/components/CreateMatch.vue";
import { onMounted, ref, defineEmits, watch } from "vue";
import { useMatchStore } from "src/stores/matchStore";

import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/authStore";

const store = useMatchStore();
const authStore = useAuthStore();

const { matchList, matchColumns, tableLoading, isOpen } = storeToRefs(store);
const { isAuthenticated } = storeToRefs(authStore);

const games = ref([]);
const hasData = ref(false);

watch(matchList, (newList) => {
  games.value = newList;
  if (games.value.length == 0) {
    hasData.value = true;
  } else {
    hasData.value = false;
  }
});
</script>

<style lang="scss" scoped>
.match-card {
  width: 100%;
  height: 100%;
  max-width: 120px;
}
</style>
