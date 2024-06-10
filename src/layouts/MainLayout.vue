<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #363062">
    <q-header elevated>
      <q-toolbar class="text-warning justify-between">
        <q-btn flat @click="this.$router.push('/')">
          <q-avatar size="45px"><img src="images/logo-1.png" /></q-avatar
        ></q-btn>

        <q-tabs>
          <q-tab label="Play" @click="this.$router.push('/play')" />
          <q-tab label="Ranks" @click="this.$router.push('/ranks')" />

          <q-tab label="Login" @click="showLoginDialog = true" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <!-- Login -->
    <login-dialog
      :modelValue="showLoginDialog"
      @update:modelValue="showLoginDialog = $event"
    />
    <!-- <q-dialog v-model="showLoginDialog">
      <q-card
        class="bg-primary q-pa-sm dialog"
        style="max-width: 100%; width: 350px"
      >
        <q-card-section>
          <div class="text-warning text-right absolute-top text-h7">x</div>
          <div class="text-warning text-center text-h5 text-bold">
            Login
          </div></q-card-section
        >
        <div class="col q-gutter-md">
          <q-input
            dense
            filled
            label="Username / Email"
            class="bg-warning"
            style="border-radius: 12px"
          />

          <q-input
            dense
            filled
            label="Password"
            class="bg-warning"
            style="border-radius: 12px"
          />

          <div class="text-orange row text-subtitle4 items-center">
            <div class="col-6">
              <q-checkbox color="teal" size="xs" label="Remember me" />
            </div>
            <div class="col-6" style="cursor: pointer">Forgot Password?</div>
          </div>
          <div class="col-12 text-center">
            <q-btn
              label="Signin"
              class="bg-warning"
              rounded
              style="width: 100%"
            />
          </div>
          <div class="row justify-center text-orange text-bold">
            <div
              style="cursor: pointer; text-decoration: underline"
              @click="showSignUpDialog = true"
            >
              Create An Account
            </div>
          </div>
          <div class="row justify-center text-warning text-subtitle4">
            Or login with
          </div>
          <div class="row justify-center">
            <q-btn round class="bg-warning q-pa-sm"
              ><q-avatar size="md"><img src="images/google.png" /></q-avatar
            ></q-btn>
          </div>
        </div> </q-card
    ></q-dialog> -->

    <!-- Signup -->

    <q-dialog v-model="showSignUpDialog">
      <q-card
        class="bg-primary q-pa-sm dialog"
        style="max-width: 100%; width: 350px"
      >
        <q-card-section>
          <div class="text-warning text-right absolute-top text-h7">x</div>
          <div class="text-warning text-center text-h5 text-bold">
            Login
          </div></q-card-section
        >
        <div class="col q-gutter-md">
          <q-input
            dense
            filled
            label="Username / Email"
            class="bg-warning"
            style="border-radius: 12px"
          />

          <q-input
            dense
            filled
            label="Password"
            class="bg-warning"
            style="border-radius: 12px"
          />

          <q-input
            dense
            filled
            label="Confirm Password"
            class="bg-warning"
            style="border-radius: 12px"
          />

          <div class="text-orange row text-subtitle4 items-center">
            <div class="col-6">
              <q-checkbox color="teal" size="xs" label="Remember me" />
            </div>
            <div class="col-6" style="cursor: pointer">Forgot Password?</div>
          </div>
          <div class="col-12 text-center">
            <q-btn
              label="Signin"
              class="bg-warning"
              rounded
              style="width: 100%"
            />
          </div>
          <div class="row justify-center text-orange text-bold">
            <div
              style="cursor: pointer; text-decoration: underline"
              @click="showSignUpDialog = true"
            >
              Create An Account
            </div>
          </div>
          <div class="row justify-center text-warning text-subtitle4">
            Or login with
          </div>
          <div class="row justify-center">
            <q-btn round class="bg-warning q-pa-sm"
              ><q-avatar size="md"><img src="images/google.png" /></q-avatar
            ></q-btn>
          </div>
        </div> </q-card
    ></q-dialog>

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
