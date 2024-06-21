<template>
  <q-page>
    <q-btn icon="refresh" class="bg-grey" @click="realTimeMatch" />
    <div class="row justify-center">
      <div class="q-ma-md q-pa-sm bg-warning" style="width: 450px">
        <span class="text-red text-bold">Note:</span> Please make sure all
        players name match in the current game!
      </div>
    </div>

    <div class="row justify-center">
      <q-card class="bg-warning q-pa-md" style="width: 100%; max-width: 1000px">
        <div v-show="isHost" class="row bg-secondary text-yellow">
          <q-btn
            flat
            dense
            size="md"
            label="Waiting for Request"
            class="text-warning"
            @click="openChallengeRequestsModal"
            ><span class="text-yellow"><q-icon name="notifications" /></span>
            <q-badge v-show="isRequest" color="red" floating
              >{{ requestBadge }}
            </q-badge>
          </q-btn>
        </div>
        <q-card-section
          horizontal
          class="row justify-between bg-primary text-warning text-h5"
        >
          <q-card-section>Bet: {{ matchData.bet }}</q-card-section>
          <q-card-section>e-match ID: {{ matchData.id }}</q-card-section>
        </q-card-section>
        <q-card-section class="bg-primary text-warning"
          ><div class="row q-gutter-md">
            <q-btn class="bg-blue" label="Add Team" @click="openTeamModal" />
          </div>
        </q-card-section>
        <q-card-section
          class="justify-between bg-secondary text-warning q-pa-sm"
          ><div class="row">
            <div class="col">
              <q-avatar size="md"
                ><img src="https://cdn.quasar.dev/img/avatar.png"
              /></q-avatar>
              <span class="text-bold q-ml-md"></span>
              {{ playerList.name }}
              <div v-if="playerList" class="row justify-center">
                <div class="col-12 text-center">{{ playerList.member1 }}</div>
                <div class="col-12 text-center">{{ playerList.member2 }}</div>
                <div class="col-12 text-center">{{ playerList.member3 }}</div>
                <div class="col-12 text-center">{{ playerList.member4 }}</div>
                <div class="col-12 text-center">{{ playerList.member5 }}</div>
              </div>
            </div>
            <div class="col text-center text-h4">VS</div>
            <div class="col">
              <q-avatar size="md"
                ><img src="https://cdn.quasar.dev/img/avatar.png"
              /></q-avatar>
              <span class="text-bold q-ml-md"></span>
              {{ challengerList.name }}
              <div v-if="challengerList" class="row justify-center">
                <div class="col-12 text-center">
                  {{ challengerList.member1 }}
                </div>
                <div class="col-12 text-center">
                  {{ challengerList.member2 }}
                </div>
                <div class="col-12 text-center">
                  {{ challengerList.member3 }}
                </div>
                <div class="col-12 text-center">
                  {{ challengerList.member4 }}
                </div>
                <div class="col-12 text-center">
                  {{ challengerList.member5 }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="row justify-between bg-primary">
          <q-btn
            flat
            dense
            label="Leave Match"
            class="bg-grey text-warning"
            @click="openLeaveModal"
          />
          <q-btn
            v-show="isHost"
            label="Start!"
            class="bg-positive text-warning"
          />
          <q-btn
            v-show="isChallenger"
            label="Ready!"
            class="bg-positive text-warning"
          />
        </q-card-section>
      </q-card>
    </div>
    <!-- my teams -->
    <div class="q-pa-sm">
      <div class="text-warning text-bold bg-primary text-center">My Teams</div>
      <div v-if="teamLoading" class="text-h4 text-warning text-center">
        <q-spinner-puff color="warning" size="4em" />
      </div>
      <div v-else class="row q-pa-sm text-warning">
        <div class="row q-pa-sm" v-for="team in teams" :key="team.id">
          <q-card class="bg-primary" style="width: 100%; max-width: 300px">
            <q-card-section
              ><div class="row text-bold">
                <div class="col-10">{{ team.data.name }}</div>
                <div class="col q-gutter-sm">
                  <q-btn flat dense size="sm" class="bg-gray"
                    ><q-icon name="edit" @click="openTeamUpdateModal(team.id)"
                  /></q-btn>
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
                <div class="col">
                  <span class="text-positive">Wins:</span> {{ team.data.wins }}
                </div>
                <div class="col">
                  <span class="text-red">Loss:</span> {{ team.data.loss }}
                </div>
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
              </div>
              <div class="q-pa-sm">
                <q-btn
                  flat
                  dense
                  label="Play with this team"
                  class="bg-green"
                  size="sm"
                  @click="setTeam(team.id)"
                /></div></q-card-section
          ></q-card>
        </div>
      </div>
    </div>

    <!-- challenge requests dialog -->
    <q-dialog v-model="challengeRequestsModal"
      ><q-card class="bg-primary" style="width: 100%">
        <q-card-section
          ><div class="text-center text-warning text-bold text-subtitle2">
            Challenge Requests:
          </div>
          <q-separator />
        </q-card-section>
        <q-card-section class="bg-warning">
          <div
            class="row q-pa-sm"
            v-for="request in requestList"
            :key="request.id"
          >
            <div class="col">
              <span class="text-red">{{ request.challenger }}</span>
              <span> wants to challenge!</span>
            </div>
            <div class="row q-gutter-sm justify-right">
              <q-btn
                flat
                dense
                class="bg-positive"
                size="sm"
                @click="acceptRequest(request.id)"
                ><q-icon name="check"
              /></q-btn>
              <q-btn flat dense class="bg-red" size="sm"
                ><q-icon name="close"
              /></q-btn>
            </div>
          </div> </q-card-section></q-card
    ></q-dialog>
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
                label="Update Team"
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

    <!-- team leave dialog -->
    <q-dialog v-model="matchLeaveModal"
      ><q-card class="bg-primary"
        ><q-card-section
          ><div class="text-subtitle1 text-warning">
            Are you sure you want to leave? All progress will be deleted!
          </div>
          <div class="q-pa-md text-warning justify-center row">
            <q-btn
              label="Confirm"
              class="bg-positive"
              @click="confirmLeave"
              :to="'/play'"
              flat
              dense
            /></div></q-card-section></q-card
    ></q-dialog>
  </q-page>
</template>

<script setup>
import { useMatchStore } from "src/stores/matchStore";
import { useAuthStore } from "src/stores/authStore";
import { onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
const matchStore = useMatchStore();
const authStore = useAuthStore();
const { getUser } = authStore;
const {
  matchData,
  requestList,
  teamData,
  teamUpdate,
  teamList,
  teamLoading,
  playerList,
  teamModal,
  teamUpdateModal,
  teamDeleteModal,
  matchLeaveModal,
  challengeRequestsModal,
  challengerList,
  isHost,
  isChallenger,
  isRequest,
  requestBadge,
} = storeToRefs(matchStore);
const {
  openTeamUpdateModal,
  openTeamModal,
  openTeamDeleteModal,
  openLeaveModal,
  openChallengeRequestsModal,
  createTeam,
  deleteTeam,
  updateTeam,
  setTeam,

  loadTeams,
  acceptRequest,
  confirmLeave,
  realTimeMatch,
  unsubscribeRealTimeMatch,
} = matchStore;

const teams = teamList;
const requests = requestList;

onMounted(() => {
  // getUser();
  loadTeams();
  realTimeMatch();
});

onBeforeUnmount(() => {
  unsubscribeRealTimeMatch();
});
// onBeforeMount(() => {
//   unsubscribeRealTimeMatch();
// });
</script>

<style lang="scss" scoped>
.request {
  border-bottom-color: aqua;
  border-bottom: 100px;
}
</style>
