import React from 'react';
import accounting from 'accounting';

import AsyncSelectInput from '../components/AsyncSelectInput.jsx';
import NumberInput from '../components/NumberInput.jsx';
import GridRow from '../components/grid/GridRow.jsx'
import GridColumn from '../components/grid/GridColumn.jsx'

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
        //console.log("OrderHeaderEdit.getProducts()", input);
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
                    className="btn btn-default"
                    id="deleteOrderLineButton"
                    onClick={this.deleteLine}
                    value="Delete"
                />;
        }

        return (

            <GridRow key={this.props.orderLine._id}>

                <GridColumn className="col-xs-12 col-sm-5">
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

                </GridColumn>
                <GridColumn className="col-xs-12 col-sm-2">
                    <NumberInput
                        name="quantity"
                        onChange={this.handleChange}
                        value={this.props.orderLine.quantity}
                        error={errors.quantity}
                        hideLabel={true}
                    />
                </GridColumn>

                <GridColumn className="col-xs-12 col-sm-2">
                    <NumberInput
                        name="unitPrice"
                        onChange={this.handleChange}
                        value={this.props.orderLine.unitPrice}
                        error={errors.unitPrice}
                        hideLabel={true}
                        isMoney={true}
                        decimalPlaces={2}
                    />
                </GridColumn>

                <GridColumn className="col-xs-12 col-sm-2">
                    <p className="sub-total numeric">
                        {accounting.formatMoney(this.props.orderLine.unitPrice * this.props.orderLine.quantity, '£')}
                    </p>
                </GridColumn>

                <GridColumn className="col-xs-12 col-sm-1">
                    {deleteButton}
                </GridColumn>
            </GridRow>

        );
    }
});

export default OrderLineEdit;
