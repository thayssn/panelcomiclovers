import React, { Component } from 'react';
import api from '../../services/api';
import CreateUserContainer from './style';

class CreateUser extends Component {
  state = {
    preview: null,
    image: null,
    name: '',
    email: '',
    password: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { history } = this.props;
    const data = new FormData();

    const {
      image,
      name,
      email,
      password,
    } = this.state;

    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('image', image);

    try {
      await api.post('users', data);
      history.push('/users');
    } catch (err) {
      alert('Houve um erro ao cadastrar o usuário.');
    }
  }

  handleFileChange = (e) => {
    this.setState({ image: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      name, preview, email, password,
    } = this.state;

    return (
      <CreateUserContainer className="new_post">
        <h1>Cadastrar novo quadrinho</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div>
            <div className="thumbnail">
              <img src={preview} alt="" className="thumbnail" />
            </div>
            <input
              className="btn"
              type="file"
              onChange={this.handleFileChange}
            />
          </div>

          <input
            type="text"
            name="name"
            placeholder="Nome"
            onChange={this.handleChange}
            value={name}
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={email}
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={this.handleChange}
            value={password}
          />

          <button type="submit" className="submit">Enviar</button>
        </form>
      </CreateUserContainer>
    );
  }
}

export default CreateUser;
