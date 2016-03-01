//var TextInput = require('./textInput');
var React = require('react');

// App component - represents the whole app
const CustomerEditForm = React.createClass({
    // Declare our expectations for using this class (not mandatory, just good practice)
    propTypes: {
        customer: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        //salesRegionOptions: React.PropTypes.array.isRequired,
        errors: React.PropTypes.object,
        isValid: React.PropTypes.bool
    },

    onSave(event) {
        event.preventDefault();

        this.props.onSave(this.props.customer);
    },

    onChange(event) {
        console.log("CustomerEditForm.onChange() event:", event.target)
        this.props.onChange(this.props.customer._id, event);
    },

    render() {
        console.log("CustomerEditComponent.render() props: ", this.props);

        let errors = {};
        if (this.props.errors) {
            errors = this.props.errors;
        }

        isValid = this.props.isValid;
        isValid = true;

        return (
            <div className="panel panel-default col-md-6">
                <form className="customer_edit_react" onSubmit={this.onSave}>
                    <div className="panel-body">

                        <h3>{this.props.customer.name}</h3>
                        <TextInput
                            name="name"
                            onChange={this.onChange}
                            value={this.props.customer.name}
                            error={errors.name}
                        />

                        <TextInput
                            name="email"
                            onChange={this.onChange}
                            value={this.props.customer.email}
                            error={errors.email}
                        />

                        <TextInput
                            name="postcode"
                            onChange={this.onChange}
                            value={this.props.customer.postcode}
                            error={errors.postcode}
                        />

                        <DateInput
                            name="nextContactDate"
                            onChange={this.onChange}
                            value={this.props.customer.nextContactDate}
                            error={errors.nextContactDate}
                        />

                        <a className="btn btn-warning" id="cancelButton" href="/">Cancel</a>

                        <input
                            type="submit"
                            value="Save"
                            className="btn btn-primary"
                            onClick={this.onSave}
                            disabled={!isValid}
                        />

                    </div>
                </form>
            </div>
        );
    }
});

module.exports = CustomerEditForm;



//<SelectInput
//    name="salesRegionId"
//    value={this.props.customer.salesRegionId}
//    onChange={this.onChange}
//    error={this.props.errors.salesRegionId}
//    options={this.props.salesRegionOptions}
//    valueKey="_id"
//    labelKey="name"
//
///>
