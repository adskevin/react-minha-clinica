import React from 'react';

export default class EditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      element: {},
      saving: false
    };
  }

  componentDidMount = () => {
    this.setState({
      element: this.props.element
    })
  }

  placeName = () => {
    if((this.state.element && this.state.element.nome) || this.state.element.nome === '') {
      return (
        <div className="field">
          <label className="label">Nome</label>
          <div className="control">
            <input className="input" type="text" value={ this.state.element.nome } onChange={ this.nameChangeHandler } />
          </div>
        </div>
      )
    }
    return null;
  }

  nameChangeHandler = (e) => {
    let elementToUpdate = this.state.element;
    elementToUpdate.nome = e.target.value;
    this.setState({
      element: elementToUpdate
    })
  }
  
  placePhone = () => {
    if((this.state.element && this.state.element.telefone) ||  this.state.element.telefone === '') {
      return (
        <div className="field">
          <label className="label">Telefone</label>
          <div className="control">
            <input className="input" type="number" value={ this.state.element.telefone } onChange={ this.phoneChangeHandler } />
          </div>
        </div>
      )
    }
    return null;
  }

  phoneChangeHandler = (e) => {
    let elementToUpdate = this.state.element;
    elementToUpdate.telefone = e.target.value;
    this.setState({
      element: elementToUpdate
    })
  }

  placePosition = () => {
    if((this.state.element && this.state.element.cargo) || this.state.element.cargo === '') {
      return (
        <div className="field">
          <label className="label">Cargo</label>
          <div className="control">
            <input className="input" type="text" value={ this.state.element.cargo } onChange={ this.positionChangeHandler } />
          </div>
        </div>
      )
    }
    return null;
  }

  positionChangeHandler = (e) => {
    let elementToUpdate = this.state.element;
    elementToUpdate.cargo = e.target.value;
    this.setState({
      element: elementToUpdate
    })
  }

  placeCost = () => {
    if((this.state.element && this.state.element.custo) || this.state.element.custo === '') {
      return (
        <div className="field">
          <label className="label">Custo - R$</label>
          <div className="control">
            <input className="input" type="text" value={ this.state.element.custo } onChange={ this.costChangeHandler } />
          </div>
        </div>
      )
    }
    return null;
  }

  costChangeHandler = (e) => {
    let elementToUpdate = this.state.element;
    elementToUpdate.custo = e.target.value;
    this.setState({
      element: elementToUpdate
    })
  }

  placeFields = () => {
    return (
      <>
        { this.placeName() }
        { this.placePhone() }
        { this.placePosition() }
        { this.placeCost() }
      </>
    );
  }

  placeError = () => {
    if(this.props.saveError) {
      return (
        <div className="is-flex message is-danger">
          <div className="message-body">
            <p><strong>Erro ao salvar</strong></p>
          </div>
        </div>
      )
    }
  }

  yesCallbackHandler = () => {
    this.setState({
      saving: true
    })
    this.props.yesCallback(this.state.element);
  }

  render () {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{ this.props.tittle }</p>
            <button className="delete" aria-label="close" onClick={ this.props.noCallback }></button>
          </header>
          <section className="modal-card-body">
            { this.placeError() }
            <form>
              { this.placeFields() }
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className={ `button is-success " ${ this.state.saving ? "is-loading" : "" }` } onClick={ this.yesCallbackHandler  }>Salvar</button>
            <button className="button is-danger" onClick={ this.props.noCallback }>Cancelar</button>
          </footer>
        </div>
      </div>
    )
  }
}
