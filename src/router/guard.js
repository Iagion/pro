import router from './index'
import store from '@/store'
import cookie from 'js-cookie'
import { Message } from 'element-ui'
router.beforeEach(async(to, from, next) => {
// 登陆成功以后有token，存到了cookie Vuex
    let token = store.state.token
    if(!token){
        token = cookie.get('id')
        store.commit('writeToken',token)
    }
    if(!token) {
        // 没有登陆
        if(to.path != '/login'){
            next('/login')
        } else {
            next()
        }
    }else{
        let username = store.getters.username
        if(!username){
            try{
                await store.dispatch('getUserProfile')
                if(to.path != '/login'){
                    next()
                } else {
                    Message({
                        message: '对不起，您已登录',
                        type: 'warning'
                    })
                    next('/')
                }
               } catch(e){
                cookie.remove('id')
                store.commit('writeToken','')     
                if(to.path != '/login'){
                    next('/login')
                } else {
                    next()
                }
               }
        }else{
            if(to.path != '/login'){
                next()
            } else {
                Message({
                    message: '对不起，您已登录',
                    type: 'warning'
                })
                next('/')
            }
        }
    }
})
export default router