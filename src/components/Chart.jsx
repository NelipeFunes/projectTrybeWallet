import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeItem } from '../actions/index';

class Chart extends React.Component {
  handleClick = ({ target: { id } }) => {
    const { infos, itemRemove } = this.props;
    const item = infos.filter((info) => Number(info.id) !== Number(id));
    itemRemove(item);
  }

  render() {
    const { infos } = this.props;
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
        {infos.map((info) => (
          <tbody key={ info.id }>
            <tr>
              <td>{info.description}</td>
              <td>{info.tag}</td>
              <td>{info.method}</td>
              <td>{Number(info.value).toFixed(2)}</td>
              <td>{info.exchangeRates[info.currency].name.split('/', 1)}</td>
              <td>{Number(info.exchangeRates[info.currency].ask).toFixed(2)}</td>
              <td>{info.value * info.exchangeRates[info.currency].ask}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  id={ info.id }
                  onClick={ this.handleClick }
                >
                  Deletar
                </button>
              </td>
            </tr>
          </tbody>
        ))}

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  infos: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  itemRemove: (payload) => dispatch(removeItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);

Chart.propTypes = {
  infos: PropTypes.arrayOf.isRequired,
  itemRemove: PropTypes.func.isRequired,
};
