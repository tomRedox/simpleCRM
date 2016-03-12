// This component is for a basic account button dropdown - with access to account options and logging out.

import React from 'react';
import ReactDOM from 'react-dom';

AccountsButton = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },
  logout(event) {
    Meteor.logout(() => {
      FlowRouter.go('Login');
    });
  },
    render() {
      if (this.data.currentUser) {
         return (
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              { this.data.currentUser.username}
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="/register">Register New User</a></li>
              <li><a onClick={this.logout} >Logout</a></li>
            </ul>
          </li>
        );
      } else {
        return (
          <li>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Login</a>
          </li>
        );
      }
    }
});

export default AccountsButton;
