// App component - represents the whole app

import React from 'react';
import Orders from '../../api/orders/order';

//import { Link } from 'react-router';

const OrdersList = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ ReactMeteorData ],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {

        var data = {};

        var handle = Meteor.subscribe('Orders.public');
        if (handle.ready()) {
            const orders = Orders.find().fetch();
            //console.log("orders", orders);
            data.orders = orders;
        }

        return data;
    },



    renderOrderTable() {
        //console.log("orders2", this.data.orders)

        // Get tasks from this.data.tasks
        return (
            <table className="table table-responsive table-striped">
                <tbody>
                <tr>
                    <th>Delivery Add 1</th>
                    <th>Notes</th>
                    <th></th>
                </tr>
                {this.renderOrderListItems()}
                </tbody>
            </table>
        );
    },

    renderOrderListItems() {
        //console.log("orders2", this.data.orders)

        // Get tasks from this.data.tasks
        return this.data.orders.map((order) => {

            return (

                <tr key={order._id}>
                    <td>{order.deliveryAddress1}</td>
                    <td>{order.notes}</td>
                    <td><a className="btn btn-default btn-sm" href={"/orders/" + order._id}>Edit</a></td>
                </tr>

            );
        });
    },



    render() {
        return (
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
        );
    }
});

module.exports = OrdersList;
