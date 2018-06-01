const api = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, {
    headers
  }).then(res =>
    res.json()
  )

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, {
    headers
  }).then(res =>
    res.json()
  )

export const addPost = (post) => {
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post)
  }).then(res => {
    res.json()
  })
}

export const updatePost = (post) => {
  const { title, body } = post
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({title,body})
  }).then(res =>
    res.text()
  )
}

export const updateComment = (comment) => {
  const { timestamp, body } = comment
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({timestamp,body})
  }).then(res =>
    res.text()
  )
}

export const votePost = (id,option) => {
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({option})
  }).then(res => {
    res.json()
  })
}

export const removePost = (id) => {
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => {
    res.json()
  })
}

export const addComment = (comment) => {
  const {id,timestamp,body,author,parentId} = comment

  fetch(`${api}/comments/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({id,timestamp,body,author,parentId})
  }).then(res => {
    res.json()
  })
}

export const removeComment = (id) => {
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers    
  }).then(res => {
    res.json()
  })
}

export const voteComment = (id,option) => {
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({option})
  }).then(res => {
    res.json()
  })
}
