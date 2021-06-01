import React from 'react';
import ConfirmationModal from './ConfirmationModal';
import FormModal from './FormModal';
import ReactDOM from 'react-dom';
const axios = require('axios').default;
const baseURL = 'http://127.0.0.1:8000';

export default class Procedures extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      procedures: [],
      isLoading: true,
      fetchError: false
    };
  }

  componentDidMount = () => {
    this.fetchProcedures();
  }

  fetchProcedures = () => {
    this.setState({ isLoading: true });
    axios.get(baseURL + '/api/procedures')
    .then((response) => {
      this.setState({
        procedures: response.data,
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

  placeProcedures = () => {
    if(this.state.isLoading) {
      return (
        <tr>
          <td colSpan="3">Carregando procedimentos...</td>
        </tr>
      )
    }
    if(this.state.fetchError) {
      return (
        <tr>
          <td colSpan="3">Erro ao carregar os procedimentos</td>
        </tr>
      )
    }
    return this.state.procedures.map((element) => {
      return (
        <tr key={ element.id }>
          <td>{ element.nome }</td>
          <td>{ 'R$ ' + element.custo }</td>
          <td>
            <div className="buttons is-centered">
              <button className="button is-warning is-small" onClick={ () => this.editProcedureHandler(element) }>Editar</button>
              <button className="button is-danger is-small" onClick={ () => this.deleteConfirmationProcedureHandler(element.id) }>Excluir</button>
            </div>
          </td>
        </tr>
      );
    })
  }

  newProcedureHandler = (element = { nome: '', custo: '' }, saveError = false) => {
    this.renderModal(
      <FormModal
        tittle="Novo Procedimento"
        element={ element }
        saveError={ saveError }
        yesCallback={ (procedure) => this.newProcedure(procedure) }
        noCallback={ () => this.clearModal() }
      />
    )
  }

  editProcedureHandler = (procedure, saveError = false) => {
    this.renderModal(
      <FormModal
        tittle="Editar Procedimento"
        element={ procedure }
        saveError={ saveError }
        yesCallback={ (procedure) => this.saveProcedure(procedure) }
        noCallback={ () => this.clearModal() }
      />
    )
  }

  saveProcedure(procedure) {
    axios.put(baseURL + '/api/procedures/' + procedure.id, procedure)
      .then((response) => {
        this.clearModal();
        this.fetchProcedures();
      })
      .catch((error) => {
        this.clearModal();
        const saveError = true;
        this.editProcedureHandler(procedure, saveError);
      });
    
  }

  newProcedure(procedure) {
    axios.post(baseURL + '/api/procedures', procedure)
      .then((response) => {
        this.clearModal();
        this.fetchProcedures();
      })
      .catch((error) => {
        this.clearModal();
        const saveError = true;
        this.newProcedureHandler(procedure, saveError);
      });
    
  }

  deleteConfirmationProcedureHandler = (id) => {
    ReactDOM.render(
      <ConfirmationModal
        type="is-danger"
        message="Deseja excluir este procedimento?"
        yesCallback={ () => this.deleteProcedure(id) }
        noCallback={ () => this.clearModal() }
      />,
      document.getElementById('modal')
    );
  }

  deleteProcedure = (id) => {
    axios.delete(baseURL + '/api/procedures/' + id)
      .then((response) => {
        this.clearModal();
        this.fetchProcedures();
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
        <h1 className="title">Procedimentos</h1>
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Custo</th>
              <th><button className="button is-success is-small" onClick={ () => this.newProcedureHandler() }>Novo +</button></th>
            </tr>
          </thead>
          <tbody>
            { this.placeProcedures() }
          </tbody>
        </table>
      </section>
    )
  }
}