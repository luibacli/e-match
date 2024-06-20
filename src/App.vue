<template>
  <router-view />
</template>

<script setup>
defineOptions({
  name: "App",
});
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./boot/firebase";

// async function initializeCounter() {
//   const counterRef = doc(db, "counters", "matchCounter");
//   await setDoc(counterRef, { counter: 0 });
// }
const store = useAuthStore();
const { isAuthenticated, userData } = store;
onMounted(() => {
  store.monitorAuthState();
  if (isAuthenticated) {
    store.getUser();
  }
});
</script>
