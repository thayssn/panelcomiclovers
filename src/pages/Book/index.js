import React, { Component } from 'react';
import api from '../../services/api';

// using styled-components
import BookContainer from './style';

class Book extends Component {
  state = {
    book: {},
  }

  async componentWillMount() {
    const { match } = this.props;
    const { id } = match.params;
    const { data: book } = await api.get(`books/${id}`);
    this.setState({ book });
  }

  render() {
    const { book } = this.state;
    return (
      <BookContainer>
        <article className="book" key={book.id}>
          <div className="book__thumbnail">
            <img src={`http://paperball.com.br:3333/${book.thumbnail}`} alt="" className="book__thumbnail" />
          </div>
          <div className="book__info">
            <div className="book__title">{book.title}</div>
            <div className="book__edition">{`Edição: ${book.edition}`}</div>
            <div className="book__isbn">{`ISBN: ${book.isbn}`}</div>
            <div className="book__writer">
              <span>Escritores: </span>
              {book.writers && book.writers.map(writer => writer.name)}
            </div>
            <div className="book__illustrator">
              <span>Ilustradores: </span>
              {book.illustrators && book.illustrators.map(illustrator => illustrator.name)}

            </div>
            <div className="book__publisher">
              <span>Editoras: </span>
              {book.publishers && book.publishers.map(publisher => publisher.name)}
            </div>
            <div className="book__licensor">
              <span>Licenciantes: </span>
              {book.licensors && book.licensors.map(licensor => licensor.name)}
            </div>
          </div>
        </article>
      </BookContainer>
    );
  }
}

export default Book;
