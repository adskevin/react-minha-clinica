import React from 'react';
// import ReactDOM from 'react-dom';
// import {
//   BrowserRouter as 
//   Link
// } from "react-router-dom";

export default class MyNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      showHamburgerMenu: false
    };
  }

  menuButtonHandler = () => {
    console.log('click');
    this.setState({
      showHamburgerMenu: !this.state.showHamburgerMenu
    })
  }

  render () {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/atendimentos">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo"/>
          </a>

          <div role="button" className={ `navbar-burger " ${ this.state.showHamburgerMenu ? "is-active" : "" }` } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ this.menuButtonHandler }>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div id="navbarBasicExample" className={ this.state.showHamburgerMenu ? "navbar-menu is-active" : "navbar-menu" }>
          <div className="navbar-start">
            <a className="navbar-item active" href="/atendimentos">Atendimentos</a>
            <a className="navbar-item" href="/pacientes">Pacientes</a>
            <a className="navbar-item" href="/procedimentos">Procedimentos</a>
            <a className="navbar-item" href="/profissionais">Profissionais</a>
          </div>
        </div>
      </nav>
    )
  }
}