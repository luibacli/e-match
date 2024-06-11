<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #363062">
    <q-header elevated>
      <q-toolbar class="text-warning justify-between">
        <q-btn flat :to="'/'">
          <q-avatar size="45px"><img src="images/logo-1.png" /></q-avatar
        ></q-btn>

        <q-tabs>
          <q-route-tab label="Play" :to="'/play'" />
          <q-route-tab label="Ranks" :to="'/ranks'" />

          <q-tab label="Login" @click="showLoginDialog = true" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <!-- Login / Register -->
    <login-dialog
      :modelValue="showLoginDialog"
      @update:modelValue="showLoginDialog = $event"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import LoginDialog from "src/components/LoginDialog.vue";

defineOptions({
  name: "MainLayout",
});

const showLoginDialog = ref(false);
const showSignUpDialog = ref(false);
const fullHeight = ref(false);

function openLogin() {
  login.value = true;
}

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss" scoped></style>
