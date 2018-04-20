import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

/* when spa mode defined in nuxt.config.js => { src: '~/plugins/persistence.js', ssr: false}, */
// export default ({store}) => {
//   createPersistedState({
//     paths: ['auth'],
//     storage: sessionStorage
//   })(store)
// }

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
