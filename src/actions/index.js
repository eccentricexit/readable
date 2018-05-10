export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'

export function addRecipe ({day,recipe,meal}){
  return {
    type: ADD_POST,
    recipe,
    day,
    meal
  }
}

export function removeFromCalendar ({day,meal}){
  return {
    type: ADD_COMMENT,
    day,
    meal
  }
}
