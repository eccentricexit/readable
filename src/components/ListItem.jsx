import React, { Component } from 'react'
import { connect } from 'react-redux';
import { voteUpPost, voteDownPost, removePost } from '../actions'
import Button from 'react-bootstrap/lib/Button'
import Media from 'react-bootstrap/lib/Media'
import Label from 'react-bootstrap/lib/Label'
import {
  voteUpPost as upVoteApi,
  voteDownPost as downVoteApi,
  removePost as removeApi
} from '../utils/api'

class ListItem extends Component {
  voteUp = (e) => {
    e.preventDefault()
    const {post,upVote} = this.props
    upVote(post.id)
    upVoteApi(post.id)
  }

  voteDown = (e) => {
    e.preventDefault()
    const {post,downVote} = this.props
    downVote(post.id)
    downVoteApi(post.id)
  }

  remove = (e) => {
    e.preventDefault()
    const {post,remove} = this.props
    remove(post.id)
    removeApi(post.id)
  }

  render() {
    const {post,onEditClick} = this.props

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

function mapDispatchToProps(dispatch){
  return {
    upVote: (data) => dispatch(voteUpPost(data)),
    downVote: (data) => dispatch(voteDownPost(data)),
    remove: (data) => dispatch(removePost(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ListItem)
