export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function addPost ({title,author,body}){
  return {
    type: ADD_POST,
    title,
    author,
    body
  }
}

export function editPost ({postid,title,author,body}){
  return {
    type: EDIT_POST,
    postid,
    title,
    author,
    body
  }
}

export function removePost ({postid}){
  return {
    type: REMOVE_POST,
    postid
  }
}

export function addComment ({postid,author,body}){
  return {
    type: ADD_COMMENT,
    postid,
    author,
    body
  }
}

export function editComment ({commentid,postid,author,body}){
  return {
    type: EDIT_COMMENT,
    commentid,
    postid,
    author,
    body
  }
}

export function removeComment ({commentid}){
  return {
    type: REMOVE_COMMENT,
    commentid
  }
}
