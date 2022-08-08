import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getValueThunk, addExpense } from '../actions';
import '../styles/Form.css'
import { getValue } from '../services/api';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: null,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleClick = async (e) => {
    e.preventDefault();
    const { addExpense } = this.props;
    const exchangeRates = await getValue();
    this.setState({ exchangeRates, });
    addExpense(this.state);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form className='wallet-form'>
        <label htmlFor="valor">
          Valor:
          <input type="text" name="value" id="valor" onChange={ this.handleChange } value={ value } />
        </label>
        <label htmlFor="describe">
          Descrição:
          <input
            type="text"
            name="description"
            id="describe"
            onChange={ this.handleChange }
            value={ description } 
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select name="currency" id="currency" onChange={ this.handleChange }>
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>{ currency }</option>))}
          </select>
        </label>
        <label htmlFor="pag">
          Método de pagamento:
          <select name="method" id="pag" onChange={ this.handleChange }>
            {methods.map((method, index) => (
              <option value={ method } key={ index }>{method}</option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag" onChange={ this.handleChange }>
            {tags.map((tag, index) => (
              <option value={ tag } key={ index }>{tag}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getValueThunk()),
  addExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
