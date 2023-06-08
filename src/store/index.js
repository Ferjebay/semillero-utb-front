import { createStore } from 'vuex'
import auth from '../views/auth/store/auth'

export default createStore({
  modules: {
    auth
}
})
