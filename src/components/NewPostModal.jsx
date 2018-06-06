import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import { addPost as addPostApi } from '../utils/api'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Label from 'react-bootstrap/lib/Label'
import Overlay from 'react-bootstrap/lib/Overlay'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import Col from 'react-bootstrap/lib/Col'

class NewPostModal extends Component {
  state = {
    title:'',
    author:'',
    category:'',
    body:'',
    categoryWarning:false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {title, author, body, category} = this.state
    const {addPost, closeClick} = this.props

    const post = {
      id: Math.random().toString(36).substr(-8),
      timestamp: Date.now(),
      category,
      title,
      author,
      body
    }

    if(!this.categorySelected(category)){
      this.setState({categoryWarning:true})
      return
    }

    addPostApi(post)
    addPost(post)
    closeClick()
  }


  categorySelected(category){
    return category && category.length>0
  }

  updateTitle(title){
    this.setState({title})
  }

  updateAuthor(author){
    this.setState({author})
  }

  updateBody(body){
    this.setState({body})
  }

  onCategorySelect = (category) => {
    this.setState({
      category,
      categoryWarning:false
    })
  }

  componentWillReceiveProps(){
    this.setState({
      title:'',
      author:'',
      category:'',
      body:''
    })
  }

  render() {
    const {isOpen,closeClick,categories} = this.props
    const {category,categoryWarning} = this.state

    return (
      <Modal show={isOpen} onHide={closeClick}>
        <Modal.Header closeButton>
          <Modal.Title>New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formHorizontalTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={10}>
                <FormControl
                  required
                  type="text"
                  placeholder="Ground Control To Major Tom..."
                  onChange={(event) => this.updateTitle(event.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalAuthor">
              <Col componentClass={ControlLabel} sm={2}>
                Category: {category}
              </Col>
              <Col sm={10}>
                <ButtonToolbar>
                  <DropdownButton
                    ref={dp => {this.target = dp}}
                    bsSize="small"
                    title="Select..."
                    id="dropdown"
                  >
                    {categories.map((category) => (
                      <MenuItem
                        eventKey={category.name}
                        key={category.name}
                        onSelect={this.onCategorySelect}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </DropdownButton>
                </ButtonToolbar>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalAuthor">
              <Col componentClass={ControlLabel} sm={2}>
                Author
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  required
                  placeholder="Elon Molusk"
                  onChange={(event) => this.updateAuthor(event.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}>
                Body
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  required
                  componentClass="textarea"
                  placeholder="This is Major Tom to ground control..."
                  onChange={(event) => this.updateBody(event.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button
                  type="submit"
                  bsStyle="primary"
                  >Publish</Button>
              </Col>
            </FormGroup>
          </Form>
          <Overlay
            target={() => ReactDOM.findDOMNode(this.target)}
            placement="right" show={categoryWarning}>
            <Tooltip id="overload-left">Please select a category</Tooltip>
          </Overlay>
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps ({categories}){
  return {categories}
}

export default connect(
  mapStateToProps,
  {addPost}
)(NewPostModal)
