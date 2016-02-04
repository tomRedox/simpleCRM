
//var Input = require('./textInput');

// App component - represents the whole app
CustomerEditReact = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {

        const customerId = () => FlowRouter.getParam('_id');

        var handle = Meteor.subscribe('CustomerCompany.get', customerId());

        // this should give us a reactive data schema
       // var schemaContext = Schemas.CustomerCompaniesSchema.namedContext("customerEditReactForm");



        return {
            customerLoading: !handle.ready(),
            customer: CustomerCompanies.findOne({_id: customerId()})
        };

        // is there already a schema context attached to this record?
        // this link seems to be important: https://github.com/aldeed/meteor-collection2#validation-contexts
    },

    getInitialState() {
        return {
            errorsList: new ReactiveDict()
        };
    },

    handleSubmit(event) {
        event.preventDefault();

        //console.log("submitted event: ", event);
        //console.log("this: ", this);

        // get the data out of the template (yuk)
        const dataFromForm = {
            name: event.target.name.value,
            email: event.target.email.value,
            postcode: event.target.postcode.value,
        };

        //console.log("dataFromForm", dataFromForm);

        const custId = FlowRouter.getParam('_id')

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

                    this.state.errorsList.set(errors);
                    //console.log("errors3 ", Template.instance().errors);
                }
                sAlert.error(err.message);
                console.log("Save error ", err);
            } else {
                sAlert.success("Save successful")
            }
        });

    },

    onChange: function (event) {

        console.log("this.customer", this.data.customer);

        // update our customer data to reflect the new value in the UI
        var field = event.target.name;
        var value = event.target.value;
        this.data.customer[field] = value;

        console.log("this.customer after", this.data.customer);

        console.log("onChange", event);
        //Schemas.CustomerCompaniesSchema.validate(this.data);

        var schemaContext = Schemas.CustomerCompaniesSchema.namedContext("customerEditReactForm");

        schemaContext.validate(this.data.customer);
        console.log( "context.invalidKeys", schemaContext.invalidKeys());

        schemaContext.invalidKeys().forEach(invalidKey => {
            console.log("keyErrorMessage: ", schemaContext.keyErrorMessage(invalidKey.name));
        });

    },

    render() {

        console.log("render started")
        if (this.data.customerLoading) {
            return ( <h1>Loading</h1> );
        }
        return (
            <form className="customer_edit_react" onSubmit={this.handleSubmit}>
                <div className="panel panel-default col-md-6">
                    <div className="panel-body">
                        <h3>{this.data.customer.name}</h3>


                        <Input
                            name="name"
                            label="Name"
                            onChange = {this.onChange}
                            placeholder="Name"
                            defaultValue={this.data.customer.name}
                            error = "hi there"
                        />

                        <Input
                            name="email"
                            label="Email"
                            onChange = {this.onChange}
                            placeholder="Email"
                            defaultValue={this.data.customer.email}
                        />

                        <Input
                            name="postcode"
                            label="Postcode"
                            onChange = {this.onChange}
                            placeholder="Postcode"
                            defaultValue={this.data.customer.postcode}
                        />


                        <button type="submit" className="btn btn-primary">Submit</button>

                    </div>
                </div>
            </form>
        );
    }
});
//<div className="form-group">
//    <label for="nextContactDate">Next contact date</label>
//    <input type="text" id="nextContactDate" className="form-control"
//           defaultValue={this.data.customer.nextContactDate}/>
//</div>
