<template>
  <q-dialog v-model="open">
    <q-card class="q-pa-md bg-primary" style="width: 350px; max-width: 100%">
      <q-card-section
        ><div class="text-h5 text-warning">Create Match</div></q-card-section
      >
      <q-card-section class="q-pa-none q-gutter-md">
        <q-select
          label="Select Games"
          class="bg-warning"
          v-model="match.game"
          :options="options"
        />
        <q-select
          label="Match Type"
          class="bg-warning"
          v-model="match.type"
          :options="teamOptions"
        />
        <q-input
          class="bg-warning"
          type="number"
          placeholder="Bet Amount"
          v-model="match.bet"
        />
        <div class="row justify-center">
          <q-btn class="bg-warning" label="Create" @click="store.createMatch" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMatchStore } from "src/stores/matchStore";
import { computed, ref } from "vue";
const store = useMatchStore();

const { match } = storeToRefs(store);

const options = ["Dota2", "Mobile Legends", "Valorant"];
const teamOptions = ["1vs1", "TvsT"];
const props = defineProps({
  isOpen: Boolean,
});
const matchModel = ref(null);

const model = ref(null);
const emit = defineEmits(["update:isOpen"]);

const open = computed({
  get() {
    return props.isOpen;
  },
  set(newValue) {
    emit("update:isOpen", newValue);
  },
});
</script>

<style lang="scss" scoped></style>
