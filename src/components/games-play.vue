<template>
  <div class="q-pa-md text-warning">
    <div class="row justify-center text-h5 text-bold">GAMES WE PLAY:</div>
    <div class="q-pa-sm justify-center row q-gutter-md">
      <q-card
        class="my-card inset-shadow animation1"
        v-for="game in games"
        :key="game.name"
      >
        <q-img :src="game.link">
          <div
            class="absolute-top text-center game-name text-h6s text-warning q-gutter-sm q-pa-none"
          >
            {{ game.name }}
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
// import { ref, listAll } from "firebase/storage";
// import { storage } from "boot/firebase";

// const listRef = ref(storage, "images");
// let images = "";
// listAll(listRef).then((res) => {
//   res.items.forEach((itemRef) => {
//     images = itemRef.name;
//   });
// });

// console.log(images);

const games = [
  {
    name: "Dota 2",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fdota2.jpg?alt=media&token=3f8f5d1b-a1cb-4973-b209-7793dbe5a077/dota2.jpg",
  },
  {
    name: "Counter Strike",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fcs2.jpg?alt=media&token=b893c650-32e5-46dc-bea9-7b25203e90ab/cs2.jpg",
  },
  {
    name: "League of Legends",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Flol.jpg?alt=media&token=9cf67405-aaa1-4ff2-ae3a-49e6b8354505/lol.jpg",
  },
  {
    name: "Mobile Legends: Bang Bang",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2FML.jpg?alt=media&token=7296d13d-c0fc-4f4f-8be7-5a8b4a265123",
  },
  {
    name: "Call of Duty Mobile",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2FCOD.jpg?alt=media&token=9216bf1e-6470-4e1f-868f-5cd37c1c56de",
  },
  {
    name: "Crossfire",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fcrossfire.jpg?alt=media&token=d834741d-2cb5-406f-ade4-c83975dab2ca/crossfire.jpg",
  },
  {
    name: "Valorant",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fvalorant.jpg?alt=media&token=7ac389d6-3a29-4c8e-af84-2faf86b78040/valorant.jpg",
  },
  {
    name: "Arena of Valor",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Faov.png?alt=media&token=fce0747e-8bec-4bc8-88f1-129d63a165ac",
  },
  {
    name: "Apex Legends",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fapex.png?alt=media&token=43b398f7-e8dc-4d61-9545-d7a353f89df8/apex.png",
  },
  {
    name: "PUBG: Mobile",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Fpubg.png?alt=media&token=46fc1919-a58a-48f2-abfa-ed5db9ad14bd/pubg.png",
  },
  {
    name: "Fortnite",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Ffortnite.png?alt=media&token=442906b5-d64c-4245-b91d-665b5872ec60/fortnite.png",
  },
  {
    name: "Rocket League",
    link: "https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Frocket.png?alt=media&token=17c204ec-086c-41bb-https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/images%2Frocket.png?alt=media&token=17c204ec-086c-41bb-a445-9c563d53206e-9c563d53206e/rocket.png",
  },
];
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  height: 100%;
  max-width: 300px;

  transition: height 0.5s, width 0.5s;
}

.my-card:hover {
  cursor: pointer;
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
