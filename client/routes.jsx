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
// load Layout and Welcome React components
import {Layout, Welcome} from './app/app.jsx';
import CustomersList from './customers/customers-list.jsx';
import CustomerEditPageWrapper from './customers/customer-edit-page-wrapper.jsx';


FlowRouter.route("/", {
    action() {
        mount(Layout, {
            //content: (<Welcome name="arunoda"/>)
            content: <CustomersList />
        });
    }
});

FlowRouter.route('/customers/:_id', {
    name: 'CustomerCompany.edit',
    action() {
        mount(Layout, {
            //content: (<Welcome name="arunoda"/>)
            content: <CustomerEditPageWrapper />
        });
    }
});
