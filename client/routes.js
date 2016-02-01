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

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render("AppBody", {content: "notFound"});
    }
};

FlowRouter.route('/', {
    name: "home",
    action: function() {
        BlazeLayout.render("AppBody", {content: "dashboard"});
    }
});

FlowRouter.route('/post/:postId', {
    action: function() {
        BlazeLayout.render("AppBody", {content: "blogPost"});
    }
});


FlowRouter.route('/customers/:_id', {
    name: 'CustomerCompany.edit',
    action() {
        BlazeLayout.render('AppBody', {content: 'customer_company_edit'});
    }
});

FlowRouter.route('/customersAuto/:_id', {
    name: 'CustomerCompany.editAuto',
    action() {
        BlazeLayout.render('AppBody', {content: 'updateCustomerEdit'});
    }
});


FlowRouter.route('/orders/newOrder', {
    name: 'newOrder',
    action: function() {
        BlazeLayout.render("AppBody", {content: "orderEditAuto"});
    }
});