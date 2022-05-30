import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

export class ExpensesTable extends Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <div className='table-section' >
        <table className='table'>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Moeda de conversão</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda Base</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.currency}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                {(
                  expense.value * expense.exchangeRates[expense.currency].ask
                ).toFixed(2)}
              </td>
              <td>
                Real
              </td>
              <td>
                <button
                  className='table__button'
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => deleteExpense(expense) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.array.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(removeExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
