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
} from "firebase/firestore";
import { db } from "src/boot/firebase";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { data } from "autoprefixer";

export const useMatchStore = defineStore("match", {
  state: () => ({
    match: ref({
      id: "",
      host: "",
      game: "",
      type: "",
      bet: 0,
      winner: "",
      status: "",
      timestamp: "",
    }),
    matchData: ref({
      id: "",
      host: "",
      game: "",
      type: "",
      bet: 0,
      winner: "",
      status: "",
      timestamp: "",
    }),
    userId: ref(""),
    matchId: ref(""),
    storedName: ref(""),
    gameName: ref(""),
    matchList: ref([]),
    teamData: ref({
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
    }),
    teamUpdate: ref({
      name: "",
      member1: "",
      member2: "",
      member3: "",
      member4: "",
      member5: "",
    }),
    teamId: ref(""),
    teamList: ref([]),
    teamOptions: ref({}),
    teamModal: ref(false),
    teamUpdateModal: ref(false),
    teamDeleteModal: ref(false),
    matchLeaveModal: ref(false),
    teamLoading: ref(false),
    playerList: ref({
      team: "",
      player1: "",
      player2: "",
      player3: "",
      player4: "",
      player5: "",
    }),

    tableLoading: ref(false),
    isOpen: ref(false),
    matchColumns: [
      {
        name: "host",
        align: "center",
        label: "Host",
        field: "host",
        sortable: true,
      },
      {
        name: "game",
        align: "center",
        label: "Game",
        field: "game",
        sortable: true,
      },
      {
        name: "type",
        align: "center",
        label: "Type",
        field: "type",
        sortable: true,
      },
      {
        name: "bet",
        align: "center",
        label: "Bet Amount",
        field: "bet",
        sortable: true,
      },
    ],
  }),
  getters: {
    routeMatch: () => {
      const route = useRoute();
      return route.params.matchId;
    },
    playerId: () => {
      return localStorage.getItem("userId");
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
    async getMatch() {},
    async joinMatch() {
      const docRef = doc(db, "matches", this.routeMatch);

      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      this.matchData.id = data.id;
      this.matchData.game = data.game;
      this.matchData.bet = data.bet;
      this.matchData.host = data.host;
      this.matchData.type = data.type;
      this.matchData.winner = data.winner;
      this.matchData.status = data.status;
      console.log("match data", this.matchData);
    },
    async loadTeams() {
      this.teamLoading = true;
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
    },
    async setTeam(teamId) {
      if (teamId) {
        const docRef = doc(db, "teams", teamId);

        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        this.playerList.team = data.name;
        this.playerList.player1 = data.member1;
        this.playerList.player2 = data.member2;
        this.playerList.player3 = data.member3;
        this.playerList.player4 = data.member4;
        this.playerList.player5 = data.member5;
      } else {
        this.optionsModel = "";
        this.clearPlayers();
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
      const counterRef = doc(db, "counters", "matchCounter");

      const counterDoc = await getDoc(counterRef);

      if (!counterDoc.exists) {
        throw new Error("Counter document does not exist!");
      }

      let matchCounter = counterDoc.data().counter;

      matchCounter += 1;

      await updateDoc(counterRef, { counter: matchCounter });

      const newMatchId = matchCounter.toString();

      const getHost = localStorage.getItem("displayName");
      if (getHost) {
        this.storedName = getHost;
      } else {
        console.log("no display name found");
      }

      const docData = {
        id: `${newMatchId}`,
        host: getHost,
        game: this.match.game,
        type: this.match.type,
        bet: this.match.bet,
        winner: "Pending",
        status: "Open",
        timestamp: serverTimestamp(),
      };
      this.matchId = docData.id;
      console.log(this.matchId);
      await setDoc(doc(db, "matches", newMatchId), docData);
      this.router.push(`/play/${this.matchId}`);

      this.isOpen = false;
      this.tableLoading = false;
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
