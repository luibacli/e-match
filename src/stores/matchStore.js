import { defineStore, storeToRefs } from "pinia";
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
  onSnapshot,
  arrayRemove,
} from "firebase/firestore";
import { db } from "src/boot/firebase";

import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "./authStore";

import { Notify } from "quasar";
const authStore = useAuthStore();
// const { playerId, playerName } = storeToRefs(authStore);

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
    requestBadge: 0,
    isRequest: false,
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
    btnDisable: false,
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
    async matchRequest() {
      try {
        if (!this.isChallenger && !this.isHost) {
          const docRef = doc(db, "matches", this.matchId);

          await updateDoc(docRef, {
            requests: arrayUnion({
              id: authStore.user.id,
              challenger: authStore.user.name,
            }),
          });

          Notify.create({
            color: "positive",
            message: "Challenge request sent!",
          });
          this.challengeModal = false;
        } else {
          Notify.create({
            icon: "announcement",
            color: "warning",
            textColor: "dark",
            message: "You are stil in the lobby, please leave first!",
          });
        }
      } catch (error) {
        console.error(error);
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
        Notify.create({
          color: "positive",
          message: "User's request challenge accepted",
        });
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
          this.matchLeaveModal = false;
          Notify.create({
            color: "positive",
            message: "You left the match and it has been deleted",
          });
        }
        if (this.isChallenger) {
          await updateDoc(docRef, {
            isChallenger: false,
            acceptedId: arrayRemove(authStore.user.id),
          });
          this.matchLeaveModal = false;
          Notify.create({
            color: "positive",
            message: "You left the match",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    realTimeMatch() {
      try {
        const unsub = onSnapshot(
          doc(db, "matches", this.routeMatch),

          (docSnapShot) => {
            const data = docSnapShot.data();
            if (data) {
              this.matchData = data || {};
              this.playerList = data.hosts || {};
              this.challengerList = data.challengers || {};
              this.requestList = data.requests || [];
              console.log("requests", this.requestList);
              this.requestBadge = this.requestList.length;
              if (this.requestList.length > 0) {
                this.isRequest = true;
              } else {
                this.isRequest = false;
              }
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
    async ready() {
      try {
        const docRef = doc(db, "matches", this.routeMatch);

        await updateDoc(docRef, {
          challengerReady: true,
          challenger: authStore.user.name,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async notReady() {
      try {
        const docRef = doc(db, "matches", this.routeMatch);

        await updateDoc(docRef, {
          challengerReady: false,
          challenger: "",
        });
      } catch (error) {
        console.log(error);
      }
    },

    async startMatch() {
      try {
        const docRef = doc(db, "matches", this.routeMatch);

        await updateDoc(docRef, {
          isStart: true,
        });

        // this.btnDisable = true;
      } catch (error) {
        console.log(error);
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
      this.teamLoading = true;
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
        Notify.create({
          color: "positive",
          message: "Your team is now set",
        });
        this.teamLoading = false;
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    async createTeam() {
      try {
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
        await this.loadTeams();
        this.teamModal = false;

        Notify.create({
          color: "positive",
          message: "You created your team!",
        });
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    async updateTeam() {
      try {
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
        await this.loadTeams();
        this.openTeamUpdateModal = false;
        Notify.create({
          color: "positive",
          message: "Your team is now updated!",
        });
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    async deleteTeam() {
      try {
        await deleteDoc(doc(db, "teams", this.teamId));
        await this.loadTeams();
        Notify.create({
          color: "positive",
          message: "Team deleted!",
        });
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }

      this.teamDeleteModal = false;
    },
    async createMatch() {
      this.tableLoading = true;
      // if (this.playerId) {
      //   throw new Error("Player ID not found");
      // }
      try {
        if (!this.isHost) {
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
            userRef: `${authStore.user.id}`,
            challengerRef: "",
            game: this.match.game,
            type: this.match.type,
            bet: this.match.bet,
            acceptedId: [`${authStore.user.id}`],
            gameLobbyId: "",
            hosts: [],
            challengers: [],
            challengerReady: false,
            isStart: false,
            totalBet: 0,
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
          const userRef = doc(db, "users", authStore.user.id);
          await updateDoc(userRef, { isHost: true });
          this.router.push(`/play/${this.matchId}`);

          this.isOpen = false;
          this.tableLoading = false;
          Notify.create({
            color: "positive",
            message: "Match has been created, please wait for challengers",
          });
        } else if (this.isHost || this.isChallenger) {
          Notify.create({
            icon: "announcement",
            color: "warning",
            textColor: "dark",
            message: "You already created a match!",
          });
        } else {
          Notify.create({
            icon: "announcement",
            color: "warning",
            textColor: "dark",
            message: "You are stil in the lobby, please leave first!",
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
  },
});
