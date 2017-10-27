import React, { Component } from 'react'
import Shelf from './Shelf'

class Bookcase extends Component {


  render () {
    const { books, shelves, updateShelf } = this.props

    return (
      <div className='container'>

        {shelves.map(s => (
          <Shelf key={s.key} books={books.filter(b => b.shelf === s.value)} shelves={shelves} shelfTitle={s.text} updateShelf={updateShelf} />
        )) }

      </div>

    )
  }

}

export default Bookcase
