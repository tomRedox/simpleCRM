import React from 'react';
import AsyncSelectInput from '../controls/asyncSelectInput.jsx';
import Products from '../../api/products/products';
import accounting from 'accounting';

const OrderLineEdit = React.createClass({
    propTypes: {
        orderLine: React.PropTypes.object,
        onChange: React.PropTypes.func.isRequired,
        onProductChange: React.PropTypes.func.isRequired,
        deleteOrderLine: React.PropTypes.func,
        errors: React.PropTypes.object.isRequired
    },

    getInitialState() {
        //console.log("OrderLineEdit.getInitialState", this.props);

        return {
            errors: {},
            isValid: false
        };
    },

    handleChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.props.onChange(this.props.orderLine._id, field, value);
    },

    handleProductChange(selectedItem) {
        this.props.onProductChange(this.props.orderLine._id, selectedItem);
    },

    deleteLine() {
        this.props.deleteOrderLine(this.props.orderLine._id);
    },

    getProducts: function getProducts(input) {
        console.log("OrderHeaderEdit.getProducts()", input);
        const handle = Meteor.subscribe('Products.searchByName', input);
        return Products.find().fetch();
    },

    render() {
        //console.log("OrderLineEdit props: ", this.props);

        const value = {
            _id: this.props.orderLine.productId ? this.props.orderLine.productId : null,
            name: this.props.orderLine.description
        };


        let errors = {};
        if (this.props.errors) {
            errors = this.props.errors;
        }

        // only show the delete button if we are passed in a delete method
        let deleteButton;
        if (this.props.deleteOrderLine) {
            deleteButton =
                <input
                    type="button"
                    className="btn btn-warning"
                    id="deleteOrderLineButton"
                    onClick={this.deleteLine}
                    value="Delete line"
                />;
        }

        return (

            <tr key={this.props.orderLine._id}>

                <td data-th="Product" className="row col-sm-10 numeric">
                    <AsyncSelectInput
                        name="productId"
                        label="Product"
                        value={value}
                        onChange={this.handleProductChange}
                        error={errors.productId}
                        loadOptions={this.getProducts}
                        valueKey="_id"
                        labelKey="name"
                        hideLabel={true}
                    />

                </td>
                <td data-th="Quantity" className="numeric">
                    <NumberInput
                        name="quantity"
                        onChange={this.handleChange}
                        value={this.props.orderLine.quantity}
                        error={errors.quantity}
                        hideLabel={true}
                    />
                </td>

                <td data-th="Unit Price" className="numeric">
                    <NumberInput
                        name="unitPrice"
                        onChange={this.handleChange}
                        value={this.props.orderLine.unitPrice}
                        error={errors.unitPrice}
                        hideLabel={true}
                        isMoney={true}
                        decimalPlaces={2}
                    />
                </td>

                <td data-th="Sub Total" className="form-group numeric">
                    <p className="sub-total numeric">
                        {accounting.formatMoney(this.props.orderLine.unitPrice * this.props.orderLine.quantity, '£')}
                    </p>
                </td>

                <td className="actions" data-th="">
                    {deleteButton}
                </td>
            </tr>

        );
    }
});

export default OrderLineEdit;
