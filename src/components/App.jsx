import React, { Component } from 'react'
import Navbar from './Navbar'
import ListView from './ListView'

class App extends Component {
  render() {
    const links = ['Trending','Popular','Not so popular','Good stuff']
    return (
      <div>
        <Navbar title="Readable" links={links} />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <ListView category="Trending"/>
        </div>
      </div>
    )
  }
}

export default App
