import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import api from '../../services/api';
import EditCollectionContainer from './style';
import env from '../../env';
import { getUserToken } from '../../services/auth';

const cookies = new Cookies();

class EditCollection extends Component {
  state = {
    originalCollection: {},
    preview: null,
    image: null,
    title: '',
    description: '',
    error: null,
  };


  async componentDidMount() {
    const userToken = getUserToken();
    const { match } = this.props;
    const { id } = match.params;
    const { data: collection } = await api.get(`public/collections/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    this.setState({
      originalCollection: collection,
      ...collection,
      preview: `${env.baseUrl}/${collection.thumbnail}`,
    });
  }

  handleSubmit = async (e) => {
    const userToken = getUserToken();
    e.preventDefault();

    const { history, match } = this.props;
    const { id } = match.params;
    const data = new FormData();

    const {
      originalCollection,
      image,
      title,
      description,
    } = this.state;

    if (title !== originalCollection.title) {
      data.append('title', title);
    }
    if (description !== originalCollection.description) {
      data.append('description', description);
    }

    data.append('image', image);

    try {
      await api.put(`public/collections/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      history.push(`/collections/${id}`);
    } catch (err) {
      alert('Houve um erro ao atualizar a coleção.');
    }
  }

  handleFileChange = (e) => {
    this.setState({ image: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleBlur = (e) => {
    e.target.value = '';
    this.setState({ [e.target.name]: '' });
  }

  handleDelete = async () => {
    try {
      const userToken = cookies.get('userToken');

      const { history, match } = this.props;
      const { id } = match.params;
      const confirmDelete = window.confirm('Tem certeza que deseja deletar?');

      if (confirmDelete) {
        await api.delete(`/public/collections/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        history.push('/collections');
      }
    } catch (err) {
      alert('Houve um erro ao deletar a coleção.');
    }
  }

  render() {
    const {
      title, description, preview,
      originalCollection, error,
    } = this.state;

    return (
      <EditCollectionContainer className="new_post">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>
            {`Editando - ${originalCollection.title}`}
          </h1>

          <button type="button" onClick={this.handleDelete} className="button danger">
            Deletar Coleção
          </button>
        </div>
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

          <p>Título</p>
          <input
            type="text"
            name="title"
            placeholder="Título"
            onChange={this.handleChange}
            value={title}
            required
          />
          <p>Descrição</p>
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            onChange={this.handleChange}
            value={description}
          />

          <button type="submit" className="button">Salvar</button>
        </form>
      </EditCollectionContainer>
    );
  }
}

export default EditCollection;
