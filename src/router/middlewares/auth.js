import { useUserStore } from 'src/stores/user'
import { getAccessToken, setTelegramUserId } from 'src/utils/auth'
import { useRoute, useRouter } from 'vue-router'

// src/middlewares/auth.js
export default async function auth({ to, from, next }) {
    const tgUserId = to.query.telegram_user_id
    const userStore = useUserStore()

    if (tgUserId) setTelegramUserId(tgUserId)

    const isLoggedIn = !!getAccessToken()

    if (!isLoggedIn) {
        return next({ name: 'login', query: to.query })
    }

    try {
        if (!userStore.isTokenValid()) {
            // If the token is not valid, try to refresh it
            await userStore.handleRefreshAccessToken()
        }
        return next()
    } catch (error) {
        userStore.logoutProfile()
        return next({ name: 'login', query: to.query })
    }
}
