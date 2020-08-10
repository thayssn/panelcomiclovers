import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import env from '../../env';

// using styled-components
import BooksList from './style';
import { getUserToken } from '../../services/auth';

class Approval extends Component {
  state = {
    originalBooks: [],
    books: [],
    total: 0,
    searchTerm: '',
  }

  async componentDidMount() {
    try {
      const userToken = getUserToken();
      const whereParams = { status: 'Pendente' };
      const { data: { total, books } } = await api.get('books', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: { whereParams },
      });

      this.setState({ books, originalBooks: books, total });
    } catch (err) {
      console.log(err);
    }
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

  changeStatus = async (id, status) => {
    const { books, total } = this.state;
    const userToken = getUserToken();
    await api.put(`books/${id}/status`, {
      status,
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    this.setState({ books: books.filter(book => book.id !== id), total: total - 1 });
  }

  render() {
    const {
      books, total, searchTerm,
    } = this.state;
    return (
      <BooksList>
        <header>
          <h1>{`Quadrinhos pendentes (${total})`}</h1>
          <div>
            <Link to="/books/create" className="button">Criar quadrinho</Link>
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
                <Link to={`/books/${book.id}/edit`}>
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
            <div className="book__action">
              <button type="button" className="button success" onClick={() => this.changeStatus(book.id, 'Aprovado')}>
                {'Aprovar'}
              </button>

              <Link to={`/books/${book.id}/edit`} className="button ">
                Editar
              </Link>
            </div>
          </article>
        ))
          : <p>Nenhum livro encontrado</p>}
      </BooksList>
    );
  }
}

export default Approval;
