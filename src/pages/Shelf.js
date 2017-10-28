import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Grid, Card, Image, Dropdown } from 'semantic-ui-react'

const Shelf = ({ books=[], shelves=[], shelfTitle = '', updateShelf, checkImage, columns = 5 }) => {

  const options = shelves.concat([{key: 'none', text: 'None', value: 'none' }]);

  return (
    <div>
      <Grid columns={columns} doubling centered>
      {books.length > 0 && books.map(book =>(
        <Grid.Column key={book.id}>
          <Card>
          <Image src={book.imageLinks.smallThumbnail} />
          <Card.Content>
            <Card.Header>
              {book.title}
            </Card.Header>
            <Card.Meta>
              {book.authors ? book.authors.join(', ') : ''}
            </Card.Meta>
            <Card.Description></Card.Description>
          </Card.Content>
          <Card.Content extra>
              <Dropdown
                floating
                pointing='top'
                text='Move to...'
                options={options}
                defaultValue={book.shelf}
                onChange={(event, data) => updateShelf(event, data, book)}
                />
          </Card.Content>
        </Card>
        </Grid.Column>
      ))}
      </Grid>
  </div>
  )
}
export default Shelf
