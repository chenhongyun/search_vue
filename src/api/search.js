import api from './index'
// import { axios } from '@/utils/request'
import axios from 'axios'

export function getAll () {
  console.log('即将执行axios请求')
  return axios({
    url: api.getAll,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
}