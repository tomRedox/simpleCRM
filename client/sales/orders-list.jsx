import React from 'react';

import Orders from '../../api/orders/order';
import OrdersListItem from './orders-list-item.jsx';
import ModalMessageBox from '../controls/modal-message-box.jsx';


const OrdersList = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ ReactMeteorData ],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {

        var data = {};

        var handle = Meteor.subscribe('Orders.topOrders');
        if (handle.ready()) {
            //console.log("orders", orders);
            data.orders = Orders.find().fetch();
        }

        return data;
    },

    renderOrderListItems() {
        //console.log("orders2", this.data.orders)

        // Get tasks from this.data.tasks
        return this.data.orders.map((order) => {

            return (
                <OrdersListItem order = {order} key={order._id}/>
            );
        });
    },

    renderOrderTable() {
        //console.log("orders2", this.data.orders)

        // Get tasks from this.data.tasks
        return (
            <table className="table table-responsive table-striped">
                <tbody>
                <tr>
                    <th>Order Date</th>
                    <th>Customer</th>
                    <th>Notes</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                </tr>
                {this.renderOrderListItems()}
                </tbody>
            </table>
        );
    },

    render() {
        console.log("OrdersList render");

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="pull-right text-right">
                            <p><a href="/addOrder" className="pull-right">New Order </a></p>
                            <p><a href="#"> View all</a></p>
                        </div>
                        <h4>Top Orders</h4>
                    </div>
                    <div className="panel-body">
                        { this.data.orders ?
                            this.renderOrderTable() :
                            <p>Loading</p> }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = OrdersList;
