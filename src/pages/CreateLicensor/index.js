import React, { Component } from 'react';
import api from '../../services/api';
import CreateLicensorContainer from './style';

class CreateLicensor extends Component {
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
      await api.post('licensors', { name });
      history.push('/licensors');
    } catch (err) {
      alert('Houve um erro ao cadastrar um Licenciante');
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
      <CreateLicensorContainer className="new_post">
        <h1>Cadastrar Licenciante</h1>
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
      </CreateLicensorContainer>
    );
  }
}

export default CreateLicensor;
