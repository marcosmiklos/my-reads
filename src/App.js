import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Icon } from 'semantic-ui-react'
import Bookcase from './pages/Bookcase';
import SearchBooks from './pages/SearchBooks';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
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
          <Header as='h1' color='teal' dividing>
            <Icon name='book' />
            <Header.Content>
              My Reads
            </Header.Content>
          </Header>
          <Route exact path='/' render={() => (
            <Bookcase
              books={books}
              shelves={shelves}
              onUpdateShelf={this.updateShelf}
            />
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks
              books={books}
              shelves={shelves}
              onUpdateShelf={this.updateShelf}
              onResolveImage={this.resolveImage}
            />
          )}/>

          </Container>
      </div>
    )
  }
}

export default App;
