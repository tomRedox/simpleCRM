
import OrderLineEdit from './order-line-edit.jsx';

var React = require('react');

// App component - represents the whole app
const OrderLinesList = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        onChildChange: React.PropTypes.func.isRequired,
        deleteOrderLine: React.PropTypes.func,
        errors: React.PropTypes.object.isRequired
    },


    renderOrderLines() {
        //console.log("customers2", this.data.customers)

        // Get tasks from this.data.tasks
        if (!this.props.order.orderLines) { return; }

        return this.props.order.orderLines.map((orderLine) => {

            return (
                <div key={orderLine._id}>
                    <OrderLineEdit
                        orderLine={orderLine}
                        onChange={this.props.onChildChange}
                        deleteOrderLine={this.props.deleteOrderLine}
                        errors={this.props.errors}
                    />

                </div>
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
