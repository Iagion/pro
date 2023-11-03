import Vuex from 'vuex'
import Vue from 'vue'
import { profile } from '@/api/user'
import subject from './subject'
import chapter from './chapter'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        isCollapse:false,
        token:'',
        userProfile:{
            username:'',
            email:'',
            avatar:'',
            phone:''
        },
    },
    mutations:{
        reWriteIsCollapse(state){
            state.isCollapse = !state.isCollapse
        },
        writeToken(state,token){
            state.token = token
        },
        writeUserProfile(state,profile){
            state.userProfile.username = profile.username
            state.userProfile.email = profile.email
            state.userProfile.avatar = `https://www.chengzier.cn:8000/${profile.avator}`
            state.userProfile.phone = profile.phone
        },
        clear(state){
            state.token = ''
        }
    },
    actions:{
        getUserProfile({commit,state}) {
            return new Promise((resolve,reject) => {
                profile(state.token).then(res => {
                    let data = res.data
                    if(data.status){
                        reject()
                    }else{
                        commit('writeUserProfile',data)
                        resolve()
                    }
                }).catch(err => {
                    reject()
                })
            }) 
        }
    },
    getters:{
        username(state){
            return state.userProfile.username
        }
    },
    modules:{
        subject:subject,
        chapter:chapter,
    }
})