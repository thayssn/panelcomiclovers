import React, { Component } from 'react';
import api from '../../services/api';
import CreatePublisherContainer from './style';

class CreatePublisher extends Component {
  state = {
    name: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();


    const { history } = this.props;
    const {
      name,
    } = this.state;

    try {
      await api.post('publishers', { name });
      history.push('/publishers');
    } catch (err) {
      alert('Houve um erro ao cadastrar uma Editora');
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      name,
    } = this.state;

    return (
      <CreatePublisherContainer className="new_post">
        <h1>Cadastrar Editora</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            onChange={this.handleChange}
            value={name}
          />

          <button type="submit">Entrar</button>
        </form>
      </CreatePublisherContainer>
    );
  }
}

export default CreatePublisher;
