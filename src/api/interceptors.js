import { ElMessage } from 'element-plus';
import { getUrlParam } from '@/utils/Url'
import router from '@/router'

export function resSuccess (response) {
    return new Promise((resolve, reject) => {
      if(response.data.code){
        resolve(response.data.data)
      } else {
        reject(response.data)
      }
    })
}

export function resError (error) {
  const { response } = error
  let msg = '连接服务器失败, 检查网络'
  if(response && response.data){
    ElMessage({
      message: response.data.message || response.data.errMsg || msg,
      type: 'error',
      duration: 3 * 1000
    })
  }
  if(response.status === 401){
    router.replace({
      name: 'login'
    })
  }
  return Promise.reject(error)
}

export function reqSuccess (config) {
  config.headers.token = localStorage.getItem('token') 
  return config
}