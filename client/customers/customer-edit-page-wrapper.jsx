
//var TextInput = require('./textInput');

var React = require('react');

import CustomerEditPage from './customer-edit-page.jsx';
//import { createHistory, useBasename } from 'history'

//const history = useBasename(createHistory)({
//    basename: '/'
//});

// Top of the stack, represents the whole page
CustomerEditPageWrapper = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        //console.log("CustomerEditForm.getMeteorData");

        const customerId = FlowRouter.getParam('_id');
        console.log("Customerid", customerId)
        var cust;
        var handle;

        const newCustomer = !customerId;

        if (!newCustomer) {
            handle = Meteor.subscribe('CustomerCompany.get', customerId);
            cust = CustomerCompanies.findOne({_id: customerId});
        }

        //console.log("CustomerEditForm.getMeteorData cust ", cust);

        return {
            customerLoading: handle ? !handle.ready() : {},
            customer: cust,
            customerId: customerId,
            newCustomer: newCustomer
        };
    },

    // this code could be moved down to the CustomerEditPage, but it seems cleaner
    // to keep all the db access in one place.  This also effectively separates the child
    // component from the data access which may be good for disconnected data scenarios
    saveCustomer(customer) {
        console.log("submitted customer: ", customer);

        const custId = FlowRouter.getParam('_id');

        // call the method for upserting the data
        CustomerCompanies.methods.updateManualForm.call({
            customerId: custId,
            data: customer
        }, (err, res) => {
            //console.log ("CustomerCompanies.methods.updateManualForm.call was called");
            if (err) {
                sAlert.error(err.message);
            } else {
                sAlert.success("Save successful");
                FlowRouter.go("/");
            }
        });

    },

    render() {
        //console.log("render started", this.data.customer)
        if (!this.data.newCustomer && this.data.customerLoading) {
            return ( <h3>Loading Customer</h3> );
        }
        return (
            <CustomerEditPage
                customer={this.data.customer}
                onSave={this.saveCustomer}
            />
        );
    }
});

module.exports = CustomerEditPageWrapper;