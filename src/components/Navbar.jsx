import React, { Component } from 'react'
import BNavbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

class Navbar extends Component{
  render() {
    const {title} = this.props
    const {links} = this.props    

    return (
        <BNavbar inverse collapseOnSelect fixedTop>
          <BNavbar.Header>
            <BNavbar.Brand>
              <a href="#brand">{title}</a>
            </BNavbar.Brand>
            <BNavbar.Toggle />
          </BNavbar.Header>
          <BNavbar.Collapse>
            <Nav>
            {links.map((link) => (
                <NavItem eventKey={1} href="#" key={link}>
                  {link}
                </NavItem>
              ))}
            </Nav>
          </BNavbar.Collapse>
        </BNavbar>
    )
  }
}

export default Navbar
