// const userStore = useUserStore()
import auth from './middlewares/auth'

const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('pages/home/IndexPage.vue'),
                meta: { middlewares: [auth] },
            },
            {
                path: 'block',
                name: 'block',
                component: () => import('pages/block/IndexPage.vue'),
                meta: { middlewares: [auth] },
            },
            {
                path: 'leaders',
                name: 'leaders',
                component: () => import('pages/leaders/IndexPage.vue'),
                meta: { middlewares: [auth] },
            },
            {
                path: 'tests',
                name: 'tests',
                component: () => import('pages/tests/IndexPage.vue'),
                meta: { middlewares: [auth] },
            },
            {
                path: 'variant/:id',
                name: 'variant',
                component: () => import('pages/variant/IndexPage.vue'),
                meta: { middlewares: [auth] },
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('pages/profile/IndexPage.vue'),
                meta: { middlewares: [auth] },
            },
            {
                path: 'about-us',
                name: 'about-us',
                component: () => import('pages/about-us/index.vue'),
                meta: { middlewares: [auth] },
            },
            {
                path: 'vacancy',
                name: 'vacancy',
                component: () => import('pages/vacancy/index.vue'),
                meta: { middlewares: [auth] },
            },
            {
                path: 'contact-us',
                name: 'contact-us',
                component: () => import('pages/contact-us/index.vue'),
                meta: { middlewares: [auth] },
            },
        ],
    },
    {
        path: '/auth',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('pages/auth/LoginPage.vue'),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('pages/auth/RegisterPage.vue'),
            },
            {
                path: 'login-oferta',
                name: 'login-oferta',
                component: () => import('pages/doc/LoginOferta.vue'),
            },
        ],
    },
    {
        path: '/test',
        component: () => import('layouts/TestLayout.vue'),
        children: [
            {
                path: 'solving',
                name: 'tests.solving',
                component: () => import('pages/tests/TestSolvePage.vue'),
                meta: { middlewares: [auth] },
            },

            {
                path: '/test-solve',
                name: 'test-solve',
                component: () => import('pages/tests/TestScrollPage.vue'),
            },
        ],
    },

    {
        path: '/lb',
        component: () => import('layouts/BottomMenuLayout.vue'),
        children: [
            {
                path: 'test-result/:id',
                name: 'test.result',
                component: () => import('pages/tests/TestResultPage.vue'),
                meta: { middlewares: [auth] },
            },
        ],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
]

export default routes
