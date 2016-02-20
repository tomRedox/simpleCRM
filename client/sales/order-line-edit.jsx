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
                <div className="form-group">
                    <input
                        type="button"
                        className="btn btn-warning"
                        id="deleteOrderLineButton"
                        onClick={this.deleteLine}
                        value="Delete line"
                    />
                </div>;
        }

        return (
            <div >

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

                <NumberInput
                    name="quantity"
                    onChange={this.handleChange}
                    value={this.props.orderLine.quantity}
                    error={this.props.errors.quantity}
                />

                <NumberInput
                    name="unitPrice"
                    onChange={this.handleChange}
                    value={this.props.orderLine.unitPrice}
                    error={this.props.errors.unitPrice}
                />

                <div className="form-group">
                    <label>Line value:</label>
                    <label>{this.props.orderLine.unitPrice * this.props.orderLine.quantity}</label>
                </div>

                {deleteButton}
            </div>
        );
    }
});

export default OrderLineEdit;
