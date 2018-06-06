import {
  ADD_CATEGORIES,  
} from '../actions/types'

export function categories (state = [], action) {
  switch (action.type) {
    case ADD_CATEGORIES:
      const {categories} = action
      let newState = state.map(a => ({...a}))
      categories.map(category => newState.push(category))
      return newState
    default:
      return state
  }
}
