<template>
  <q-page>
    <introCarousel />
    <gamesPlay />
    <aboutUs />
  </q-page>
</template>

<script setup>
defineOptions({
  name: "IndexPage",
});
import introCarousel from "src/components/intro-carousel.vue";
import gamesPlay from "src/components/games-play.vue";
import aboutUs from "src/components/about-us.vue";
</script>
