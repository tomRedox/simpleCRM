import React from 'react';

import Orders from '../../api/orders/order';
import OrdersListItem from './orders-list-item.jsx';
import ModalMessageBox from '../controls/modal-message-box.jsx';
import Collapse from 'react-collapse';
import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';

const OrdersList = React.createClass({
    propTypes: {
        orders: React.PropTypes.array.isRequired,
        recordsToShow: React.PropTypes.number.isRequired,
        updateNumberRecordsToShow: React.PropTypes.func.isRequired
    },

    getInitialState() {
        console.log("OrdersList.getInitialState() ");

        return {
            expanded: false,
            duration: 500,
            ready: false,
            isOpened: false, keepContent: false, paragraphs: 0
        };
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

    shouldComponentUpdate() {
        return (this.props.orders.length === 0);
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

    renderTest() {
        if (this.state.expanded) {
            return (
                <div>
                    <p>p</p>
                    <p>p</p>
                    <p>p</p>
                    <p>p</p>
                    <p>p</p>
                    <p>p</p>
                    <p>p</p>
                    <p>p</p>
                    <p>p</p>
                </div>
            );
        }

        return (
            <div>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
            </div>
        );
    },


    toggleState() {
        console.log("toggleState(): this.state.expanded 1: ", this.state.expanded);

        this.state.expanded = !this.state.expanded;

        console.log("toggleState(): this.state.expanded 2: ", this.state.expanded);

        let recordsToShow = 3;
        if (this.state.expanded) {
            recordsToShow = 6;
        }

        this.props.updateNumberRecordsToShow(recordsToShow);
    },

    renderDeviceToggle() {
        //console.log("OrdersList.renderDeviceToggle() - this:", this);
        //console.log("OrdersList.renderDeviceToggle() - state:", this.state);

        var arrowAnimation = {
            rotateX: this.state.expanded ? 180 : 0//,
            //transformOriginY: [ '42%', '42%' ]
        };

        let getLabel = function () {
            if (this.state.expanded) {
                return " Show less";
            }
            return " Show more";
        }.bind(this);


        return (
            <div className="device-toggle" onClick={this.toggleState}>
                <div className="device-icon icon huge"></div>
                {getLabel()}<span> </span>
                <VelocityComponent duration={300} animation={arrowAnimation}>
                    <i className="fa fa-arrow-down"/>
                </VelocityComponent>
            </div>
        );
    },

    render() {
        console.log("OrdersList render");
        var arrowAnimation = {
            rotateX: this.state.expanded ? 360 : 0//,
            //transformOriginY: [ '42%', '42%' ]
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
                        <Collapse

                            isOpened={true}
                            keepCollapsedContent={false}>
                            <div style={{padding: 10}}>
                                <VelocityComponent duration={this.state.duration} animation={arrowAnimation}>

                                {this.renderOrderTable()}
                                    </VelocityComponent>
                            </div>
                        </Collapse>
                        {this.renderDeviceToggle()}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = OrdersList;
