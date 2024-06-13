<template>
  <div>
    <gameCards />
    <CreateMatch :isOpen="isOpen" @update:isOpen="isOpen = $event" />

    <div class="q-pa-md row justify-center">
      <q-btn class="bg-warning" label="Create Match" @click="store.openModal" />
    </div>
    <div class="bg-primary text-warning">
      <q-tabs>
        <q-tab label="1 vs 1" style="width: 100%" />
        <q-tab label="Team Vs Team" style="width: 100%" />
        <q-tab label="Tournament" style="width: 100%" />
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
    <div v-if="tableLoading">Loading...</div>
    <div v-else class="row q-pa-md q-gutter-md justify-start">
      <q-card
        class="bg-primary text-warning match-card"
        v-for="game in games"
        :key="game.id"
        ><q-card-section class="row" horizontal
          ><q-card-section class="text-bold">{{ game.type }}</q-card-section>

          <q-card-section>ID: {{ game.id }} </q-card-section>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="q-pa-none bg-warning q-col-gutter-sm rounded-borders">
            <div class="row q-pa-sm">
              <div class="col-6">
                <span class="text-bold text-dark">
                  <q-icon name="person"
                /></span>
                <span class="text-purple"> {{ game.name }}</span>
              </div>
              <div class="col-6 text-dark">
                <span class="text-dark text-bold"
                  ><q-icon name="emoji_events"
                /></span>
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

        <q-card-section class="row justify-center">
          <q-btn class="bg-green" flat dense label="Challenge" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import gameCards from "src/components/gameCards.vue";
import CreateMatch from "src/components/CreateMatch.vue";
import { onMounted, ref, defineEmits, watch } from "vue";
import { useMatchStore } from "src/stores/matchStore";
import { storeToRefs } from "pinia";
const store = useMatchStore();

const { matchList, matchColumns, tableLoading, isOpen } = storeToRefs(store);

const games = ref([]);

watch(matchList, (newList) => {
  games.value = newList;
});
</script>

<style lang="scss" scoped>
.match-card {
  width: 100%;
  max-width: 205px;
}
</style>
