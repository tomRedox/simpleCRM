
var React = require('react');

import CustomerEditPage from './customer-edit-page.jsx';

// Top of the stack, represents the whole page
const CustomerEditPageWrapper = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ ReactMeteorData ],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        //console.log("CustomerEditForm.getMeteorData");

        const customerId = FlowRouter.getParam('_id');
        console.log("CustomerId", customerId);
        var customer;
        var handle;

        const newCustomer = !customerId;

        if (!newCustomer) {
            handle = Meteor.subscribe('CustomerCompany.get', customerId);
            customer = CustomerCompanies.findOne({_id: customerId});
        } else {
            // Create an empty new record
            customer = {
                name: "",
                email: "",
                postcode: "",
                salesRegionId: "",
                nextContactDate: new Date(),
                createdAt: new Date()
            };
        }

        //console.log("CustomerEditForm.getMeteorData cust ", cust);

        return {
            customerLoading: handle ? !handle.ready() : {},
            customer,
            customerId,
            newCustomer
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
