import React from 'react';
import ConfirmationModal from './ConfirmationModal';
import FormModal from './FormModal';
import ReactDOM from 'react-dom';
const axios = require('axios').default;
const baseURL = 'http://127.0.0.1:8000';

export default class Professionals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      professionals: [],
      isLoading: true,
      fetchError: false
    };
  }

  componentDidMount = () => {
    this.fetchProfessionals();
  }

  fetchProfessionals = () => {
    this.setState({ isLoading: true });
    axios.get(baseURL + '/api/professionals')
    .then((response) => {
      this.setState({
        professionals: response.data,
        isLoading: false
      })
    })
    .catch((error) => {
      this.setState({
        isLoading: false,
        fetchError: true
      })
      console.log(error);
    });
  }

  renderModal(element) {
    ReactDOM.render(
      element,
      document.getElementById('modal')
    );
  }

  clearModal = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('modal'));
  }

  placeProfessionals = () => {
    if(this.state.isLoading) {
      return (
        <tr>
          <td colSpan="3">Carregando profissionais...</td>
        </tr>
      )
    }
    if(this.state.fetchError) {
      return (
        <tr>
          <td colSpan="3">Erro ao carregar os profissionais</td>
        </tr>
      )
    }
    return this.state.professionals.map((element) => {
      return (
        <tr key={ element.id }>
          <td>{ element.nome }</td>
          <td>{ element.cargo }</td>
          <td>
            <div className="buttons is-centered">
              <button className="button is-warning is-small" onClick={ () => this.editProfessionalHandler(element) }>Editar</button>
              <button className="button is-danger is-small" onClick={ () => this.deleteConfirmationProfessionalHandler(element.id) }>Excluir</button>
            </div>
          </td>
        </tr>
      );
    })
  }

  newProfessionalHandler = (element = { nome: '', cargo: '' }, saveError = false) => {
    this.renderModal(
      <FormModal
        tittle="Novo Profissional"
        element={ element }
        saveError={ saveError }
        yesCallback={ (professional) => this.newProfessional(professional) }
        noCallback={ () => this.clearModal() }
      />
    )
  }

  editProfessionalHandler = (professional, saveError = false) => {
    this.renderModal(
      <FormModal
        tittle="Editar Profissional"
        element={ professional }
        saveError={ saveError }
        yesCallback={ (professional) => this.saveProfessional(professional) }
        noCallback={ () => this.clearModal() }
      />
    )
  }

  saveProfessional(professional) {
    axios.put(baseURL + '/api/professionals/' + professional.id, professional)
      .then((response) => {
        this.clearModal();
        this.fetchProfessionals();
      })
      .catch((error) => {
        this.clearModal();
        const saveError = true;
        this.editProfessionalHandler(professional, saveError);
      });
    
  }

  newProfessional(professional) {
    axios.post(baseURL + '/api/professionals', professional)
      .then((response) => {
        this.clearModal();
        this.fetchProfessionals();
      })
      .catch((error) => {
        this.clearModal();
        const saveError = true;
        this.newProfessionalHandler(professional, saveError);
      });
    
  }

  deleteConfirmationProfessionalHandler = (id) => {
    ReactDOM.render(
      <ConfirmationModal
        type="is-danger"
        message="Deseja excluir este profissional?"
        yesCallback={ () => this.deleteProfessional(id) }
        noCallback={ () => this.clearModal() }
      />,
      document.getElementById('modal')
    );
  }

  deleteProfessional = (id) => {
    axios.delete(baseURL + '/api/professionals/' + id)
      .then((response) => {
        this.clearModal();
        this.fetchProfessionals();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  cancelDelete = () => {
    this.clearModal();
  }



  render () {
    return (
      <section className="section">
        <h1 className="title">Profissionais</h1>
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th><button className="button is-success is-small" onClick={ () => this.newProfessionalHandler() }>Novo +</button></th>
            </tr>
          </thead>
          <tbody>
            { this.placeProfessionals() }
          </tbody>
        </table>
      </section>
    )
  }
}