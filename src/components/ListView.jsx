import React, { Component } from 'react'
import {default as _} from 'lodash'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Button from 'react-bootstrap/lib/Button'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import ListItem from './ListItem'
import Loading from 'react-loading'
import NewPostModal from './NewPostModal'
import EditPostModal from './EditPostModal'

const DATE = 'DATE'
const SCORE = 'SCORE'

class ListView extends Component {

  state = {
    editPostModalOpen:false,
    newPostModalOpen:false,
    post:undefined,
    sortMode:DATE
  }

  onSortModeSelect = (sortMode) => {
    this.setState({sortMode})    
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
    const {sortMode} = this.state
    let posts = Object.keys(postsObj).map((id) => {
      return postsObj[id]
    }).filter((post) => !post.deleted)

    if(sortMode===DATE){
      posts = _.orderBy(posts,['timestamp'],['desc'])
    }else{
      posts = _.orderBy(posts,['voteScore'],['desc'])
    }

    return (
      <div>
        {category!=='All' && <h2>{category}</h2>}
        <Grid>
          <Row>
            <Col xs={9} md={10}>
              <Button
                bsStyle="primary"
                onClick={this.openNewPostModal}>
                Add New...
              </Button>
            </Col>
            <Col xs={3} md={2}>
              <DropdownButton id="sortby-dropdown"
                title="Sort by"
                onSelect={this.sortSelected}>
                <MenuItem eventKey={DATE} onSelect={this.onSortModeSelect}>Date</MenuItem>
                <MenuItem eventKey={SCORE} onSelect={this.onSortModeSelect}>Score</MenuItem>
              </DropdownButton>
            </Col>
          </Row>
        </Grid>
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
