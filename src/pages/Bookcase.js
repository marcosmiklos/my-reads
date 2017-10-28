import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Segment, Grid } from 'semantic-ui-react'
import Shelf from './Shelf'

class Bookcase extends Component {


  render () {
    const { books, shelves, updateShelf } = this.props

    return (
      <div className='container'>

        {shelves.map(s => (
          <Grid.Row key={s.key} style={{ marginTop: '10px', padding: '10px' }}>
            <Grid.Column>
              <Segment raised>
                <h2>{s.text}</h2>
                <Shelf books={books.filter(b => b.shelf === s.value)} shelves={shelves} updateShelf={updateShelf} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        ))}

        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link> 
        </div>

      </div>

    )
  }

}

export default Bookcase
