import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import Media from 'react-bootstrap/lib/Media'
import Label from 'react-bootstrap/lib/Label'

class Comment extends Component {
  render() {
    const {comment} = this.props
    return (
      <Media>
        <Media.Body>
          <p>
            {comment.author} <small><Label bsStyle="primary">{comment.score}</Label></small>
          </p>
          <h6>{comment.body}</h6>
        </Media.Body>
        <Media.Right>
          <Button
            className="glyphicon glyphicon-pencil"
            bsSize="small" />
        </Media.Right>
        <Media.Right>
          <Button
            className="glyphicon glyphicon-trash"
            bsSize="small" />
        </Media.Right>
        <Media.Right>
          <Button
            className="glyphicon glyphicon-chevron-up"
            bsSize="small" />
          <Button
            className="glyphicon glyphicon-chevron-down"
            bsSize="small" />
        </Media.Right>
      </Media>
    )
  }
}

export default Comment
