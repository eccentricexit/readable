import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Button from 'react-bootstrap/lib/Button'
import ListItem from './ListItem'
import Loading from 'react-loading'
import NewPostModal from './NewPostModal'
import EditPostModal from './EditPostModal'

class ListView extends Component {

  state = {
    editPostModalOpen:false,
    newPostModalOpen:false,
    post:undefined
  }

  openNewPostModal = () => {
    this.setState({
      newPostModalOpen: true
    })
  }

  closeNewPostModal = () => {
    this.setState({
      newPostModalOpen: false
    })
  }

  openEditPostModal = (post) => {
    this.setState({
      editPostModalOpen: true,
      post
    })
    this.child.updateStateWithPost(post)
  }

  closeEditPostModal = () => {
    this.setState({
      editPostModalOpen: false
    })
  }

  render() {
    const {category,loadingPosts} = this.props
    const postsObj = this.props.posts
    const posts = Object.keys(postsObj).map((id) => {
      return postsObj[id]
    }).filter((post) => !post.deleted)

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
                    <ListItem id={post.id} onEditClick={this.openEditPostModal} />
                  </ListGroupItem>
                ))}
              </ListGroup>
            : <ListGroup>
                {posts.map((post) => (
                  <ListGroupItem key={post.id}>
                    <ListItem id={post.id} onEditClick={this.openEditPostModal} />
                  </ListGroupItem>
                ))}
              </ListGroup>
          }

        <EditPostModal
          post={this.state.post}
          closeClick={this.closeEditPostModal}
          isOpen={this.state.editPostModalOpen}
          onRef={ref => (this.child = ref)} />

        <NewPostModal
          closeClick={this.closeNewPostModal}
          isOpen={this.state.newPostModalOpen}/>

      </div>
    )
  }
}

export default ListView
