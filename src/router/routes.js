const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/home/IndexPage.vue"),
      },
      {
        path: "block",
        name: "block",
        component: () => import("pages/block/IndexPage.vue"),
      },
      {
        path: "leaders",
        name: "leaders",
        component: () => import("pages/leaders/IndexPage.vue"),
      },
      {
        path: "tests",
        name: "tests",
        component: () => import("pages/tests/IndexPage.vue"),
      },
      {
        path: "variant/:id",
        name: "variant",
        component: () => import("pages/variant/IndexPage.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("pages/profile/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("pages/auth/LoginPage.vue"),
      },
      {
        path: "login-oferta",
        name: "login-oferta",
        component: () => import("pages/doc/LoginOferta.vue"),
      },
    ],
  },
  {
    path: "/test",
    component: () => import("layouts/TestLayout.vue"),
    children: [
      {
        path: "solving",
        name: "tests.solving",
        component: () => import("pages/tests/TestSolvePage.vue"),
      },
    ],
  },
  {
    path: "/lb",
    component: () => import("layouts/BottomMenuLayout.vue"),
    children: [
      {
        path: "test-result",
        name: "test.result",
        component: () => import("pages/tests/TestResultPage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
