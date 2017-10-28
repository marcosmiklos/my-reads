import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import 'semantic-ui-css/semantic.min.css';
import { Container, Header } from 'semantic-ui-react'
import Bookcase from './pages/Bookcase';
import SearchBooks from './pages/SearchBooks';

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const result = books.map( r => {
        r.imageLinks = { smallThumbnail: this.resolveImage(r) };
        return r;
      });
      this.setState({ books: result })
    })
  }

  updateShelf = (event, data, book) => {
    if(data.value !== book.shelf) {
      const shelf = data.value;
      book.shelf = shelf;
      BooksAPI.update(book, shelf).then(() => {
        this.setState(state => ({
          books: state.books.filter(bk => bk.id !== book.id).concat([book])
        }));
      });

    }
  };

  resolveImage = (book) => {
    return book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : '/defaultcover.jpg';
  }

  render() {

    const { books } = this.state;

    const shelves = [
      { key: 'currentlyReading', text: 'Currently Reading', value: 'currentlyReading'},
      { key: 'wantToRead', text: 'Want to Read', value: 'wantToRead' },
      { key: 'read', text: 'Read', value: 'read' }
    ];

    return (
      <div className="App">
        <Container style={{ marginTop: '3em', padding: '5em 0em' }}>
          <Header as='h1' dividing>My Reads</Header>
          <Route exact path='/' render={() => (
            <Bookcase
              books={books}
              shelves={shelves}
              updateShelf={this.updateShelf}
            />
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks
              books={books}
              shelves={shelves}
              updateShelf={this.updateShelf}
              resolveImage={this.resolveImage}
            />
          )}/>

          </Container>
      </div>
    )
  }
}

export default App;
