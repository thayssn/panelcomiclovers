import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';
import env from '../../env';

// using styled-components
import UsersList from './style';

const cookies = new Cookies();
class Users extends Component {
  state = {
    users: [],
    error: '',
  }

  async componentDidMount() {
    const userToken = cookies.get('userToken');

    try {
      const { data: users } = await api.get('users',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
      this.setState({ users });
    } catch (err) {
      this.setState({ error: JSON.stringify(err) });
    }
  }

  render() {
    const { users, error } = this.state;
    return (
      <UsersList>
        <header>
          <h1>Usuários</h1>
          <div>
            <Link to="/users/create" className="button">Adicionar usuário</Link>
          </div>
        </header>
        { error && (
        <Redirect to="/login" />
        )}
        { users.map(user => (
          <article className="user" key={user.id}>
            <div className="user__thumbnail">
              { user.profile_picture && <img src={`${env.baseUrl}/${user.profile_picture}`} alt="" />}
            </div>
            <div className="user__info">
              <div className="user__title">{user.name}</div>
              <div className="user__description">{user.email}</div>
            </div>
          </article>
        ))}
      </UsersList>
    );
  }
}

export default Users;
