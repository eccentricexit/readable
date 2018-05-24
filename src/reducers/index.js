import { combineReducers } from 'redux';
import {
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT
} from '../actions'

const initialPostState = {}

function posts (state = initialPostState, action) {
  switch (action.type) {
    case ADD_POST:
      console.log('TODO: build add post action')
      return {}
    case EDIT_POST:
      console.log('TODO: build edit post action')
      return {}
    case REMOVE_POST:
      console.log('TODO: build remove post action')
      return {}
    default:
      return state
  }
}

const initialCommentsState = {}

function comments (state = initialCommentsState, action) {
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
  posts,
  comments
})
