import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  getPrice = () => {
    const { exchanges } = this.props;
    const prices = exchanges
      .map((exchange) => ({
        value: exchange.value,
        price: exchange.exchangeRates[exchange.currency].ask,
      }));
    const multiplied = prices.map((ele) => Number((ele.value * ele.price).toFixed(2)));
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalValue = multiplied.reduce(reducer, 0);
    return totalValue;
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">{`Despesa: R$${this.getPrice()}`}</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  exchanges: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;
