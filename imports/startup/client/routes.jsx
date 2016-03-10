
/*
* General note on passing data to templates:  Do not subscribe to
* data in the routes, this is an anti-pattern,
* https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management
* */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';

import { Layout } from './../../ui/app/Layout.jsx';
import Dashboard from '../../ui/dashboard/Dashboard.jsx';
import AppNotFound from './../../ui/app/app-not-found.jsx';
import ProductsListWrapper from './../../ui/products/products-list-wrapper.jsx';
import Test1 from './../../ui/app/test1.jsx';
import Test2 from './../../ui/app/test2.jsx';
import CustomerContainer from './../../ui/customers/CustomerContainer.jsx';
import AllCustomersContainer from './../../ui/customers/AllCustomersContainer.jsx';
import OrderContainer from './../../ui/sales/OrderContainer.jsx';
import AllOrdersContainer from './../../ui/sales/AllOrdersContainer.jsx';

import store from './../../ui/redux/store.jsx';

// Redirect unauthed users to login page
const authenticatedRedirect = () => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    FlowRouter.go( 'login' );
  }
};

// Set group using previous re-direct
const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

// Public Login page
FlowRouter.route("/login", {
    name: "Login",
    action() {
        //console.log("route ", this.name);
        mount(Login);
    }
});

authenticatedRoutes.route("/register", {
    name: "Register",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<Register />)
        });

    }
});

authenticatedRoutes.route("/", {
    name: "Home",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<Dashboard key="dashboard1"/>)
        });
    }
});

authenticatedRoutes.route('/customers/:_id', {
    name: 'CustomerCompany.edit',
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<CustomerContainer store={store}/>)
        });
    }
});

authenticatedRoutes.route("/addCustomer", {
    name: "addCustomer",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<CustomerContainer store={store}/>)
        });
    }
});

authenticatedRoutes.route("/allCustomers", {
    name: "allCustomers",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<AllCustomersContainer store={store}/>)
        });
    }
});

authenticatedRoutes.route('/products/', {
    name: 'productsList',
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<ProductsListWrapper  key="productsList"/>)
        });
    }
});

FlowRouter.notFound = {
    name: "notFoundRoute",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<AppNotFound />)
        });
    }
};

authenticatedRoutes.route('/orders/:_id', {
    name: 'Order.edit',
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<OrderContainer store={store}/>)
        });
    }
});

authenticatedRoutes.route("/addOrder", {
    name: "addOrder",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<OrderContainer store={store}/>)
        });
    }
});

authenticatedRoutes.route("/allOrders", {
    name: "allOrders",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<AllOrdersContainer store={store}/>)
        });
    }
});

authenticatedRoutes.route("/test1", {
    name: "test1",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<Test1 key="test1"/>)
        });
    }
});

authenticatedRoutes.route("/test2", {
    name: "test2",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<Test2 key="test2"/>)
        });
    }
});

authenticatedRoutes.route("/sb", {
    name: "sb",
    action() {
        //console.log("route ", this.name);
        mount(Layout2, {
            content: (<Dashboard key="dashboard1"/>)
        });
    }
});