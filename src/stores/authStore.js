import { defineStore } from "pinia";
import { auth, db } from "src/boot/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { ref } from "vue";
import { Notify } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    formData: ref({
      email: "",
      password: "",
    }),
    registerForm: ref({
      id: "",
      displayName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      balance: 0,
      wins: 0,
      loss: 0,
      matchAccepted: [],
      isAdmin: false,
      isHost: false,
      isChallenger: false,
      isAccepted: false,
      isOnline: false,
      status: "active",
    }),
    user: {
      id: "",
      name: "",
    },
    // userData: ref({
    //   displayName: "",
    //   email: "",
    //   phoneNumber: "",
    //   password: "",
    //   balance: 0,
    //   wins: 0,
    //   loss: 0,
    //   isAdmin: false,
    //   isHost: false,
    //   isChallenger: false,
    //   isAccepted: false,
    // }),
    userData: {},
    matchAccepted: [],
    matchLength: 0,
    gotAccepted: false,
    hasCurrentMatch: false,
    currentMatch: "",
    profileName: ref(""),
    showLogin: ref(false),
    isOpen: false,
    isLogin: true,
    isAuthenticated: false,
    isLoading: false,
  }),
  getters: {
    playerId: (state) => {
      return state.user.id;
    },
    playerName: (state) => {
      return state.user.name;
    },
  },
  actions: {
    async loginEmailPassword() {
      this.isLoading = true;
      const userData = this.formData;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        const user = userCredential.user;
        if (user) {
          await this.getUser(user.uid);
          this.isOpen = false;
          this.router.push("/play");
          this.isLoading = false;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createAccount() {
      this.isLoading = true;
      const userData = this.registerForm;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.registerForm.email,
          this.registerForm.password
        );

        const user = userCredential.user;
        if (user) {
          updateProfile(auth.currentUser, {
            displayName: this.registerForm.displayName,
          });
          const userDataCopy = { ...userData };
          userDataCopy.id = user.uid;
          delete userDataCopy.password;
          delete userDataCopy.confirmPassword;
          userDataCopy.timestamp = serverTimestamp();

          await setDoc(doc(db, "users", user.uid), userDataCopy);
          this.isOpen = false;
          this.router.push("/play");
          this.isLoading = false;
          Notify.create({
            color: "positive",
            message: "Account created successfully!",
          });
        } else {
          throw new Error("Error logging in the user");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async monitorAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.isAuthenticated = true;
          this.userData.isOnline = true;
          this.user.name = user.displayName;
          this.user.id = user.uid;
        } else {
          Notify.create({
            color: "warning",
            textColor: "dark",
            message: "You are not logged in",
          });
        }
      });
    },

    async getUser(id) {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        if (data) {
          this.userData = data || {};
        } else {
          throw new Error("Data not found");
        }
      } catch (error) {
        console.error(error);
      }
    },

    realTimeUser() {
      try {
        const unsub = onSnapshot(
          doc(db, "users", this.user.id),
          (docSnapshot) => {
            const data = docSnapshot.data();
            if (data) {
              this.userData = data || {};
              this.user.id = data.id;
              this.user.name = data.displayName;
              this.matchAccepted = data.matchAccepted;
              this.currentMatch = data.currentMatchId;

              if (this.currentMatch) {
                this.hasCurrentMatch = true;
              } else {
                this.hasCurrentMatch = false;
              }
            } else {
              throw new Error("Error fetching user");
            }
            (error) => {
              Notify.create({
                color: "negative",
                message: error.message,
              });
            };
          }
        );
        this.unsubscribeRealTimeUser = unsub;
      } catch (error) {
        console.error(error);
      }
    },
    showAccepted() {
      try {
        if (this.matchAccepted) {
          const data = this.matchAccepted.length;
          if (data > 0) {
            this.matchLength = data;
            this.gotAccepted = true;
            this.matchAccepted.forEach((doc) => {
              if (doc) {
                Notify.create({
                  color: "indigo",
                  message: `${doc.hostName} accepted your request`,
                  position: "top-left",
                });
              }
            });
          } else {
            this.gotAccepted = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      await signOut(auth);
      this.isAuthenticated = false;
      this.userData.isOnline = false;
      this.router.push("/");
    },

    unsubscribeRealTimeUser() {
      if (this.unsubscribeRealTimeUser) {
        this.unsubscribeRealTimeUser();
      }
    },

    openModal() {
      this.isOpen = true;
    },
    btnPlay() {
      if (!this.isAuthenticated) {
        this.openModal();
      } else {
        this.router.push("/play");
      }
    },
  },
});
