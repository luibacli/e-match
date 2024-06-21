<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #363062">
    <q-header elevated>
      <q-toolbar class="text-warning justify-between">
        <q-btn flat :to="'/'">
          <q-avatar size="45px"><img src="images/logo-1.png" /></q-avatar
        ></q-btn>

        <q-tabs>
          <q-tab label="Play" @click="btnPlay" />
          <q-tab label="Ranks" :to="'/ranks'" />
          <div
            class="row bg-warning q-mr-sm rounded-borders text-secondary"
            style="width: 100px"
          >
            <div class="col-2 q-ml-sm"><q-icon name="payments" /></div>
            <div class="col-8 text-bold">1,000,000</div>
          </div>
          <q-tab v-if="!isAuthenticated" label="Login" @click="openModal" />
          <!-- <q-avatar class="bg-secondary" icon="person" /> -->
          <q-btn-dropdown
            v-if="isAuthenticated"
            flat
            dense
            class="text-warning"
            :label="user.name"
            ><q-list class="bg-primary text-warning">
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout">
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
    <div><q-btn label="EvaTest" class="bg-warning" /></div>
    <!-- Login / Register -->
    <login-dialog :modelValue="isOpen" @update:modelValue="isOpen = $event" />
    <div v-if="isLoading" class="text-center absolute-center">
      <h1>Loading..</h1>
    </div>

    <q-page-container v-else>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import LoginDialog from "src/components/LoginDialog.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/authStore";

const authStore = useAuthStore();

const {
  isAuthenticated,
  profileName,
  isLoading,
  isOpen,
  showLogin,
  userData,
  user,
} = storeToRefs(authStore);
const { getUser, btnPlay, openModal, logout } = authStore;
defineOptions({
  name: "MainLayout",
});

const showLoginDialog = ref(false);
const showSignUpDialog = ref(false);
const fullHeight = ref(false);

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

onMounted(() => {
  getUser();
});
</script>

<style lang="scss" scoped></style>
