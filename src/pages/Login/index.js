import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoginContainer from './style';
import { setUserToken } from '../../services/auth';
// import './New.scss';

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
      setUserToken(data.token);
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
            <button type="submit" className="button">Entrar</button>
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
