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
        meta: {
          requiresAuth: false,
        },
      },

      {
        path: "play",
        component: () => import("pages/PlayPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "play/:matchId",
        component: () => import("pages/MatchPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      { path: "ranks", component: () => import("pages/RankingPage.vue") },
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
