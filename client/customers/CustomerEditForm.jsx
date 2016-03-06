//var TextInput = require('./textInput');
var React = require('react');

import FlatButton from 'material-ui/lib/flat-button';

// App component - represents the whole app
const CustomerEditForm = React.createClass({
    // Declare our expectations for using this class (not mandatory, just good practice)
    propTypes: {
        customer: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        salesRegionOptions: React.PropTypes.array.isRequired,
        errors: React.PropTypes.object,
        isValid: React.PropTypes.bool
    },

    onSave(event) {
        event.preventDefault();

        this.props.onSave(this.props.customer);
    },

    onChange(event) {
        console.log("CustomerEditForm.onChange() name: " + event.target.name + " value: ", event.target.value);
        this.callOnChange(event.target.name, event.target.value);
    },

    onSelectChange(newValue) {
        console.log("CustomerEditForm.onSelectChange() name: " + newValue.name + " value: ", newValue);
        this.callOnChange(newValue.name, newValue.selectedOption[newValue.valueKey]);
    },

    callOnChange(name, value) {
        // create a single row array with the data in
        this.props.onChange(this.props.customer, [ { name, value} ] );
    },

    render() {
        console.log("CustomerEditComponent.render() props: ", this.props);

        let errors = {};
        if (this.props.errors) {
            errors = this.props.errors;
        }

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
                        /><br/>

                        <TextInput
                            name="email"
                            onChange={this.onChange}
                            value={this.props.customer.email}
                            error={errors.email}
                        /><br/>

                        <TextInput
                            name="postcode"
                            onChange={this.onChange}
                            value={this.props.customer.postcode}
                            error={errors.postcode}
                        /><br/>

                        <DateInput
                            name="nextContactDate"
                            onChange={this.onChange}
                            value={this.props.customer.nextContactDate}
                            error={errors.nextContactDate}
                        /><br/>

                        <SelectInput
                            name="salesRegionId"
                            label="Sales region"
                            placeholder ="Sales region"
                            value={this.props.customer.salesRegionId}
                            onChange={this.onSelectChange}
                            error={errors.salesRegionId}
                            options={this.props.salesRegionOptions}
                            valueKey="_id"
                            labelKey="name"
                        /><br/>

                        <FlatButton
                            linkButton={true}
                            href="/"
                            label="Cancel"
                        />

                        <FlatButton
                            type="submit"
                            label="Save"
                            onClick={this.onSave}
                            disabled={!this.props.isValid}
                            primary={true}
                        />
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = CustomerEditForm;


