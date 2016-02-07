// Import to load these templates
//import './app-body.html';
//import './dashboard/dashboard.html';
//import './blogpost/blog-post.html';
//import './customers/customer-companies-list.html';

/*
* General note on passing data to templates:  Do not subscribe to
* data in the routes, this is an anti-pattern,
* https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management
* */
//
//FlowRouter.notFound = {
//    action: function() {
//        BlazeLayout.render("AppBody", {content: "notFound"});
//    }
//};
//
//FlowRouter.route('/', {
//    name: "home",
//    action: function() {
//        BlazeLayout.render("AppBody", {content: "dashboard"});
//    }
//});
//
//FlowRouter.route('/post/:postId', {
//    action: function() {
//        BlazeLayout.render("AppBody", {content: "blogPost"});
//    }
//});
//
//
//FlowRouter.route('/customers/:_id', {
//    name: 'CustomerCompany.edit',
//    action() {
//        BlazeLayout.render('AppBody', {content: 'customer_company_edit'});
//    }
//});
//
//FlowRouter.route('/customersAuto/:_id', {
//    name: 'CustomerCompany.editAuto',
//    action() {
//        BlazeLayout.render('AppBody', {content: 'updateCustomerEdit'});
//    }
//});
//
//
//FlowRouter.route('/orders/newOrder', {
//    name: 'newOrder',
//    action: function() {
//        BlazeLayout.render("AppBody", {content: "orderEditAuto"});
//    }
//});




import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './app/app.jsx';
import CustomersList from './customers/customers-list.jsx';
import CustomerEditPageWrapper from './customers/customer-edit-page-wrapper.jsx';
import Dashboard from './dashboard/dashboard.jsx';



// define and export our Layout component
export const Layout1 = ({content}) => (
    <div>
        <h1>My App</h1>
        <hr />
        <div>{content}</div>
    </div>
);

// define and export our Welcome component
export const Welcome = ({name}) => (
    <div>
        Hello, {name}.
    </div>
);



FlowRouter.route("/", {
    name: "Home",
    action() {
        console.log("route ", this.name);
        mount(Layout, {
            content: (<Dashboard />)
        });
    }
});


FlowRouter.route('/customers/:_id', {
    name: 'CustomerCompany.edit',
    action() {
        console.log("route ", this.name);
        mount(Layout, {
            content: (<CustomerEditPageWrapper />)
        });
    }
});

FlowRouter.route("/addCustomer", {
    name: "addCustome",
    action() {
        console.log("route ", this.name);
        mount(Layout, {
            content: (<CustomerEditPageWrapper />)
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