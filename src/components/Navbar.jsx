import React, { Component } from 'react'
import BNavbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

class Navbar extends Component{
  render() {
    const {title} = this.props
    const {categories} = this.props

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
            {categories.map((category) => (
                <NavItem eventKey={1} href={'/'+category.link} key={category.link}>
                  {category.name}
                </NavItem>
              ))}
            </Nav>
          </BNavbar.Collapse>
        </BNavbar>
    )
  }
}

export default Navbar
