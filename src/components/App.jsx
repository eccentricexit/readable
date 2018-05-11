import React, { Component } from 'react'
import Navbar from './Navbar'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Media from 'react-bootstrap/lib/Media'
import Label from 'react-bootstrap/lib/Label'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import SplitButton from 'react-bootstrap/lib/SplitButton'
import Well from 'react-bootstrap/lib/Well'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h2>Category</h2>
          <br/>
          <ListGroup>
            <ListGroupItem>
              <div>
                <Media>
                  <Media.Body>
                    <Media.Heading>
                      <strong>Title</strong>
                    </Media.Heading>
                    <p>
                      Author
                      <small> - 34 comments - </small>
                      <small><Label bsStyle="primary">42</Label></small>
                    </p>
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
              </div>
            </ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>...</ListGroupItem>
          </ListGroup>
        </div>
      </div>
    )
  }
}

export default App
