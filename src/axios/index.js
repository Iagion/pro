import axios from 'axios'
import store from '@/store'
const instance = axios.create({
    baseURL: 'https://www.chengzier.cn:8000/api/',
    timeout: 3000
})
instance.interceptors.request.use(function (config) {
      // 只要有token 就在请求时携带  便于请求需要授权的接口
        config.headers['Authorization'] = `Bearer ${store.state.token}`
        return config
    }, function (error) {
    // 对请求错误做些什么
      return Promise.reject(error)
    })
export default instance