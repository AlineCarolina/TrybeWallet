import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getValueThunk, addExpense } from '../actions';
import '../styles/Form.css'
import { getValue } from '../services/api';
import seta from '../images/seta.png'

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
  };

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { addExpense } = this.props;
    const exchangeRates = await getValue();
    this.setState({ exchangeRates, });
    addExpense(this.state);
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div id='pricipal-div-form'>
        <h1 id='h1-form'>Adicione suas despesas</h1>
        <form className='wallet-form'>
          <div id='div-in-form'>
            <label htmlFor="valor">
              Valor:
              <input
                type="number"
                min="1.00"
                max="10000.00"
                step="0.50"
                name="value"
                id="valor"
                onChange={ this.handleChange }
                value={ value }
                className="style-input"
              />
            </label>
            <label htmlFor="describe">
              Descrição:
              <input
                type="text"
                name="description"
                id="describe"
                onChange={ this.handleChange }
                value={ description }
                className="style-input"
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
          </div>
          <img type="button" src={seta} onClick={ this.handleClick } id="button-add" alt='img-next'/>
        </form>
      </div>
    );
  }
};

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
