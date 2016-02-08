
import OrderLineEdit from './order-line-edit.jsx';

var React = require('react');

// App component - represents the whole app
const OrderLinesList = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        onChildChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object.isRequired
    },


    renderOrderLines() {
        //console.log("customers2", this.data.customers)

        // Get tasks from this.data.tasks
        if (!this.props.order.orderLines) return;

        return this.props.order.orderLines.map((orderLine) => {

            return (

                <OrderLineEdit
                    key = {orderLine._id}
                    orderLine = {orderLine}
                    onChange = {this.props.onChildChange}
                    errors = {this.props.errors}
                />
            );
        });
    },


    render() {
        return (
            <div>
                {this.renderOrderLines()}
            </div>
        );
    }
});

export default OrderLinesList;
