import { combineReducers } from 'redux';
import {
  ADD_CATEGORIES,
  ADD_POSTS,
  ADD_POST,
  EDIT_POST,
  ADD_COMMENT,
  ADD_COMMENTS,
  VOTE_UP_POST,
  VOTE_DOWN_POST,
  REMOVE_POST
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case ADD_CATEGORIES:
      const {categories} = action
      let newState = state.map(a => ({...a}));
      categories.map(category => newState.push(category))
      return newState
    default:
      return state
  }
}

function posts (state = {}, action) {
  switch (action.type) {
    case ADD_POSTS:{
      const {posts} = action
      let newState = {...state}
      posts.map(post => {
        newState[post.id] = post
      })
      return newState
    }
    case ADD_POST:{
      const {id,timestamp,title,category,author,body} = action
      const post = {id,timestamp,title,category,author,body}
      let newState = {...state}
      newState[post.id] = post
      return newState
    }
    case EDIT_POST:{
      const {id,title,body} = action
      let newState = {...state}
      newState[id] = {
        ...newState[id],
        title: title,
        body: body
      }
      return newState
    }
    case REMOVE_POST:{
      const {id} = action
      let newState = {...state}
      newState[id].deleted = true
      return newState
    }
    case ADD_COMMENTS:{
      const {id,comments} = action
      let newState = {...state}
      newState[id].comments = {}
      comments.map((comment) => {
        newState[id].comments = comments
      })
      return newState
    }
    case ADD_COMMENT:{
      const {comment} = action
      let newState = {...state}
      newState[comment.parentId].comments[comment.id] = comment
      return newState
    }
    case VOTE_UP_POST:{
      const {id} = action
      let newState = {...state}
      newState[id].voteScore++
      return newState
    }
    case VOTE_DOWN_POST:{
      const {id} = action
      let newState = {...state}
      newState[id].voteScore++
      return newState
    }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
