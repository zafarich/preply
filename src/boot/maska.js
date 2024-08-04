import { boot } from 'quasar/wrappers'
import Maska from 'maska'

export default boot(({ app }) => {
    // Register maska directive globally
    app.use(Maska)
})
