import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoginContainer from './style';
// import './New.scss';

const cookies = new Cookies();

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();


    const { history } = this.props;
    const {
      email, password,
    } = this.state;

    try {
      const { data } = await api.post('auth', { email, password });
      cookies.set('userToken', data.token, { path: '/' });
      history.push('/books');
    } catch (err) {
      alert('Houve um erro ao fazer o login. Verifique se as informações estão corretas.');
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      email,
      password,
    } = this.state;

    return (
      <LoginContainer className="new_post">
        <h1>Login</h1>
        <form className="form" onSubmit={this.handleSubmit}>

          <div className="inputGroup">
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              onChange={this.handleChange}
              value={email}
            />

          </div>
          <div className="inputGroup">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={this.handleChange}
              value={password}
            />
          </div>

          <div className="inputGroup">
            <button type="submit">Entrar</button>
          </div>

          <div className="inputGroup">
            <Link to="/forgot_password">Esqueci minha senha</Link>
          </div>
        </form>
      </LoginContainer>
    );
  }
}

export default Login;
