import { combineReducers } from 'redux';
import {
  ADD_POST,
  ADD_COMMENT
} from '../actions'

function posts (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      console.log('TODO: build add post action')
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
    default :
      return state
  }
}

export default combineReducers({
  posts,
  comments
})
