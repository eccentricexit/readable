import React, { Component } from 'react'
import { getPost } from '../utils/api'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Form from 'react-bootstrap/lib/Form'
import ListItem from './ListItem'
import Comment from './Comment'

class PostDetail extends Component {
  state = {
    post:{}
  }

  componentDidMount(){
    const id = this.props.params?this.props.params.id:undefined
    console.log('id',id)
    id && getPost(id).then((post) => {
      console.log(post)
    })
  }

  render() {
    console.log('test')
    const post  = {
      id: "6ni6ok3ym7mf1p33lnez",
      timestamp: 1468479767190,
      title: "Learn Redux in 10 minutes!",
      body: "Just kidding. It takes more than 10 minutes to learn technology.",
      author: "thingone"
    }

    const comments = [{
      id:'asdfa',
      author: 'Beatriz Nonato',
      body: 'Lalalalalaaa',
      score: 34
    },{
      id:'effaa',
      author: 'Neatriz Bonato',
      body: 'Lolololo',
      score: 42
    }]

    return (
      <ListGroup>
          <ListGroupItem key={post.id+'header'}>
            <ListItem post={post}/>
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
    )
  }
}

export default PostDetail
