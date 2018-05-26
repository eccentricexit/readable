import React, { Component } from 'react'
import { getCategories, getPosts } from '../utils/api'
import { addPosts, addCategories } from '../actions'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import ListView from './ListView'
import Navbar from './Navbar'
import '../App.css'

class App extends Component {
  state = {
    loadingPosts:false
  }

  componentDidMount(){
    const {addAllCategories,addAllPosts} = this.props

    this.setState({
      loadingPosts:true
    })

    getCategories().then((categories) => {
      addAllCategories(categories)
    })

    getPosts().then((posts) => {      
      addAllPosts(posts)
      this.setState({
        loadingPosts: false
      })
    })
  }

  render() {
    const { loadingPosts } = this.state
    const { posts, categories} = this.props

    console.log('categories',categories)

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

function mapStateToProps ({ categories, posts }) {
  return { categories, posts }
}

function mapDispatchToProps (dispatch) {
  return {
    addAllCategories: (data) => dispatch(addCategories(data)),
    addAllPosts: (data) => dispatch(addPosts(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
