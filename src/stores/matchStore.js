import { defineStore } from "pinia";
import {
  doc,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  where,
  query,
  arrayUnion,
  deleteDoc,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db } from "src/boot/firebase";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "./authStore";
import { route } from "quasar/wrappers";
import { Notify } from "quasar";
import { useQuasar } from "quasar";

const $q = useQuasar();

const authStore = useAuthStore();

export const useMatchStore = defineStore("match", {
  state: () => ({
    match: {
      id: "",
      host: "",
      game: "",
      type: "",
      bet: 0,
      winner: "",
      status: "",
      timestamp: "",
    },
    // matchData: {
    //   id: "",
    //   host: "",
    //   challenger: "",
    //   game: "",
    //   type: "",
    //   bet: "",
    //   acceptedId: [],
    //   gameLobbyId: "",
    //   hosts: [],
    //   challengers: [],
    //   gameLobbyHosts: [],
    //   gameLobbyChallengers: [],
    //   requests: [],
    //   gameTime: "",
    //   winner: "",
    //   status: "",
    //   timestamp: "",
    // },
    matchData: {},
    accepted: [],
    userId: "",
    matchId: "",
    hostName: "",
    storedName: "",
    gameName: "",
    matchList: [],
    requestList: [],
    teamData: {
      id: "",
      name: "",
      member1: "",
      member2: "",
      member3: "",
      member4: "",
      member5: "",
      wins: 0,
      loss: 0,
      timestamp: "",
      userRef: "",
    },
    challengerTeamData: {
      id: "",
      name: "",
      member1: "",
      member2: "",
      member3: "",
      member4: "",
      member5: "",
      wins: 0,
      loss: 0,
      timestamp: "",
      userRef: "",
    },
    challengerTeamList: [],

    teamUpdate: {
      name: "",
      member1: "",
      member2: "",
      member3: "",
      member4: "",
      member5: "",
    },
    teamId: "",
    teamList: [],
    teamModal: false,
    teamUpdateModal: false,
    teamDeleteModal: false,
    matchLeaveModal: false,
    challengeModal: false,
    challengeRequestsModal: false,
    teamLoading: false,
    // playerList: ref({
    //   team: "",
    //   player1: "",
    //   player2: "",
    //   player3: "",
    //   player4: "",
    //   player5: "",
    //   wins: 0,
    //   loss: 0,
    // }),
    playerList: {},

    // challengerList: ref({
    //   team: "",
    //   player1: "",
    //   player2: "",
    //   player3: "",
    //   player4: "",
    //   player5: "",
    //   wins: 0,
    //   loss: 0,
    // }),
    challengerList: {},
    challengerData: {},

    tableLoading: false,
    isOpen: false,
  }),
  getters: {
    routeMatch: () => {
      const route = useRoute();
      return route.params.matchId;
    },
    playerId: () => {
      return authStore.user.id;
    },
    playerName: () => {
      return authStore.user.name;
    },
    host: () => {
      return authStore.user.name;
    },
    isHost: () => {
      return authStore.userData.isHost;
    },
    isChallenger: () => {
      return authStore.userData.isChallenger;
    },
    acceptedPlayers: (state) => {
      return state.matchData.acceptedId;
    },
  },
  actions: {
    async getMatches() {
      this.tableLoading = true;
      const query = await getDocs(collection(db, "matches"));
      const matchArray = [];
      query.forEach((doc) => {
        matchArray.push(doc.data());
      });

      this.matchList = matchArray;

      this.tableLoading = false;
    },
    async getDota2() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "Dota2"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });

      this.matchList = gameData;
      this.gameName = "Dota2";

      this.tableLoading = false;
    },
    async getMl() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "Mobile Legends"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "Mobile Legends";
      this.tableLoading = false;
    },
    async getCrossfire() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "Crossfire"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "Crossfire";
      this.tableLoading = false;
    },
    async getCsGo() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "CS: Go"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "CS: Go";
      this.tableLoading = false;
    },
    async getValorant() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "Valorant"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "Valorant";
      this.tableLoading = false;
    },
    async getCodM() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "CODM"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.tableLoading = false;
    },
    async getPubg() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "PUBG"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "PUBG";
      this.tableLoading = false;
    },
    async getAov() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "AOV"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "AOV";
      this.tableLoading = false;
    },

    async getApex() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "Apex Legends"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "Apex Legends";
      this.tableLoading = false;
    },
    async getFornite() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "Fortnite"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "Fortnite";
      this.tableLoading = false;
    },
    async getLol() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "League of Legends"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "League of Legends";
      this.tableLoading = false;
    },
    async getRocket() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", "Rocket League"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(gameQuery);
      const gameData = [];
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      this.matchList = gameData;
      this.gameName = "Rocket League";
      this.tableLoading = false;
    },
    async filterOne() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", `${this.gameName}`),
        where("type", "==", "1vs1"),
        where("status", "==", "Open")
      );
      const gameData = [];
      const querySnapshot = await getDocs(gameQuery);
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });

      this.matchList = gameData;
      this.tableLoading = false;
    },
    async filterTeam() {
      this.tableLoading = true;
      const gameQuery = query(
        collection(db, "matches"),
        where("game", "==", `${this.gameName}`),
        where("type", "==", "TvsT"),
        where("status", "==", "Open")
      );
      const gameData = [];
      const querySnapshot = await getDocs(gameQuery);
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });

      this.matchList = gameData;
      this.tableLoading = false;
    },
    async loadMatch(id) {
      const docRef = doc(db, "matches", id);

      const docSnap = await getDoc(docRef);
      console.log("data", docSnap.data());
    },

    async joinMatch() {
      this.teamLoading = true;
      const docRef = doc(db, "matches", this.routeMatch);
      const docSnap = await getDoc(docRef);

      const data = docSnap.data();
      this.matchData = { ...data };

      if (this.isHost) {
        console.log("yes you are host");
      } else {
        console.log("you are not the host");
      }
      if (this.isChallenger) {
        console.log("yes you are challenger");
      } else {
        console.log("you are not the challenger");
      }
      this.teamLoading = false;
    },
    async matchRequest() {
      if (!this.isChallenger && !this.isHost) {
        const docRef = doc(db, "matches", this.matchId);

        await updateDoc(docRef, {
          requests: arrayUnion({
            id: this.playerId,
            challenger: this.playerName,
          }),
        });

        console.log("Request sent");
        Notify.create({
          color: "positive",
          message: "Request sent!",
        });
        this.challengeModal = false;
      } else {
        console.log("You are still in a lobby, please leave first!");
      }
    },
    async acceptRequest(id) {
      try {
        const docRef = doc(db, "users", id);
        const matchRef = doc(db, "matches", this.routeMatch);
        await updateDoc(docRef, {
          isChallenger: true,
        });
        await updateDoc(matchRef, {
          acceptedId: arrayUnion(id),
        });
        this.challengeRequestsModal = false;
        console.log("User Accepted");
      } catch (error) {
        console.error(error);
      }
    },
    async confirmLeave() {
      try {
        const docRef = doc(db, "users", this.playerId);

        if (this.isHost) {
          await updateDoc(docRef, {
            isHost: false,
          });
          console.log("You are now leaving as host");
        }
        if (this.isChallenger) {
          await updateDoc(docRef, {
            isChallenger: false,
          });
          console.log("You are now leaving as challenger");
        }
      } catch (error) {
        console.error(error);
      }
    },
    realTimeMatch() {
      this.teamLoading = true;
      try {
        const unsub = onSnapshot(
          doc(db, "matches", this.routeMatch),
          // {
          //   includeMetadataChanges: true,
          //   source: "cache",
          // },
          (docSnapShot) => {
            const data = docSnapShot.data();
            if (data) {
              this.matchData = data || {};
              this.playerList = data.hosts || {};
              this.challengerList = data.challengers || {};
              this.requestList = data.requests || [];
            } else {
              console.log("No Data Found");
            }
          },

          (error) => {
            Notify.create({
              color: "negative",
              message: error.message,
            });
          }
        );
        this.unsubscribeRealTimeMatch = unsub;
        this.teamLoading = false;
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    unsubscribeRealTimeMatch() {
      if (this.unsubscribeRealTimeMatch) {
        this.unsubscribeRealTimeMatch();
      }
    },

    async loadTeams() {
      this.teamLoading = true;
      try {
        const q = query(
          collection(db, "teams"),
          where("userRef", "==", this.playerId)
        );
        const querySnap = await getDocs(q);
        const teamData = [];
        querySnap.forEach((doc) => {
          return teamData.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        this.teamList = teamData;

        this.teamLoading = false;
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    async setTeam(teamId) {
      try {
        const docRef = doc(db, "teams", teamId);
        const matchRef = doc(db, "matches", this.routeMatch);

        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (this.isHost) {
          await updateDoc(matchRef, {
            hosts: { ...data },
          });
        } else if (this.isChallenger) {
          this.challengerList = { ...data };
          await updateDoc(matchRef, {
            challengers: { ...data },
          });
        } else {
          console.log("Not a challenger nor a host");
        }
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    async createTeam() {
      this.teamLoading = true;
      const docData = {
        name: this.teamData.name,
        member1: this.teamData.member1,
        member2: this.teamData.member2,
        member3: this.teamData.member3,
        member4: this.teamData.member4,
        member5: this.teamData.member5,
        wins: this.teamData.wins,
        loss: this.teamData.loss,
        userRef: this.playerId,
        timestamp: serverTimestamp(),
      };

      const teamRef = collection(db, "teams");

      await addDoc(teamRef, docData);

      this.clearTeamData();
      await this.loadTeams();
      this.optionsModel = "";
      this.teamModal = false;
      this.teamLoading = false;
      console.log("team Data", docData);
    },
    async updateTeam() {
      this.openTeamUpdateModal = false;
      const docData = {
        name: this.teamUpdate.name,
        member1: this.teamUpdate.member1,
        member2: this.teamUpdate.member2,
        member3: this.teamUpdate.member3,
        member4: this.teamUpdate.member4,
        member5: this.teamUpdate.member5,
      };
      const docRef = doc(db, "teams", this.teamId);
      await updateDoc(docRef, docData);
      this.optionsModel = "";
      this.playerList = { ...docData };
      await this.setTeam(this.teamId);
      await this.loadTeams();
    },
    async deleteTeam() {
      await deleteDoc(doc(db, "teams", this.teamId));
      this.optionsModel = "";
      await this.loadTeams();
      await this.setTeam();

      this.teamDeleteModal = false;
    },
    async createMatch() {
      this.tableLoading = true;

      try {
        if (!this.isHost && !this.isChallenger) {
          const counterRef = doc(db, "counters", "matchCounter");

          const counterDoc = await getDoc(counterRef);

          if (!counterDoc.exists) {
            throw new Error("Counter document does not exist!");
          }

          let matchCounter = counterDoc.data().counter;

          matchCounter += 1;

          await updateDoc(counterRef, { counter: matchCounter });

          const newMatchId = matchCounter.toString();

          if (this.host) {
            this.storedName = this.host;
          } else {
            console.log("no display name found");
          }

          const docData = {
            id: `${newMatchId}`,
            host: this.host,
            challenger: "",
            game: this.match.game,
            type: this.match.type,
            bet: this.match.bet,
            acceptedId: [`${this.playerId}`],
            gameLobbyId: "",
            hosts: [],
            challengers: [],
            gameLobbyHosts: [],
            gameLobbyChallengers: [],
            requests: [],
            gameTime: "",
            winner: "Pending",
            status: "Open",
            timestamp: serverTimestamp(),
          };
          this.matchId = docData.id;
          await setDoc(doc(db, "matches", newMatchId), docData);
          const userRef = doc(db, "users", this.playerId);
          await updateDoc(userRef, { isHost: true });
          this.router.push(`/play/${this.matchId}`);

          this.isOpen = false;
          this.tableLoading = false;
        } else {
          $q.notify({
            type: "negative",
            message: 'This is a "negative" type notification.',
          });
        }
      } catch (error) {
        console.error(error);
      }
    },

    openModal() {
      this.isOpen = true;
    },
    openTeamModal() {
      this.teamModal = true;
    },
    openLeaveModal() {
      this.matchLeaveModal = true;
    },
    openChallengeRequestsModal() {
      this.challengeRequestsModal = true;
    },
    async openTeamUpdateModal(id) {
      this.teamId = id;
      const docRef = doc(db, "teams", this.teamId);
      const docSnap = await getDoc(docRef);

      const data = docSnap.data();
      this.teamUpdate.name = data.name;
      this.teamUpdate.member1 = data.member1;
      this.teamUpdate.member2 = data.member2;
      this.teamUpdate.member3 = data.member3;
      this.teamUpdate.member4 = data.member4;
      this.teamUpdate.member5 = data.member5;
      this.teamUpdateModal = true;
    },
    openTeamDeleteModal(id) {
      this.teamId = id;
      this.teamDeleteModal = true;
    },
    async openChallengeModal(id, host) {
      try {
        const docRef = doc(db, "matches", id);
        const userRef = doc(db, "users", this.playerId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const acceptedData = data.acceptedId;
        const accepted = acceptedData.includes(this.playerId);
        if (accepted && this.isHost) {
          this.router.push(`/play/${id}`);
        } else if (accepted && !this.isHost) {
          await updateDoc(userRef, {
            isChallenger: true,
          });
          this.router.push(`/play/${id}`);
        } else {
          this.matchId = id;
          this.hostName = host;
          this.challengeModal = true;
        }
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }

      // this.matchId = id;
      // this.hostName = host;
      // this.challengeModal = true;
    },
    clearPlayers() {
      this.playerList.team = "";
      this.playerList.player1 = "";
      this.playerList.player2 = "";
      this.playerList.player3 = "";
      this.playerList.player4 = "";
      this.playerList.player5 = "";
    },
    clearTeamData() {
      this.teamData.id = "";
      this.teamData.name = "";
      this.teamData.member1 = "";
      this.teamData.member2 = "";
      this.teamData.member3 = "";
      this.teamData.member4 = "";
      this.teamData.member5 = "";
    },
    matchRefresh() {
      if (!this.teamLoading) {
        this.teamLoading = true;
        this.teamLoading = false;
      }
      console.log(this.teamLoading);
    },
  },
});
