import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default ({store}) => {
  createPersistedState({
      key: '__gidamorea',
      paths: ['users.auth'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 10, secure: false }),
        removeItem: key => Cookies.remove(key)
      }
  })(store)
}
