import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import api from '../../services/api';
import env from '../../env';

// using styled-components
import BooksList from './style';

class BooksUsers extends Component {
  state = {
    searchTerm: '',
    collection: null,
    books: [],
    total: 0,
  }

  render() {
    const {
      searchTerm, books, collection, total,
    } = this.state;
    const selectedBooks = books.filter(book => book.selected);

    return (
      <BooksList>
        <header>
          { collection
            ? (
              <div>
                <h1>{`${collection.title}`}</h1>
                <p>Adicionar quadrinhos</p>
              </div>
            )
            : <h1>{`Quadrinhos (${total})`}</h1>
          }
          <div>
            {collection ? (
              <button type="button" className="button" onClick={this.addToCollection}>
                {`Atualizar coleção (${selectedBooks.length})`}
              </button>
            )
              : <Link to="/books/create" className="button">Criar quadrinho</Link>}
          </div>
        </header>
        <div className="search_box">
          <p>Procurar:</p>
          <input type="text" value={searchTerm} onChange={this.handleSearch} />
        </div>
        { books.length ? books.map(book => (
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
              <div className="book__edition">{`Volume: ${book.edition}`}</div>
              {book.isbn && (
                <div className="book__isbn">{`ISBN: ${book.isbn}`}</div>
              )}
              <div className="book__licensor">{book.licensors && book.licensors.map(licensor => licensor.name)}</div>
            </div>
            {collection
            && (
            <div className="book__action">
              <input type="checkbox" checked={book.selected} onChange={() => { this.handleCheck(book.id); }} />
            </div>
            )
            }
          </article>
        ))
          : <p>Nenhum livro encontrado</p>}
      </BooksList>
    );
  }
}

export default BooksUsers;
