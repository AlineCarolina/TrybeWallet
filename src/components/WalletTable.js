import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, toggleEditMode } from '../actions';
import '../styles/WalletTable.css'

class WalletTable extends React.Component {
  formatMonetaryValue(strOrNumber) {
    return `${Number(strOrNumber).toFixed(2)}`;
  }

  convertToBRL(exchangeRates, currency, value) {
    return (exchangeRates[currency].ask * value);
  }

  renderExpenseRow(
    { id, description, tag, method, value, currency, exchangeRates },
  ) {
    const { setRemoveExpense, setEditMode } = this.props;
    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name.split('/')[0] }</td>
        <td>{ this.formatMonetaryValue(exchangeRates[currency].ask) }</td>
        <td>
          { this.formatMonetaryValue(
            this.convertToBRL(exchangeRates, currency, value),
          ) }
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            id="edit-btn"
            className='button-edit-del'
            onClick={ () => setEditMode(id) }
          >
            Editar
          </button>
          <button
            type="button"
            id="delete-btn"
            className='button-edit-del'
            onClick={ () => setRemoveExpense(id) }
          >
            Remover
          </button>
        </td>
      </tr>
    );
  }
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
        { expenses.map((expense) => this.renderExpenseRow(expense)) }
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setRemoveExpense: (id) => dispatch(removeExpense(id)) ,
  setEditMode: (id) => dispatch(toggleEditMode(id)),
});


WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setRemoveExpense: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
