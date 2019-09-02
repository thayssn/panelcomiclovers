import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import api from '../../services/api';
import CreateCollectionContainer from './style';

const cookies = new Cookies();

class CreateCollection extends Component {
  state = {
    preview: null,
    image: null,
    title: '',
    description: '',
  };

  handleSubmit = async (e) => {
    const userToken = cookies.get('userToken');
    e.preventDefault();

    const { history } = this.props;
    const data = new FormData();

    const {
      image,
      title,
      description,
    } = this.state;

    data.append('title', title);
    data.append('description', description);
    data.append('image', image);
    data.append('type', 'public');

    try {
      await api.post('collections', data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      history.push('/collections');
    } catch (err) {
      alert('Houve um erro ao cadastrar a coleção.');
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
      title, preview, description,
    } = this.state;

    return (
      <CreateCollectionContainer className="new_post">
        <h1>Cadastrar nova coleção</h1>
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
            name="title"
            placeholder="Nome"
            onChange={this.handleChange}
            value={title}
          />

          <input
            type="text"
            name="description"
            placeholder="description"
            onChange={this.handleChange}
            value={description}
          />

          <button type="submit" className="submit">Enviar</button>
        </form>
      </CreateCollectionContainer>
    );
  }
}

export default CreateCollection;
