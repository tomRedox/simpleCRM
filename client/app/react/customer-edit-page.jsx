
//var Input = require('./textInput');

// App component - represents the whole app
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
            errors: {}
        };
    },

    onChangeHandler: function (event) {

        // update our customer state to reflect the new value in the UI
        var field = event.target.name;
        var value = event.target.value;
        this.state.customer[field] = value;

        this.state.errors = {};

        // validate the customer against the table schema
        var schemaContext = Schemas.CustomerCompaniesSchema.namedContext("customerEditReactForm");
        schemaContext.validate(this.state.customer);

        schemaContext.invalidKeys().forEach(invalidKey => {
            var errMessage = schemaContext.keyErrorMessage(invalidKey.name);
            this.state.errors[invalidKey.name] = errMessage;
        });

        // Update the state, this will then cause the re-render
        return this.setState({customer: this.state.customer});
    },

    saveCustomer(event) {
        event.preventDefault();

        this.props.onSave(this.state.customer);
    },

    render() {
        //console.log("render state ", this.state);
        return (
            <CustomerEditForm
                customer={this.state.customer}
                onChange={this.onChangeHandler}
                onSave={this.saveCustomer}
                errors={this.state.errors}
            />
        );
    }
});
