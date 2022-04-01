import React from 'react';
import { connect } from 'react-redux';

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
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  infos: state.wallet.expenses,
});

export default connect(mapStateToProps)(Chart);

// {infos.map((info) => (
//   <div key={ info.id }>
//     <p>{info.description}</p>
//     <p>{info.tag}</p>
//     <p>{info.method}</p>
//     <p>{info.}</p>
//     <p>{info.value}</p>
//   </div>
// ))}
