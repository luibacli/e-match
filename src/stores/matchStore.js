import { defineStore, storeToRefs } from "pinia";
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
  onSnapshot,
  arrayRemove,
  FieldValue,
} from "firebase/firestore";
import { db } from "src/boot/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "./authStore";

import { Notify } from "quasar";
import { v4 as uuidv4 } from "uuid";
const authStore = useAuthStore();
// const { playerId, playerName } = storeToRefs(authStore);

export const useMatchStore = defineStore("match", {
  state: () => ({
    match: {
      id: "",
      host: "",
      game: "",
      type: "",
      bet: 0,
      winner: "",
      status: "",
      timestamp: "",
    },
    // matchData: {
    //   id: "",
    //   host: "",
    //   challenger: "",
    //   game: "",
    //   type: "",
    //   bet: "",
    //   acceptedId: [],
    //   gameLobbyId: "",
    //   hosts: [],
    //   challengers: [],
    //   gameLobbyHosts: [],
    //   gameLobbyChallengers: [],
    //   requests: [],
    //   gameTime: "",
    //   winner: "",
    //   status: "",
    //   timestamp: "",
    // },
    matchData: {},
    challenger: "",
    accepted: [],
    userId: "",
    matchId: "",
    hostName: "",
    storedName: "",
    gameName: "",
    matchList: [],
    requestList: [],
    requestBadge: 0,
    isRequest: false,
    isJoin: false,
    showUpload: false,
    showUploadDialog: false,
    isPending: false,
    hostScreenshot: "",
    challengerScreenshot: "",
    teamData: {
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
    },
    challengerTeamData: {
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
    },
    challengerTeamList: [],

    teamUpdate: {
      name: "",
      member1: "",
      member2: "",
      member3: "",
      member4: "",
      member5: "",
    },
    teamId: "",
    teamList: [],
    teamModal: false,
    teamUpdateModal: false,
    teamDeleteModal: false,
    matchLeaveModal: false,
    challengeModal: false,
    challengeRequestsModal: false,
    teamLoading: false,
    startLoading: false,
    btnDisable: false,
    btnReadyDisable: false,
    // playerList: ref({
    //   team: "",
    //   player1: "",
    //   player2: "",
    //   player3: "",
    //   player4: "",
    //   player5: "",
    //   wins: 0,
    //   loss: 0,
    // }),
    playerList: {},

    // challengerList: ref({
    //   team: "",
    //   player1: "",
    //   player2: "",
    //   player3: "",
    //   player4: "",
    //   player5: "",
    //   wins: 0,
    //   loss: 0,
    // }),
    challengerList: {},
    challengerData: {},

    tableLoading: false,
    isOpen: false,
  }),
  getters: {
    routeMatch: () => {
      const route = useRoute();
      return route.params.matchId;
    },
    playerId: () => {
      return authStore.user.id;
    },
    playerName: () => {
      return authStore.user.name;
    },
    host: () => {
      return authStore.user.name;
    },
    isHost: () => {
      return authStore.userData.isHost;
    },
    isChallenger: () => {
      return authStore.userData.isChallenger;
    },
    isAccepted: () => {
      return authStore.userData.isAccepted;
    },
    acceptedPlayers: (state) => {
      return state.matchData.acceptedId;
    },
    matchAccepted: () => {
      return authStore.userData.matchAccepted;
    },
    playerBalance: () => {
      return authStore.userData.balance;
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
    async matchRequest() {
      try {
        if (!this.isChallenger && !this.isHost) {
          const docRef = doc(db, "matches", this.matchId);

          await updateDoc(docRef, {
            requests: arrayUnion({
              id: authStore.user.id,
              challenger: authStore.user.name,
            }),
          });

          Notify.create({
            color: "positive",
            message: "Challenge request sent!",
          });
          this.challengeModal = false;
        } else {
          Notify.create({
            icon: "announcement",
            color: "warning",
            textColor: "dark",
            message: "You are stil in the lobby, please leave first!",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async acceptRequest(id, challenger) {
      try {
        const docRef = doc(db, "users", id);
        const matchRef = doc(db, "matches", this.routeMatch);
        const objectToRemove = { id: `${id}`, challenger: `${challenger}` };
        await updateDoc(docRef, {
          isAccepted: true,
          matchAccepted: arrayUnion({
            id: this.routeMatch,
            hostName: authStore.user.name,
          }),
        });
        await updateDoc(matchRef, {
          acceptedId: arrayUnion(id),
          requests: arrayRemove(objectToRemove),
        });
        this.challengeRequestsModal = false;
        Notify.create({
          color: "positive",
          message: "User's request challenge accepted",
        });
      } catch (error) {
        console.error(error);
      }
    },
    async joinMatch(matchId, hostName) {
      try {
        const userRef = doc(db, "users", authStore.user.id);
        const matchRef = doc(db, "matches", matchId);
        const docSnap = await getDoc(matchRef);
        const data = docSnap.data();
        const acceptedData = data.acceptedId;
        const accepted = acceptedData.includes(this.playerId);
        const objectToRemove = { hostName: `${hostName}`, id: `${matchId}` };
        if (accepted) {
          await updateDoc(userRef, {
            isChallenger: true,
            showMatch: true,
            matchAccepted: arrayRemove(objectToRemove),
            currentMatchId: matchId,
          });
          await updateDoc(matchRef, {
            challengerRef: this.playerId,
            challenger: this.playerName,
          });

          this.router.push(`/play/${matchId}`);
          Notify.create({
            color: "positive",
            message: "You are now in the match room!",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async confirmLeave() {
      try {
        const docRef = doc(db, "users", this.playerId);
        const matchRef = doc(db, "matches", this.matchData.id);
        const matchBet = Number(this.matchData.bet);
        const playerBalance = Number(this.playerBalance);
        const newBalance = matchBet + playerBalance;
        if (this.isHost && this.matchData.challenger) {
          Notify.create({
            color: "negative",
            message: "Cannot leave the match when there is a challenger",
          });
        } else if (this.isHost && !this.matchData.challenger) {
          await updateDoc(docRef, {
            isHost: false,
            currentMatchId: "",
            balance: newBalance,
          });
          await updateDoc(matchRef, {
            status: "invalid",
          });
          this.matchLeaveModal = false;
          this.router.push("/play");
          Notify.create({
            color: "positive",
            message: "You left the match and it has been deleted",
          });
        }

        if (this.isChallenger && !this.matchData.challengerReady) {
          await updateDoc(docRef, {
            isChallenger: false,
            currentMatchId: "",
          });
          await updateDoc(matchRef, {
            acceptedId: arrayRemove(authStore.user.id),
            challengerRef: "",
            challenger: null,
            challengers: null,
            challengerReady: false,
          });

          this.matchLeaveModal = false;
          this.router.push("/play");
          Notify.create({
            color: "positive",
            message: "You left the match",
          });
        } else if (this.isChallenger && this.matchData.challengerReady) {
          Notify.create({
            color: "negative",
            message: "You cannot leave the match when you are ready",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    realTimeMatch() {
      try {
        const unsub = onSnapshot(
          doc(db, "matches", this.routeMatch),

          (docSnapShot) => {
            const data = docSnapShot.data();
            if (data) {
              this.matchData = data || {};
              this.challenger = data.challenger;
              this.playerList = data.hosts || {};
              this.challengerList = data.challengers || {};
              this.requestList = data.requests || [];
            } else {
              console.log("No Data Found");
            }
          },

          (error) => {
            Notify.create({
              color: "negative",
              message: error.message,
            });
          }
        );

        this.unsubscribeRealTimeMatch = unsub;
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    unsubscribeRealTimeMatch() {
      if (this.unsubscribeRealTimeMatch) {
        this.unsubscribeRealTimeMatch();
      }
    },
    showRequest() {
      try {
        if (this.requestList) {
          const data = this.requestList.length;
          if (data > 0) {
            this.requestBadge = data;
            this.isRequest = true;
            this.requestList.forEach((doc) => {
              Notify.create({
                color: "positive",
                message: `${doc.challenger} would like to challenge you!`,
              });
            });
          } else {
            this.isRequest = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    showChallenger() {
      try {
        if (this.isHost) {
          if (this.challenger) {
            this.isJoin = true;
          } else if (this.challenger == null) {
            Notify.create({
              color: "negative",
              message: "The challenger has left the lobby",
            });
          }
        }
      } catch (error) {}
    },

    async ready() {
      try {
        const docRef = doc(db, "matches", this.routeMatch);
        const userRef = doc(db, "users", authStore.user.id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const currentBet = Number(data.bet);
        const currentTotalBet = Number(data.totalBet);
        const playerBalance = Number(this.playerBalance);
        const newBet = currentTotalBet + currentBet;
        const newBalance = playerBalance - currentBet;
        await updateDoc(userRef, {
          balance: newBalance,
        });
        await updateDoc(docRef, {
          challengerReady: true,
          totalBet: newBet,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async notReady() {
      try {
        const docRef = doc(db, "matches", this.routeMatch);
        const userRef = doc(db, "users", authStore.user.id);
        const playerBalance = Number(this.playerBalance);
        const currentBet = Number(this.matchData.bet);
        const currentTotalBet = Number(this.matchData.totalBet);
        const newBet = currentTotalBet - currentBet;
        const returnBet = playerBalance + currentBet;

        await updateDoc(userRef, {
          balance: returnBet,
        });
        await updateDoc(docRef, {
          challengerReady: false,
          totalBet: newBet,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async startMatch() {
      this.startLoading = true;
      try {
        const docRef = doc(db, "matches", this.routeMatch);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data.challengerReady == false) {
          Notify.create({
            color: "negative",
            message:
              "Please wait for a challenger or the challenger to be ready",
          });
        } else {
          await updateDoc(docRef, {
            isStart: true,
          });
          this.showUpload = true;
          this.btnDisable = true;
          this.startLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async submitProof() {
      this.showUploadDialog = false;
      try {
        const docRef = doc(db, "matches", this.routeMatch);
        const userRef = doc(db, "users", authStore.user.id);
        if (this.isHost) {
          await updateDoc(docRef, {
            hostProof: this.hostScreenshot,
            status: "Pending",
          });

          await updateDoc(userRef, {
            hasPendingMatch: true,
            showMatch: false,
          });
          this.showUpload = false;
          Notify.create({
            color: "positive",
            message:
              "Uploaded sucessfully, our team is now evaluating your match please wait for a moment, you can check the match status at your profile match history",
            position: "top",
          });
          this.router.push("/play");
        }
        if (this.isChallenger) {
          await updateDoc(docRef, {
            challengerProof: this.challengerScreenshot,
            status: "Pending",
          });
          await updateDoc(userRef, {
            hasPendingMatch: true,
            showMatch: false,
          });
          this.showUpload = false;
          Notify.create({
            color: "positive",
            message:
              "Uploaded sucessfully, our team is now evaluating your match please wait for a moment, you can check the match status at your profile match history",
            position: "top",
          });
          this.showUploadDialog = false;
          this.router.push("/play");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async uploadFiles(files) {
      const uploadPromises = files.map((file) => this.storeImage(file));
      const downloadURLS = await Promise.all(uploadPromises);

      if (downloadURLS.length > 0 && this.isHost) {
        this.hostScreenshot = downloadURLS[0];
      }

      if (downloadURLS.length > 0 && this.isChallenger) {
        this.challengerScreenshot = downloadURLS[0];
      }
    },

    async storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${authStore.user.id}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, "match/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            Notify.create({
              color: "positive",
              message: `Upload is ${progress} done`,
            });
            switch (snapshot.state) {
              case "paused":
                Notify.create({
                  color: "negative",
                  message: "Upload is paused",
                });
                break;
              case "running":
                Notify.create({
                  color: "blue",
                  message: "Upload is running",
                });
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

    async loadTeams() {
      this.teamLoading = true;
      try {
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
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    async setTeam(teamId) {
      this.teamLoading = true;
      try {
        const docRef = doc(db, "teams", teamId);
        const matchRef = doc(db, "matches", this.routeMatch);

        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (this.isHost) {
          await updateDoc(matchRef, {
            hosts: { ...data },
          });
        } else if (this.isChallenger) {
          this.challengerList = { ...data };
          await updateDoc(matchRef, {
            challengers: { ...data },
          });
        } else {
          console.log("Not a challenger nor a host");
        }
        Notify.create({
          color: "positive",
          message: "Your team is now set",
        });
        this.teamLoading = false;
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    async createTeam() {
      try {
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
        await this.loadTeams();
        this.teamModal = false;

        Notify.create({
          color: "positive",
          message: "You created your team!",
        });
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    async updateTeam() {
      try {
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
        await this.loadTeams();
        this.openTeamUpdateModal = false;
        Notify.create({
          color: "positive",
          message: "Your team is now updated!",
        });
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
    },
    async deleteTeam() {
      try {
        await deleteDoc(doc(db, "teams", this.teamId));
        await this.loadTeams();
        Notify.create({
          color: "positive",
          message: "Team deleted!",
        });
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }

      this.teamDeleteModal = false;
    },
    async createMatch() {
      this.tableLoading = true;

      try {
        if (!this.isHost && !this.isChallenger) {
          if (this.playerBalance >= this.match.bet) {
            if (this.host) {
              this.storedName = this.host;
            } else {
              console.log("no display name found");
            }

            const counterRef = doc(db, "counters", "matchCounter");

            const counterDoc = await getDoc(counterRef);

            if (!counterDoc.exists) {
              throw new Error("Counter document does not exist!");
            }

            let matchCounter = counterDoc.data().counter;

            matchCounter += 1;

            const newMatchId = matchCounter.toString();

            const docData = {
              id: `${newMatchId}`,
              host: this.host,
              challenger: "",
              userRef: `${authStore.user.id}`,
              challengerRef: "",
              game: this.match.game,
              type: this.match.type,
              bet: this.match.bet,
              acceptedId: [`${authStore.user.id}`],
              gameLobbyId: "",
              hosts: [],
              challengers: [],
              challengerReady: false,
              isStart: false,
              totalBet: this.match.bet,
              gameLobbyHosts: [],
              gameLobbyChallengers: [],
              requests: [],
              gameTime: "",
              winner: "Pending",
              status: "Open",
              timestamp: serverTimestamp(),
            };
            this.matchId = docData.id;

            await updateDoc(counterRef, { counter: matchCounter });

            await setDoc(doc(db, "matches", newMatchId), docData);

            const userRef = doc(db, "users", authStore.user.id);
            const currentBet = Number(this.match.bet);
            const playerBalance = Number(this.playerBalance);
            const newBalance = playerBalance - currentBet;
            await updateDoc(userRef, {
              isHost: true,
              currentMatchId: `${newMatchId}`,
              balance: newBalance,
              showMatch: true,
            });
            this.router.push(`/play/${this.matchId}`);

            this.isOpen = false;
            this.tableLoading = false;
            Notify.create({
              color: "positive",
              message: "Match has been created, please wait for challengers",
            });
          } else {
            Notify.create({
              color: "negative",
              message: "You don't have enough balance to create this match.",
            });
          }
        } else if (this.isHost) {
          Notify.create({
            icon: "announcement",
            color: "warning",
            textColor: "dark",
            message: "You already created a match!",
          });
        } else if (this.isChallenger) {
          Notify.create({
            icon: "announcement",
            color: "warning",
            textColor: "dark",
            message: "You are stil in the lobby, please leave first!",
          });
        }
      } catch (error) {
        console.error(error);
      }
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
    openChallengeRequestsModal() {
      this.challengeRequestsModal = true;
    },
    openUploader() {
      this.showUploadDialog = true;
    },
    watchMatchStatus() {
      if (this.matchData.status == "Pending") {
        this.isPending = true;
      }
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
    goBackPlay() {
      if (this.matchData.status == "Closed") {
        this.router.push("/play");
      }
    },

    async openChallengeModal(id, host) {
      try {
        const docRef = doc(db, "matches", id);
        const userRef = doc(db, "users", this.playerId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (this.playerBalance >= data.bet) {
          const acceptedData = data.acceptedId;
          const accepted = acceptedData.includes(this.playerId);
          const hasIdRef = data.challengerRef;
          if (accepted && this.isHost) {
            this.router.push(`/play/${id}`);
          } else if (this.playerId == hasIdRef) {
            await updateDoc(userRef, {
              isChallenger: true,
            });

            this.router.push(`/play/${id}`);
          } else {
            this.matchId = id;
            this.hostName = host;
            this.challengeModal = true;
          }
        } else {
          Notify.create({
            color: "negative",
            message: "You don't have enough balance to challenge this match.",
          });
        }
      } catch (error) {
        Notify.create({
          color: "negative",
          message: error.message,
        });
      }
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
    clearChallengers() {
      this.challengerList.team = "";
      this.challengerList.member1 = "";
      this.challengerList.member2 = "";
      this.challengerList.member3 = "";
      this.challengerList.member4 = "";
      this.challengerList.member5 = "";
    },
  },
});
