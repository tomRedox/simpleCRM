// This component is for a basic account button dropdown - with access to account options and logging out.

import React from 'react';
import ReactDOM from 'react-dom';

Login = React.createClass({
    render() {
      return (
        <div>
    <h4>Login</h4>
      <form>
        <div className="form-group">
          <label for="emailAddress">Email Address</label>
          <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
        </div>
        <div className="form-group">
          <label for="password"><span className="pull-left">Password</span> <a className="pull-right" href="{{pathFor 'recover-password'}}">Forgot Password?</a></label>
          <input type="password" name="password" className="form-control" placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-success" value="Login" />
        </div>
      </form>
      </div>
        );
     }
});

export default Login;
