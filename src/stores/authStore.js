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
    user: ref({
      id: "",
      name: "",
    }),
    userData: ref({}),
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
        this.isOpen = false;
        this.router.push("/play");
        this.isLoading = false;
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
        } else {
          console.log("You are not logged in");
        }
      });
    },
    async getUser() {
      const docRef = doc(db, "users", this.user.id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      this.userData = { ...data };
    },
    async logout() {
      await signOut(auth);
      this.isAuthenticated = false;
      this.router.push("/");
      console.log("You are now logged out");
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
