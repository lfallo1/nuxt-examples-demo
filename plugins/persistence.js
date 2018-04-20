import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

/* universal */
export default ({store, req, isDev}) => {
  createPersistedState({
    paths: ['auth'],
    storage: {
      getItem: (key) => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie||'')[key],
      setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: !isDev }),
      removeItem: (key) => Cookies.remove(key)
    }
  })(store)
}

/* spa */
//set this in nuxt.config.js under plugins => { src: '~/plugins/persistence.js', ssr: false},

// export default ({store}) => {
//   createPersistedState({
//     paths: ['auth'],
//     storage: localStorage
//   })(store)
// }
