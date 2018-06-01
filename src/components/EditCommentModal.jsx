import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editComment } from '../actions'
import { updateComment as updateCommentApi } from '../utils/api'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'

class EditCommentModal extends Component {
  state = {
    comment:{}
  }

  onSaveEditClick = (e) => {
    e.preventDefault()
    const {comment} = this.state
    const {updateComment,closeClick} = this.props
    const {id,body} = comment

    const newComment = {
      id,
      timestamp: Date.now(),
      body
    }

    updateCommentApi(newComment)
    updateComment(newComment)
    closeClick()
  }

  updateBody(body){
    this.setState((state) => {
      let newState = {...state}
      newState.comment.body = body
      return newState
    })
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  updateStateWithComment(comment){    
    this.setState({
      comment
    })
  }

  render() {
    const {isOpen,closeClick} = this.props
    const {comment} = this.state

    return (
      <Modal show={isOpen} onHide={closeClick}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="formControlsTextarea">
            <Col componentClass={ControlLabel} sm={2}>
              Body
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                defaultValue={comment && comment.body}
                componentClass="textarea"
                placeholder="I actually think that..."
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
    updateComment: (data) => dispatch(editComment(data))
  }
}

function mapStateToProps ({posts}){
  return {posts}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCommentModal)
