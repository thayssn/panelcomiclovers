import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import env from '../../env';

// using styled-components
import BooksList from './style';

class Books extends Component {
  state = {
    books: [],
  }

  async componentDidMount() {
    const { data: books } = await api.get('books');
    this.setState({ books });
  }

  render() {
    const { books } = this.state;
    return (
      <BooksList>
        <header>
          <h1>Quadrinhos</h1>
          <div>
            <Link to="/books/create">Adicionar quadrinho</Link>
          </div>
        </header>
        { books.map(book => (
          <article className="book" key={book.id}>
            <div className="book__thumbnail">
              { book.thumbnail && <img src={`${env.baseUrl}/${book.thumbnail}`} alt="" className="book__thumbnail" />}
            </div>
            <div className="book__info">
              <div className="book__title">
                <Link to={`/books/${book.id}`}>
                  {book.title}
                  {book.edition && ` - ${book.edition}`}
                </Link>
              </div>
              <div className="book__edition">{`Edição: ${book.edition}`}</div>
              <div className="book__isbn">{`ISBN: ${book.isbn}`}</div>
              <div className="book__licensor">{book.licensors && book.licensors.map(licensor => licensor.name)}</div>
            </div>
          </article>
        ))}
      </BooksList>
    );
  }
}

export default Books;
