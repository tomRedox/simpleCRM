// This component is for a basic account button dropdown - with access to account options and logging out.

import React from 'react';
import ReactDOM from 'react-dom';

Login = React.createClass({
    render() {
      return (
        <div>
    <h4>Login</h4>
      <form>
        <div class="form-group">
          <label for="emailAddress">Email Address</label>
          <input type="email" name="emailAddress" class="form-control" placeholder="Email Address" />
        </div>
        <div class="form-group">
          <label for="password"><span class="pull-left">Password</span> <a class="pull-right" href="{{pathFor 'recover-password'}}">Forgot Password?</a></label>
          <input type="password" name="password" class="form-control" placeholder="Password" />
        </div>
        <div class="form-group">
          <input type="submit" class="btn btn-success" value="Login" />
        </div>
      </form>
      </div>
        );
     }
});

export default Login;
