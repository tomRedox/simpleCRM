
//var Input = require('./textInput');

// App component - represents the whole app
CustomerEditPage = React.createClass({
    propTypes: {
        customer: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired
    },

    getInitialState() {
        console.log("CustomerEditPage.getInitialState");
        return {
            errorsList: new ReactiveDict(),
            customer: {},
            errors: {}
        };
    },

    componentDidMount() {
        console.log("CustomerEditPage.componentDidMount");
        this.setState({customer: this.props.customer});
    },


    onChangeHandler: function (event) {
        console.log("onChangeHandler event ", event);
        console.log("this.customer before ", this.state.customer);

        // update our customer data to reflect the new value in the UI
        var field = event.target.name;
        var value = event.target.value;
        this.state.customer[field] = value;

        console.log("this.customer after", this.state.customer);

        var schemaContext = Schemas.CustomerCompaniesSchema.namedContext("customerEditReactForm");

        this.state.errors = {};

        schemaContext.validate(this.state.customer);
        console.log( "schemaContext.invalidKeys", schemaContext.invalidKeys());

        schemaContext.invalidKeys().forEach(invalidKey => {
            console.log("invalidKey: ", invalidKey);
            var errMessage = schemaContext.keyErrorMessage(invalidKey.name);
            console.log("keyErrorMessage: ", errMessage);

            if (invalidKey.name!="_id") {
                this.state.errors[invalidKey.name] = errMessage;
            } else {
            }


        });
        
        console.log("this.state.errors", this.state.errors);

        return this.setState({customer: this.state.customer});
    },

    saveCustomer(event) {
        event.preventDefault();

        this.props.onSave(this.state.customer);
    },

    render() {
        console.log("render state ", this.state);

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
//<div className="form-group">
//    <label for="nextContactDate">Next contact date</label>
//    <input type="text" id="nextContactDate" className="form-control"
//           defaultValue={this.props.customer.nextContactDate}/>
//</div>
