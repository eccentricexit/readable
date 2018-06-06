import {
  ADD_CATEGORIES,
  ADD_POSTS,
  ADD_POST,
  EDIT_POST,
  EDIT_COMMENT,
  ADD_COMMENT,
  ADD_COMMENTS,
  REMOVE_COMMENT,
  VOTE_UP_POST,
  VOTE_DOWN_POST,
  REMOVE_POST,
  VOTE_UP_COMMENT,
  VOTE_DOWN_COMMENT
} from '../actions/types'

export function addCategories (categories) {
  return {
    type: ADD_CATEGORIES,
    categories
  }
}

export function addPosts (posts) {
  return {
    type: ADD_POSTS,
    posts
  }
}

export function addComments ({id, comments}) {
  return {
    type: ADD_COMMENTS,
    id,
    comments
  }
}

export function addPost ({id, timestamp, title, category, author, body}) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    category,
    title,
    author,
    body
  }
}

export function editPost ({id, title, body}) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

export function voteUpPost (id) {
  return {
    type: VOTE_UP_POST,
    id
  }
}

export function voteDownPost (id) {
  return {
    type: VOTE_DOWN_POST,
    id
  }
}

export function removePost (id) {
  return {
    type: REMOVE_POST,
    id
  }
}

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function upVoteComment ({id, parentId}) {
  return {
    type: VOTE_UP_COMMENT,
    id,
    parentId
  }
}

export function downVoteComment ({id, parentId}) {
  return {
    type: VOTE_DOWN_COMMENT,
    id,
    parentId
  }
}

export function editComment (comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function removeComment ({id, parentId}) {
  return {
    type: REMOVE_COMMENT,
    id,
    parentId
  }
}
