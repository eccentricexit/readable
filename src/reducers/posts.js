import {
  ADD_POSTS,
  ADD_POST,
  EDIT_POST,
  ADD_COMMENT,
  ADD_COMMENTS,
  REMOVE_COMMENT,
  VOTE_UP_POST,
  VOTE_DOWN_POST,
  REMOVE_POST,
  VOTE_UP_COMMENT,
  VOTE_DOWN_COMMENT
} from '../actions/types'

export function posts (state = {}, action) {
  switch (action.type) {
    case ADD_POSTS: {
      const {posts} = action
      let newState = {...state}
      posts.map(post => {
        return newState[post.id] = post
      })
      return newState
    }
    case ADD_POST: {
      const {id, timestamp, title, category, author, body} = action
      const post = {
        id,
        timestamp,
        title,
        category,
        author,
        body,
        commentCount: 0,
        voteScore: 1
      }
      let newState = {...state}
      newState[post.id] = post
      return newState
    }
    case EDIT_POST: {
      const {id, title, body} = action
      let newState = {...state}
      newState[id] = {
        ...newState[id],
        title: title,
        body: body
      }
      return newState
    }
    case REMOVE_POST: {
      const {id} = action
      let newState = {...state}
      newState[id].deleted = true
      return newState
    }
    case ADD_COMMENTS: {
      const {id, comments} = action
      let newState = {...state}
      newState[id].comments = {}
      comments.map((comment) => {
        return newState[id].comments[comment.id] = comment
      })
      return newState
    }
    case ADD_COMMENT: {
      const {comment} = action
      let newState = {...state}
      newState[comment.parentId].comments[comment.id] = comment
      newState[comment.parentId].commentCount++
      return newState
    }
    case REMOVE_COMMENT: {
      const {id, parentId} = action
      let newState = {...state}
      delete newState[parentId].comments[id]
      newState[parentId].commentCount--
      return newState
    }
    case VOTE_UP_POST: {
      const {id} = action
      let newState = {...state}
      newState[id].voteScore++
      return newState
    }
    case VOTE_DOWN_POST: {
      const {id} = action
      let newState = {...state}
      newState[id].voteScore--
      return newState
    }
    case VOTE_UP_COMMENT: {
      const {id, parentId} = action
      let newState = {...state}
      newState[parentId].comments[id].voteScore++
      return newState
    }
    case VOTE_DOWN_COMMENT: {
      const {id, parentId} = action
      let newState = {...state}
      newState[parentId].comments[id].voteScore--
      return newState
    }
    default:
      return state
  }
}
