import React from 'react';

import Orders from '../../api/orders/order';
import OrdersListItem from './orders-list-item.jsx';
import ModalMessageBox from '../controls/modal-message-box.jsx';
import Collapse from 'react-collapse';
import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';


const OrdersList = React.createClass({
    propTypes: {
        orders: React.PropTypes.array.isRequired,
        expanded: React.PropTypes.bool.isRequired,
        toggleExpanded: React.PropTypes.func.isRequired
    },

    animationDuration: 500,

    shouldComponentUpdate() {
        // Don't re-render if there are no records, which there won't be
        // after the first render (when the initial subscription happens
        // and before the data is actually retrieved)
        return (this.props.orders.length === 0);
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

    renderShowMoreToggle() {
        //console.log("OrdersList.renderShowMoreToggle() - this:", this);
        //console.log("OrdersList.renderShowMoreToggle() - state:", this.state);

        var arrowAnimation = {
            rotateX: this.props.expanded ? 180 : 0//,
            //transformOriginY: [ '42%', '42%' ]
        };

        let getLabel = function () {
            if (this.props.expanded) {
                return " Show less";
            }
            return " Show more";
        }.bind(this);

        return (
            <div className="device-toggle" onClick={this.props.toggleExpanded}>
                <div className="device-icon icon huge"></div>
                {getLabel()}<span> </span>
                <VelocityComponent duration={this.animationDuration * 1.5} animation={arrowAnimation}>
                    <i className="fa fa-arrow-down"/>
                </VelocityComponent>
            </div>
        );
    },

    render() {
        console.log("OrdersList render");
        var transitionAnimation = {
            rotateX: this.props.expanded ? 360 : 0//,
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
                        <Collapse isOpened={true} keepCollapsedContent={false}>
                            <div style={{padding: 10}}>
                                <VelocityComponent duration={this.animationDuration}
                                                   animation={transitionAnimation}
                                >
                                    {this.renderOrderTable()}
                                </VelocityComponent>
                            </div>
                        </Collapse>
                        {this.renderShowMoreToggle()}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = OrdersList;



//renderTest() {
//    if (this.props.expanded) {
//        return (
//            <div>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//            </div>
//        );
//    }
//
//    return (
//        <div>
//            <p>p</p>
//            <p>p</p>
//            <p>p</p>
//            <p>p</p>
//            <p>p</p>
//        </div>
//    );
//},
