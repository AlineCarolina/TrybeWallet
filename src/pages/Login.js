import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmailValue } from '../actions';
import logo from './images/logo.png'
import '../styles/Login.css'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  };

  clickSubmit = () => {
    const { email } = this.state;
    const { dispatchSet, history } = this.props;
    dispatchSet(email);
    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    const MAXLENGTH = 6;
    const validateEmail = /\S+@\S+\.\S+/.test(email);
    return (
      <fieldset className='fieldset'>
        <form className='form'>
          <img src={logo}/>
          <label htmlFor="email">
            <input
              className='input'
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              className='input'
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
        </form>
        <button
          className='button'
          type="submit"
          disabled={ !validateEmail || password.length < MAXLENGTH }
          onClick={ this.clickSubmit }
        >
          LOGIN
        </button>
      </fieldset>

    );
  }
};

Login.propTypes = {
  dispatchSet: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSet: (email) => dispatch(setEmailValue(email)),
}
);

export default connect(null, mapDispatchToProps)(Login);
