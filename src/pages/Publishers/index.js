import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';
import { isLoggedIn } from '../../services/auth';


// using styled-components
import PublishersList from './style';

class Publishers extends Component {
  state = {
    publishers: [],
  }

  async componentDidMount() {
    const { data: publishers } = await api.get('publishers');
    this.setState({ publishers });
  }

  render() {
    const { publishers } = this.state;
    return (
      <PublishersList>
        { !isLoggedIn() && <Redirect to="/login" /> }
        <header>
          <h1>Editoras</h1>
          <div>
            <Link to="/publishers/create" className="button">Adicionar editora</Link>
          </div>
        </header>
        { publishers.map(publisher => (
          <article className="publisher" key={publisher.id}>
            <div className="publisher__info">
              <div className="publisher__title">{publisher.name}</div>
            </div>
          </article>
        ))}
      </PublishersList>
    );
  }
}

export default Publishers;
