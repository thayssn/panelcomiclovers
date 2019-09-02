import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';
import env from '../../env';

// using styled-components
import CollectionsList from './style';

const cookies = new Cookies();
class Collections extends Component {
  state = {
    collections: [],
    error: '',
  }

  async componentDidMount() {
    const userToken = cookies.get('userToken');

    try {
      const { data: collections } = await api.get('public/collections',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
      this.setState({ collections });
    } catch (err) {
      // this.setState({ error: JSON.stringify(err) });
      console.log(err);
    }
  }

  render() {
    const { collections, error } = this.state;
    return (
      <CollectionsList>
        <header>
          <h1>Usuários</h1>
          <div>
            <Link to="/collections/create">Adicionar coleção pública</Link>
          </div>
        </header>
        { error && (
        <Redirect to="/login" />
        )}
        { collections.map(collection => (
          <article className="collection" key={collection.title}>
            <div className="collection__thumbnail">
              { collection.thumbnail && <img src={`${env.baseUrl}/${collection.thumbnail}`} alt="" />}
            </div>
            <div className="collection__info">
              <div className="collection__title">{collection.title}</div>
              <div className="collection__description">{collection.description}</div>
            </div>
          </article>
        ))}
      </CollectionsList>
    );
  }
}

export default Collections;
