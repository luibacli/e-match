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
} from "firebase/firestore";
import { db } from "src/boot/firebase";
import { ref } from "vue";

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
    storedName: "",
    matchList: [],
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
  actions: {
    async getMatches() {
      const query = await getDocs(collection(db, "matches"));
      const matchArray = [];
      query.forEach((doc) => {
        matchArray.push(doc.data());
      });

      this.matchList = matchArray;
      console.log(this.matchList);
    },
    async createMatch() {
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
      await setDoc(doc(db, "matches", newMatchId), docData);
    },
  },
});
