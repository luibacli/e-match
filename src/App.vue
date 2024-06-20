<template>
  <router-view />
</template>

<script setup>
defineOptions({
  name: "App",
});
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";

// async function initializeCounter() {
//   const counterRef = doc(db, "counters", "matchCounter");
//   await setDoc(counterRef, { counter: 0 });
// }
const store = useAuthStore();

onMounted(() => {
  store.monitorAuthState();
  store.getUser();

  // if (store.isAuthenticated) {
  //   store.getUser();
  //   console.log(store.user.id);
  // }
});
</script>
