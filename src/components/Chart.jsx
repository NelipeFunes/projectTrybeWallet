import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeItem, changeItem } from '../actions/index';

class Chart extends React.Component {
  handleClick = ({ target: { id } }) => {
    const { infos, itemRemove } = this.props;
    const item = infos.filter((info) => Number(info.id) !== Number(id));
    itemRemove(item);
  }

  handleEdit = ({ target: { id } }) => {
    const { infos, changingOn } = this.props;
    const items = infos.filter((alow) => Number(alow.id) === Number(id));
    changingOn(items);
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
              <td>{(info.value * info.exchangeRates[info.currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  id={ info.id }
                  onClick={ this.handleEdit }
                >
                  Editar
                </button>
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
  changingOn: (payload) => dispatch(changeItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);

Chart.propTypes = {
  infos: PropTypes.arrayOf.isRequired,
  itemRemove: PropTypes.func.isRequired,
  changingOn: PropTypes.func.isRequired,
};
