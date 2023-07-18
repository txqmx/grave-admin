import { createStore } from "vuex"
import api from '@/api'
const state = {
    backRoute:'',
    userInfo: ''
}
const getters = {

}

const mutations = {
    setBackRoute(state, backRoute){
        state.backRoute = backRoute
    },
    setUserInfo(state, val){
        state.userInfo = val
    }
}

const actions = {
    async getUserInfo({commit}){
        let res = await api.getUserInfo()
        commit('setUserInfo', res)
    }
}

export default createStore({
    state,
    getters,
    mutations,
    actions
})