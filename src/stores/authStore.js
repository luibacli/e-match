import { defineStore } from "pinia";
import { auth, db } from "src/boot/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { ref } from "vue";
import { Notify } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    formData: ref({
      email: "",
      password: "",
    }),
    registerForm: ref({
      displayName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      balance: 0,
      wins: 0,
      loss: 0,
      isAdmin: false,
      isHost: false,
      isChallenger: false,
      isAccepted: false,
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
    profileName: ref(""),
    showLogin: ref(false),
    isOpen: false,
    isLogin: true,
    isAuthenticated: false,
    isLoading: false,
  }),
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
          this.user.id = user.uid;
          this.user.name = user.displayName;
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
          this.user.name = user.displayName;
          this.user.id = user.uid;

          console.log(user);
        } else {
          Notify.create({
            color: "warning",
            textColor: "dark",
            message: "You are not logged in",
          });
        }
      });
    },
    // async getUser() {
    //   const docRef = doc(db, "users", this.user.id);
    //   const docSnap = await getDoc(docRef);
    //   const data = docSnap.data();
    //   this.userData.displayName = data.displayName;
    //   this.userData.balance = data.balance;
    //   this.userData.wins = data.wins;
    //   this.userData.loss = data.loss;
    //   this.userData.phoneNumber = data.phoneNumber;
    //   this.userData.isAccepted = data.isAccepted;
    //   this.userData.isHost = data.isHost;
    //   this.userData.isChallenger = data.isChallenger;
    //   this.userData.isAdmin = data.isAdmin;

    //   console.log(this.userData);
    // },

    async getUser() {
      try {
        if (!this.user.id) {
          throw new Error("User ID is not defined");
        }
        console.log("user id:", this.user.id);

        const docRef = doc(db, "users", this.user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.userData = docSnap.data() || {};
        } else {
          console.log("No such document!");
          this.userData = {};
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async logout() {
      await signOut(auth);
      this.isAuthenticated = false;
      this.router.push("/");
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
