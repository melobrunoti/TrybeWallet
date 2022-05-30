import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, getCurrency } from '../actions';

// references : https://dev.to/antdp425/populate-dropdown-options-in-react-1nk0

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: '',
  tag: '',
};

const PAYMENT_METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const CHOOSE = 'Escolha uma opção';

export class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  handleSubmit = () => {
    const {
      add,
      expenses,
    } = this.props;

    add({
      id: expenses.length,
      ...this.state,
    });

    this.setState({ ...INITIAL_STATE });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies } = this.props;
    return (
      <form className='form' >
        <label className='form__label'  htmlFor="value">
          Valor
          <input
            className='form__input'
            data-testid="value-input"
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label className='form__label' htmlFor="description">
          Descrição
          <input
            className='form__input'
            data-testid="description-input"
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label className='form__label' htmlFor="currency">
          Moedas
          <select
            className='form__select'
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { Object.keys(currencies).filter((curr) => curr !== 'USDT').map((coin) => (
              <option key={ coin } name={ coin } value={ coin }>
                { coin }
              </option>)) }
            getCurrencies
          </select>
        </label>
        <label className='form__label' htmlFor="payment-method">
          Método de pagamento
          <select
            className='form__select'
            data-testid="method-input"
            id="payment-method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="">{CHOOSE}</option>
            { PAYMENT_METHOD.map((m) => (
              <option key={ m } name={ m } value={ m }>
                { m }
              </option>)) }

          </select>
        </label>
        <label className='form__label' htmlFor="tag">
          Categoria
          <select
            className='form__select'
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="">{CHOOSE}</option>
            { TAGS.map((t) => (
              <option key={ t } value={ t }>
                { t }
              </option>)) }

          </select>
        </label>
        <button
          className='form__button'
          type="button"
          onClick={ this.handleSubmit }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

Expenses.propTypes = {
  fetch: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  currencies: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(getCurrency()),
  add: (expense) => dispatch(addExpense(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
