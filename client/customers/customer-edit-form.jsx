//var TextInput = require('./textInput');
var React = require('react');

// App component - represents the whole app
CustomerEditForm = React.createClass({
    // Declare our expectations for using this class (not mandatory, just good practice)
    propTypes: {
        customer: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        salesRegionOptions: React.PropTypes.array.isRequired,
        errors: React.PropTypes.object,
        isValid: React.PropTypes.bool
    },

    render() {
        console.log("CustomerEditComponent props: ", this.props);

        return (
            <div className="panel panel-default col-md-6">
                <form className="customer_edit_react" onSubmit={this.props.onSave}>
                    <div className="panel-body">

                        <h3>{this.props.customer.name}</h3>
                        <TextInput
                            name="name"
                            label="Name"
                            onChange={this.props.onChange}
                            placeholder="Name"
                            value={this.props.customer.name}
                            error={this.props.errors.name}
                        />

                        <TextInput
                            name="email"
                            label="Email"
                            onChange={this.props.onChange}
                            placeholder="Email"
                            value={this.props.customer.email}
                            error={this.props.errors.email}
                        />

                        <TextInput
                            name="postcode"
                            label="Postcode"
                            onChange={this.props.onChange}
                            placeholder="Postcode"
                            value={this.props.customer.postcode}
                            error={this.props.errors.postcode}
                        />

                        <DateInput
                            name="nextContactDate"
                            label="Next contact date"
                            onChange={this.props.onChange}
                            placeholder="Next contact date"
                            value={this.props.customer.nextContactDate}
                            error={this.props.errors.nextContactDate}
                        />

                        <SelectInput
                            name="salesRegionId"
                            label="Sales region"
                            value={this.props.customer.salesRegionId}
                            onChange={this.props.onChange}
                            //placeholder="Next contact date"
                            error={this.props.errors.salesRegionId}
                            options={this.props.salesRegionOptions}
                            valueKey="_id"
                            labelKey="name"

                        />

                        <a className="btn btn-warning" id="cancelButton" href="/">Cancel</a>

                        <input
                            type="submit"
                            value="Save"
                            className="btn btn-primary"
                            onClick={this.props.onSave}
                            disabled={!this.props.isValid}
                        />

                    </div>
                </form>
            </div>
        );
    }
});

module.exports = CustomerEditForm;