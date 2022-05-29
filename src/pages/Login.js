import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = () => {
    const { login, history } = this.props;
    const { email } = this.state;

    login(email);
    history.push('/carteira');
  };

  userValidate(email, password) {
    const PASSWORD_MAX_LENGTH = 6;
    return (
      email.includes('@') && email.endsWith('.com')
      && password.length >= PASSWORD_MAX_LENGTH
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='login-page' >
        <div className='login'>
          <div className='login__box'>
            <h1 className='login__title' >Trybe Wallet</h1>
            <input
              className='login__input'
              data-testid="email-input"
              placeholder='email'
              type="text"
              value={ email }
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
            <input
              className='login__input'
              data-testid="password-input"
              placeholder='password'
              value={ password }
              type="password"
              onChange={ (e) => this.setState({ password: e.target.value }) }
            />
            <button
              className='login__button'
              type="button"
              disabled={ !this.userValidate(email, password) }
              onClick={ this.handleLogin }
            >
            Entrar
            </button>
            </div>
          </div>
        <div className='login-wallet-box'> 
      </div>
    </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
