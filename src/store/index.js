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
        if(val){
            window.localStorage.setItem('userInfo',JSON.stringify(val))
        } else {
            window.localStorage.removeItem('userInfo')
        }
    },
    setGraveInfo(state, val){
        state.graveInfo = val
        if(val){
            window.localStorage.setItem('grave_id', val.id)
            window.localStorage.setItem('graveInfo',JSON.stringify(val))
        } else {
            window.localStorage.removeItem('grave_id')
            window.localStorage.removeItem('graveInfo')
        }
        
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