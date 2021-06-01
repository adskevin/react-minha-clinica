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
      procedures: []
    };
  }

  componentDidMount = () => {
    this.fetchProcedures();
  }

  fetchProcedures = () => {
    axios.get(baseURL + '/api/procedures')
    .then((response) => {
      this.setState({
        procedures: response.data
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

  placeProcedures = () => {
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

  newProcedureHandler = () => {
    this.renderModal(
      <FormModal
        tittle="Novo Procedimento"
        element={ { nome: '', custo: '' } }
        yesCallback={ (procedure) => this.newProcedure(procedure) }
        noCallback={ () => this.clearModal() }
      />
    )
  }

  editProcedureHandler = (procedure) => {
    this.renderModal(
      <FormModal
        tittle="Editar Procedimento"
        element={ procedure }
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
        console.log(error);
      });
    
  }

  newProcedure(procedure) {
    axios.post(baseURL + '/api/procedures', procedure)
      .then((response) => {
        this.clearModal();
        this.fetchProcedures();
      })
      .catch((error) => {
        console.log(error);
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
              <th><button className="button is-success is-small" onClick={ this.newProcedureHandler }>Novo +</button></th>
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