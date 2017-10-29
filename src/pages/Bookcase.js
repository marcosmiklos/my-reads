import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { Segment, Grid, Button, Header } from 'semantic-ui-react'
import Shelf from './Shelf'

class Bookcase extends Component {

  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render () {
    const { books, shelves, onUpdateShelf } = this.props

    return (
      <div className='container'>

        {shelves.map(s => (
          <Grid.Row key={s.key} style={{ marginTop: '10px', padding: '10px' }}>
            <Grid.Column>
              <Segment raised>
                <Header as='h2' color='teal'>{s.text}</Header>
                <Shelf books={books.filter(b => b.shelf === s.value)} shelves={shelves} onUpdateShelf={onUpdateShelf} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        ))}

        <Grid centered style={{ marginTop: '10px', padding: '10px' }}>
          <Button color='teal' as={Link} to='/search'>
            Add book
          </Button>
        </Grid>

      </div>

    )
  }

}

export default Bookcase
