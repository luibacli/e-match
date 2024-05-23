<template>
  <div>
    <q-carousel
      class="text-warning rounded-borders"
      animated
      v-model="slide"
      infinite
      swipeable
      autoplay
      transition-prev="slide-right"
      transition-next="slide-left"
      height="350px"
    >
      <q-carousel-slide
        v-for="intro in intros"
        :key="intro.id"
        class="q-pa-none"
        :name="intro.id"
        :img-src="intro.link"
      >
        <div
          class="full-height full-width flex flex-center"
          style="background-color: rgba(0, 0, 0, 0.6)"
        >
          <div class="custom-caption animation2">
            <div class="text-h4 text-bold">{{ intro.title }}</div>
            <br />

            <div class="text-h7 justify-center text-center animation1">
              {{ intro.caption1 }} <br />
              {{ intro.caption2 }}
              <br />
              <br />
              <q-btn
                size="md"
                :label="intro.button"
                color="warning"
                class="text-black q-mt-lg"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
defineOptions({
  name: "IntroCarousel",
});

import { ref } from "vue";

const slide = ref(1);

const intros = ref([
  {
    id: 1,
    link: "images/background-1.png",
    title: "WELCOME TO e-match!",
    caption1: " The ultimate destination for e-sports enthusiasts.",
    caption2:
      "Dive into a thrilling world where gamers compete in tournaments across your favorite games.",
    button: "Sign Up",
  },
  {
    id: 2,
    link: "images/background-2.png",
    title: "BECOME THE NEXT CHAMPION!",
    caption1: "Whether you're a casual player or a seasoned pro,",
    caption2:
      "e-match offers a dynamic platform to showcase your skills, climb the leaderboards, and win exciting rewards",
    button: "Join Us",
  },
  {
    id: 3,
    link: "images/background-3.png",
    title: "FAIR-PLAY MATCHES",
    caption1: "Where integrity and sportsmanship take center stage,",
    caption2:
      "compete in a balanced and transparent environment where every player has an equal opportunity to showcase their skills.",
    button: "Tournaments",
  },
  {
    id: 4,
    link: "images/background-6.png",
    title: "PROMOTES LOCAL PLAYERS",
    caption1: "Our unique platform shines a spotlight on local players",
    caption2:
      "giving them the opportunity to showcase their potential and gain recognition within the gaming community",
    button: "See Rankings",
  },
]);
</script>

<style lang="scss" scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
}
.animation1 {
  -webkit-animation: bounceIn 1s ease-in 800ms both;
  animation: bounceIn 1s ease-in 800ms both;
}
.animation2 {
  -webkit-animation: flipInX 2s ease-in-out 800ms both;
  animation: flipInX 1s ease-in-out 800ms both;
}
</style>
