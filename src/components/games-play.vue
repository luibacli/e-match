<template>
  <div class="q-pa-md text-warning">
    <div class="row justify-center text-h4 text-bold">GAMES WE PLAY:</div>
    <div class="q-pa-md row justify-center q-gutter-lg">
      <q-card
        class="my-card inset-shadow animation1"
        v-for="game in games"
        :key="game.name"
      >
        <q-img :src="game.link">
          <div class="absolute-top text-center game-name text-h6">
            {{ game.name }}
          </div>
          <div class="q-gutter-md text-center absolute-bottom try-me">
            <q-btn color="warning" label="Tournament" class="text-black" />
            <q-btn color="accent" label="Rankings" />
          </div>
        </q-img>
      </q-card>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "GamesPlay",
});

const games = [
  {
    name: "Dota 2",
    link: "images/dota2.jpg",
  },
  {
    name: "Counter Strike",
    link: "images/cs2.jpg",
  },
  {
    name: "League of Legends",
    link: "images/lol.jpg",
  },
  {
    name: "Mobile Legends: Bang Bang",
    link: "images/ml.jpg",
  },
  {
    name: "Call of Duty Mobile",
    link: "images/cod.jpg",
  },
  {
    name: "Crossfire",
    link: "images/crossfire.jpg",
  },
  {
    name: "Valorant",
    link: "images/valorant.jpg",
  },
];
</script>

<style lang="scss" scoped>
.my-card {
  height: 100px;
  width: 445px;
  margin-bottom: 155px;
  transition: height 0.5s, width 0.5s;
}

.my-card:hover {
  cursor: pointer;
  height: 110px;
  width: 455px;
}

.try-me {
  display: none;
}

.game-name:hover + .try-me {
  -webkit-animation: fadeInUp 0.2s ease-in 200ms both;
  animation: fadeInUp 0.2s ease-in 200ms both;
  display: block;
}

.game-name + .try-me {
  -webkit-animation: fadeOutDown 0.2s ease-in 2s both;
  animation: fadeOutDown 0.2s ease-in 2s both;
  display: block; /* Ensures the element is displayed even when not hovered */
  opacity: 0; /* Start with opacity 0 to ensure fadeOut effect is noticeable */
}

.animation1 {
  -webkit-animation: fadeInRight 1s ease-in 800ms both;
  animation: fadeInRight 1s ease-in 800ms both;
}
</style>
