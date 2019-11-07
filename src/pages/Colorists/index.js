import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

// using styled-components
import ColoristsList from './style';

class Colorists extends Component {
  state = {
    colorists: [],
  }

  async componentDidMount() {
    const { data: colorists } = await api.get('colorists');
    this.setState({ colorists });
  }

  render() {
    const { colorists } = this.state;
    return (
      <ColoristsList>
        <header>
          <h1>Coloristas</h1>
          <div>
            <Link to="/colorists/create" className="button">Adicionar colorista</Link>
          </div>
        </header>
        { colorists.map(colorist => (
          <article className="colorist" key={colorist.id}>
            <div className="colorist__info">
              <div className="colorist__title">{colorist.name}</div>
            </div>
          </article>
        ))}
      </ColoristsList>
    );
  }
}

export default Colorists;
