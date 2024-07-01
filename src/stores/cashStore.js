import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "src/boot/firebase";
import { useAuthStore } from "./authStore";
const authStore = useAuthStore();
export const useCashStore = defineStore("cash", {
  state: () => ({
    cashinForm: {
      amount: 0,
      sender: "",
      receiver: null,
      screenshot: "",
      channel: null,
    },
    cashoutForm: {
      amount: 0,
      sender: "",
      receiver: "",
      screenshot: "",
    },
  }),

  actions: {
    async cashIn() {
      try {
        const collectionRef = collection(db, "cashin");
        const userRef = doc(db, "users", authStore.user.id);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();
        const formData = {
          amount: this.cashinForm.amount,
          sender: `${data.displayName}`,
          balance: `${data.balance}`,
          receiver: this.cashinForm.receiver,
          screenshot: "",
        };
        await addDoc(collectionRef, formData);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
