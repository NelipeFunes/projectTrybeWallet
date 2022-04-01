import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveInfosExpenses } from '../actions/index';
import { fetchPrice } from '../reducers/wallet';

let idQuantity = 0;
const Alimentação = 'Alimentação';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
      exchangeRates: {},
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { saveInfo, getPrice } = this.props;
    const result = await getPrice();
    saveInfo({
      id: idQuantity,
      ...this.state,
      exchangeRates: { ...result },
    });
    idQuantity += 1;
    this.setState({
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: Alimentação,
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, method } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="Despesa">
            Valor:
            <input
              name="value"
              type="number"
              id="Despesa"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="Descrição">
            Descrição:
            <input
              name="description"
              type="text"
              value={ description }
              id="Descrição"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select
              id="currencies"
              onChange={ this.handleChange }
              name="currency"
            >
              { currencies.map((currencie) => (
                <option
                  key={ currencie }
                  onChange={ this.handleChange }
                >
                  {currencie}

                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="method"
            data-testid="method-input"
          >
            <select
              id="method"
              onChange={ this.handleChange }
              name="method"
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="whatFor">
            <select
              id="whatFor"
              data-testid="tag-input"
              onChange={ this.handleChange }
              name="tag"
            >
              <option>{Alimentação}</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            id="addDespesa"
            onClick={ this.handleClick }
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (payload) => dispatch(saveInfosExpenses(payload)),
  getPrice: (payload) => dispatch(fetchPrice(payload)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  saveInfo: PropTypes.func.isRequired,
  getPrice: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
