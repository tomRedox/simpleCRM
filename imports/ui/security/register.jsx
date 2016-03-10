// This component is for a basic account button dropdown - with access to account options and logging out.

import React from 'react';
import ReactDOM from 'react-dom';

Register = React.createClass({
    render() {
      return (
        <div>
            <h4>Register a new user</h4>
            <form id="signup" className="signup">
              <div className="form-group">
                <label for="emailAddress">Email Address</label>
                <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" />
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-success" value="Register" />
              </div>
            </form>
        </div>

        );
     }
});

export default Register;
