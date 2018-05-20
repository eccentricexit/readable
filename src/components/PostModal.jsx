import React, { Component } from 'react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Modal from 'react-bootstrap/lib/Modal'
import Loading from 'react-loading'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

class PostModal extends Component {
  state = {
    title:'',
    author:'',
    body:''
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

  render() {
    const {
      isOpen,
      openClick,
      closeClick,
      onPublishClick,
      post
    } = this.props

    const isEditing = typeof(post)!=='undefined'?true:false

    return (
      <Modal show={isOpen} onHide={closeClick}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing?'Edit':'New'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="formHorizontalTitle">
            <Col componentClass={ControlLabel} sm={2}>
              Title
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Ground Control To Major Tom..."
                defaultValue={isEditing?post.title:''}
                onChange={(event) => this.updateTitle(event.target.value)}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalAuthor">
            <Col componentClass={ControlLabel} sm={2}>
              Author
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Elon Molusk"
                defaultValue={isEditing?post.author:''}
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
                defaultValue={isEditing?post.body:''}
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
                onClick={onPublishClick}>Publish</Button>
            </Col>
          </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default PostModal
