import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

// using styled-components
import IllustratorsList from './style';

class Illustrators extends Component {
  state = {
    illustrators: [],
  }

  async componentDidMount() {
    const { data: illustrators } = await api.get('illustrators');
    this.setState({ illustrators });
  }

  render() {
    const { illustrators } = this.state;
    return (
      <IllustratorsList>
        <header>
          <h1>Ilustradores</h1>
          <div>
            <Link to="/illustrators/create">Adicionar ilustrador</Link>
          </div>
        </header>
        { illustrators.map(illustrator => (
          <article className="illustrator" key={illustrator.id}>
            <div className="illustrator__info">
              <div className="illustrator__title">{illustrator.name}</div>
            </div>
          </article>
        ))}
      </IllustratorsList>
    );
  }
}

export default Illustrators;
