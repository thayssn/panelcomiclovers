import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import env from '../../env';

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
        <header className="book__header">
          <h1 className="book__title">
            {book.title}
            {book.edition && ` - ${book.edition}`}
          </h1>
          <Link to={`/books/${book.id}/edit`} className="button">Editar</Link>
        </header>
        <article className="book" key={book.id}>
          <div className="book__thumbnail">
            { book.thumbnail && <img src={`${env.baseUrl}/${book.thumbnail}`} alt="" />}
          </div>
          <div className="book__info">
            <div className="book__info__block book__edition">
              <span>Edição: </span>
              {book.edition}
            </div>
            { book.isbn && (
            <div className="book__info__block book__isbn">
              <span>ISBN: </span>
              {book.isbn}
            </div>
            )}
            <div className="book__info__block book__writer">
              <span>Escritores: </span>
              {book.writers && book.writers.map((writer, index) => (index < book.writers.length - 1 ? `${writer.name}, ` : writer.name))}
            </div>
            <div className="book__info__block book__illustrator">
              <span>Ilustradores: </span>
              {book.illustrators && book.illustrators.map((illustrator, index) => (index < book.illustrators.length - 1 ? `${illustrator.name}, ` : illustrator.name))}

            </div>
            <div className="book__info__block book__publisher">
              <span>Editoras: </span>
              {book.publishers && book.publishers.map((publisher, index) => (index < book.publishers.length - 1 ? `${publisher.name}, ` : publisher.name))}
            </div>
            <div className="book__info__block book__licensor">
              <span>Licenciantes: </span>
              {book.licensors && book.licensors.map((licensor, index) => (index < book.licensors.length - 1 ? `${licensor.name}, ` : licensor.name))}
            </div>
          </div>
        </article>
      </BookContainer>
    );
  }
}

export default Book;
