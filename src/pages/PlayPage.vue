<template>
  <div>
    <gameCards />
    <CreateMatch :isOpen="isOpen" @update:isOpen="isOpen = $event" />

    <div class="q-pa-md row justify-center">
      <q-btn class="bg-warning" label="Create Match" @click="isOpen = true" />
    </div>
    <div class="bg-primary text-warning">
      <q-tabs>
        <q-tab label="1 vs 1" style="width: 100%" />
        <q-tab label="Team Vs Team" style="width: 100%" />
        <q-tab label="Tournament" style="width: 100%" />
      </q-tabs>
    </div>
    <div class="q-mt-md">
      <q-table
        class="bg-primary text-warning"
        dense
        :columns="matchColumns"
        :rows="matchList"
        separator="cell"
      ></q-table>
    </div>
  </div>
</template>

<script setup>
import gameCards from "src/components/gameCards.vue";
import CreateMatch from "src/components/CreateMatch.vue";
import { onMounted, ref, defineEmits } from "vue";
import { useMatchStore } from "src/stores/matchStore";
import { storeToRefs } from "pinia";
const store = useMatchStore();

const { matchList, matchColumns } = storeToRefs(store);
const isOpen = ref(false);

onMounted(() => {
  store.getMatches();
});
</script>

<style lang="scss" scoped></style>
