import React from 'react';
import ConfirmationModal from './ConfirmationModal';
import FormModal from './FormModal';
import ReactDOM from 'react-dom';
const axios = require('axios').default;
const baseURL = 'http://127.0.0.1:8000';

export default class Patients extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      isLoading: true,
      fetchError: false
    };
  }

  componentDidMount = () => {
    this.fetchPatients();
  }

  fetchPatients = () => {
    this.setState({ isLoading: true });
    axios.get(baseURL + '/api/patients')
    .then((response) => {
      this.setState({
        patients: response.data,
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

  placePatients = () => {
    if(this.state.isLoading) {
      return (
        <tr>
          <td colSpan="3">Carregando pacientes...</td>
        </tr>
      )
    }
    if(this.state.fetchError) {
      return (
        <tr>
          <td colSpan="3">Erro ao carregar os pacientes</td>
        </tr>
      )
    }
    return this.state.patients.map((element) => {
      return (
        <tr key={ element.id }>
          <td>{ element.nome }</td>
          <td>{ element.telefone }</td>
          <td>
            <div className="buttons is-centered">
              <button className="button is-warning is-small" onClick={ () => this.editPatientHandler(element) }>Editar</button>
              <button className="button is-danger is-small" onClick={ () => this.deleteConfirmationPatientHandler(element.id) }>Excluir</button>
            </div>
          </td>
        </tr>
      );
    })
  }

  newPatientHandler = (element = { nome: '', telefone: '' }, saveError = false) => {
    this.renderModal(
      <FormModal
        tittle="Novo Paciente"
        element={ element }
        saveError={ saveError }
        yesCallback={ (patient) => this.newPatient(patient) }
        noCallback={ () => this.clearModal() }
      />
    )
  }

  editPatientHandler = (patient, saveError = false) => {
    this.renderModal(
      <FormModal
        tittle="Editar Paciente"
        element={ patient }
        saveError={ saveError }
        yesCallback={ (patient) => this.savePatient(patient) }
        noCallback={ () => this.clearModal() }
      />
    )
  }

  savePatient(patient) {
    axios.put(baseURL + '/api/patients/' + patient.id, patient)
      .then((response) => {
        this.clearModal();
        this.fetchPatients();
      })
      .catch((error) => {
        this.clearModal();
        const saveError = true;
        this.editPatientHandler(patient, saveError);
      });
    
  }

  newPatient(patient) {
    axios.post(baseURL + '/api/patients', patient)
      .then((response) => {
        this.clearModal();
        this.fetchPatients();
      })
      .catch((error) => {
        this.clearModal();
        const saveError = true;
        this.newPatientHandler(patient, saveError);
      });
    
  }

  deleteConfirmationPatientHandler = (id) => {
    ReactDOM.render(
      <ConfirmationModal
        type="is-danger"
        message="Deseja excluir este paciente?"
        yesCallback={ () => this.deletePatient(id) }
        noCallback={ () => this.clearModal() }
      />,
      document.getElementById('modal')
    );
  }

  deletePatient = (id) => {
    axios.delete(baseURL + '/api/patients/' + id)
      .then((response) => {
        this.clearModal();
        this.fetchPatients();
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
        <h1 className="title">Pacientes</h1>
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th><button className="button is-success is-small" onClick={ () => this.newPatientHandler() }>Novo +</button></th>
            </tr>
          </thead>
          <tbody>
            { this.placePatients() }
          </tbody>
        </table>
      </section>
    )
  }
}