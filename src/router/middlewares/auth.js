import { getAccessToken, setTelegramUserId } from 'src/utils/auth'
import { useRoute, useRouter } from 'vue-router'

// src/middlewares/auth.js
export default function auth({ to, from, next }) {
    const tgUserId = to.query.telegram_user_id

    if (tgUserId) setTelegramUserId(tgUserId)

    const isLoggedIn = !!getAccessToken() // Replace with your actual login check
    if (!isLoggedIn) {
        return next({
            name: 'login',
            query: to.query,
        })
    }

    return next()
}
