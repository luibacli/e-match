// import { storeToRefs } from "pinia";
// import { useMatchStore } from "src/stores/matchStore";
// const store = useMatchStore();
// const { matchId } = storeToRefs(store);
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "play",
        component: () => import("pages/PlayPage.vue"),
      },
      {
        path: "play/:matchId",
        component: () => import("pages/MatchPage.vue"),
      },
      { path: "cashin", component: () => import("pages/CashinPage.vue") },
      { path: "cashout", component: () => import("pages/CashoutPage.vue") },
      { path: "profile", component: () => import("pages/ProfilePage.vue") },
      { path: "referral", component: () => import("pages/ReferralPage.vue") },
      {
        path: "customersupport",
        component: () => import("pages/SupportPage.vue"),
      },
    ],
  },
  // {
  //   path: "/play",
  //   component: () => import("pages/PlayPage.vue"),
  //   // children: [
  //   //   { path: '', component: () => import('pages/IndexPage.vue') }
  //   // ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
