/*
 This class was added to allow the react animations to work correctly on the list.
 The issue was that render is called twice on the list, once with no data and then
 again when the data is present.  That was stopping the animations working, so
 broke the data retrieval out into a separate wrapper so that then on the child
 we can use shouldComponentUpdate to set whether the render should occur.
 */

import React from 'react';

import Orders from '../../api/orders/order';
import OrdersList from './orders-list.jsx';


const OrdersListWrapper = React.createClass({

    getInitialState() {
        return {
            expanded: false,
            recordsToShow: 3
        };
    },

    // This mixin makes the getMeteorData method work
    mixins: [ ReactMeteorData ],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        console.log("getMeteorData()");

        var data = {};

        var handle = Meteor.subscribe('Orders.topOrders', this.state.recordsToShow);

        if (handle.ready()) {
            //console.log("orders", orders);
            data.orders = Orders.find(
                {},
                {
                    sort: {totalValue: -1},
                    limit: this.state.recordsToShow
                }
            ).fetch();
        }

        data.customerLoading = handle ? !handle.ready() : {}
        return data;
    },


    toggleExpanded() {
        console.log("toggleExpanded(): this.state.expanded 1: ", this.state.expanded);

        this.state.expanded = !this.state.expanded;

        console.log("toggleExpanded(): this.state.expanded 2: ", this.state.expanded);

        let recordsToShow = 3;
        if (this.state.expanded) {
            recordsToShow = 6;
        }

        this.setState({recordsToShow});
        //this.props.updateNumberRecordsToShow(recordsToShow);
    },

    render() {
        console.log("OrdersListWrapper.render() ");

        // Get tasks from this.data.tasks
        return (


            <OrdersList
                orders={this.data.orders ? this.data.orders : []}
                expanded={this.state.expanded}
                toggleExpanded={this.toggleExpanded}
            />

        );
    }
});

module.exports = OrdersListWrapper;
