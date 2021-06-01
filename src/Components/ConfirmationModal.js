import React from 'react';

export default class ConfirmationModal extends React.Component {
  render () {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
          <div className="modal-content">
            <div className={ "message " + this.props.type }>
            <div className="message-header">
              <p>Atenção!</p>
            </div>
            <div className="message-body">
              <p><strong>{ this.props.message }</strong></p>
              <br/>
              <div className="buttons is-centered">
                <button className="button is-success" onClick={ this.props.yesCallback }>Sim</button>
                <button className="button is-danger" onClick={ this.props.noCallback }>Não</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
