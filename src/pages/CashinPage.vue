<template>
  <q-page>
    <div v-show="pendingCashin" class="justify-center text-warning">
      <div class="row justify-center text-center text-warning text-h4">
        Your requested deposit amount is being processed, waiting for approval!
      </div>
      <div class="row justify-center q-pa-md">
        <q-spinner-puff size="5.5em" />
      </div>
    </div>

    <div v-if="cashinLoading" class="col text-center text-warning">
      <q-spinner-puff size="5.5em" />
    </div>

    <div v-else v-show="!pendingCashin" class="q-pa-md">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        class="bg-warning"
      >
        <q-step
          :name="1"
          title="Enter requested amount"
          icon="settings"
          :done="step > 1"
          style="min-height: 200px"
        >
          <div class="q-pa-md text-warning">
            <q-card class="bg-primary"
              ><q-card-section class="bg-grey">
                <div class="col text-center text-bold text-dark">
                  Request Cashin
                </div></q-card-section
              >
              <q-separator />
              <q-card-section>
                <div class="q-pa-md">
                  <div class="text-bold text-overline">Send thru:</div>
                  <div class="row">
                    <q-btn-toggle
                      toggle-color="secondary"
                      v-model="cashinForm.channel"
                      :options="[
                        { label: 'Gcash', value: 'Gcash' },
                        { label: 'Maya', value: 'Maya' },
                      ]"
                    />
                  </div>
                </div>

                <q-separator />

                <div>
                  <div class="text-bold text-overline">Select amount:</div>
                  <div class="row">
                    <q-btn-toggle
                      class="q-gutter-md"
                      flat
                      dense
                      toggle-color="secondary"
                      v-model="cashinForm.amount"
                      :options="[
                        { label: '100', value: '100' },
                        { label: '200', value: '200' },
                        { label: '300', value: '300' },
                        { label: '400', value: '400' },
                        { label: '500', value: '500' },
                      ]"
                    />
                    <q-btn-toggle
                      class="q-gutter-md"
                      flat
                      dense
                      toggle-color="secondary"
                      v-model="cashinForm.amount"
                      :options="[
                        { label: '600', value: '600' },
                        { label: '700', value: '700' },
                        { label: '800', value: '800' },
                        { label: '900', value: '900' },
                        { label: '1000', value: '1000' },
                      ]"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="col q-gutter-md">
                  <q-input
                    bg-color="warning"
                    class="text-warning"
                    filled
                    placeholder="Enter amount"
                    type="number"
                    v-model="cashinForm.amount"
                  />
                </div> </q-card-section
            ></q-card>
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Pay requested amount"
          icon="create_new_folder"
          :done="step > 2"
          style="min-height: 200px"
        >
          <div v-if="cashinForm.channel == 'Gcash'">
            <div>
              <q-card class="bg-primary">
                <q-card-section>
                  <div class="col text-center text-warning">
                    Pay thru QR Code
                    <q-img
                      src="https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/channels%2Fgcash.png?alt=media&token=0e198c96-1e9f-4d14-924e-f9d8309cb051"
                    />
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section
                  ><div class="text-warning">Or send Gcash payment to:</div>
                  <div class="col text-center text-bold bg-warning">
                    09672198311
                  </div></q-card-section
                >
              </q-card>
            </div>
          </div>
          <div v-else>
            <div>
              <q-card class="bg-primary">
                <q-card-section>
                  <div class="col text-center text-warning">
                    Pay thru QR Code
                    <q-img
                      src="https://firebasestorage.googleapis.com/v0/b/ematch-dev.appspot.com/o/channels%2Fmaya.png?alt=media&token=9efb491a-6561-4a76-a0d8-4b01a05a9a22"
                    />
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section
                  ><div class="text-warning">Or send Maya payment to:</div>
                  <div class="col text-center text-bold bg-warning">
                    09672198311
                  </div></q-card-section
                >
              </q-card>
            </div>
          </div>
        </q-step>

        <q-step
          :name="3"
          title="Proof of Payment"
          icon="add_comment"
          style="min-height: 200px"
        >
          <q-uploader
            style="max-width: 300px"
            @added="uploadFiles"
            label="Restricted to images"
            accept=".jpg, .png, image/*"
          />
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="step === 3 ? cashIn() : nextBtn($refs)"
              color="positive"
              :label="step === 3 ? 'Finish' : 'Continue'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>

        <template v-slot:message>
          <q-banner v-if="step === 1" class="bg-purple-8 text-white q-px-lg">
            Note: You can only request one deposit transaction at a time...
          </q-banner>
          <q-banner
            v-else-if="step === 2"
            class="bg-orange-8 text-white q-px-lg"
          >
            Note: Send payment through QR code or to the provided number...
          </q-banner>
          <q-banner v-else class="bg-green-8 text-white q-px-lg">
            Note: Attach screenshot for proof of transaction, please be reminded
            to include the transactions's referral id...
          </q-banner>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup>
import { useCashStore } from "src/stores/cashStore";
import { storeToRefs } from "pinia";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/authStore";

const $q = useQuasar();
const cashStore = useCashStore();
const authStore = useAuthStore();
const step = ref(1);

const { cashinForm, cashinLoading, pendingCashin, userCashin } =
  storeToRefs(cashStore);
const { cashIn, uploadFiles } = cashStore;

const { realTimeUser, unsubscribeRealTimeUser } = authStore;
function nextBtn($refs) {
  if (cashinForm.value.amount && cashinForm.value.channel) {
    $refs.stepper.next();
  } else {
    $q.notify({
      color: "negative",
      message: "Please enter the desired amount or channel transaction first",
      position: "top",
    });
  }
}

onMounted(() => {
  realTimeUser();
  userCashin.value;
  pendingCashin;
});

watch(pendingCashin, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    return pendingCashin;
  }
});

onBeforeUnmount(() => {
  unsubscribeRealTimeUser();
});
</script>

<style lang="scss" scoped></style>
