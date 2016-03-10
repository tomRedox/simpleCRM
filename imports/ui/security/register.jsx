// This component is for a basic account button dropdown - with access to account options and logging out.

import React from 'react';
import ReactDOM from 'react-dom';

Register = React.createClass({
    render() {
      return (
        <div>
            <h4>Register a new user</h4>
            <form id="signup" class="signup">
              <div class="form-group">
                <label for="emailAddress">Email Address</label>
                <input type="email" name="emailAddress" class="form-control" placeholder="Email Address" />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" class="form-control" placeholder="Password" />
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-success" value="Register" />
              </div>
            </form>
        </div>

        );
     }
});

export default Register;
