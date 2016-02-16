import React from 'react';

const OrderLineEdit = React.createClass({
    propTypes: {
        orderLine: React.PropTypes.object,
        onChange: React.PropTypes.func.isRequired,
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
        var field = event.target.name;
        var value = event.target.value;

        this.props.onChange(this.props.orderLine._id, field, value);
    },

    deleteLine() {
        this.props.deleteOrderLine(this.props.orderLine._id);
    },


    render() {
        //console.log("OrderLineEdit props: ", this.props);
        let deleteButton;

        // only show the delete button if we are passed in a delete method
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

                <div className="form-group">
                    <label>Line Value:</label>
                    <label>{this.props.orderLine.unitPrice * this.props.orderLine.quantity}</label>
                </div>

                {deleteButton}
            </div>
        );
    }
});

export default OrderLineEdit;
