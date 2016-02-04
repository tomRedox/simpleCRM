
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

        console.log("submitted customer: ", customer);
        //console.log("this: ", this);

        // get the data out of the template (yuk)
        const dataFromForm = {
            name: customer.name,
            email: customer.email,
            postcode: customer.postcode
        };

        //console.log("dataFromForm", dataFromForm);

        const custId = FlowRouter.getParam('_id');

        // call the method for upserting the data
        CustomerCompanies.methods.updateManualForm.call({
            customerId: custId,
            data: dataFromForm
        }, (err, res) => {
            //console.log ("CustomerCompanies.methods.updateManualForm.call was called");
            if (err) {
                if (err.error === 'validation-error') {

                    console.log(err);

                    // Initialize error object
                    const errors = {
                        data: [],
                        customerId: [],
                        name: [],
                        email: [],
                        postcode: []
                    };

                    // Go through validation errors returned from Method
                    err.details.forEach((fieldError) => {
                        // XXX i18n
                        if (errors[fieldError.name]) {
                            errors[fieldError.name].push(fieldError.type);
                        }
                    });

                    // Update ReactiveDict, errors will show up in the UI

                    this.data.errorsList.set(errors);
                    //console.log("errors3 ", Template.instance().errors);
                }
                sAlert.error(err.message);
                console.log("Save error ", err);
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
//<div className="form-group">
//    <label for="nextContactDate">Next contact date</label>
//    <input type="text" id="nextContactDate" className="form-control"
//           defaultValue={this.data.customer.nextContactDate}/>
//</div>
