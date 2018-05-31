import React, { Component } from 'react'
import {default as UUID} from "node-uuid";
import {
  getPost,
  getComments,
  addComment as addCommentApi
} from '../utils/api'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Form from 'react-bootstrap/lib/Form'
import ListItem from './ListItem'
import PostModal from './PostModal'
import Comment from './Comment'

class PostDetail extends Component {
  state = {
    writePostModalOpen:false,
    post:{},
    comments:[],
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
    let {comment,post} = this.state
    comment = {
      ...comment,
      id: UUID.v4(),
      timestamp: Date.now(),
      parentId: post.id,
    }

    addCommentApi(comment)
    // addComment(comment)
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

  componentDidMount(){
    const {id} = this.props
    id && getPost(id)
    .then((post) => {
      this.setState({post})
    })
    .then(() => getComments(id))
    .then((comments) => {
      this.setState({comments})
    })
  }

  render() {
    const {post,comments} = this.state

    return (
      <div>
      {post
        ? <ListGroup>
            <ListGroupItem key={post.id+'header'}>
              <ListItem post={post} onEditClick={this.openEditPostModal}/>
            </ListGroupItem>
            <ListGroupItem key={post.id+'body'}>
              <p>{post.body}</p>
            </ListGroupItem>
            <ListGroupItem key={post.id+'comments'}>
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
                <Button onClick={this.onAddCommentClick} bsStyle="primary">Add Comment</Button>
              </Form>
            </ListGroupItem>
            {comments.map((comment) => (
              <ListGroupItem key={comment.id}>
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

export default PostDetail
