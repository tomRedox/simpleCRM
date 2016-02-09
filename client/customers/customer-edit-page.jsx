
//var TextInput = require('./textInput');
var React = require('react');

// this page is wrapped by the wrapper
CustomerEditPage = React.createClass({
    propTypes: {
        customer: React.PropTypes.object,
        onSave: React.PropTypes.func.isRequired
    },

    getInitialState() {
        const defaultCustomer = { createdAt: new Date() };

        console.log("CustomerEditPage.getInitialState", this.props);
        return {
            errorsList: new ReactiveDict(),
            //customer:  (this.props.customer ? this.props.customer : defaultCustomer),
            errors: {},
            isValid: false
        };
    },

    onChangeHandler: function (event) {

        console.log("event:", event);
        // update our customer state to reflect the new value in the UI
        var field = event.target.name;
        var value = event.target.value;
        this.props.customer[field] = value;

        console.log("test",this.props.customer[field])
        this.state.errors = {};

        // validate the customer against the table schema
        var schemaContext = Schemas.CustomerCompaniesSchema.namedContext("customerEditReactForm");
        schemaContext.validate(this.props.customer);

        schemaContext.invalidKeys().forEach(invalidKey => {
            var errMessage = schemaContext.keyErrorMessage(invalidKey.name);
            if (invalidKey.name != "_id") {
                this.state.errors[invalidKey.name] = errMessage;
                console.log(errMessage);
            }
        });

        this.setFormIsValid();

        // Update the state, this will then cause the re-render
        return this.setState({customer: this.props.customer});
    },

    setFormIsValid: function() {
        this.state.isValid = (Object.keys(this.state.errors).length === 0);
    },

    saveCustomer(event) {
        event.preventDefault();

        this.props.onSave(this.props.customer);
    },

    render() {
        this.setFormIsValid();

        //console.log("CustomerEditPage render state ", this.props.customer);

        return (
            <CustomerEditForm
                customer={this.props.customer}
                onChange={this.onChangeHandler}
                onSave={this.saveCustomer}
                errors={this.state.errors}
                isValid={this.state.isValid}
                salesRegionOptions={SalesRegions.find().fetch()}
            />
        );
    }
});

module.exports = CustomerEditPage;