<template>
  <q-page
    ><div class="row justify-center">
      <div class="q-ma-md q-pa-sm bg-warning" style="width: 450px">
        <span class="text-red text-bold">Note:</span> Please make sure all
        players name match in the current game!
      </div>
    </div>

    <div class="row justify-center">
      <q-card class="bg-warning q-pa-md" style="width: 100%; max-width: 1000px">
        <q-card-section
          horizontal
          class="row justify-between bg-primary text-warning text-h5"
        >
          <q-card-section>Bet: {{ matchData.bet }}</q-card-section>
          <q-card-section>e-match ID: {{ matchData.id }}</q-card-section>
        </q-card-section>
        <q-card-section class="bg-primary text-warning"
          ><div class="row q-gutter-md">
            <q-btn
              class="bg-blue"
              label="+"
              @click="matchStore.openTeamModal"
            />

            <q-select
              clearable
              class="col-6 bg-warning"
              label="Set Team"
              v-model="model"
              :options="teamOptions"
            />
            <q-btn
              v-if="model"
              class="bg-red"
              label="Confirm"
              @click="matchStore.setTeam(model.value)"
            />
          </div>
        </q-card-section>
        <q-card-section
          class="justify-between bg-secondary text-warning q-pa-sm"
          ><div class="row">
            <!-- <q-card-section
            ><q-avatar
              ><img src="https://cdn.quasar.dev/img/avatar.png" /></q-avatar
            ><span class="text-positive text-subtitle1 q-ml-md">
              {{ matchData.host }}</span
            >
            <q-card-section
              >Players:
              <ul>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
              </ul></q-card-section
            ></q-card-section
          >
          <q-card-section><div class="text-h4">VS</div></q-card-section>
          <q-card-section
            ><q-avatar
              ><img src="https://cdn.quasar.dev/img/avatar.png"
            /></q-avatar>
            <span class="text-red text-subtitle1 q-ml-md"> Team B</span>
            <q-card-section
              >Players:
              <ul>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
                <li>Hello</li>
              </ul></q-card-section
            >
          </q-card-section> -->
            <div class="col">
              <q-avatar
                ><img src="https://cdn.quasar.dev/img/avatar.png"
              /></q-avatar>
              <span class="text-bold q-ml-md"></span>
              Team A
              <div v-if="playerList" class="row justify-center">
                <div class="col-12 text-center">{{ playerList.player1 }}</div>
                <div class="col-12 text-center">{{ playerList.player2 }}</div>
                <div class="col-12 text-center">{{ playerList.player3 }}</div>
                <div class="col-12 text-center">{{ playerList.player4 }}</div>
                <div class="col-12 text-center">{{ playerList.player5 }}</div>
              </div>
            </div>
            <div class="col text-center text-h4">VS</div>
            <div class="col text-right">
              <q-avatar
                ><img src="https://cdn.quasar.dev/img/avatar.png"
              /></q-avatar>
              <span class="text-bold q-ml-md"></span>
              Team B
            </div>
          </div>
        </q-card-section>
        <q-card-section class="row justify-center bg-primary"
          ><q-btn label="Start" class="bg-positive text-warning"
        /></q-card-section>
      </q-card>
    </div>
    <!-- team create dialog -->
    <q-dialog v-model="teamModal"
      ><q-card class="bg-primary q-pa-md text-warning" style="width: 100%"
        ><div class="row">
          <div class="col q-gutter-md">
            <q-input
              clearable
              filled
              v-model="teamData.name"
              class="bg-warning"
              placeholder="Team Name"
            />
            <q-input
              clearable
              filled
              v-model="teamData.member1"
              class="bg-warning"
              placeholder="Player 1"
            />
            <q-input
              clearable
              filled
              v-model="teamData.member2"
              class="bg-warning"
              placeholder="Player 2"
            />
            <q-input
              clearable
              filled
              v-model="teamData.member3"
              class="bg-warning"
              placeholder="Player 3"
            />
            <q-input
              clearable
              filled
              v-model="teamData.member4"
              class="bg-warning"
              placeholder="Player 4"
            />
            <q-input
              clearable
              filled
              v-model="teamData.member5"
              class="bg-warning"
              placeholder="Player 5"
            />

            <div class="row justify-center">
              <q-btn
                class="bg-positive text-warning"
                label="Create Team"
                @click="matchStore.createTeam"
              />
            </div>
          </div></div></q-card
    ></q-dialog>

    <!-- testing -->
    <!-- <div class="row text-warning">
      Test
      <div>
        <ul v-for="team in teams" :key="team.id">
          <li>{{ team.data.name }}</li>
        </ul>
      </div>
    </div> -->
  </q-page>
</template>

<script setup>
import { useMatchStore } from "src/stores/matchStore";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
const matchStore = useMatchStore();
const { matchData, teamData, teamList, teamOptions, playerList, teamModal } =
  storeToRefs(matchStore);
const model = ref("");
const isOpen = ref(false);
const teams = teamList;
const options = [];
const hasTeam = false;
// const populateOptions = () => {
//   options.value = teamList.value.map((team) => ({
//     label: team.data.name,
//     value: team.id, // Assuming each team has an 'id' field
//   }));
// };

onMounted(() => {
  matchStore.joinMatch();
  matchStore.loadTeam();

  // teamList.value.map((team) => {
  //   console.log(team.id);
  //   console.log(team.data.name);
  // });
});
</script>

<style lang="scss" scoped></style>
