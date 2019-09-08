import React, { Component } from 'react';
import api from '../../services/api';
import CreateIllustratorContainer from './style';

class CreateIllustrator extends Component {
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
      await api.post('illustrators', { name });
      history.push('/illustrators');
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
      <CreateIllustratorContainer className="new_post">
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
      </CreateIllustratorContainer>
    );
  }
}

export default CreateIllustrator;
