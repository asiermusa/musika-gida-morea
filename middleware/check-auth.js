import axios from 'axios'
export default ({ store, route, redirect }) => {
  if (store.getters['users/user'].token && process.client)
    return axios.defaults.headers.common['Authorization'] = 'jwt ' + store.getters['users/user'].token
}
