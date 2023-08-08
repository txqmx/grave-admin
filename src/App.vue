<template>
    <router-view></router-view>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { mapMutations } from 'vuex'
export default defineComponent({
    created(){
        this.setUserLocalInfo()
        this.setGraveLocalInfo()
    },
    methods:{
        ...mapMutations(['setUserInfo', 'setGraveInfo']),

        setUserLocalInfo(name){

            let item = window.localStorage.getItem('userInfo')
            if(item){
                this.setUserInfo(JSON.parse(item))
            }
        },
        
        setGraveLocalInfo(){
            let item = window.localStorage.getItem('graveInfo')
            if(item){
                this.setGraveInfo(JSON.parse(item))
            }
        }
    }
})
</script>

<style>
html, body, #app{
 height: 100%;
 background: #eef0f3
}
</style>

