import { createStore } from "vuex"
import api from '@/api'
const state = {
    backRoute:'',
    userInfo: '',
    graveInfo: ''
}
const getters = {

}

const mutations = {
    setBackRoute(state, backRoute){
        state.backRoute = backRoute
    },
    setUserInfo(state, val){
        state.userInfo = val
        window.localStorage.setItem('userInfo',JSON.stringify(val))
    },
    setGraveInfo(state, val){
        state.graveInfo = val
        window.localStorage.setItem('graveInfo',JSON.stringify(val))
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