import { defineStore } from "pinia";
import { doc, setDoc, addDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "src/boot/firebase";
import { ref } from "vue";

export const useMatchStore = defineStore("match", {
  state: () => ({
    match: ref({
      game: "",
      type: "",
      bet: 0,
      winner: "",
      status: "",
    }),
  }),
  actions: {
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

      const data = { ...this.match };
      await setDoc(doc(db, "matches", newMatchId), data);
    },
  },
});
