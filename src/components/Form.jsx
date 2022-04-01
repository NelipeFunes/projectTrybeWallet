import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { acceptChange, changingItem, saveInfosExpenses } from '../actions/index';
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
      changing: false,
    };
  }

  handleClick = async () => {
    const { saveInfo, getPrice } = this.props;
    const { value, description, method, tag, currency } = this.state;
    const result = await getPrice();
    saveInfo({
      id: idQuantity,
      value,
      description,
      method,
      tag,
      currency,
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

  handleChange = ({ target }) => {
    const { value, name } = target;
    const { changingInfo } = this.props;
    changingInfo();
    this.setState({
      [name]: value,
    });
  }

  changing = () => {
    const { changingOn } = this.props;
    if (changingOn) {
      const { changes } = this.props;
      this.setState({
        value: changes[0].value,
        description: changes[0].description,
        currency: changes[0].currency,
        method: changes[0].method,
        tag: changes[0].tag,
        exchangeRates: changes[0].exchangeRates,
        changing: true,
        id: changes[0].id,
      });
    }
  }

  handleEditClick = () => {
    const { acceptInfo } = this.props;
    const { value, description, method, tag, currency, id, exchangeRates } = this.state;
    acceptInfo({
      value,
      description,
      method,
      tag,
      currency,
      id,
      exchangeRates,
    });
    this.setState({
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: Alimentação,
      changing: false,
    });
  };

  render() {
    const { currencies } = this.props;
    setTimeout(() => {
      this.changing();
    }, 100);
    const { value, description, method, tag, currency, changing } = this.state;
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
              value={ currency }
              data-testid="currency-input"
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
          >
            <select
              id="method"
              onChange={ this.handleChange }
              name="method"
              value={ method }
              data-testid="method-input"
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
              value={ tag }
            >
              <option>{Alimentação}</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          {changing
            ? (
              <button
                type="button"
                onClick={ this.handleEditClick }
                data-testid="edit-btn"
              >
                Editar despesa

              </button>)
            : (
              <button type="button" id="addDespesa" onClick={ this.handleClick }>
                Adicionar despesa
              </button>)}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  changingOn: state.wallet.isChanging,
  changes: state.wallet.change,
});

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (payload) => dispatch(saveInfosExpenses(payload)),
  getPrice: (payload) => dispatch(fetchPrice(payload)),
  changingInfo: () => dispatch(changingItem()),
  acceptInfo: (payload) => dispatch(acceptChange(payload)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  saveInfo: PropTypes.func.isRequired,
  getPrice: PropTypes.func.isRequired,
  changingOn: PropTypes.func.isRequired,
  changes: PropTypes.shape({
    value: PropTypes.number,
    description: PropTypes.string,
    method: PropTypes.string,
    currency: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
  changingInfo: PropTypes.func.isRequired,
  acceptInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
