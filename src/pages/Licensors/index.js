import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

// using styled-components
import LicensorsList from './style';

class Licensors extends Component {
  state = {
    licensors: [],
  }

  async componentDidMount() {
    const { data: licensors } = await api.get('licensors');
    this.setState({ licensors });
  }

  render() {
    const { licensors } = this.state;
    return (
      <LicensorsList>
        <header>
          <h1>Licenciantes</h1>
          <div>
            <Link to="/licensors/create">Adicionar licenciante</Link>
          </div>
        </header>
        { licensors.map(licensor => (
          <article className="licensor" key={licensor.id}>
            <div className="licensor__info">
              <div className="licensor__title">{licensor.name}</div>
            </div>
          </article>
        ))}
      </LicensorsList>
    );
  }
}

export default Licensors;
