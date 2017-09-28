import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import Search from './Search'


class BooksApp extends React.Component {
    state = { books: [] }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    changeShelf = ( newBook, newShelf ) => {
      BooksAPI.update(newBook, newShelf).then(response =>{
          newBook.shelf = newShelf
          var updatedBooks = this.state.books.filter( book => book.id !== newBook.id )
          updatedBooks.push(newBook);
          this.setState({ books: updatedBooks })
      })
  }

    render() {
        const { books } = this.state

        return (
              <div className="app">
                    <Route path="/search" render={( { history }) => (
                      <Search
                        books={ books }
                        changeShelf={ this.changeShelf }
                      />
                    )} />

                    <Route exact  path="/" render={() => (
                      <div className="list-books">
                        <div className="list-books-title">
                          <h1>MyReads</h1>
                        </div>
                        <BookList
                          books={ books }
                          changeShelf={ this.changeShelf }
                        />
                        <div className="open-search">
                          <Link to="/search">Search</Link>
                        </div>
                      </div>
                    )} />
              </div>
        )
    }
}

export default BooksApp
