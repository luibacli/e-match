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
          <q-tab
            v-if="!isAuthenticated"
            label="Login"
            @click="showLoginDialog = true"
          />
          <!-- <q-avatar class="bg-secondary" icon="person" /> -->
          <q-btn-dropdown
            v-if="isAuthenticated"
            flat
            dense
            class="text-warning"
            :label="profileName"
            ><q-list class="bg-primary text-warning">
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="store.logout">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list></q-btn-dropdown
          >
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
import { onMounted, ref } from "vue";
import LoginDialog from "src/components/LoginDialog.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/authStore";

const store = useAuthStore();

const { isAuthenticated, profileName } = storeToRefs(store);

defineOptions({
  name: "MainLayout",
});

const showLoginDialog = ref(false);
const showSignUpDialog = ref(false);
const fullHeight = ref(false);

function btnPlay() {
  if (!isAuthenticated) {
    showLoginDialog.value = true;
  } else {
    this.router.push("/play");
  }
}

function btnRanks() {
  if (!isAuthenticated) {
    showLoginDialog.value = true;
  } else {
    this.router.push("/ranks");
  }
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
