import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Header extends Component {
  totalExpenses = () => {
    const { total } = this.props;
    if (total.length === 0) {
      return 0;
    }
    return total.reduce((acc, cur) => {
      const { value, currency, exchangeRates } = cur;
      return acc + (exchangeRates[currency].ask * value);
    }, 0).toFixed(2);
  };

  render() {
    const { userLogin } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ userLogin }</p>
        <p data-testid="total-field">
          { this.totalExpenses() }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  total: PropTypes.string.isRequired,
  userLogin: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userLogin: state.user.email,
  total: state.wallet.expenses });

export default connect(mapStateToProps, null)(Header);
