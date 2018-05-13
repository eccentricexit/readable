import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListItem from './ListItem'

class ListView extends Component {
  render() {
    const {category} = this.props
    const posts = [
      {
        id:1,
        title:'The Joy of Reacting',
        author: 'Rob Boss',
        commentCount:214,
        score:42
      },
      {
        id:2,
        title:'AI Crisis',
        author: 'Elon Mollusk',
        commentCount:44,
        score:14
      },
      {
        id:3,
        title:'Cryaotic of Fear',
        author: 'pwd3.14',
        commentCount:57,
        score:75
      },
      {
        id:4,
        title:'The Cosmos (is all that is, or ever was, or ever will be)',
        author: 'Carl Sagan',
        commentCount:34242,
        score:9999
      },
      {
        id:5,
        title:'Look up, not down',
        author:'Stephen Hawking',
        commentCount:51,
        score:388
      }
    ]

    return (
      <div>
        <h2>{category}</h2>
        <br/>
        <ListGroup>
          {posts.map((post) => (
            <ListGroupItem key={post.id}>
              <ListItem post={post}/>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default ListView
