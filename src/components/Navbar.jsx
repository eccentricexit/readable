import React, { Component } from 'react'
import BNavbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

class Navbar extends Component{
  render() {
    return (
        <BNavbar inverse collapseOnSelect>
          <BNavbar.Header>
            <BNavbar.Brand>
              <a href="#brand">Readable</a>
              {
                //TODO: get from prop
              }
            </BNavbar.Brand>
            <BNavbar.Toggle />
          </BNavbar.Header>
          <BNavbar.Collapse>
            <Nav>
              {
                //TODO: DRY
              }
              <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>
            </Nav>
          </BNavbar.Collapse>
        </BNavbar>
    )
  }
}

export default Navbar
