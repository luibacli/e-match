<template>
  <div class="row justify-center">
    <div class="q-ma-md q-pa-sm bg-warning" style="width: 450px">
      <span class="text-red text-bold">Note:</span> Please make sure all players
      name match in the current game!
    </div>
  </div>

  <div class="row justify-center">
    <q-card class="bg-warning q-pa-md" style="width: 100%; max-width: 1000px">
      <q-card-section
        horizontal
        class="row justify-between bg-primary text-warning text-h5"
      >
        <q-card-section>Bet: 500</q-card-section>
        <q-card-section>e-match ID: 52</q-card-section>
      </q-card-section>
      <q-card-section
        horizontal
        class="justify-between bg-secondary text-warning q-pa-sm"
        ><q-card-section
          ><q-avatar
            ><img src="https://cdn.quasar.dev/img/avatar.png" /></q-avatar
          ><span class="text-positive text-subtitle1"> Team B</span>
          <q-card-section
            >Players:
            <ul>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
            </ul></q-card-section
          ></q-card-section
        >
        <q-card-section><div class="text-h4">VS</div></q-card-section>
        <q-card-section
          ><q-avatar
            ><img src="https://cdn.quasar.dev/img/avatar.png"
          /></q-avatar>
          <span class="text-red text-subtitle1"> Team B</span>
          <q-card-section
            >Players:
            <ul>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
            </ul></q-card-section
          >
        </q-card-section>
      </q-card-section>
      <q-card-section class="row justify-center bg-primary"
        ><q-btn label="Start" class="bg-positive text-warning"
      /></q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useMatchStore } from "src/stores/matchStore";
import { onMounted } from "vue";

const matchStore = useMatchStore();

onMounted(() => {
  matchStore.joinMatch();
});
</script>

<style lang="scss" scoped></style>
