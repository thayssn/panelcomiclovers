import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import api from '../../services/api';

// using styled-components
import UsersList from './style';

const cookies = new Cookies();

class Users extends Component {
  state = {
    users: [],
  }

  async componentDidMount() {
    const userToken = cookies.get('userToken');

    const { data: users } = await api.get('users',
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    this.setState({ users });
  }

  render() {
    const { users } = this.state;
    return (
      <UsersList>
        <h1>Usuários</h1>
        { users.map(user => (
          <article className="user" key={user.id}>
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
