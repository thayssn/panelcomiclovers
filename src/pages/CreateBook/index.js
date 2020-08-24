import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import api from '../../services/api';
import CreateBookContainer from './style';
// import './New.scss';
const ReactTags = require('react-tag-autocomplete');

const cookies = new Cookies();

class CreateBook extends Component {
  state = {
    redirect: false,
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
    showIllustratorModal: false,
    illustratorName: '',
    showColoristModal: false,
    coloristName: '',
    showWriterModal: false,
    writerName: '',
    showPublisherModal: false,
    publisherName: '',
    showLicensorModal: false,
    licensorName: '',
    type: 'Quadrinho',
  };

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
    const userToken = cookies.get('userToken');
    if (!userToken) {
      (
        this.setState({ redirect: true })
      );
    }

    e.preventDefault();

    const { history } = this.props;
    const data = new FormData();

    const {
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
      type,
    } = this.state;

    const payload = {
      isbn,
      isbn_10: isbn_10 || null,
      title,
      edition,
      description,
      price,
      pages,
      publishing_date: publishing_date || null,
      format,
      illustrators: selectedIllustrators.map(i => i.id),
      colorists: selectedColorists.map(i => i.id),
      writers: selectedWriters.map(i => i.id),
      licensors: selectedLicensors.map(i => i.id),
      publishers: selectedPublishers.map(i => i.id),
      status: 'Aprovado',
      type,
    };

    data.append('jsonPayload', JSON.stringify(payload));

    data.append('image', image);

    try {
      await api.post('books', data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      history.push('/books');
    } catch (err) {
      alert('Houve um erro ao cadastrar o quadrinho.');
    }
  }

  handleFileChange = (e) => {
    if (e.target.files.length) {
      this.setState({ image: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) });
    }
  }

  handleChange = (e) => {
    console.log(e.target.value);
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

  createIllustrator = async () => {
    const {
      illustratorName,
      selectedIllustrators,
      illustrators,
    } = this.state;

    try {
      const { data: illustrator } = await api.post('illustrators', { name: illustratorName });
      this.setState({
        showIllustratorModal: false,
        illustratorName: '',
        selectedIllustrators: [...selectedIllustrators, illustrator],
        illustrators: [...illustrators, illustrator],
      });
    } catch (err) {
      console.log(err);
      alert('Houve um erro ao cadastrar um ilustrador');
      this.setState({ showIllustratorModal: false });
    }
  }

  createColorist = async () => {
    const {
      coloristName,
      selectedColorists,
      colorists,
    } = this.state;

    try {
      const { data: colorist } = await api.post('colorists', { name: coloristName });
      this.setState({
        showColoristModal: false,
        coloristName: '',
        selectedColorists: [...selectedColorists, colorist],
        colorists: [...colorists, colorist],
      });
    } catch (err) {
      console.log(err);
      alert('Houve um erro ao cadastrar um colorista');
      this.setState({ showColoristModal: false });
    }
  }

  createWriter = async () => {
    const {
      writerName,
      selectedWriters,
      writers,
    } = this.state;

    try {
      const { data: writer } = await api.post('writers', { name: writerName });
      this.setState({
        showWriterModal: false,
        writerName: '',
        selectedWriters: [...selectedWriters, writer],
        writers: [...writers, writer],
      });
    } catch (err) {
      console.log(err);
      alert('Houve um erro ao cadastrar um escritor');
      this.setState({ showWriterModal: false });
    }
  }

  createPublisher = async () => {
    const {
      publisherName,
      selectedPublishers,
      publishers,
    } = this.state;

    try {
      const { data: publisher } = await api.post('publishers', { name: publisherName });
      this.setState({
        showPublisherModal: false,
        publisherName: '',
        selectedPublishers: [...selectedPublishers, publisher],
        publishers: [...publishers, publisher],
      });
    } catch (err) {
      console.log(err);
      alert('Houve um erro ao cadastrar uma editora');
      this.setState({ showPublisherModal: false });
    }
  }

  createLicensor = async () => {
    const {
      licensorName,
      selectedLicensors,
      licensors,
    } = this.state;

    try {
      const { data: licensor } = await api.post('licensors', { name: licensorName });
      this.setState({
        showLicensorModal: false,
        licensorName: '',
        selectedLicensors: [...selectedLicensors, licensor],
        licensors: [...licensors, licensor],
      });
    } catch (err) {
      console.log(err);
      alert('Houve um erro ao cadastrar um licenciante');
      this.setState({ showLicensorModal: false });
    }
  }

  render() {
    const {
      redirect,
      isbn, isbn_10, title, description, edition, preview, price,
      pages, publishing_date, format,
      illustrators, colorists, writers, licensors, publishers,
      selectedIllustrators, selectedColorists, selectedWriters,
      selectedLicensors, selectedPublishers,
      showIllustratorModal, illustratorName,
      showColoristModal, coloristName,
      showWriterModal, writerName,
      showPublisherModal, publisherName,
      showLicensorModal, licensorName, type,
    } = this.state;

    return (
      <CreateBookContainer className="new_post">
        {redirect && <Redirect to="/login" />}
        <h1>Cadastrar novo quadrinho</h1>
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

          <p>Tipo</p>
          <select
            name="type"
            placeholder="Selecione"
            onChange={this.handleChange}
            value={type}
          >
            <option value="Quadrinho">Quadrinho</option>
            <option value="Mangá">Mangá</option>
          </select>

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
            step="0.01"
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
          {showIllustratorModal ? (
            <div className="Modal">
              <input
                type="text"
                name="illustratorName"
                placeholder="Novo Ilustrador"
                onChange={this.handleChange}
                value={illustratorName}
              />
              <button type="button" className="button button--small" onClick={this.createIllustrator}>Cadastrar </button>
            </div>
          ) : (
            <button
              type="button"
              className="button button--small"
              onClick={() => { this.setState({ showIllustratorModal: !showIllustratorModal }); }}
            >
            Criar Novo Ilustrador
            </button>
          ) }

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
          {showColoristModal ? (
            <div className="Modal">
              <input
                type="text"
                name="coloristName"
                placeholder="Novo Colorista"
                onChange={this.handleChange}
                value={coloristName}
              />
              <button type="button" className="button button--small" onClick={this.createColorist}>Cadastrar </button>
            </div>
          ) : (
            <button
              type="button"
              className="button button--small"
              onClick={() => { this.setState({ showColoristModal: !showColoristModal }); }}
            >
            Criar Novo Colorista
            </button>
          ) }

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


          {showWriterModal ? (
            <div className="Modal">
              <input
                type="text"
                name="writerName"
                placeholder="Novo Escritor"
                onChange={this.handleChange}
                value={writerName}
              />
              <button type="button" className="button button--small" onClick={this.createWriter}>Cadastrar </button>
            </div>
          ) : (
            <button
              type="button"
              className="button button--small"
              onClick={() => { this.setState({ showWriterModal: !showWriterModal }); }}
            >
            Criar Novo Escritor
            </button>
          ) }

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

          {showLicensorModal ? (
            <div className="Modal">
              <input
                type="text"
                name="licensorName"
                placeholder="Novo Licenciante"
                onChange={this.handleChange}
                value={licensorName}
              />
              <button type="button" className="button button--small" onClick={this.createLicensor}>Cadastrar </button>
            </div>
          ) : (
            <button
              type="button"
              className="button button--small"
              onClick={() => { this.setState({ showLicensorModal: !showLicensorModal }); }}
            >
            Criar Novo Licenciante
            </button>
          ) }

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

          {showPublisherModal ? (
            <div className="Modal">
              <input
                type="text"
                name="publisherName"
                placeholder="Nova Editora"
                onChange={this.handleChange}
                value={publisherName}
              />
              <button type="button" className="button button--small" onClick={this.createPublisher}>Cadastrar </button>
            </div>
          ) : (
            <button
              type="button"
              className="button button--small"
              onClick={() => { this.setState({ showPublisherModal: !showPublisherModal }); }}
            >
            Criar Nova Editora
            </button>
          ) }
          <div className="inputgroup">
            <button type="submit" className="submit button">Enviar</button>
          </div>
        </form>
      </CreateBookContainer>
    );
  }
}

export default CreateBook;
