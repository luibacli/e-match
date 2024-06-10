<template>
  <q-dialog v-model="model">
    <q-card
      class="bg-primary q-pa-sm dialog"
      style="max-width: 100%; width: 350px"
    >
      <q-card-section>
        <div class="text-warning text-right absolute-top text-h7">
          <q-btn label="x" v-close-popup />
        </div>
        <div class="text-warning text-center text-h5 text-bold">
          <q-tabs v-model="tab"
            ><q-tab label="Login" name="one" />
            <q-tab label="Register" name="two"
          /></q-tabs></div
      ></q-card-section>
      <q-tab-panels class="bg-primary" v-model="tab" animated>
        <q-tab-panel name="one">
          <div class="col q-gutter-md">
            <q-input
              dense
              filled
              label="Phone / Email"
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
            </div></div
        ></q-tab-panel>
        <q-tab-panel name="two"
          ><div class="col q-gutter-md">
            <q-input
              dense
              filled
              label="Phone / Email"
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

            <div class="col-12 text-center q-mt-xl">
              <q-btn
                label="Register"
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
                Login
              </div>
            </div>
            <div class="row justify-center text-warning text-subtitle4">
              Or signup with
            </div>
            <div class="row justify-center">
              <q-btn round class="bg-warning q-pa-sm"
                ><q-avatar size="md"><img src="images/google.png" /></q-avatar
              ></q-btn>
            </div></div
        ></q-tab-panel>
      </q-tab-panels> </q-card
  ></q-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";

import { defineProps, defineEmits } from "vue";

defineOptions({
  name: "LoginDialog",
});

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  signup: {
    type: Boolean,
  },
});

const tab = ref("one");

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<style lang="scss" scoped></style>
