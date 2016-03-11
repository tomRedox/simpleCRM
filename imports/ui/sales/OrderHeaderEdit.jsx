import React from 'react';
import Autosuggest from 'react-autosuggest';
import accounting from 'accounting';

import AsyncSelectInput from '../components/AsyncSelectInput.jsx';
import TextInput from '../components/TextInput.jsx';
import DateInput from '../components/DateInput.jsx';

import CustomerCompanies from '../../api/customers/customer-company';

const OrderHeaderEdit = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object,
        isValid: React.PropTypes.bool
    },

    getCustomers: function getCustomers(input) {
        //console.log("OrderHeaderEdit.getCustomers()", input);
        const handle = Meteor.subscribe('CustomerCompanies.searchByName', input);
        return CustomerCompanies.find().fetch();
    },

    onSave(event) {
        event.preventDefault();

        this.props.onSave(this.props.order);
    },

    onChange(event) {
        //console.log("OrderEditForm.onChange() name: " + event.target.name + " value: ", event.target.value);

        //this.callOnChange(event.target.name, event.target.value);
        this.props.onChange(this.props.order, [ { name: event.target.name, value: event.target.value} ] );
    },

    onSelectChange(newValue) {
        //console.log("OrderEditForm.onSelectChange() name: " + newValue.name + " value: ", newValue);

        this.props.onChange(this.props.order,
            [
                // need to pass both the id and the label values out for denormalization
                { name: "customerId", value: newValue.selectedOption[newValue.valueKey]},
                { name: "customerName", value: newValue.selectedOption[newValue.labelKey]}
            ]
        );

    },

    render() {
        //console.log("OrderHeaderEdit.render() - props: ", this.props);

        const value = {
            _id: this.props.order.customerId ? this.props.order.customerId : '',
            name: this.props.order.customerName
        };

        let errors = {};
        if (this.props.errors) {
            errors = this.props.errors;
        }

        return (

            <div>
                <div className="col-md-6">
                    <AsyncSelectInput
                        name="customerId"
                        label="Customer"
                        value={value}
                        onChange={this.onSelectChange}
                        error={errors.customerId}
                        loadOptions={this.getCustomers}
                        valueKey="_id"
                        labelKey="name"
                        hideLabel={false}
                    />

                    <TextInput name="notes" onChange={this.onChange} value={this.props.order.notes}
                               error={errors.notes} hideLabel={false} textRows={3} />

                </div>

                <div className="col-md-6">

                    <TextInput name="deliveryAddress1" label="Delivery Address" placeHolder="Address 1" onChange={this.onChange}
                               value={this.props.order.deliveryAddress1} error={errors.deliveryAddress1}
                               hideLabel={false}/>

                    <TextInput name="deliveryAddress2" placeHolder="Address 2" onChange={this.onChange}
                               value={this.props.order.deliveryAddress2}
                               error={errors.deliveryAddress2} hideLabel={true}/>

                    <TextInput name="town" onChange={this.onChange} value={this.props.order.town}
                               error={errors.town} hideLabel={true}/>

                    <TextInput name="county" onChange={this.onChange} value={this.props.order.county}
                               error={errors.county} hideLabel={true}/>

                    <TextInput name="postcode" onChange={this.onChange} value={this.props.order.postcode}
                               error={errors.postcode} hideLabel={true}/>

                    <DateInput name="deliveryDate" onChange={this.onChange} value={this.props.order.deliveryDate}
                               error={errors.deliveryDate} hideLabel={false}/>
                </div>

                <div className="form-group">
                    <label>Total value: </label>
                    <label name="orderTotal"> {accounting.formatMoney(this.props.order.totalValue, "£")}</label>
                </div>

                <div className="form-group">
                    <a className="btn btn-default" id="cancelButton" href="/">Cancel</a>

                    <input type="submit" value="Save" className="btn btn-primary" onClick={this.onSave}
                           disabled={!this.props.isValid}/>
                </div>
            </div>
        );
    }
});

export default OrderHeaderEdit;

