import React, { Component } from 'react';
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
        <h1>Ilustradores</h1>
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
