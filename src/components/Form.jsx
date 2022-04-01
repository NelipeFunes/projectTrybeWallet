import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="Despesa">
            Despesas:
            <input
              type="text"
              id="Despesa"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="Descrição">
            Descrição:
            <input
              type="text"
              id="Descrição"
              data-testid="description-input"
            />
          </label>
          Moeda
          <label htmlFor="currencies">
            Moeda
            <select id="currencies">
              { currencies.map((currencie) => (
                <option key={ currencie }>{currencie}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method" data-testid="method-input">
            <select id="method">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="whatFor">
            <select id="whatFor" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Form);
