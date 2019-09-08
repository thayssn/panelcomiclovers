import React, { Component } from 'react';
import api from '../../services/api';
import ForgotPasswordContainer from './style';

class ForgotPassword extends Component {
  state = {
    email: '',
    success: null,
    error: null,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: false });
    const {
      email,
    } = this.state;

    if (!email) {
      this.setState({ loading: false, success: false, error: 'Insira o e-mail cadastrado' });
      return;
    }

    try {
      await api.post('forgot_password', { email });
      this.setState({ loading: false, success: true, error: false });
    } catch (err) {
      this.setState({ loading: false, success: false, error: 'Houve um erro. Certifique-se de que o e-mail informado está correto e cadastrado.' });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      email,
      success,
      error,
      loading,
    } = this.state;

    return (
      <ForgotPasswordContainer className="new_post">
        <h1>Esqueci minha senha</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <p>Informe o e-mail cadastrado.</p>

          { error && (
            <p className="error">
              { error}
            </p>
          )}
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            onChange={this.handleChange}
            value={email}
          />
          { loading ? <p>Enviando...</p>
            : success
              ? (
                <p>
                  As informações de recuperação de senha
                  foram enviadas para o e-mail informado.
                </p>
              )
              : <button type="submit">Enviar</button>
          }
        </form>

      </ForgotPasswordContainer>
    );
  }
}

export default ForgotPassword;
