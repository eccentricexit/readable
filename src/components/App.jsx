import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListView from './ListView'
import Navbar from './Navbar'
import { connect } from 'react-redux';
import { getCategories, getPosts } from '../utils/api'
import '../App.css'

class App extends Component {

  state = {
    loadingPosts:false,
    loadingCategories: false,
    posts:[],
    categories: []
  }

  componentDidMount(){
    this.setState({
      loadingCategories: true,
      loadingPosts:true
    })

    getCategories().then((categories) => {
      this.setState({
        categories,
        loadingCategories:false,
      })
    })

    getPosts().then((posts) => this.setState(()=>({
      posts,
      loadingPosts:false,
    })))
  }

  render() {
    const {
      loadingPosts,
      loadingCategories,
      categories,
      posts
    } = this.state

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
                <ListView category={category.name}
                  posts={posts}
                  loadingPosts={loadingPosts}/>
            )}/>
          ))}
          <Route exact path="/" render={() => (
              <ListView
                category="All"
                posts={posts}
                loadingPosts={loadingPosts}/>
          )}/>
        </div>
      </div>
    )
  }
}

export default App
