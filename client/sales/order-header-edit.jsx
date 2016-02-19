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
                <div className="col-md-6">
                    <AsyncSelectInput
                        name="customerId"
                        label="Customer"
                        value={value}
                        onChange={this.props.onCustomerChange}
                        error={this.props.errors.customerId}
                        loadOptions={this.getCustomers}
                        valueKey="_id"
                        labelKey="name"
                        hideLabel={true}
                    />

                    <TextInput name="notes" onChange={this.props.onChange} value={this.props.order.notes}
                               error={this.props.errors.notes} hideLabel={true} textRows={5} />

                </div>

                <div className="col-md-6">

                    <TextInput name="deliveryAddress1" onChange={this.props.onChange}
                               value={this.props.order.deliveryAddress1} error={this.props.errors.deliveryAddress1}
                               hideLabel={true}/>

                    <TextInput name="deliveryAddress2" onChange={this.props.onChange}
                               value={this.props.order.deliveryAddress2}
                               error={this.props.errors.deliveryAddress2} hideLabel={true}/>

                    <TextInput name="town" onChange={this.props.onChange} value={this.props.order.town}
                               error={this.props.errors.town} hideLabel={true}/>

                    <TextInput name="county" onChange={this.props.onChange} value={this.props.order.county}
                               error={this.props.errors.county} hideLabel={true}/>

                    <TextInput name="postcode" onChange={this.props.onChange} value={this.props.order.postcode}
                               error={this.props.errors.postcode} hideLabel={true}/>

                    <DateInput name="deliveryDate" onChange={this.props.onChange} value={this.props.order.deliveryDate}
                               error={this.props.errors.deliveryDate} hideLabel={true}/>
                </div>

                <div className="form-group">
                    <label>Total value: </label>
                    <label name="orderTotal">{this.props.order.totalValue}</label>
                </div>

                <div className="form-group">
                    <a className="btn btn-warning" id="cancelButton" href="/">Cancel</a>

                    <input type="submit" value="Save" className="btn btn-primary" onClick={this.props.onSave}
                           disabled={!this.props.isValid}/>
                </div>
            </div>
        );
    }
});

export default OrderHeaderEdit;

