<template>
  <router-view />
</template>

<script setup>
defineOptions({
  name: "App",
});
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import { storeToRefs } from "pinia";

// async function initializeCounter() {
//   const counterRef = doc(db, "counters", "matchCounter");
//   await setDoc(counterRef, { counter: 0 });
// }
const authStore = useAuthStore();

const { monitorAuthState } = authStore;

onMounted(() => {
  monitorAuthState();
});
</script>
