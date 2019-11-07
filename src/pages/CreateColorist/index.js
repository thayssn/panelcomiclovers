import React, { Component } from 'react';
import api from '../../services/api';
import CreateColoristContainer from './style';

class CreateColorist extends Component {
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
      await api.post('colorists', { name });
      history.push('/colorists');
    } catch (err) {
      alert('Houve um erro ao cadastrar um ilustrador');
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
      <CreateColoristContainer className="new_post">
        <h1>Cadastrar Ilustrador</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            onChange={this.handleChange}
            value={name}
          />

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </CreateColoristContainer>
    );
  }
}

export default CreateColorist;
