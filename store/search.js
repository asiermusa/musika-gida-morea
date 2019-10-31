import {config} from '../config'

export const state = () => ({
  search: {}
})

export const mutations = {
  SET_SEARCH (state, searchData) {
    state.search = searchData
  }
}

export const actions = {
  changeSearchAction({commit}, postData){
    commit('SET_SEARCH', postData)
    this.$router.push('/bands');
  }
}

export const getters = {
  getSearchEvent: state => state.search
}
