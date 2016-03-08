var React = require('react');

import TextInput from '../components/TextInput1.jsx';
import DateInput from '../components/DateInput1.jsx';
import SelectInput from '../components/SelectInput1.jsx';


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
        this.props.onChange(this.props.customer, [{name, value}]);
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

                        <SelectInput
                            name="salesRegionId"
                            label="Sales region"
                            placeholder="Sales region"
                            value={this.props.customer.salesRegionId}
                            onChange={this.onSelectChange}
                            error={errors.salesRegionId}
                            options={this.props.salesRegionOptions}
                            valueKey="_id"
                            labelKey="name"
                        />

                        <div className="form-group">
                            <a className="btn btn-warning" id="cancelButton" href="/">Cancel</a>

                            <input
                                type="submit"
                                value="Save"
                                className="btn btn-primary"
                                onClick={this.onSave}
                                disabled={!this.props.isValid}
                            />
                        </div>

                    </div>
                </form>
            </div>
        );
    }
});

module.exports = CustomerEditForm;


