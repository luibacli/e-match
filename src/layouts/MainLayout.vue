<template>
  <q-layout view="hHh lpR fFf" style="background-color: #363062">
    <q-header elevated>
      <q-toolbar class="text-warning justify-between">
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-btn flat :to="'/'">
            <q-avatar size="45px"><img src="images/logo-1.png" /></q-avatar
          ></q-btn>
        </q-toolbar-title>

        <q-tabs>
          <q-tab icon="sports_esports" @click="btnPlay" />

          <q-tab icon="handshake" />
          <q-tab icon="notifications"
            ><q-menu class="bg-primary" style="width: 100%"
              ><q-list v-for="match in matchAccepted" :key="match.id"
                ><q-item class="row">
                  <div class="co-12 text-warning">
                    <span class="text-yellow">{{ match.hostName }} </span>
                    accepted your request!
                  </div>
                  <div class="col text-right q-mr-md">
                    <q-btn
                      dense
                      label="Join"
                      class="bg-green text-secondary"
                      @click="joinMatch(match.id, match.hostName)"
                      size="sm"
                    />
                  </div> </q-item
                ><q-separator /></q-list
            ></q-menu>
            <q-badge v-show="gotAccepted" floating color="red">{{
              matchLength
            }}</q-badge></q-tab
          >

          <div
            class="row bg-warning q-mr-sm rounded-borders text-secondary"
            style="width: 100px"
          >
            <div class="col-2 q-ml-sm"><q-icon name="payments" /></div>
            <div class="col-8 text-bold">{{ userData.balance }}</div>
          </div>
          <q-tab v-if="!isAuthenticated" label="Login" @click="openModal" />
          <!-- <q-avatar class="bg-secondary" icon="person" /> -->
          <q-btn-dropdown
            v-if="isAuthenticated"
            flat
            dense
            class="text-warning"
            :label="playerName"
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

    <!-- drawer -->
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
      behavior="normal"
      class="bg-primary text-warning"
    >
      <!-- drawer content -->
      <q-list>
        <q-item-label header class="text-warning text-bold">
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

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
import { onMounted, ref, onBeforeMount, onBeforeUnmount, watch } from "vue";
import LoginDialog from "src/components/LoginDialog.vue";
import EssentialLink from "src/components/EssentialLink.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/authStore";
import { useMatchStore } from "src/stores/matchStore";

const authStore = useAuthStore();
const matchStore = useMatchStore();
const {
  isAuthenticated,
  profileName,
  isLoading,
  isOpen,
  showLogin,
  userData,
  user,
  matchAccepted,
  playerName,
  matchLength,
  gotAccepted,
} = storeToRefs(authStore);
const {
  btnPlay,
  openModal,
  logout,
  realTimeUser,
  getUser,
  unsubscribeRealTimeUser,
  showAccepted,
} = authStore;

// const {} = storeToRefs(matchStore);
const { joinMatch } = matchStore;
defineOptions({
  name: "MainLayout",
});

const showLoginDialog = ref(false);
const showSignUpDialog = ref(false);
const fullHeight = ref(false);

const linksList = [
  {
    title: "Profile",

    icon: "person",
    link: "https://quasar.dev",
  },
  {
    title: "Cashin",

    icon: "add_card",
    link: "/cashin",
  },
  {
    title: "Cashout",

    icon: "shopping_cart_checkout",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Referral Earn",

    icon: "transfer_within_a_station",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Customer Support 24/7",

    icon: "support_agent",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Logout",

    icon: "logout",
    link: "https://forum.quasar.dev",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

watch(matchAccepted, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    showAccepted();
  }
});

onMounted(() => {
  realTimeUser();
});

onBeforeUnmount(() => {
  unsubscribeRealTimeUser();
});
</script>

<style lang="scss" scoped></style>
