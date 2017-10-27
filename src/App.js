import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI'
import Bookcase from './pages/Bookcase';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header } from 'semantic-ui-react'

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
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

            <Bookcase
              books={books}
              shelves={shelves}
              updateShelf={this.updateShelf}
            />

          </Container>
      </div>
    )
  }
}

export default App;
