import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions'
import Button from 'react-bootstrap/lib/Button'
import Media from 'react-bootstrap/lib/Media'
import Label from 'react-bootstrap/lib/Label'
import {
  votePost as voteApi,
  removePost as removeApi
} from '../utils/api'

class ListItem extends Component {
  voteUp = (e) => {
    e.preventDefault()
    const {id,voteUpPost} = this.props
    voteUpPost(id)
    voteApi(id,'upVote')
  }

  voteDown = (e) => {
    e.preventDefault()
    const {id,voteDownPost} = this.props
    voteDownPost(id)
    voteApi(id,'downVote')
  }

  remove = (e) => {
    e.preventDefault()
    const {id,removePost,removeCallback} = this.props
    removePost(id)
    removeApi(id)

    // Callback to execute parent code if needed.
    // This is used to redirect the user to root when deleting from PostDetail
    removeCallback && removeCallback()
  }

  render() {
    const {id,onEditClick} = this.props
    const post = this.props.posts[id]

    return (
      <div>
        <Media>
          <Media.Body>
            <Media.Heading>
              <a href={'/'+post.category+'/'+post.id}>{post.title}</a>
            </Media.Heading>
            <p>
              {post.author}
              <small> - {post.commentCount} comments - </small>
              <small><Label bsStyle="primary">{post.voteScore}</Label></small>
            </p>
          </Media.Body>
          <Media.Right>
            <Button
              className="glyphicon glyphicon-pencil"
              onClick={() => {onEditClick(post)}}
              bsSize="small" />
          </Media.Right>
          <Media.Right>
            <Button
              onClick={this.remove}
              className="glyphicon glyphicon-trash"
              bsSize="small" />
          </Media.Right>
          <Media.Right>
            <Button
              onClick={this.voteUp}
              className="glyphicon glyphicon-chevron-up"
              bsSize="small" />
            <Button
              onClick={this.voteDown}
              className="glyphicon glyphicon-chevron-down"
              bsSize="small" />
          </Media.Right>
        </Media>
      </div>
    )
  }
}

function mapStateToProps({posts}){
  return {posts}
}

export default connect(
  mapStateToProps,
  actions
)(ListItem)
