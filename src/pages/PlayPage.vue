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
  </div>
</template>

<script setup>
import gameCards from "src/components/gameCards.vue";
import CreateMatch from "src/components/CreateMatch.vue";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<style lang="scss" scoped></style>
