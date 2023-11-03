import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

// 懒加载
const Login = () => import('@/views/Login')
const Layout = () => import('@/Layout')
const DarshBoard = () => import('@/views/DarshBoard')
const classFiy = () => import('@/views/classFiy')
const View = () => import('@/views/View')
const chapter = () => import('@/views/chapter')
const userInfo = () => import('@/views/userInfo')
const routes = [
    { path: '/login', component: Login },
    { 
        path: '/',
        redirect: '/darshboard',
        component: Layout,
        children: [
            {
                path: 'darshboard',
                component: DarshBoard,
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'View',
                component: View,
                meta: {
                    title: '视频管理'
                }
            }
        ]
    },
    {
        path:'/classfiy',
        component:Layout,
        children:[
            {
                path:'',
                component:classFiy,
                meta: {
                    title: '课程管理'
                }
            }
        ]
    },
    {
        path:'/chapter',
        component:Layout,
        children:[
            {
                path:'',
                component:chapter,
                meta:{
                    title:"章节管理"
                }
            }
        ]
    },
    {
        path:'/userInfo',
        component:Layout,
        children:[
            {
                path:'',
                component:userInfo,
                meta:{
                    title:"个人信息"
                }
            }
        ]
    }
]

export default new VueRouter({
    mode:'hash',
    routes
})