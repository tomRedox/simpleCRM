/*
 This class was added to allow the react animations to work correctly on the list.
 The issue was that render is called twice on the list, once with no data and then
 again when the data is present.  That was stopping the animations working, so
 broke the data retrieval out into a separate wrapper so the list will always have
 data to work with.
 */

import React from 'react';

import Orders from '../../api/orders/order';
import OrdersList from './orders-list.jsx';
import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';
import Collapse from 'react-collapse';

const OrdersListWrapper = React.createClass({

    getInitialState() {
        return {
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


    updateNumberRecordsToShow(recordsToShow) {
        console.log("updateNumberRecordsToShow", recordsToShow)
        this.setState({recordsToShow});
    },

    render() {
        console.log("OrdersListWrapper.render() ");

        // Get tasks from this.data.tasks
        return (


            <OrdersList
                orders={this.data.orders ? this.data.orders : []}
                updateNumberRecordsToShow={this.updateNumberRecordsToShow}
                recordsToShow={this.state.recordsToShow}
            />

        );
    }
});

module.exports = OrdersListWrapper;

//{this.state.expanded ? undefined : <div><OrdersList recordsToShow={recordsToShow}/></div> }
//{this.state.expanded ? <div><OrdersList recordsToShow={recordsToShow}/></div> : undefined }

//{this.state.expanded ?
//    <div><OrdersList recordsToShow={recordsToShow}/></div> :
//    <div><OrdersList recordsToShow={recordsToShow}/></div>
//}

//<div><OrdersList recordsToShow={recordsToShow}/></div>

//{this.state.expanded ? <div><OrdersList recordsToShow={recordsToShow}/></div>
//    : <div><OrdersList recordsToShow={recordsToShow}/></div> }

//<VelocityTransitionGroup component="div"
//                         enter={{animation: 'slideDown', duration: this.state.duration, style: {height: ''}}}
//                         leave={{animation: 'slideUp', duration: this.state.duration}}
//>
//    {this.state.expanded ? undefined : <div><OrdersList recordsToShow={recordsToShow}/></div> }
//    {this.state.expanded ? <div><OrdersList recordsToShow={recordsToShow}/></div> : undefined }
//</VelocityTransitionGroup>
//{this.renderDeviceToggle()}