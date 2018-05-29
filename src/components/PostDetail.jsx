import React, { Component } from 'react'
import { getPost, getComments } from '../utils/api'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Form from 'react-bootstrap/lib/Form'
import ListItem from './ListItem'
import PostModal from './PostModal'
import Comment from './Comment'

class PostDetail extends Component {
  state = {
    writePostModalOpen:false,
    post:{},
    comments:[]
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
              <h5>Comments</h5>
              <Form>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl componentClass="textarea" placeholder="What are your thoughts?" />
                </FormGroup>
                <Button type="submit" bsStyle="primary">Add Comment</Button>
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
