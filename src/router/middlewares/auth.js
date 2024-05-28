import { useUserStore } from 'src/stores/user'
export default async function auth({ next, to, from }) {
    const authStore = useUserStore()

    if (authStore.isAuth && (to.name === 'login' || to.name == 'register')) {
        // if (to.name === 'login') {
        return next({ name: '/' })
        // }
    }
    next()
}
