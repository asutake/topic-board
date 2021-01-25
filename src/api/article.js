import request from '@/utils/request'
import axios from 'axios'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchList2post(data) {
  // 一旦はpost処理をベタがきで動かして、そのあとにリファクタする
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
  //  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  return axios.post(
    'http://localhost:8080/topics', { 'title': 'タイトル7' }
  )
}

export function fetchList2(query) {
  return axios.get('http://localhost:8080/topics?limit=30')
  /*
  return request({
    url: '/topics',
    method: 'get',
    params: query,
    baseURL: "http://localhost:8080",
  })*/
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
