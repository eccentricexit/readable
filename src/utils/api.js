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
  }).then(res => {
    res.json()
  })
}

export const voteUpPost = (id) => {
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({option:'upVote'})
  }).then(res => {
    res.json()
  })
}

export const voteDownPost = (id) => {
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({option:'downVote'})
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
