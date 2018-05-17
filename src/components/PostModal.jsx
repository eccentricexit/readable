import React, { Component } from 'react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Modal from 'react-bootstrap/lib/Modal'
import Loading from 'react-loading'
import Button from 'react-bootstrap/lib/Button'

class PostModal extends Component {

  render() {
    const {isOpen,openCLick,closeClick} = this.props

    return (
      <Modal show={isOpen} onHide={closeClick}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Text in a modal</h4>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <hr />
          <h4>Overflowing text to show scroll behavior</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeClick}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PostModal
