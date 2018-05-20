import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import Media from 'react-bootstrap/lib/Media'
import Label from 'react-bootstrap/lib/Label'

class ListItem extends Component {

  render() {
    const {post,onEditClick} = this.props    

    return (
      <div>
        <Media>
          <Media.Body>
            <Media.Heading>{post.title}</Media.Heading>
            <p>
              {post.author}
              <small> - {post.commentCount} comments - </small>
              <small><Label bsStyle="primary">{post.score}</Label></small>
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
      </div>
    )
  }
}

export default ListItem
