<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="bg-warning"
        ><q-card-section
          ><div class="row q-pa-sm">
            <div class="col-5 text-left">
              <q-img
                src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
                fit
                style="width: 50%; min-width: 100px"
              />
            </div>
            <div class="col-7 q-gutter-md text-bold">
              <div class="col-12">
                Username: <q-input :label="userData.displayName" readonly />
              </div>
              <div class="col-12">
                Balance: <q-input :label="userData.balance" readonly />
              </div>
              <div class="col-12">
                Email: <q-input :label="userData.email" readonly />
              </div>
              <div class="col-12">
                Mobile: <q-input :label="userData.phoneNumber" readonly />
              </div>
            </div>
          </div> </q-card-section
      ></q-card>
    </div>

    <div class="q-pa-md">
      <q-table
        class="bg-grey-8 text-warning"
        title="Match History"
        :columns="historyColumns"
        :rows="matchHistoryList"
        row-key="id"
        separator="cell"
        :pagination="pagination"
      />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "src/stores/authStore";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { historyColumns, matchHistoryList, pagination, userData } =
  storeToRefs(authStore);
const { getMatchHistory } = authStore;

onMounted(() => {
  getMatchHistory();
  userData;
});
</script>

<style lang="scss" scoped></style>
