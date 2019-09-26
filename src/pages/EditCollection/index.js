import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import api from '../../services/api';
import EditCollectionContainer from './style';
import env from '../../env';

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


  async componentWillMount() {
    const userToken = cookies.get('userToken');
    if (!userToken) {
      this.setState({ error: { code: 401 } });
    }

    const { match } = this.props;
    const { id } = match.params;
    const { data: collection } = await api.get(`public/collections/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });


    console.log({ ...collection });
    this.setState({
      originalCollection: collection,
      ...collection,
      preview: `${env.baseUrl}/${collection.thumbnail}`,
    });
  }

  handleSubmit = async (e) => {
    const userToken = cookies.get('userToken');
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
      console.log(err);
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

  render() {
    const {
      title, description, preview,
      originalCollection, error,
    } = this.state;

    return (
      <EditCollectionContainer className="new_post">
        <h1>
          {`Editando - ${originalCollection.title}`}
        </h1>
        { error && error.code === 401 && (
          <Redirect to="/login" />
        )}
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

          <button type="submit" className="submit">Enviar</button>
        </form>
      </EditCollectionContainer>
    );
  }
}

export default EditCollection;
