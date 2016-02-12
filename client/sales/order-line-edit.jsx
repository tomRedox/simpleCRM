import React from 'react';

const OrderLineEdit = React.createClass({
    propTypes: {
        orderLine: React.PropTypes.object,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    handleChange(event) {
        var field = event.target.name;
        var value = event.target.value;

        this.props.onChange(this.props.orderLine._id, field, value);
    },

    render() {
        //console.log("OrderLineEdit props: ", this.props);

        return (
            <div >

                <TextInput
                    name="description"
                    label="Description"
                    onChange={this.handleChange}
                    placeholder="Description"
                    value={this.props.orderLine.description}
                    error={this.props.errors.description}
                />

                <NumberInput
                    name="quantity"
                    label="Quantity"
                    onChange={this.handleChange}
                    value={this.props.orderLine.quantity}
                    error={this.props.errors.quantity}
                />


                <NumberInput
                    name="unitPrice"
                    label="UnitPrice"
                    onChange={this.handleChange}
                    value={this.props.orderLine.unitPrice}
                    error={this.props.errors.unitPrice}
                />

                <label>Line Value:</label>
                <label>{this.props.orderLine.unitPrice * this.props.orderLine.quantity}</label>

            </div>
        );
    }
});

export default OrderLineEdit;
