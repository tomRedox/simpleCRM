import React from 'react';
import AsyncSelectInput from '../controls/asyncSelectInput.jsx';
import Products from '../../api/products/products';

const OrderLineEdit = React.createClass({
    propTypes: {
        orderLine: React.PropTypes.object,
        onChange: React.PropTypes.func.isRequired,
        onProductChange: React.PropTypes.func.isRequired,
        deleteOrderLine: React.PropTypes.func,
        errors: React.PropTypes.object.isRequired
    },

    getInitialState() {
        console.log("OrderPage.getInitialState", this.props);

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
            _id: this.props.orderLine.productId ? this.props.orderLine.productId : '',
            name: this.props.orderLine.description
        };

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
                />
        }

        return (

            <tr key={this.props.orderLine._id}>

                <td data-th="Product" className="row col-sm-10">
                    <AsyncSelectInput
                        name="productId"
                        label="Product"
                        value={value}
                        onChange={this.handleProductChange}
                        error={this.props.errors.productId}
                        loadOptions={this.getProducts}
                        valueKey="_id"
                        labelKey="name"
                        hideLabel={true}
                    />

                </td>
                <td data-th="Quantity">
                    <NumberInput
                        name="quantity"
                        onChange={this.handleChange}
                        value={this.props.orderLine.quantity}
                        error={this.props.errors.quantity}
                        hideLabel={true}
                    />
                </td>

                <td data-th="Unit Price">
                    <NumberInput
                        name="unitPrice"
                        onChange={this.handleChange}
                        value={this.props.orderLine.unitPrice}
                        error={this.props.errors.unitPrice}
                        hideLabel={true}
                    />
                </td>

                <td data-th="Sub Total" className="form-group">
                    <p>{this.props.orderLine.unitPrice * this.props.orderLine.quantity}</p>
                </td>

                <td className="actions" data-th="">
                    {deleteButton}
                </td>
            </tr>

        );
    }
});

export default OrderLineEdit;
