<template>
  <div class="q-pa-sm text-warning">
    <div class="row justify-center text-h5 text-bold">Select Games to Play</div>
    <div class="q-pa-sm justify-center row q-gutter-md">
      <q-card
        class="my-card inset-shadow"
        v-for="game in games"
        :key="game.name"
      >
        <q-btn dense flat class="q-pa-none" @click="game.alt"
          ><img :src="game.link" style="width: 90px" />

          <div
            class="absolute-bottom text-center game-name text-caption text-white q-pa-none"
            style="opacity: 0.7; background-color: black"
          >
            {{ game.name }}
          </div>
        </q-btn>
      </q-card>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "GameCards",
});

import { useMatchStore } from "src/stores/matchStore";

const store = useMatchStore();

const games = [
  {
    name: "Dota 2",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fdota2.jpg?alt=media&token=3f8f5d1b-a1cb-4973-b209-7793dbe5a077/dota2.jpg",
    alt: () => store.getDota2(),
  },
  {
    name: "CS:GO",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fcs2.jpg?alt=media&token=b893c650-32e5-46dc-bea9-7b25203e90ab/cs2.jpg",
    alt: () => store.getCsGo(),
  },
  {
    name: "LOL",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Flol.jpg?alt=media&token=9cf67405-aaa1-4ff2-ae3a-49e6b8354505/lol.jpg",
    alt: () => store.getLol(),
  },
  {
    name: "ML",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2FML.jpg?alt=media&token=7296d13d-c0fc-4f4f-8be7-5a8b4a265123",
    alt: () => store.getMl(),
  },
  {
    name: "CODM",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2FCOD.jpg?alt=media&token=9216bf1e-6470-4e1f-868f-5cd37c1c56de",
    alt: () => store.getCodM(),
  },
  {
    name: "Crossfire",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fcrossfire.jpg?alt=media&token=d834741d-2cb5-406f-ade4-c83975dab2ca/crossfire.jpg",
    alt: () => store.getCrossfire(),
  },
  {
    name: "Valorant",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fvalorant.jpg?alt=media&token=7ac389d6-3a29-4c8e-af84-2faf86b78040/valorant.jpg",
    alt: () => store.getValorant(),
  },
  {
    name: "Arena of Valor",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Faov.png?alt=media&token=fce0747e-8bec-4bc8-88f1-129d63a165ac",
    alt: () => store.getAov(),
  },
  {
    name: "Apex Legends",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fapex.png?alt=media&token=43b398f7-e8dc-4d61-9545-d7a353f89df8/apex.png",
    alt: () => store.getApex(),
  },
  {
    name: "PUBG: Mobile",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fpubg.png?alt=media&token=46fc1919-a58a-48f2-abfa-ed5db9ad14bd/pubg.png",
    alt: () => store.getPubg(),
  },
  {
    name: "Fortnite",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Ffortnite.png?alt=media&token=442906b5-d64c-4245-b91d-665b5872ec60/fortnite.png",
    alt: () => store.getFornite(),
  },
  {
    name: "Rocket League",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Frocket.png?alt=media&token=17c204ec-086c-41bb-https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Frocket.png?alt=media&token=17c204ec-086c-41bb-a445-9c563d53206e-9c563d53206e/rocket.png",
    alt: () => store.getRocket(),
  },
];
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  height: 100%;
  max-width: 90px;

  transition: height 0.5s, width 0.5s;
}
</style>
