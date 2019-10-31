import {config} from '../config'

export const state = () => ({
  band: ''
})

export const mutations = {
  FIND_BAND (state, band) {
    state.band = band
  }
}

export const actions = {
  async findBandAction({commit}, params){
    const user = await this.$axios.get(config.apiURL + '/bands', { params })
    try{
      if(user.data.bands.length){
        commit('FIND_BAND', user.data.bands)
      }else{
        commit('FIND_BAND', '')
      }
    } catch (err) {
    }
  }
}
