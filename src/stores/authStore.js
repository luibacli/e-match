import { defineStore } from "pinia";
import { auth, db } from "src/boot/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
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
    }),
    profileName: ref(""),
    isLogin: true,
    isAuthenticated: false,
    isLoading: false,
  }),
  actions: {
    async loginEmailPassword() {
      const userData = this.formData;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        const user = userCredential.user;
        this.profileName = user.displayName;
        this.isAuthenticated = true;
        this.router.push("/play");
        console.log(userCredential.user);
      } catch (error) {
        console.log(error);
      }
    },
    async createAccount() {
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

        console.log("userDataCopy", userDataCopy);

        console.log("userCredential", userCredential.user);
      } catch (error) {
        console.log(error);
      }
    },
    async monitorAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
        } else {
          console.log("You are not logged in");
        }
      });
    },
    async logout() {
      await signOut(auth);
      this.isAuthenticated = false;
      this.router.push("/");
      console.log("You are now logged out");
    },
  },
});
