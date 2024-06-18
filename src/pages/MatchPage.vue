<template>
  <div>
    <h1>Hello this is Match Page</h1>
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
