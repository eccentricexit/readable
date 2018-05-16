import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListView from './ListView'
import Navbar from './Navbar'
import '../App.css'

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
        <div className="container">
          {categories.map((category) => (
            <Route
              exact
              path={'/'+category.path.toString().toLowerCase()}
              key={category.path}
              render={() => (
                <ListView category={category.name} />
            )}/>
          ))}
          <Route exact path="/" render={() => (
              <ListView category="All" />
          )}/>
        </div>
      </div>
    )
  }
}

export default App
