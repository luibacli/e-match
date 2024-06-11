<template>
  <router-view />
</template>

<script setup>
defineOptions({
  name: "App",
});
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
const store = useAuthStore();
onMounted(() => {
  store.monitorAuthState();
});
</script>
