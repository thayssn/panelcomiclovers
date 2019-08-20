import React, { Component } from 'react';
import api from '../../services/api';
import CreateWriterContainer from './style';

class CreateWriter extends Component {
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
      await api.post('writers', { name });
      history.push('/writers');
    } catch (err) {
      alert('Houve um erro ao cadastrar um autor');
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
      <CreateWriterContainer className="new_post">
        <h1>Cadastrar Autor</h1>
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
      </CreateWriterContainer>
    );
  }
}

export default CreateWriter;
