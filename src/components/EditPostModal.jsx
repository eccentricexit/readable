import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPost } from '../actions'
import { updatePost as updatePostApi } from '../utils/api'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'

class EditPostModal extends Component {
  state = {
    title:'',
    body:''
  }

  onSaveEditClick = (e) => {
    e.preventDefault()
    const {title,body} = this.state
    const {updatePost,closeClick} = this.props
    const {category,author,id} = this.props.post

    console.log('title, body',title,body)

    const newPost = {
      id,
      timestamp: Date.now(),
      category,
      title,
      author,
      body
    }

    updatePostApi(newPost)
    updatePost(newPost)
    closeClick()
  }

  updateTitle(title){
    this.setState({title})
  }

  updateBody(body){
    this.setState({body})
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  updateStateWithPost(post){
    const {title,body} = post ? post : ''

    this.setState({
      title,
      body
    })
  }

  render() {
    const {isOpen,closeClick,post} = this.props

    return (
      <Modal show={isOpen} onHide={closeClick}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
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
                defaultValue={post && post.title}
                placeholder="Ground Control To Major Tom..."
                onChange={(event) => this.updateTitle(event.target.value)}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea">
            <Col componentClass={ControlLabel} sm={2}>
              Body
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                defaultValue={post && post.body}
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
                onClick={this.onSaveEditClick}>Publish</Button>
            </Col>
          </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePost: (data) => dispatch(editPost(data))
  }
}

function mapStateToProps ({categories}){
  return {categories}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostModal)
