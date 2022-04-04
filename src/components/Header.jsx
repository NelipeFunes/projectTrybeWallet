import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  getPrice = () => {
    const { exchanges } = this.props;
    const prices = exchanges
      .map((exchange) => ({
        value: exchange.value,
        price: exchange.exchangeRates[exchange.currency].ask,
      }));
    const multiplied = prices.map((ele) => Number(ele.value * ele.price));
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalValue = multiplied.reduce(reducer, 0);
    return totalValue.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div className="Header">
        <h3 data-testid="email-field">{`Email: ${email} `}</h3>
        <h3 data-testid="header-currency-field">Moeda: BRL</h3>
        <h3 data-testid="total-field">{`Despesas: R$${this.getPrice()}`}</h3>
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
