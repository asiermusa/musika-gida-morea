import {config} from '../config'

export const state = () => ({
  auth: {},
})

export const mutations = {
  SET_USER (state, data) {
    state.auth = {
      success: data.success,
      token: data.token,
      user: data.user,
      picture: (data.picture) ? data.picture : ''
    }
  },
  LOGOUT_USER (state) {
    state.auth = {}
  }
}

export const actions = {
  async getUserAction ({ commit }, data) {
    commit('SET_USER', data)
  },
  async loginUserAction({commit}, postData){
    const user = await this.$axios.$post(config.apiURL + '/login', postData)
    try{
      if(user.success === true){
        this.$axios.defaults.headers.common['Authorization'] = 'jwt ' + user.token
        const loggedUser = user.token
          ? { success: true, token: user.token, user: user.user }
          : {}
        commit('SET_USER', loggedUser)
      }
      return user
    } catch (err) {
      return err.response
    }
  },
  socialLoginUserAction({commit}, user){
    this.$axios.defaults.headers.common['Authorization'] = 'jwt ' + user.token
    commit('SET_USER', user)
  },
  async registerUserAction({commit}, postData){
    const user = await this.$axios.post(config.apiURL + '/register', postData)
    try{
      return user
    } catch (err) {
      return err.response
    }
  },
  async completRegistration({commit}, params){
    const user = await this.$axios.put(config.apiURL + '/complet-registration/' + params.token)
    return user
  },
  passwordUserAction({commit}, postData){
    axios.post(config.apiURL + '/forgot', postData)
      .then(user => {
        console.warn('Email enviado: ', user.data);
      })
  },
  resetPasswordUserAction({commit}, postData){
    this.$axios.post(config.apiURL + '/reset', postData)
      .then(user => {
        console.warn('Contraseña cambiada: ', user.data);
      })
  },
  logoutUserAction({commit}) {

    delete this.$axios.defaults.headers.common['Authorization']
    commit('LOGOUT_USER')
  }
}

export const getters = {
  user: state => state.auth
}
