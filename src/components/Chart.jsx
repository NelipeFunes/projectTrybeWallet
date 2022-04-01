import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Chart extends React.Component {
  render() {
    const { infos } = this.props;
    return (
      <table>
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
        {infos.map((info) => (
          <tr key={ info.id }>
            <td>{info.description}</td>
            <td>{info.tag}</td>
            <td>{info.method}</td>
            <td>{Number(info.value).toFixed(2)}</td>
            <td>{info.currency === 'USD' ? 'Dólar Comercial' : 'Euro' }</td>
            <td>{Number(info.exchangeRates[info.currency].ask).toFixed(2)}</td>
            <td>{info.value * info.exchangeRates[info.currency].ask}</td>
            <td>Real</td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  infos: state.wallet.expenses,
});

export default connect(mapStateToProps)(Chart);

Chart.propTypes = {
  infos: PropTypes.arrayOf.isRequired,
};
