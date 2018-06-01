import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Button from 'react-bootstrap/lib/Button'
import ListItem from './ListItem'
import Loading from 'react-loading'
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
    const {category,loadingPosts} = this.props
    const postsObj = this.props.posts
    const posts = Object.keys(postsObj).map((id) => {
      return postsObj[id]
    })

    return (
      <div>
        {category!=='All' && <h2>{category}</h2>}
        <Button bsStyle="primary" onClick={this.openNewPostModal}>
          Add New...
        </Button>
        <hr />
        {loadingPosts === true
          ? <Loading delay={200} type='spin' color='#222' className='loading' />
          : category !== 'All'
            ? <ListGroup>
                {posts.filter(post => post.category === category).map((post) => (
                  <ListGroupItem key={post.id}>
                    <ListItem post={post} onEditClick={this.openEditPostModal} />
                  </ListGroupItem>
                ))}
              </ListGroup>
            : <ListGroup>
                {posts.map((post) => (
                  <ListGroupItem key={post.id}>
                    <ListItem post={post} onEditClick={this.openEditPostModal} />
                  </ListGroupItem>
                ))}
              </ListGroup>}

        <PostModal
          post={this.state.post}
          closeClick={this.closeWritePostModal}
          isOpen={this.state.writePostModalOpen}/>

      </div>
    )
  }
}

export default ListView
