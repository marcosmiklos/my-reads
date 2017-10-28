import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import { Segment, Grid, Input, Button, Header } from 'semantic-ui-react'
import * as BooksAPI from '../utils/BooksAPI'
import Shelf from './Shelf'

class SearchBooks extends Component {

  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    resolveImage: PropTypes.func.resolveImage
  }

  state = {
    query: '',
    searchResults: [],
    isLoading: false
  }

  searchBooks = (e, data) => {

    const query = escapeRegExp(data.value.trim());

    if(query.length) {

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
        } else {
          this.setState(state => ({
            searchResults: [],
            isLoading: false,
            query: query
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

    const { shelves, onUpdateShelf } = this.props
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
                {searchResults.length > 0 &&
                  <Segment raised>
                    <Header as='h2' color='teal'>Results</Header>
                    <Shelf books={searchResults} shelves={shelves} onUpdateShelf={onUpdateShelf} />
                  </Segment>
                }
            </Grid.Column>
          </Grid.Row>

          <Grid centered style={{ marginTop: '10px', padding: '10px' }}>
            <Button color='teal' as={Link} to='/'>
              Back
            </Button>
          </Grid>

      </div>
    )
  }
}

export default SearchBooks;
