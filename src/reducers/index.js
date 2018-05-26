import { combineReducers } from 'redux';
import {
  ADD_CATEGORIES,
  ADD_POSTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT
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

function posts (state = [], action) {
  switch (action.type) {
    case ADD_POSTS:{
        const {posts} = action
        let newState = state.map(a => ({...a}));
        posts.map(post => newState.push(post))
        return newState
      }
    case ADD_POST:{
        const {id,timestamp,title,category,author,body} = action
        const post = {id,timestamp,title,category,author,body}
        let newState = state.map(a => ({...a}));
        newState.push(post)
        return newState
      }
    case EDIT_POST:{
        const {id,title,body} = action
        let newState = state.map(a => ({...a}));
        newState.filter((p) => p.id===id).map((post) => {
          post.title = title
          post.body = body
        })
        return newState
      }
    case REMOVE_POST:{
        console.log('TODO: build remove post action')
        return {}
      }
    default:
      return state
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case ADD_COMMENT :
      console.log('TODO: build add comment action')
      return {}
    case EDIT_COMMENT:
      console.log('TODO: build edit comment action')
      return {}
    case REMOVE_COMMENT:
      console.log('TODO: build remove comment action')
      return {}
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
