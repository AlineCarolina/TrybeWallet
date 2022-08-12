import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../images/logo.png'
import svgUser from '../images/user-icon.svg'
import '../styles/Header.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
    };
  }

  render() {
    const { email, expenses } = this.props;
    const { currency } = this.state;
    const totalExpenses = expenses
      .reduce((acc, {
        value,
        currency,
        exchangeRates,
      }) => acc + (value * exchangeRates[currency].ask), 0);
    return (
      <header className='header'>
        <div>
          <img src={logo} alt='logo' id='min-logo-img'/>
        </div>
        <div>
          <span>Total:</span>
          { (totalExpenses).toFixed(2) }
        </div>
        <div>
          <span>Currency:</span>
          {currency}
        </div>
        <div id='div-user'>
          <img src={svgUser} alt='svgUser' className='svgUser'/>
          {email}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
