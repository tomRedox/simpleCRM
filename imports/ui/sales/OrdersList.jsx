import React from 'react';

import OrdersListItem from './OrdersListItem.jsx';

const OrdersList = React.createClass({
    propTypes: {
        orders: React.PropTypes.array.isRequired
    },

    renderOrderListItems() {
        //console.log("orders2", this.data.orders)

        // Get tasks from this.data.tasks
        return this.props.orders.map((order) => {
            return (
                <OrdersListItem order={order} key={order._id}/>
            );
        });
    },

    render() {
        //console.log("orders2", this.data.orders)

        // Get tasks from this.data.tasks
        return (
            <table className="table table-responsive table-striped">
                <tbody>
                <tr>
                    <th>Order Date</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                </tr>
                {this.renderOrderListItems()}
                </tbody>
            </table>
        );
    },

 });

export default OrdersList;
