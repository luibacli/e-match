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
} from "firebase/firestore";
import { db } from "src/boot/firebase";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

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
    matchId: ref(""),
    storedName: ref(""),
    gameName: ref(""),
    matchList: ref([]),

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
      this.gameName = "Fornite";
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
        id: `ematch-${newMatchId}`,
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

      // const router = useRouter();

      // router.push(`/play/${this.routeMatch}`);
      // console.log(this.matchId);
      // console.log(this.routeMatch);
      this.isOpen = false;
      this.tableLoading = false;
    },
    openModal() {
      this.isOpen = true;
    },
  },
});
