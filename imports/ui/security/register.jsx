// This component is for a basic account button dropdown - with access to account options and logging out.

import React from 'react';
import ReactDOM from 'react-dom';

Register = React.createClass({
    getInitialState() {
      return {
        status: ''
      };
    },
    onSubmit(event) {
      event.preventDefault();
      let emailAddress = ReactDOM.findDOMNode(this.refs.emailAddress).value.trim();
      let password = ReactDOM.findDOMNode(this.refs.password).value.trim();

      Accounts.createUser({
            username: emailAddress,
            email: emailAddress,
            password
        },(error) => {
          if (error) {
            ReactDOM.findDOMNode(this.refs.error).value = error;
          } else {
            ReactDOM.findDOMNode(this.refs.emailAddress).value = '';
            ReactDOM.findDOMNode(this.refs.password).value = '';
            this.setState({
              status: `Success! User ${emailAddress} Created.`
            });
          }
        });
    },
    render() {
      return (
        <div>
            <h4>Register a new user</h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="emailAddress">Email Address</label>
                <input type="email" ref="emailAddress" className="form-control" placeholder="Email Address" />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" ref="password" className="form-control" placeholder="Password" />
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-success" value="Register" />
              </div>
              <p>{this.state.status}</p>
            </form>
        </div>

        );
     }
});

export default Register;
