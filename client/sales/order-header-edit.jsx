import React from 'react';
import Autosuggest from 'react-autosuggest';
import AsyncSelectInput from '../controls/asyncSelectInput.jsx';


const OrderHeaderEdit = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onCustomerChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object.isRequired,
        isValid: React.PropTypes.bool,
    },

    getCustomers: function getCustomers(input) {
        console.log("OrderHeaderEdit.getCustomers()", input);
        var customerHandle = Meteor.subscribe('CustomerCompanies.searchByName', input);
        return CustomerCompanies.find().fetch();
    },

    render() {
        console.log("OrderHeaderEdit.render() - props: ", this.props);

        const value = {
            _id: this.props.order.customerId ? this.props.order.customerId : '',
            name: this.props.order.customerName
        };

        return (

            <div>
                <AsyncSelectInput
                    name="customerId"
                    label="Customer"
                    value= {value}
                    onChange={this.props.onCustomerChange}
                    //placeholder="Next contact date"
                    error={this.props.errors.customerId}
                    loadOptions={this.getCustomers}
                    valueKey="_id"
                    labelKey="name"
                />

                <TextInput
                    name="deliveryAddress1"
                    label="Delivery Address 1"
                    onChange={this.props.onChange}
                    placeholder="Delivery Address 1"
                    value={this.props.order.deliveryAddress1}
                    error={this.props.errors.deliveryAddress1}
                />

                <TextInput
                    name="notes"
                    label="Notes"
                    onChange={this.props.onChange}
                    placeholder="Notes"
                    value={this.props.order.notes}
                    error={this.props.errors.notes}
                />

                <div className="form-group">
                <label>Total Value: </label>
                <label name="orderTotal">{this.props.order.totalValue}</label>
                </div>

                <div className="form-group">
                <a className="btn btn-warning" id="cancelButton" href="/">Cancel</a>

                <input
                    type="submit"
                    value="Save"
                    className="btn btn-primary"
                    onClick={this.props.onSave}
                    disabled={!this.props.isValid}
                />
                </div>
            </div>
        );
    }
});

export default OrderHeaderEdit;

