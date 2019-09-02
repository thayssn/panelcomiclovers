import React, { Component } from 'react';
import api from '../../services/api';
import EditBookContainer from './style';
import env from '../../env';
// import './New.scss';
const ReactTags = require('react-tag-autocomplete');

class EditBook extends Component {
  state = {
    originalBook: {},
    preview: null,
    image: null,
    isbn: '',
    title: '',
    description: '',
    edition: '',
    price: '',
    pages: 0,
    publishing_date: '',
    format: '',
    illustrators: [],
    writers: [],
    licensors: [],
    publishers: [],
    selectedIllustrators: [],
    selectedWriters: [],
    selectedLicensors: [],
    selectedPublishers: [],
  };

  async componentWillMount() {
    const { match } = this.props;
    const { id } = match.params;
    const { data: book } = await api.get(`books/${id}`);
    this.setState({
      originalBook: book,
      ...book,
      selectedIllustrators: book.illustrators,
      selectedWriters: book.writers,
      selectedLicensors: book.licensors,
      selectedPublishers: book.publishers,
      preview: `${env.baseUrl}/${book.thumbnail}`,
    });
  }

  async componentDidMount() {
    const { data: illustrators } = await api.get('illustrators');
    this.setState({ illustrators });

    const { data: publishers } = await api.get('publishers');
    this.setState({ publishers });

    const { data: writers } = await api.get('writers');
    this.setState({ writers });

    const { data: licensors } = await api.get('licensors');
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
      title,
      description,
      edition,
      price,
      pages,
      publishing_date,
      format,
      selectedIllustrators,
      selectedWriters,
      selectedLicensors,
      selectedPublishers,
    } = this.state;

    const payload = {
    };

    if (isbn !== originalBook.isbn) {
      payload.isbn = isbn;
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
    payload.writers = selectedWriters.map(i => i.id);
    payload.licensors = selectedLicensors.map(i => i.id);
    payload.publishers = selectedPublishers.map(i => i.id);

    data.append('jsonPayload', JSON.stringify(payload));
    data.append('image', image);

    try {
      await api.put(`books/${id}`, data);
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

  render() {
    const {
      isbn, title, description, edition, preview, price,
      pages, publishing_date, format,
      illustrators, writers, licensors, publishers,
      selectedIllustrators, selectedWriters, selectedLicensors, selectedPublishers,
      originalBook,
    } = this.state;

    return (
      <EditBookContainer className="new_post">
        <h1>
          {`Editando - ${originalBook.title}`}
        </h1>
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
          <p>ISBN (obrigatório)</p>
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            onChange={this.handleChange}
            value={isbn}
            required
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

          <p>Edição</p>
          <input
            type="text"
            name="edition"
            placeholder="Edição"
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

          <button type="submit" className="submit">Enviar</button>
        </form>
      </EditBookContainer>
    );
  }
}

export default EditBook;