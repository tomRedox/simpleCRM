import React from 'react';

import Orders from '../../api/orders/order';
import OrdersListItem from './orders-list-item.jsx';
import ModalMessageBox from '../controls/modal-message-box.jsx';
import { VelocityComponent } from 'velocity-react';
import LoadingCrossfadeComponent from '../controls/loading-crossfade-component.jsx';


const OrdersList = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    getInitialState() {
        console.log("OrdersList.getInitialState() ");

        return {
            expanded: false,
            duration: 500
        };
    },

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {

        var data = {};

        var numberToReturn = 3;
        if (this.state.expanded) {
            numberToReturn = 6;
        }

        var handle = Meteor.subscribe('Orders.topOrders', numberToReturn);
        if (handle.ready()) {
            //console.log("orders", orders);
            data.orders = Orders.find(
                {},
                {
                    sort: {totalValue: -1},
                    limit: numberToReturn
                }
            ).fetch();
        }

        return data;
    },

    renderOrderListItems() {
        //console.log("orders2", this.data.orders)

        // Don't render until we have data to render
        if (!this.data.orders) {
            return;
        }

        // Get tasks from this.data.tasks
        return this.data.orders.map((order) => {

            return (
                <OrdersListItem order={order} key={order._id}/>
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
                    <th>Total</th>
                    <th></th>
                    <th></th>
                </tr>
                    {this.renderOrderListItems()}
                </tbody>
            </table>
        );
    },

    renderDeviceToggle() {
        console.log("OrdersList.renderDeviceToggle() - this:", this);
        console.log("OrdersList.renderDeviceToggle() - state:", this.state);

        var arrowAnimation = {
            rotateX: this.state.expanded ? 180 : 0//,
            //transformOriginY: [ '42%', '42%' ]
        };

        let toggleState = function () {
            console.log("in toggleState: this: ", this)
            this.setState({expanded: !this.state.expanded});
        }.bind(this);

        let getLabel = function () {
            if (this.state.expanded) {
                return " Show less";
            }
            return " Show more";
        }.bind(this);


        return (
            <div className="device-toggle" onClick={toggleState}>
                <div>{console.log("in return: this: ", this)}</div>
                <div className="device-icon icon huge"></div>
                {getLabel()}<span> </span>
                <VelocityComponent duration={300} animation={arrowAnimation}>
                    <i className="fa fa-arrow-down"/>
                </VelocityComponent>
            </div>
        );
    },


    render() {
        //console.log("OrdersList render - state:", this);

        var transitionAnimation = {
            rotateY: this.state.expanded ? 360 : 0 //,
            //transformOriginY: ['42%', '42%']
        };

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="pull-right text-right">
                            <p><a href="/addOrder" className="pull-right">New order </a></p>
                            <p><a href="#"> View all</a></p>
                        </div>
                        <h4>Top orders</h4>
                    </div>
                    <div className="panel-body">
                        <VelocityComponent duration={300} animation={transitionAnimation}>
                            {this.renderOrderTable()}
                        </VelocityComponent>
                        {this.renderDeviceToggle()}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = OrdersList;
