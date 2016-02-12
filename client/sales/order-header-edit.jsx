import React from 'react';

const OrderHeaderEdit = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object.isRequired,
        isValid: React.PropTypes.bool
    },

    render() {
        //console.log("OrderHeaderEdit props: ", this.props);

        return (

            <div>
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

                        <label name="orderTotal" value={this.props.order.totalValue} />

                        <a className="btn btn-warning" id="cancelButton" href="/">Cancel</a>

                        <input
                            type="submit"
                            value="Save"
                            className="btn btn-primary"
                            onClick={this.props.onSave}
                            disabled={!this.props.isValid}
                        />

            </div>
        );
    }
});

export default OrderHeaderEdit;
