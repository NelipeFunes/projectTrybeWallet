import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    const number = 5;
    this.setState({
      [name]: value,
    });
    const { password, user } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (re.test(user) && password.length >= number) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleClick= () => {
    const { userAdd, history } = this.props;
    const { user } = this.state;
    userAdd(user);
    history.push('/carteira');
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="forms">
        <h1>Trybe Wallet</h1>
        <h3>Login</h3>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="user"
            data-testid="email-input"
            name="user"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            name="password"
          />
        </label>
        <br />
        <br />
        <button
          id="Btn"
          className={ disabled ? 'disableBtn' : 'enableBtn' }
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userAdd: (user) => dispatch(addUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  userAdd: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
