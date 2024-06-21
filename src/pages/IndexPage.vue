<template>
  <q-page>
    <introCarousel />
    <gamesPlay />
    <aboutUs />
  </q-page>
</template>

<script setup>
import introCarousel from "src/components/intro-carousel.vue";
import gamesPlay from "src/components/games-play.vue";
import aboutUs from "src/components/about-us.vue";

// import { useAuthStore } from "src/stores/authStore";
// import { onMounted } from "vue";
// const authStore = useAuthStore();
// const { getUser } = authStore;

// onMounted(() => {
//   getUser();
// });
</script>
