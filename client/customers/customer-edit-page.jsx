
//var TextInput = require('./textInput');
var React = require('react');
import CustomerEditForm from './customer-edit-form.jsx';

// this page is wrapped by the wrapper
const CustomerEditPage = React.createClass({
    propTypes: {
        customer: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired
    },

    getInitialState() {
        console.log("CustomerEditPage.getInitialState", this.props);
        return {
            //customer:  (this.props.customer ? this.props.customer : defaultCustomer),
            customer: this.props.customer,
            errors: {},
            isValid: false
        };
    },

    onChangeHandler(event) {

        console.log("event:", event);
        // update our customer state to reflect the new value in the UI
        var field = event.target.name;
        var value = event.target.value;
        this.state.customer[field] = value;

        console.log("test",this.state.customer[field]);
        this.state.errors = {};

        // validate the customer against the table schema
        var schemaContext = Schemas.CustomerCompaniesSchema.namedContext("customerEditReactForm");
        schemaContext.validate(this.state.customer);

        schemaContext.invalidKeys().forEach(invalidKey => {
            var errMessage = schemaContext.keyErrorMessage(invalidKey.name);
            if (invalidKey.name !== "_id") {
                this.state.errors[invalidKey.name] = errMessage;
                console.log(errMessage);
            }
        });

        this.setFormIsValid();

        // Update the state, this will then cause the re-render
        return this.setState({customer: this.state.customer});
    },

    setFormIsValid() {
        this.state.isValid = (Object.keys(this.state.errors).length === 0);
    },

    saveCustomer(event) {
        event.preventDefault();

        this.props.onSave(this.state.customer);
    },

    render() {
        this.setFormIsValid();

        //console.log("CustomerEditPage render state ", this.state.customer);

        return (
            <CustomerEditForm
                customer={this.state.customer}
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
