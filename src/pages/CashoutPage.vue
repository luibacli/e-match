<template>
  <q-page>
    <div v-show="pendingCashout" class="justify-center text-warning">
      <div class="row justify-center text-center text-warning text-h4">
        Your requested withdrawal amount is being processed, waiting for
        approval!
      </div>
      <div class="row justify-center q-pa-md">
        <q-spinner-puff size="5.5em" />
      </div>
    </div>

    <div v-if="cashoutLoading" class="col text-center text-warning">
      <q-spinner-puff size="5.5em" />
    </div>

    <div v-else v-show="!pendingCashout" class="q-pa-md text-warning">
      <q-card class="bg-primary"
        ><q-card-section>
          <div class="col text-center text-bold">
            Request Cashout
          </div></q-card-section
        >
        <q-separator />
        <q-card-section>
          <div class="q-pa-md">
            <div class="text-bold text-overline">Send thru:</div>
            <div class="row">
              <q-btn-toggle
                toggle-color="secondary"
                v-model="cashoutForm.channel"
                :options="[
                  { label: 'Gcash', value: 'Gcash' },
                  { label: 'Maya', value: 'Maya' },
                ]"
              />
            </div>
          </div>

          <q-separator />

          <div class="q-pa-md">
            <div class="text-bold text-overline">Select amount:</div>
            <div class="row">
              <q-btn-toggle
                toggle-color="secondary"
                v-model="cashoutForm.amount"
                :options="[
                  { label: '100', value: '100' },
                  { label: '200', value: '200' },
                  { label: '300', value: '300' },
                  { label: '400', value: '400' },
                  { label: '500', value: '500' },
                ]"
              />
              <q-btn-toggle
                toggle-color="secondary"
                v-model="cashoutForm.amount"
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
              class="text-warning"
              filled
              placeholder="Enter amount"
              type="number"
              v-model="cashoutForm.amount"
            />
            <q-input
              class="text-warning"
              filled
              placeholder="Enter your mobile number"
              type="text"
              v-model="cashoutForm.receiver"
            />
          </div>
          <div class="row justify-center q-pa-md">
            <q-btn label="withdraw" class="bg-positive" @click="cashout" />
          </div> </q-card-section
      ></q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useCashStore } from "src/stores/cashStore";
import { storeToRefs } from "pinia";
import { onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "src/stores/authStore";

const cashStore = useCashStore();
const authStore = useAuthStore();

const { cashoutForm, cashoutLoading, pendingCashout, userCashout } =
  storeToRefs(cashStore);
const { cashout } = cashStore;

const { realTimeUser, unsubscribeRealTimeUser } = authStore;

onMounted(() => {
  realTimeUser();
  userCashout.value;
  pendingCashout;
});

onBeforeUnmount(() => {
  unsubscribeRealTimeUser();
});
</script>

<style lang="scss" scoped></style>
