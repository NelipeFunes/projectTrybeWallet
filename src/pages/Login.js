import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUser } from '../actions';

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

  render() {
    const {
      disabled,
      user,
    } = this.state;
    const {
      userAdd,
    } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <input
          type="email"
          data-testid="email-input"
          name="user"
          onChange={ this.handleChange }
        />
        <br />
        <br />
        <input
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          name="password"
        />
        <br />
        <br />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => userAdd(user) }
          >
            Entrar

          </button>
        </Link>
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
