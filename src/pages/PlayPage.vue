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
    <div v-if="tableLoading">Loading....</div>
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
    <q-btn class="bg-warning" label="dota2" @click="store.getDota2" />
  </div>
</template>

<script setup>
import gameCards from "src/components/gameCards.vue";
import CreateMatch from "src/components/CreateMatch.vue";
import { onMounted, ref, defineEmits } from "vue";
import { useMatchStore } from "src/stores/matchStore";
import { storeToRefs } from "pinia";
const store = useMatchStore();

const { matchList, matchColumns, tableLoading, isOpen } = storeToRefs(store);

// onMounted(() => {
//   store.getDota2();
// });
</script>

<style lang="scss" scoped></style>
