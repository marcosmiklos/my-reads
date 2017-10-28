import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Segment, Grid, Input } from 'semantic-ui-react'
import * as BooksAPI from '../utils/BooksAPI'
import Shelf from './Shelf'

class SearchBooks extends Component {

  state = {
    query: '',
    searchResults: [],
    isLoading: false
  }

  searchBooks = (e, data) => {

    const query = data.value;
    query.trim();

    if(query.length > 1) {

      this.setState(state => ({
        isLoading: true,
        query: query
      }))

      BooksAPI.search(query, 20).then( resp => {
        if(resp && resp.length > 0) {
          this.setState( state => ({
            isLoading: false,
            searchResults: resp.map( r => {
              r.shelf = this.verifyShelf(r);
              //fix images covers
              r.imageLinks = { smallThumbnail: this.props.resolveImage(r) };
              return r;
            })
          }))
        }
      })

    } else {
      this.setState(state => ({
        searchResults: [],
        isLoading: false,
        query: query
      }))
    }

  }

  verifyShelf = res => {
    const shelfExists = this.props.books.filter(book => book.id === res.id)
    return shelfExists.length ? shelfExists[0].shelf : 'none';
  }


  render () {

    const { shelves, updateShelf } = this.props
    const { searchResults, isLoading } = this.state

    return (
      <div className='container'>

          <Input
            icon='search'
            placeholder='Search...'
            fluid
            loading={isLoading}
            onChange={(e, data) => this.searchBooks(e, data)}
          />

          <Grid.Row style={{ marginTop: '10px', padding: '10px' }}>
            <Grid.Column>
              <Segment raised>
                <h2>Results</h2>
                {searchResults.length > 0 &&
                  <Shelf books={searchResults} shelves={shelves} updateShelf={updateShelf} />
                }
              </Segment>
            </Grid.Column>
          </Grid.Row>

        <div className="open-main">
          <Link to="/">
            Add a book
          </Link>
        </div>

      </div>
    )
  }
}

export default SearchBooks;
