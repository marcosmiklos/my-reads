import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI'
import Bookcase from './pages/Bookcase';

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {

    const { books } = this.state;
    const shelves = [
      { shelfName: 'Currently Reading', shelfID: 'currentlyReading'},
      { shelfName: 'Want to Read', shelfID: 'wantToRead' },
      { shelfName: 'Read', shelfID: 'read' }
    ];

    return (
      <div className="App">
        <Bookcase
          books={books}
          shelves={shelves}
        /> 
      </div>
    )
  }
}

export default App;
