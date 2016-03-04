
/*
* General note on passing data to templates:  Do not subscribe to
* data in the routes, this is an anti-pattern,
* https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management
* */

import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'react-mounter';
import {Layout} from './app/app.jsx';
//import CustomersList from './customers/CustomersList.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import AppNotFound from './app/app-not-found.jsx';
import ProductsListWrapper from './products/products-list-wrapper.jsx';
import Test1 from './app/test1.jsx';
import Test2 from './app/test2.jsx';
import CustomerContainer from './customers/CustomerContainer.jsx';
import AllCustomersContainer from './customers/AllCustomersContainer.jsx';
import OrderContainer from './sales/OrderContainer.jsx';
import AllOrdersContainer from './sales/AllOrdersContainer.jsx';
import store from './redux/store.jsx';

//// define and export our Layout component
//export const Layout1 = ({content}) => (
//    <div>
//        <h1>My App</h1>
//        <hr />
//        <div>{content}</div>
//    </div>
//);
//
//// define and export our Welcome component
//export const Welcome = ({name}) => (
//    <div>
//        Hello, {name}.
//    </div>
//);

const EmptyThing = React.createClass( {
    render() {
        return (
            <div>
            <H1>Hi</H1>
                </div>
        );
    }
})


function unloadComponent() {
    console.log("unloadComponent");
    //ReactDOM.render(<EmptyThing />, document.getElementById('outerContent'));
}

FlowRouter.route("/", {
    name: "Home",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<Dashboard key="dashboard1"/>)
        });

        console.log("After Home route dashboard mount")
    }
});


FlowRouter.route('/customers/:_id', {
    name: 'CustomerCompany.edit',
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<CustomerContainer store={store}/>)
        });
    }
});

FlowRouter.route("/addCustomer", {
    name: "addCustomer",
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<CustomerContainer store={store}/>)
        });
    }
});

FlowRouter.route("/allCustomers", {
    name: "allCustomers",
    action() {
        console.log("route ", this.name);
        mount(Layout, {
            content: (<AllCustomersContainer store={store}/>)
        });
    }
});

FlowRouter.route('/products/', {

    name: 'productsList',

    triggersEnter:  [unloadComponent],

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


FlowRouter.route('/orders/:_id', {
    name: 'Order.edit',
    action() {
        //console.log("route ", this.name);
        mount(Layout, {
            content: (<OrderContainer store={store}/>)
        });
    }
});

FlowRouter.route("/addOrder", {
    name: "addOrder",
    action() {
        console.log("route ", this.name);
        mount(Layout, {
            content: (<OrderContainer store={store}/>)
        });
    }
});


FlowRouter.route("/allOrders", {
    name: "allOrders",
    action() {
        console.log("route ", this.name);
        mount(Layout, {
            content: (<AllOrdersContainer store={store}/>)
        });
    }
});

FlowRouter.route("/test1", {
    name: "test1",
    action() {
        console.log("route ", this.name);
        mount(Layout, {
            content: (<Test1 key="test1"/>)
        });
    }
});

FlowRouter.route("/test2", {
    name: "test2",
    action() {
        console.log("route ", this.name);
        mount(Layout, {
            content: (<Test2 key="test2"/>)
        });
    }
});

//
//import React from 'react';
//import { render } from 'react-dom'
//import { Router, Route, IndexRoute } from 'react-router';
//import { createHistory, useBasename } from 'history'
//
//const history = useBasename(createHistory)({
//    basename: '/'
//})
//
//
//import Layout from './app/app.jsx';
//import Dashboard from './dashboard/dashboard.jsx';
//import AppNotFound from './app/app-not-found.jsx';
//import CustomerEditPageWrapper from  './customers/customer-edit-page-wrapper.jsx'
//
//
//var Routes = (
//    <Route path="/" component={Layout}>
//        <IndexRoute component={Dashboard} />
//        <Route name="customerEdit" path="customers/:id" component={CustomerEditPageWrapper} />
//        <Route name="customerNew" path="addCustomer" component={CustomerEditPageWrapper} />
//        <Route path="*" component={AppNotFound}/>
//    </Route>
//)
//
//
//Meteor.startup(function() {
//    render(
//        <Router history={history}>
//            {Routes}
//        </Router>
//        , document.getElementById('app')
//    );
//});






//// This is saying that [URL]/authors will open ./components/authors/authorPage,
//// this works as the router is assuming the route name matches the path
//<Route name="authors" handler={require('./components/authors/authorPage')}/>
//<Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')}/>
//<Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')}/>
//
//<Route name="courses" handler={require('./components/courses/coursePage')}/>
//<Route name="addCourse" path="course" handler={require('./components/courses/manageCoursePage')}/>
//<Route name="manageCourse" path="course/:id" handler={require('./components/courses/manageCoursePage')}/>
//
//<Route name="about" handler={require('./components/about/aboutPage')}/>
//
//<NotFoundRoute handler={require('./components/notFoundPage')}/>
//
//<Redirect from="about-us" to="about"/>
//<Redirect from="awthurs" to="authors"/>