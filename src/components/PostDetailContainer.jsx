import React, { Component } from 'react'
import { default as UUID } from "node-uuid"
import { editPost, addComment } from '../actions'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import EditCommentModal from './EditCommentModal'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Form from 'react-bootstrap/lib/Form'
import ListItem from './ListItem'
import EditPostModal from './EditPostModal'
import Comment from './Comment'
import {
  addComment as addCommentApi,
  updatePost as updatePostApi
} from '../utils/api'

class PostDetailContainer extends Component {
  state = {
    editPostModalOpen:false,
    editCommentModalOpen:false,
    post:{},
    comment:{
      body: '',
      author: ''
    }
  }

  openEditCommentModal = (comment) => {
    this.setState({
      editCommentModalOpen: true,
      comment
    })
    this.editCommentModal.updateStateWithComment(comment)
  }

  closeEditCommentModal = () => {
    this.setState({
      editCommentModalOpen: false
    })
  }

  openEditPostModal = (post) => {
    this.setState({
      editPostModalOpen: true,
      post
    })
    this.editPostModal.updateStateWithPost(post)
  }

  closeEditPostModal = () => {
    this.setState({
      editPostModalOpen: false
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
      voteScore: 1
    }

    let newPost = {...post}
    newPost.commentCount++

    updatePostApi(newPost)
    updatePost(newPost)
    addCommentApi(comment)
    addCommentState(comment)
  }

  updateNewCommentAuthor = (author) => {
    this.setState((state) => {
      let newState = {...state}
      newState.comment.author = author
      return newState
    })
  }

  updateNewCommentBody = (body) => {
    this.setState((state) => {
      let newState = {...state}
      newState.comment.body = body
      return newState
    })
  }

  removeCallback = () => {
    this.props.history.push('/');
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
        ? <PostDetail
            id={id}
            post={post}
            comments={comments}
            updateNewCommentAuthor={this.updateNewCommentAuthor}
            updateNewCommentBody={this.updateNewCommentBody}
            onAddCommentClick={this.onAddCommentClick}
            openEditPostModal={this.openEditPostModal}
            openEditCommentModal={this.openEditCommentModal}
            removeCallback={this.removeCallback}
            closeEditCommentModal={this.closeEditCommentModal}
            onEditClick={this.onEditClick}/>

        : <FourOhFour />}

        <EditPostModal
          post={this.state.post}
          closeClick={this.closeEditPostModal}
          isOpen={this.state.editPostModalOpen}
          onRef={ref => (this.editPostModal = ref)} />

        <EditCommentModal
          closeClick={this.closeEditCommentModal}
          isOpen={this.state.editCommentModalOpen}
          onRef={ref => (this.editCommentModal = ref)} />
      </div>
    )
  }
}

const FourOhFour = (props) =>
  <div className="text-center">
    <h1>404!</h1>
    <a href="/"><h4>Go to home page</h4></a>
  </div>

const PostDetail = (props) =>
  <ListGroup>
    <ListGroupItem key={props.id+'header'}>
      <ListItem
        id={props.id}
        onEditClick={props.openEditPostModal}
        removeCallback={props.removeCallback}/>
    </ListGroupItem>
    <ListGroupItem key={props.id+'body'}>
      <p>{props.post.body}</p>
    </ListGroupItem>
    <ListGroupItem key={props.id+'comments'}>
      <Form>
        <ControlLabel>Author</ControlLabel>
        <FormControl
          type="text"
          placeholder="Elon Molusk"
          onChange={(event) => props.updateNewCommentAuthor(event.target.value)}
        />
        <ControlLabel>Comments</ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder="What are your thoughts?"
          onChange={(event) => props.updateNewCommentBody(event.target.value)}/>
          <br />
        <Button onClick={props.onAddCommentClick} bsStyle="primary">Add Comment</Button>
      </Form>
    </ListGroupItem>
    {props.comments && props.comments.map((comment) => (
      <ListGroupItem key={UUID.v4()}>
        <Comment id={comment.id} parentId={comment.parentId}
          onEditClick={props.openEditCommentModal}
          closeClick={props.closeEditCommentModal}/>
      </ListGroupItem>
    ))}
  </ListGroup>


function mapDispatchToProps (dispatch) {
  return {
    updatePost: (data) => dispatch(editPost(data)),
    addCommentState: (data) => dispatch(addComment(data))
  }
}

function mapStateToProps ({posts}) {
  return {posts}
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailContainer))
