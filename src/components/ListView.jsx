import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Button from 'react-bootstrap/lib/Button'
import ListItem from './ListItem'
import PostModal from './PostModal'

class ListView extends Component {

  state = {
    writePostModalOpen:false,
    post:undefined
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

  render() {
    const {category} = this.props
    const posts = [
      {
        id:1,
        title:'The Joy of Reacting',
        author: 'Rob Boss',
        body:'yada yada',
        commentCount:214,
        score:42
      },
      {
        id:2,
        title:'AI Crisis',
        author: 'Elon Molusk',
        body:'lorem ipsum dolor',
        commentCount:44,
        score:14
      },
      {
        id:3,
        title:'Cryaotic of Fear',
        author: 'pwd3.14',
        body:'building the church',
        commentCount:57,
        score:75
      },
      {
        id:4,
        title:'The Cosmos (is all that is, or ever was, or ever will be)',
        author: 'Carl Sagan',
        body:'scientific method is the f*cking awesome',
        commentCount:34242,
        score:9999
      },
      {
        id:5,
        title:'Look up, not down',
        author:'Stephen Hawking',
        body:'in a parallel universe you are funny',
        commentCount:51,
        score:388
      }
    ]

    return (
      <div>
        {category!=='All' && <h2>{category}</h2>}
        <Button bsStyle="primary" onClick={this.openNewPostModal}>
          Add New...
        </Button>
        <hr />
        <ListGroup>
          {posts.map((post) => (
            <ListGroupItem key={post.id}>
              <ListItem post={post} onEditClick={this.openEditPostModal} />
            </ListGroupItem>
          ))}
        </ListGroup>

        <PostModal
          post={this.state.post}
          closeClick={this.closeWritePostModal}
          isOpen={this.state.writePostModalOpen}/>

      </div>
    )
  }
}

export default ListView
