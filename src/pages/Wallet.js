import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrency } from '../reducers/wallet';
import Form from '../components/Form';
import Chart from '../components/Chart';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <nav>
          <Form />
        </nav>
        <main className="table">
          <Chart />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  getCurrency: PropTypes.func.isRequired,
};
