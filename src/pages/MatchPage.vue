<template>
  <q-page>
    <div v-if="userData.hasPendingMatch" class="justify-center text-warning">
      <div class="row justify-center text-center text-warning text-h4">
        Our team is currently evaluating your match, please wait for a moment!
      </div>
      <div class="row justify-center q-pa-md">
        <q-spinner-puff size="5.5em" />
      </div>
    </div>

    <div
      v-if="matchData.status == 'Closed'"
      class="justify-center text-warning"
    >
      <div class="row justify-center text-center text-warning text-h4">
        This match is now closed, thanks for waiting!
      </div>
    </div>

    <div v-if="userData.showMatch">
      <div class="row justify-center">
        <div
          class="q-mb-md q-pa-sm bg-warning rounded-borders"
          style="width: 600px"
        >
          <span class="text-red text-bold">Note:</span> Please make sure all
          players name match in the current game! <br />
          <span class="text-red text-bold">Note:</span> If you win, upload
          screenshot of winning and please make sure to include game lobby ID
          <br />
          <span class="text-red text-bold">Note:</span> If you lose, we
          appreciate if you upload screenshot of losing for faster approval
          <br />
          <span class="text-red text-bold">Reminder:</span> Troll players will
          be automatically banned, please respect your opponent. GLHF!
        </div>
      </div>
      <div class="row justify-center">
        <q-card
          class="bg-primary q-pa-md"
          style="width: 100%; max-width: 1000px"
        >
          <div class="row bg-secondary text-warning">
            <div v-if="isHost" class="col text-yellow">
              <q-btn
                flat
                dense
                size="md"
                label="Requests"
                class="text-warning"
                @click="openChallengeRequestsModal"
                ><span class="text-yellow"
                  ><q-icon name="notifications"
                /></span>
                <q-badge v-if="isRequest" color="red" floating
                  >{{ requestBadge }}
                </q-badge>
              </q-btn>
            </div>
            <div v-if="matchData.challengerReady" class="col text-right">
              <span class="text-red">{{ matchData.challenger }}</span>
              is now ready!

              <q-icon name="check_circle" class="text-green" size="md" />
            </div>
          </div>

          <q-card-section
            horizontal
            class="row justify-between bg-secondary rounded-borders text-warning text-h5"
          >
            <q-card-section
              ><div class="text-subtitle2">
                Bet: <span class="text-positive">{{ matchData.bet }}</span>
              </div>
            </q-card-section>
            <q-card-section
              ><div class="text-subtitle2">
                Total Bet:
                <span class="text-positive">{{ matchData.totalBet }}</span>
              </div>
            </q-card-section>
            <q-card-section
              ><div class="text-subtitle2">e-match ID: {{ matchData.id }}</div>
            </q-card-section>
          </q-card-section>
          <div
            v-if="matchData.isStart"
            class="row justify-center text-h6 text-bold text-secondary bg-secondary text-warning"
          >
            <q-spinner-gears color="blue" size="1.5em" v-if="startLoading" />
            <div v-else class="text-orange">Game starts, good luck!</div>
          </div>
          <q-card-section class="bg-primary text-warning"
            ><div class="row q-gutter-md">
              <div class="col">
                <q-btn
                  flat
                  dense
                  class="bg-blue"
                  label="Add Team"
                  @click="openTeamModal"
                  size="sm"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-section
            class="justify-between bg-secondary text-warning q-pa-sm"
            ><div class="row">
              <div class="col">
                <q-avatar size="md"
                  ><img src="https://cdn.quasar.dev/img/avatar.png"
                /></q-avatar>
                <span class="text-bold q-ml-md text-blue">
                  {{ matchData.host }}
                </span>

                <div v-if="playerList" class="row justify-center">
                  <div class="col-12 text-center">{{ playerList.member1 }}</div>
                  <div class="col-12 text-center">{{ playerList.member2 }}</div>
                  <div class="col-12 text-center">{{ playerList.member3 }}</div>
                  <div class="col-12 text-center">{{ playerList.member4 }}</div>
                  <div class="col-12 text-center">{{ playerList.member5 }}</div>
                </div>
              </div>
              <div class="col text-center text-h5 text-bold">VS</div>
              <div class="col">
                <q-avatar size="md"
                  ><img src="https://cdn.quasar.dev/img/avatar.png"
                /></q-avatar>
                <span class="text-bold q-ml-md text-red">
                  {{ matchData.challenger }}</span
                >

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
              :disable="matchData.isStart"
              class="bg-grey text-warning"
              @click="openLeaveModal"
            />
            <q-btn
              v-if="matchData.isStart"
              label="Upload Proof"
              class="bg-blue text-warning"
              @click="openUploader"
            />
            <q-btn
              v-if="isHost"
              label="Start!"
              class="bg-positive text-warning"
              :disable="matchData.isStart"
              @click="startMatch"
            />
            <q-btn
              v-if="isChallenger && !matchData.challengerReady"
              label="Ready!"
              class="bg-positive text-warning"
              @click="ready"
            />
            <q-btn
              v-if="isChallenger && matchData.challengerReady"
              label="Cancel"
              :disable="matchData.isStart"
              class="bg-blue text-warning"
              @click="notReady"
            />
          </q-card-section>
        </q-card>
      </div>
      <!-- my teams -->
      <div class="q-pa-sm">
        <div
          class="text-warning text-bold bg-primary text-center rounded-borders"
        >
          My Teams
        </div>
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
                    <q-btn flat dense icon="more_vert">
                      <q-menu class="bg-primary q-p-none" style="width: 50px">
                        <q-list
                          ><q-item clickable v-close-popup>
                            <q-btn flat dense size="sm" class="bg-grey"
                              ><q-icon
                                name="edit"
                                @click="openTeamUpdateModal(team.id)" /></q-btn
                          ></q-item>
                          <q-item>
                            <q-btn flat dense size="sm" class="bg-red"
                              ><q-icon
                                name="delete"
                                @click="openTeamDeleteModal(team.id)" /></q-btn
                          ></q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div></div
              ></q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row">
                  <div class="col">
                    <span class="text-positive">Wins:</span>
                    {{ team.data.wins }}
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
                  @click="acceptRequest(request.id, request.challenger)"
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
                flat
                dense
              /></div></q-card-section></q-card
      ></q-dialog>

      <!-- Upload Proof Dialog -->
      <q-dialog v-model="showUploadDialog"
        ><q-card class="bg-primary"
          ><q-card-section
            ><div class="text-subtitle1 text-warning">
              <q-uploader
                style="max-width: 300px"
                @added="uploadFiles"
                label="Make sure to include game lobby ID from screenshot"
                accept=".jpg, .png, image/*"
              />
            </div>
            <div class="q-pa-md text-warning justify-center row">
              <q-btn
                label="Confirm"
                class="bg-positive"
                @click="submitProof"
                flat
                dense
              /></div></q-card-section></q-card
      ></q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useMatchStore } from "src/stores/matchStore";
import { onMounted, onBeforeUnmount, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/authStore";

const router = useRouter();

const $q = useQuasar();
const matchStore = useMatchStore();
const authStore = useAuthStore();
const { userData } = storeToRefs(authStore);
const { realTimeUser, unsubscribeRealTimeUser } = authStore;

const {
  matchData,
  requestList,
  teamData,
  teamUpdate,
  teamList,
  teamLoading,
  startLoading,
  playerList,
  teamModal,
  teamUpdateModal,
  teamDeleteModal,
  matchLeaveModal,
  challengeRequestsModal,
  challenger,
  challengerList,
  isHost,
  isChallenger,
  isRequest,
  showUpload,
  showUploadDialog,
  isJoin,
  isPending,
  requestBadge,
  btnDisable,
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
  ready,
  notReady,
  startMatch,
  loadTeams,
  acceptRequest,
  confirmLeave,
  realTimeMatch,
  unsubscribeRealTimeMatch,
  showRequest,
  showChallenger,
  uploadFiles,
  openUploader,
  submitProof,
  watchMatchStatus,
  goBackPlay,
} = matchStore;

const teams = teamList;
const requests = requestList;

onMounted(() => {
  loadTeams();
  realTimeMatch();
  realTimeUser();
  showRequest();
  showChallenger();
  userData;
});
watch(requestList, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    showRequest();
  }
});
watch(challenger, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    showChallenger();
  }
});

// watch(
//   () => matchData.status,
//   (newStatus) => {
//     if (newStatus == "Closed") {
//       router.push("/play");
//     }
//   }
// );
watch(matchData.status, (newVal, oldVal) => {
  if (newVal == "Closed") {
    goBackPlay();
  }
});
onBeforeUnmount(() => {
  unsubscribeRealTimeMatch();
  unsubscribeRealTimeUser();
});
</script>

<style lang="scss" scoped></style>
