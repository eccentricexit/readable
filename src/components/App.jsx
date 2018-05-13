import React, { Component } from 'react'
import Navbar from './Navbar'
import ListView from './ListView'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    const categories = [
        {
          name: 'react',
          path: 'react'
        },
        {
          name: 'redux',
          path: 'redux'
        },
        {
          name: 'udacity',
          path: 'udacity'
        }
    ]

    return (
      <div>
        <Navbar title="Readable" categories={categories} />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          {categories.map((category) => (
            <Route exact path={'/'+category.path.toString().toLowerCase()} render={() => (
                <ListView category={category.name} />
            )}/>
          ))}
        </div>
      </div>
    )
  }
}

export default App
