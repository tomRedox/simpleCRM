// This component is for a basic account button dropdown - with access to account options and logging out.

import React from 'react';
import ReactDOM from 'react-dom';

const forgotStyle = {
  color: 'black',
  size: 24,
  textDecoration: 'none' ,
};

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
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="login-panel panel panel-default">
            <div className="panel-heading">
              <h4 className="text-center">Please Login</h4>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <fieldset>
                  <div className="form-group">
                    <input className="form-control" placeholder="Email Address" ref="emailAddress" name="email" type="email" autofocus></input>
                  </div>
                  <div className="form-group">
                    <input className="form-control" className="form-control" ref="password" placeholder="Password" name="password" type="password"></input>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 checkbox">
                      <label>
                        <input className="pull-left" name="remember" type="checkbox" value="Remember Me">Remember Me</input>
                      </label>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <a style={forgotStyle} className="pull-right" href="{{pathFor 'recover-password'}}">Forgot Password?</a>
                    </div>
                  </div>
                  <div>
                    <input type="submit" value="Login" className="btn btn-lg btn-success btn-block"></input>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Login;
