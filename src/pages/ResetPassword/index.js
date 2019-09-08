import React, { Component } from 'react';
import queryString from 'query-string';
import api from '../../services/api';
import ResetPasswordContainer from './style';

class ResetPassword extends Component {
  state = {
    password: '',
    success: false,
    error: null,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: false });
    const { location } = this.props;
    const {
      password,
    } = this.state;

    const { token, email } = queryString.parse(location.search);
    console.log(token, email);

    if (!password) {
      this.setState({ loading: false, success: false, error: 'Informe uma nova senha.' });
      return;
    }

    try {
      await api.post('reset_password', { email, token, password });
      this.setState({ loading: false, success: true, error: false });
    } catch (err) {
      this.setState({ loading: false, success: false, error: 'Erro ao tentar redefinir sua senha. Por favor, faça uma nova solicitação.' });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      password,
      success,
      error,
      loading,
    } = this.state;

    return (
      <ResetPasswordContainer className="new_post">
        <h1>Redefinir senha</h1>
        <form className="form" onSubmit={this.handleSubmit}>


          { loading ? <p>Enviando...</p>
            : success
              ? (
                <p>
                  Sua senha foi redefinida com sucesso.
                </p>
              )
              : (
                <div>
                  <p>Informe sua nova senha.</p>

                  { error && (
                  <p className="error">
                    { error}
                  </p>
                  )}

                  <input
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                    onChange={this.handleChange}
                    value={password}
                  />

                  <button type="submit">Enviar</button>
                </div>
              )
          }
        </form>

      </ResetPasswordContainer>
    );
  }
}

export default ResetPassword;
