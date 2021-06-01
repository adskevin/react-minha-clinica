import React from 'react';

export default class EditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      element: {}
    };
  }

  componentDidMount = () => {
    this.setState({
      element: this.props.element
    })
  }

  placeName = () => {
    if((this.state.element && this.state.element.nome) || this.state.element.new) {
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
    if((this.state.element && this.state.element.telefone) || this.state.element.new) {
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

  placeFields = () => {
    return (
      <>
        { this.placeName() }
        { this.placePhone() }
      </>
    );
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
            <form>
              { this.placeFields() }
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={ () => this.props.yesCallback(this.state.element) }>Salvar</button>
            <button className="button is-danger" onClick={ this.props.noCallback }>Cancel</button>
          </footer>
        </div>
      </div>
    )
  }
}
