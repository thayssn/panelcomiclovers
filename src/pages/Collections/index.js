import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';
import env from '../../env';
import { isLoggedIn, getUserToken } from '../../services/auth';

// using styled-components
import CollectionsList from './style';

class Collections extends Component {
  state = {
    collections: [],
  }

  async componentDidMount() {
    const userToken = getUserToken();

    try {
      const { data: collections } = await api.get('public/collections',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
      this.setState({ collections });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { collections } = this.state;
    return (
      <CollectionsList>
        { !isLoggedIn() && <Redirect to="/login" /> }
        <header>
          <h1>Coleções Públicas</h1>
          <div>
            <Link to="/collections/create" className="button">Adicionar coleção pública</Link>
          </div>
        </header>
        { collections.map(collection => (
          <article className="collection" key={collection.id}>
            <div className="collection__thumbnail">
              { collection.thumbnail && <img src={`${env.baseUrl}/${collection.thumbnail}`} alt="" />}
            </div>
            <div className="collection__info">
              <div className="collection__title">
                <Link to={`/collections/${collection.id}`}>{collection.title}</Link>
              </div>
              <div className="collection__description">{collection.description}</div>
            </div>
          </article>
        ))}
      </CollectionsList>
    );
  }
}

export default Collections;
