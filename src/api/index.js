import axios from 'axios';
import { resSuccess,resError,reqSuccess } from './interceptors'

// let baseUrl = '';
export let baseUrl = 'http://localhost:7001'
// export let baseUrl = 'http://test.zongxintang.com'
// export let baseUrl = 'https://family.zongxintang.com'

const request = axios.create({
  timeout: 1000 * 30, // 超时设置
});

// 请求拦截
request.interceptors.request.use(reqSuccess, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

request.interceptors.response.use(resSuccess,resError)
const axiosCus = {
  get: (path, data, options) => {
    return request.get(path, Object.assign({}, { params: data }, options));
  },
  post: (path, data, options) => {
    return request.post(path, data, options);
  },
};

export default {
  axios: (dataSource, data) => axiosCus[dataSource.method](`${baseUrl}${dataSource.url}`, data),
  login: (data) => axiosCus.post(`${baseUrl}/api/admin/login`, data),
  getUserInfo: (data) => axiosCus.get(`${baseUrl}/api/admin/detail`, data),

  // 墓碑管理
  getGraveList: (data) => axiosCus.get(`${baseUrl}/api/grave/list`, data),
  getGraveInfo: (data) => axiosCus.get(`${baseUrl}/api/grave/detail`, data),
  createGrave: (data) => axiosCus.post(`${baseUrl}/api/grave/create`, data),
  updateGrave: (data) => axiosCus.post(`${baseUrl}/api/grave/update`, data),

  // 人物关系
  getMemberTree: (data) => axiosCus.get(`${baseUrl}/api/member/treeList`, data),
  createMember: (data) => axiosCus.post(`${baseUrl}/api/member/create`, data),
  deleteMember: (data) => axiosCus.post(`${baseUrl}/api/member/delete`, data),
  createMate: (data) => axiosCus.post(`${baseUrl}/api/mate/create`, data),
};
