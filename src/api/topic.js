import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// method, url, paramsを受け取り、axiosのオブジェクトを返す、request.jsみたいなやつ
// request(method, url, params)
// list(url, params)
// create(url, params)
// listTopic(params)
// addTopic(params)
export function listTopic(params) {
  return axios.get('http://localhost:9090/topics', {
    params: {
      offset: (params.page - 1) * params.limit,
      limit: params.limit,
      sort: params.sort,
      topic_id: params.topic_id
    }
  })
}

export function addTopic(data) {
  return axios.post('http://localhost:9090/topics/create', {
    'title': data.title,
    'text': data.text
  })
}

export function detailTopic(id) {
  return axios.get('http://localhost:9090/topics/' + id)
}

export function updateTopic(id, data) {
  return axios.put('http://localhost:9090/topics/' + id, data)
}

export function deleteTopic(id) {
  return axios.delete('http://localhost:9090/topics/' + id)
}

export function listComment(params) {
  console.log('params.reply_to_comment_id:', params.reply_to_comment_id)

  return axios.get('http://localhost:9090/comments', {
    params: {
      topic_id: params.topic_id,
      reply_to_comment_id: params.reply_to_comment_id,
      offset: (params.page - 1) * params.limit,
      limit: params.limit
    }
  })
}

export function addComment(data) {
  return axios.post('http://localhost:9090/comments', data)
}

export function detailComment(id) {
  return axios.get('http://localhost:9090/comments/' + id)
}

export function updateComment(id, data) {
  return axios.put(
    'http://localhost:9090/comments/' + id, {
      topic_id: data.topic_id,
      text: data.text
    }
  )
}

export function deleteComment(id) {
  return axios.delete('http://localhost:9090/comments/' + id)
}

export function likeComment(id) {
  return axios.post('http://localhost:9090/comments/' + id + '/like')
}

export function dislikeComment(id) {
  return axios.post('http://localhost:9090/comments/' + id + '/dislike')
}

export function replyComment(id, data) {
  // TODO: API側の修正が必要
  return axios.post('http://localhost:9090/comments/' + id + '/reply', {
    text: data.text
  })
}
