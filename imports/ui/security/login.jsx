// This component is for a basic account button dropdown - with access to account options and logging out.

import React from 'react';
import ReactDOM from 'react-dom';

Login = React.createClass({
  onSubmit(event) {
    event.preventDefault();
    let emailAddress = ReactDOM.findDOMNode(this.refs.emailAddress).value.trim();
    let password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    Meteor.loginWithPassword(emailAddress, password, (error) => {
      if (error) {
        console.log(error);
      } else {
        FlowRouter.go('Home');
      }
    });
  },
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
              <div className="login-panel panel panel-default">
                  <div className="panel-heading">
                      <h3 className="panel-title">Please Sign In</h3>
                  </div>
                  <div className="panel-body">
                      <form role="form" onSubmit={this.onSubmit}>
                          <fieldset>
                              <div className="form-group">
                                  <input className="form-control"
                                    placeholder="Email Address"  ref="emailAddress"
                                    name="email" type="email" autofocus></input>
                              </div>
                              <div className="form-group">
                                  <input className= "form-control" className="form-control" ref="password" placeholder="Password" name="password" type="password" value=""></input>
                              </div>
                              {/*<div className="checkbox">
                                  <label>
                                      <input name="remember" type="checkbox" value="Remember Me">Remember Me
                                  </label>
                              </div>*/}
                              <div>
                                <span className="pull-right" href={{ pathFor 'recover-password'}}>Forgot Password?</span>
                              </div>
                              <div>
                                <input type="submit" value="Login" className="btn btn-lg btn-success btn-block">Login</input>
                              </div>
                          </fieldset>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    );
  },
});

export default Login;
