<template>
  <div>
    <gameCards />
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
</script>

<style lang="scss" scoped></style>
