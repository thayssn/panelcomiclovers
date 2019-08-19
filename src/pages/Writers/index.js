import React, { Component } from 'react';
import api from '../../services/api';


// using styled-components
import WritersList from './style';

class Writers extends Component {
  state = {
    writers: [],
  }

  async componentDidMount() {
    const { data: writers } = await api.get('Writers');
    this.setState({ writers });
  }

  render() {
    const { writers } = this.state;
    return (
      <WritersList>
        <h1>Autores</h1>
        { writers.map(writer => (
          <article className="writer" key={writer.id}>
            <div className="writer__info">
              <div className="writer__title">{writer.name}</div>
            </div>
          </article>
        ))}
      </WritersList>
    );
  }
}

export default Writers;
