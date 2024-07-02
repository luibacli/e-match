import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "src/boot/firebase";
import { useAuthStore } from "./authStore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Notify } from "quasar";
const authStore = useAuthStore();
export const useCashStore = defineStore("cash", {
  state: () => ({
    cashinForm: {
      amount: 0,
      sender: "",
      receiver: null,
      screenshot: "",
      screenshotFile: null,
      channel: null,
    },
    cashoutForm: {
      amount: 0,
      sender: "",
      receiver: "",
      channel: null,
    },
    gcashMobile: 9672198311,
    mayaMobile: 9672198322,
    pendingCashin: false,
    pendingCashout: false,
    cashinLoading: false,
    cashoutLoading: false,
  }),
  getters: {
    userCashin: (state) => {
      return (state.pendingCashin = authStore.userData.hasPendingCashin);
    },
    userCashout: (state) => {
      return (state.pendingCashout = authStore.userData.hasPendingCashout);
    },
  },

  actions: {
    async cashIn() {
      this.cashinLoading = true;
      try {
        const collectionRef = collection(db, "cashin");
        const userRef = doc(db, "users", authStore.user.id);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();
        const formData = {
          amount: this.cashinForm.amount,
          channel: this.cashinForm.channel,
          sender: `${authStore.user.name}`,
          balance: `${data.balance}`,
          receiver:
            this.cashinForm.channel == "Gcash"
              ? this.gcashMobile
              : this.mayaMobile,
          screenshot: this.cashinForm.screenshot,
          userRef: authStore.user.id,
          status: "pending",
          createdAt: serverTimestamp(),
        };
        if (this.cashinForm.screenshot) {
          await addDoc(collectionRef, formData);
          await updateDoc(userRef, {
            hasPendingCashin: true,
          });

          Notify.create({
            color: "positive",
            message: "Cashin requested successfully, please wait for approval",
          });
        } else {
          Notify.create({
            color: "negative",
            message: "Error uploading screenshot, please try again",
            position: "top",
          });
        }
        this.cashinLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async cashout() {
      this.cashoutLoading = true;
      try {
        const collectionRef = collection(db, "cashout");
        const userRef = doc(db, "users", authStore.user.id);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();

        const formData = {
          amount: this.cashoutForm.amount,
          channel: this.cashoutForm.channel,
          receiver: this.cashoutForm.receiver,
          balance: `${data.balance}`,
          sender:
            this.cashoutForm.channel == "Gcash"
              ? this.gcashMobile
              : this.mayaMobile,
          userRef: authStore.user.id,
          status: "pending",
          createdAt: serverTimestamp(),
        };

        if (data.balance >= this.cashoutForm.amount) {
          await addDoc(collectionRef);
          await updateDoc(userRef, {
            hasPendingCashout: true,
          });
          Notify.create({
            color: "positive",
            message: "Cashout requested successfully, please wait for approval",
          });
        } else {
          Notify.create({
            color: "negative",
            message:
              "You do not have enough balance to create this transaction",
            position: "top",
          });
        }
        this.cashoutLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async uploadFiles(files) {
      const uploadPromises = files.map((file) => this.storeImage(file));
      const downloadURLS = await Promise.all(uploadPromises);
      console.log(downloadURLS);
      if (downloadURLS.length > 0) {
        this.cashinForm.screenshot = downloadURLS[0];
      }
    },

    async storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${authStore.user.id}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, "cashin/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Ensure getDownloadURL is called after upload completes
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                resolve(downloadURL);
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      });
    },
  },
});
