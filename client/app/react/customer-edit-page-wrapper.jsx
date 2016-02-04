
//var Input = require('./textInput');

// App component - represents the whole app
CustomerEditPageWrapper = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        console.log("CustomerEditForm.getMeteorData");

        const customerId = () => FlowRouter.getParam('_id');
        var handle = Meteor.subscribe('CustomerCompany.get', customerId());

        cust = CustomerCompanies.findOne({_id: customerId()});

        return {
            customerLoading: !handle.ready(),
            customer: cust
        };
    },

    saveCustomer(customer) {
        //console.log("submitted customer: ", customer);

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
                sAlert.success("Save successful")
            }
        });

    },

    render() {
        //console.log("render started")
        if (this.data.customerLoading) {
            return ( <h3>Loading</h3> );
        }
        return (
            <CustomerEditPage
                customer={this.data.customer}
                onSave={this.saveCustomer}
            />
        );
    }
});

