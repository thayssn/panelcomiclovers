import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import api from '../../services/api';
import env from '../../env';

// using styled-components
import BooksList from './style';

const cookies = new Cookies();

class Books extends Component {
  state = {
    originalBooks: [],
    books: [],
    total: 0,
    collection: null,
    searchTerm: '',
  }

  async componentDidMount() {
    try {
      const { data: { total, books } } = await api.get('books');

      const { location } = this.props;
      const queries = queryString.parse(location.search);

      if (queries.collection) {
        const userToken = cookies.get('userToken');
        const collectionId = parseInt(queries.collection, 0);
        try {
          const { data: collection } = await api.get(`collections/${collectionId}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          this.setState({ collection });

          const mappedBooks = books.map((book) => {
            const selected = collection.books.find(collectionBook => collectionBook.id === book.id);
            return { ...book, selected: selected || false };
          });
          this.setState({ books: mappedBooks, originalBooks: mappedBooks, total });
        } catch (err) {
          console.log(err);
          return;
        }
      } else {
        this.setState({ books, originalBooks: books, total });
      }
    } catch (err) {
      console.log(err);
    }
  }

  addToCollection = async () => {
    const { books, collection } = this.state;
    const { history } = this.props;
    const selectedBooks = books.filter(book => book.selected).map(book => book.id);
    try {
      const userToken = cookies.get('userToken');
      await api.put(`collections/${collection.id}/books`, {
        books: selectedBooks,
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      history.push(`/collections/${collection.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  handleCheck = (id) => {
    const { books, originalBooks } = this.state;
    const toggleSelectedBook = book => ({
      ...book,
      selected: (book.id === id) ? !book.selected : book.selected,
    });

    this.setState({
      books: books.map(toggleSelectedBook),
      originalBooks: originalBooks.map(toggleSelectedBook),
    });
  }

  handleSearch = (e) => {
    const { originalBooks } = this.state;
    let searchTerm = e.target.value;
    if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      this.setState({
        books: originalBooks.filter(book => book.title.toLowerCase().includes(searchTerm)),
      });
    } else {
      this.setState({ books: originalBooks });
    }
    this.setState({ searchTerm });
  }

  render() {
    const {
      books, total, collection, searchTerm,
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
              <div className="book__edition">{`Edição: ${book.edition}`}</div>
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

export default Books;
