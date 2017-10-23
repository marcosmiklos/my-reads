import React, { Component } from 'react'
import Shelf from './Shelf'

class Bookcase extends Component {

  
  render () {
    const { shelves, books } = this.props

    return (
      <div className='container'>
        {shelves.map(s => (
          <div key={s.shelfID} className='shelf'>
            <h2>{s.shelfName}</h2>
            <Shelf books={books.filter(b => b.shelf === s.shelfID)} />
          </div>
        ))}
      </div>

    )
  }

}

export default Bookcase
