import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import api from '../../services/api';
import EditBookContainer from './style';
import env from '../../env';
// import './New.scss';
const ReactTags = require('react-tag-autocomplete');

const cookies = new Cookies();

class EditBook extends Component {
  state = {
    originalBook: {},
    preview: null,
    image: null,
    isbn: '',
    isbn_10: '',
    title: '',
    description: '',
    edition: '',
    price: '',
    pages: 0,
    publishing_date: '',
    format: '',
    illustrators: [],
    colorists: [],
    writers: [],
    licensors: [],
    publishers: [],
    selectedIllustrators: [],
    selectedColorists: [],
    selectedWriters: [],
    selectedLicensors: [],
    selectedPublishers: [],
  };

  async componentWillMount() {
    const { match, history } = this.props;
    const { id } = match.params;
    const userToken = cookies.get('userToken');

    if (!userToken) history.push('/login');

    const { data: book } = await api.get(`books/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    this.setState({
      originalBook: book,
      ...book,
      isbn_10: book.isbn_10 || '',
      edition: book.edition || '',
      pages: book.pages || 0,
      format: book.format || '',
      description: book.description || '',
      price: book.price || '',
      selectedIllustrators: book.illustrators,
      selectedColorists: book.colorists,
      selectedWriters: book.writers,
      selectedLicensors: book.licensors,
      selectedPublishers: book.publishers,
      publishing_date: book.publishing_date ? book.publishing_date.slice(0, 10) : '',
      preview: `${env.baseUrl}/${book.thumbnail}`,
    });
  }

  async componentDidMount() {
    const userToken = cookies.get('userToken');
    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    const { data: illustrators } = await api.get('illustrators', headers);
    this.setState({ illustrators });

    const { data: colorists } = await api.get('colorists', headers);
    this.setState({ colorists });

    const { data: publishers } = await api.get('publishers', headers);
    this.setState({ publishers });

    const { data: writers } = await api.get('writers', headers);
    this.setState({ writers });

    const { data: licensors } = await api.get('licensors', headers);
    this.setState({ licensors });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { history, match } = this.props;
    const { id } = match.params;
    const data = new FormData();

    const {
      originalBook,
      image,
      isbn,
      isbn_10,
      title,
      description,
      edition,
      price,
      pages,
      publishing_date,
      format,
      selectedIllustrators,
      selectedColorists,
      selectedWriters,
      selectedLicensors,
      selectedPublishers,
    } = this.state;

    const payload = {
    };

    if (isbn !== originalBook.isbn) {
      payload.isbn = isbn;
    }

    if (isbn_10 !== originalBook.isbn_10 && isbn_10 !== '') {
      payload.isbn_10 = isbn_10;
    }

    if (title !== originalBook.title) {
      payload.title = title;
    }
    if (description !== originalBook.description) {
      payload.description = description;
    }
    if (edition !== originalBook.edition) {
      payload.edition = edition;
    }
    if (price !== originalBook.price) {
      payload.price = price;
    }
    if (pages !== originalBook.pages) {
      payload.pages = pages;
    }
    if (publishing_date !== originalBook.publishing_date) {
      payload.publishing_date = publishing_date || null;
    }
    if (format !== originalBook.format) {
      payload.format = format;
    }

    payload.illustrators = selectedIllustrators.map(i => i.id);
    payload.colorists = selectedColorists.map(i => i.id);
    payload.writers = selectedWriters.map(i => i.id);
    payload.licensors = selectedLicensors.map(i => i.id);
    payload.publishers = selectedPublishers.map(i => i.id);

    data.append('jsonPayload', JSON.stringify(payload));
    data.append('image', image);

    try {
      const userToken = cookies.get('userToken');

      await api.put(`books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      history.push(`/books/${id}`);
    } catch (err) {
      console.log(err);
      alert('Houve um erro ao atualizar o quadrinho.');
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

  handleListChange = (currentThing, currentValue) => {
    this.setState(state => ({ ...state, [currentThing]: [...state[currentThing], currentValue] }));
  }

  handleDelete = (i, key) => {
    const { [key]: currentKey } = this.state;
    const selectedValues = currentKey.slice(0);
    selectedValues.splice(i, 1);
    this.setState({ [key]: selectedValues });
  }

  handleAddition = (tag, key) => {
    const { [key]: currentKey } = this.state;
    const selectedValues = [].concat(currentKey, tag);
    this.setState({ [key]: selectedValues });
  }

  handleDeleteBook = async () => {
    try {
      const userToken = cookies.get('userToken');
      const { history, match } = this.props;
      const { id } = match.params;
      const confirmDelete = window.confirm('Tem certeza que deseja deletar?');

      if (confirmDelete) {
        await api.delete(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        history.push('/books');
      }
    } catch (err) {
      alert('Houve um erro ao deletar a coleção.');
    }
  }

  render() {
    const {
      isbn, isbn_10, title, description, edition, preview, price,
      pages, publishing_date, format,
      illustrators, colorists, writers, licensors, publishers,
      selectedIllustrators, selectedColorists, selectedWriters,
      selectedLicensors, selectedPublishers,
      originalBook,
    } = this.state;

    return (
      <EditBookContainer className="new_post">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>
            {`Editando - ${originalBook.title}`}
          </h1>

          <button type="button" onClick={this.handleDeleteBook} className="button danger">
            Deletar Quadrinho
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
          <p>ISBN-13</p>
          <input
            type="text"
            name="isbn"
            placeholder="ISBN-13"
            onChange={this.handleChange}
            value={isbn}
          />

          <p>ISBN-10</p>
          <input
            type="text"
            name="isbn_10"
            placeholder="ISBN-10"
            onChange={this.handleChange}
            value={isbn_10}
          />

          <p>Título (obrigatório)</p>
          <input
            type="text"
            name="title"
            placeholder="Título"
            onChange={this.handleChange}
            value={title}
            required
          />

          <p>Volume</p>
          <input
            type="text"
            name="edition"
            placeholder="Volume"
            onChange={this.handleChange}
            value={edition}
          />

          <p>Número de Páginas</p>
          <input
            type="number"
            name="pages"
            placeholder="Páginas"
            onChange={this.handleChange}
            value={pages}
          />

          <p>Descrição</p>
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            onChange={this.handleChange}
            value={description}
          />

          <p>Data de publicação</p>
          <input
            type="date"
            name="publishing_date"
            placeholder="Data de publicação"
            onChange={this.handleChange}
            value={publishing_date}
          />

          <p>Formato</p>
          <input
            type="text"
            name="format"
            placeholder="Formato"
            onChange={this.handleChange}
            value={format}
          />

          <p>Preço</p>
          <input
            type="number"
            name="price"
            placeholder="Preço. Ex: 13.23"
            onChange={this.handleChange}
            value={price}
            step="0.1"
          />


          <p>Ilustradores</p>
          <ReactTags
            maxSuggestionsLength={50}
            tags={selectedIllustrators}
            suggestions={illustrators}
            handleDelete={i => this.handleDelete(i, 'selectedIllustrators')}
            handleAddition={tag => this.handleAddition(tag, 'selectedIllustrators')}
            autoresize={false}
            minQueryLength={0}
            placeholder="Adicionar ilustrador"
            autofocus={false}
          />

          <p>Coloristas</p>
          <ReactTags
            maxSuggestionsLength={50}
            tags={selectedColorists}
            suggestions={colorists}
            handleDelete={i => this.handleDelete(i, 'selectedColorists')}
            handleAddition={tag => this.handleAddition(tag, 'selectedColorists')}
            autoresize={false}
            minQueryLength={0}
            placeholder="Adicionar colorista"
            autofocus={false}
          />

          <p>Escritores</p>
          <ReactTags
            maxSuggestionsLength={50}
            tags={selectedWriters}
            suggestions={writers}
            handleDelete={i => this.handleDelete(i, 'selectedWriters')}
            handleAddition={tag => this.handleAddition(tag, 'selectedWriters')}
            autoresize={false}
            minQueryLength={0}
            placeholder="Adicionar escritor"
            autofocus={false}
          />

          <p>Licenciantes</p>
          <ReactTags
            maxSuggestionsLength={50}
            tags={selectedLicensors}
            suggestions={licensors}
            handleDelete={i => this.handleDelete(i, 'selectedLicensors')}
            handleAddition={tag => this.handleAddition(tag, 'selectedLicensors')}
            autoresize={false}
            minQueryLength={0}
            placeholder="Adicionar licenciante"
            autofocus={false}
          />

          <p>Editoras</p>
          <ReactTags
            maxSuggestionsLength={50}
            tags={selectedPublishers}
            suggestions={publishers}
            handleDelete={i => this.handleDelete(i, 'selectedPublishers')}
            handleAddition={tag => this.handleAddition(tag, 'selectedPublishers')}
            autoresize={false}
            minQueryLength={0}
            placeholder="Adicionar editora"
            autofocus={false}
          />

          <button type="submit" className="submit button">Salvar</button>
        </form>
      </EditBookContainer>
    );
  }
}

export default EditBook;
