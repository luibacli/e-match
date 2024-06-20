<template>
  <div v-if="teamLoading" class="text-h4 text-warning text-center">
    Loading....
  </div>
  <q-page v-else>
    <div class="row justify-center">
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
            <q-btn class="bg-blue" label="+" @click="openTeamModal" />

            <q-select
              clearable
              class="col-6 bg-warning"
              label="Set Team"
              v-model="optionsModel"
              :options="teamOptions"
            />
            <q-btn
              v-if="optionsModel"
              class="bg-red"
              label="Confirm"
              @click="setTeam(optionsModel.value)"
            />
          </div>
        </q-card-section>
        <q-card-section
          class="justify-between bg-secondary text-warning q-pa-sm"
          ><div class="row">
            <div class="col">
              <q-avatar
                ><img src="https://cdn.quasar.dev/img/avatar.png"
              /></q-avatar>
              <span class="text-bold q-ml-md"></span>
              <q-btn
                @click="openTeamUpdateModal(optionsModel.value)"
                dense
                flat
                size="sm"
                ><q-icon name="edit"
              /></q-btn>

              {{ playerList.team }}
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
        <q-card-section class="row justify-between bg-primary">
          <q-btn flat dense label="Leave Match" class="bg-grey text-warning" />
          <q-btn label="Start!" class="bg-positive text-warning" />
        </q-card-section>
      </q-card>
    </div>
    <!-- my teams -->
    <div class="q-pa-md">
      <div class="text-warning text-bold bg-primary text-center">My Teams</div>
      <div class="row q-pa-md text-warning">
        <div class="q-pa-md" v-for="team in teams" :key="team.id">
          <q-card class="bg-primary" style="width: 100%; max-width: 300px">
            <q-card-section
              ><div class="row text-bold">
                <div class="col-10">{{ team.data.name }}</div>
                <div class="col q-gutter-sm">
                  <q-btn flat dense size="sm" class="bg-red"
                    ><q-icon
                      name="delete"
                      @click="openTeamDeleteModal(team.id)"
                  /></q-btn>
                </div></div
            ></q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row">
                <div class="col">Wins</div>
                <div class="col">Loss</div>
              </div></q-card-section
            >
            <q-separator />
            <q-card-section>
              <div class="row text-overline">Players:</div>
              <div class="col">
                <li>{{ team.data.member1 }}</li>
                <li>{{ team.data.member2 }}</li>
                <li>{{ team.data.member3 }}</li>
                <li>{{ team.data.member4 }}</li>
                <li>{{ team.data.member5 }}</li>
              </div></q-card-section
            ></q-card
          >
        </div>
      </div>
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
                @click="createTeam"
              />
            </div>
          </div></div></q-card
    ></q-dialog>
    <!-- team update dialog -->

    <q-dialog v-model="teamUpdateModal"
      ><q-card class="bg-primary q-pa-md text-warning" style="width: 100%"
        ><div class="row">
          <div class="col q-gutter-md">
            <q-input
              clearable
              filled
              v-model="teamUpdate.name"
              class="bg-warning"
              placeholder="Team Name"
            />
            <q-input
              clearable
              filled
              v-model="teamUpdate.member1"
              class="bg-warning"
              placeholder="Player 1"
            />
            <q-input
              clearable
              filled
              v-model="teamUpdate.member2"
              class="bg-warning"
              placeholder="Player 2"
            />
            <q-input
              clearable
              filled
              v-model="teamUpdate.member3"
              class="bg-warning"
              placeholder="Player 3"
            />
            <q-input
              clearable
              filled
              v-model="teamUpdate.member4"
              class="bg-warning"
              placeholder="Player 4"
            />
            <q-input
              clearable
              filled
              v-model="teamUpdate.member5"
              class="bg-warning"
              placeholder="Player 5"
            />

            <div class="row justify-center">
              <q-btn
                class="bg-positive text-warning"
                label="Create Team"
                @click="updateTeam"
              />
            </div>
          </div></div></q-card
    ></q-dialog>

    <!-- team delete dialog -->
    <q-dialog v-model="teamDeleteModal"
      ><q-card class="bg-primary"
        ><q-card-section
          ><div class="text-subtitle1 text-warning">
            Are you sure you want to delete this team?
          </div>
          <div class="q-pa-md text-warning justify-center row">
            <q-btn
              label="Confirm"
              class="bg-positive"
              @click="deleteTeam"
              flat
              dense
            /></div></q-card-section></q-card
    ></q-dialog>
  </q-page>
</template>

<script setup>
import { useMatchStore } from "src/stores/matchStore";
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
const matchStore = useMatchStore();
const {
  matchData,
  teamData,
  teamUpdate,
  teamList,
  teamLoading,
  teamOptions,
  playerList,
  teamModal,
  teamUpdateModal,
  teamDeleteModal,
  optionsModel,
} = storeToRefs(matchStore);
const {
  openTeamUpdateModal,
  openTeamModal,
  openTeamDeleteModal,
  createTeam,
  deleteTeam,
  updateTeam,
  setTeam,
  joinMatch,
  loadTeams,
} = matchStore;

const teams = teamList;

// const populateOptions = () => {
//   options.value = teamList.value.map((team) => ({
//     label: team.data.name,
//     value: team.id, // Assuming each team has an 'id' field
//   }));
// };

onMounted(() => {
  joinMatch();
  loadTeams();

  // teamList.value.map((team) => {
  //   console.log(team.id);
  //   console.log(team.data.name);
  // });
});
watch(() => {
  optionsModel;
  teamOptions;
});
</script>

<style lang="scss" scoped></style>
