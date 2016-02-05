
//var TextInput = require('./textInput');
var React = require('react');

// this page is wrapped by the wrapper
CustomerEditPage = React.createClass({
    propTypes: {
        customer: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired
    },

    getInitialState() {
        //console.log("CustomerEditPage.getInitialState");
        return {
            errorsList: new ReactiveDict(),
            customer: this.props.customer,
            errors: {},
            isValid: false
        };
    },

    onChangeHandler: function (event) {

        console.log("event:", event);
        // update our customer state to reflect the new value in the UI
        var field = event.target.name;
        var value = event.target.value;
        this.state.customer[field] = value;

        console.log("test",this.state.customer[field])
        this.state.errors = {};

        // validate the customer against the table schema
        var schemaContext = Schemas.CustomerCompaniesSchema.namedContext("customerEditReactForm");
        schemaContext.validate(this.state.customer);

        schemaContext.invalidKeys().forEach(invalidKey => {
            var errMessage = schemaContext.keyErrorMessage(invalidKey.name);
            if (invalidKey.name != "_id") {
                this.state.errors[invalidKey.name] = errMessage;
            }
        });

        this.setFormIsValid();

        // Update the state, this will then cause the re-render
        return this.setState({customer: this.state.customer});
    },

    setFormIsValid: function() {
        this.state.isValid = (Object.keys(this.state.errors).length === 0);
    },

    saveCustomer(event) {
        event.preventDefault();

        this.props.onSave(this.state.customer);
    },

    render() {
        this.setFormIsValid();

        //console.log("render state ", this.state);
        return (
            <CustomerEditForm
                customer={this.state.customer}
                onChange={this.onChangeHandler}
                onSave={this.saveCustomer}
                errors={this.state.errors}
                isValid={this.state.isValid}
            />
        );
    }
});

module.exports = CustomerEditPage;