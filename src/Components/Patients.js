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
      patients: []
    };
  }

  componentDidMount = () => {
    this.fetchPatients();
  }

  fetchPatients = () => {
    axios.get(baseURL + '/api/patients')
    .then((response) => {
      this.setState({
        patients: response.data
      })
    })
    .catch(function (error) {
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

  newPatientHandler = () => {
    this.renderModal(
      <FormModal
        tittle="Novo Paciente"
        element={ { new: true, nome: '', telefone: '' } }
        yesCallback={ (patient) => this.newPatient(patient) }
        noCallback={ () => this.clearModal() }
      />
    )
  }

  editPatientHandler = (patient) => {
    this.renderModal(
      <FormModal
        tittle="Editar Paciente"
        element={ patient }
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
        console.log(error);
      });
    
  }

  newPatient(patient) {
    axios.post(baseURL + '/api/patients', patient)
      .then((response) => {
        this.clearModal();
        this.fetchPatients();
      })
      .catch((error) => {
        console.log(error);
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
              <th><button className="button is-success is-small" onClick={ this.newPatientHandler }>Novo +</button></th>
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