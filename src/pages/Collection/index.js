import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import api from '../../services/api';
import env from '../../env';

// using styled-components
import CollectionContainer from './style';

const cookies = new Cookies();


class Collection extends Component {
  state = {
    collection: {},
    error: null,
  }

  async componentWillMount() {
    const userToken = cookies.get('userToken');
    if (!userToken) {
      this.setState({ error: { code: 401 } });
    }

    const { match } = this.props;
    const { id } = match.params;

    try {
      const { data: collection } = await api.get(`collections/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      this.setState({ collection });
    } catch (err) {
      console.log(err);
      this.setState({ error: { code: 400 } });
    }
  }

  removeBook = async (bookId) => {
    const userToken = cookies.get('userToken');
    if (!userToken) {
      this.setState({ error: { code: 401 } });
    }

    console.log(userToken);

    try {
      const { collection } = this.state;

      const { match } = this.props;
      const { id } = match.params;

      await api.delete(`collections/${id}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(collection, bookId, id);

      this.setState({
        collection: {
          ...collection,
          books: collection.books.filter(book => book.id !== bookId),
        },
      });
    } catch (err) {
      console.log(err);
      this.setState({ error: { code: 400 } });
    }
  }

  render() {
    const { collection, error } = this.state;
    return (
      <CollectionContainer>
        <header className="collection__header">
          <p />
          <Link to={`/collections/${collection.id}/edit`} className="button">Editar</Link>
        </header>
        { error && error.code === 401 && (
          <Redirect to="/login" />
        )}
        <article className="collection" key={collection.id}>
          <div className="collection__thumbnail">
            { collection.thumbnail && <img src={`${env.baseUrl}/${collection.thumbnail}`} alt="" />}
          </div>
          <div className="collection__info">

            <h1 className="collection__title">
              {collection.title}
            </h1>
            <div className="collection__info__block collection__edition">
              <span>Descrição: </span>
              {collection.description}
            </div>
          </div>
        </article>
        <div className="books">
          <header>
            <h3 className="collection__title">
            Quadrinhos
            </h3>
            <Link className="button" to={`/books/?collection=${collection.id}`}>Selecionar Quadrinhos</Link>
          </header>
          { collection.books && collection.books.map(book => (
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
              {collection
                && (
                <div className="book__action">
                  <button type="button" className="button" onClick={() => { this.removeBook(book.id); }}>Remover</button>
                </div>
                )
              }
            </article>
          ))}
        </div>
      </CollectionContainer>
    );
  }
}

export default Collection;
