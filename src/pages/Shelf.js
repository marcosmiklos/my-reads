import React from 'react'

const Shelf = (props) => {

  return (
    <div>
      {props.books.map(book =>(
        <p key={book.id}>{book.title}</p>
      ))}
    </div>
  )
}

export default Shelf
