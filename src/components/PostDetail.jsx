import React, { Component } from 'react'
import { default as UUID } from "node-uuid"
import { editPost, addComment } from '../actions'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Form from 'react-bootstrap/lib/Form'
import ListItem from './ListItem'
import PostModal from './PostModal'
import Comment from './Comment'
import {
  addComment as addCommentApi,
  updatePost as updatePostApi
} from '../utils/api'

class PostDetail extends Component {
  state = {
    writePostModalOpen:false,
    post:{},
    comment:{
      body: '',
      author: ''
    }
  }

  openNewPostModal = () => {
    this.setState({
      writePostModalOpen: true,
      post:undefined
    })
  }

  closeWritePostModal = () => {
    this.setState({
      writePostModalOpen: false
    })
  }

  openEditPostModal = (post) => {
    this.setState({
      writePostModalOpen: true,
      post
    })
  }

  onAddCommentClick = (e) => {
    e.preventDefault()
    let {comment} = this.state
    const {updatePost,addCommentState,id,post} = this.props
    comment = {
      ...comment,
      id: UUID.v4(),
      timestamp: Date.now(),
      parentId: id,
    }

    let newPost = {...post}
    newPost.commentCount++

    updatePostApi(newPost)
    updatePost(newPost)
    addCommentApi(comment)
    addCommentState(comment)
  }

  updateNewCommentAuthor(author){
    this.setState((state) => {
      let newState = {...state}
      newState.comment.author = author
      return newState
    })
  }

  updateNewCommentBody(body){
    this.setState((state) => {
      let newState = {...state}
      newState.comment.body = body
      return newState
    })
  }

  render() {
    const {id,posts} = this.props
    const post = posts[id]
    const commentsObj = post && post.comments ? post.comments : {}
    const comments = Object.keys(commentsObj).map((id) => {
      return commentsObj[id]
    })

    return (
      <div>
      {post
        ? <ListGroup>
            <ListGroupItem key={id+'header'}>
              <ListItem id={id} onEditClick={this.openEditPostModal}/>
            </ListGroupItem>
            <ListGroupItem key={id+'body'}>
              <p>{post.body}</p>
            </ListGroupItem>
            <ListGroupItem key={id+'comments'}>
              <Form>
                <ControlLabel>Author</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Elon Molusk"
                  onChange={(event) => this.updateNewCommentAuthor(event.target.value)}
                />
                <ControlLabel>Comments</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="What are your thoughts?"
                  onChange={(event) => this.updateNewCommentBody(event.target.value)}/>
                  <br />
                <Button onClick={this.onAddCommentClick} bsStyle="primary">Add Comment</Button>
              </Form>
            </ListGroupItem>
            {comments && comments.map((comment) => (
              <ListGroupItem key={UUID.v4()}>
                <Comment comment={comment}/>
              </ListGroupItem>
            ))}
          </ListGroup>
        : <h1>404!</h1>}
        <PostModal
          post={this.state.post}
          closeClick={this.closeWritePostModal}
          isOpen={this.state.writePostModalOpen}/>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePost: (data) => dispatch(editPost(data)),
    addCommentState: (data) => dispatch(addComment(data))
  }
}

function mapStateToProps ({posts}) {
  return {posts}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
