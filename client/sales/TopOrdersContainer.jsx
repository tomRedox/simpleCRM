/*
 This class was added to allow the react animations to work correctly on the list.
 The issue was that render is called twice on the list, once with no data and then
 again when the data is present.  That was stopping the animations working, so
 broke the data retrieval out into a separate wrapper so that then on the child
 we can use shouldComponentUpdate to set whether the render should occur.
 */

import React, { Component, PropTypes } from 'react';

import Orders from '../../api/orders/order';
import OrdersList from './orders-list.jsx';
import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';
import { toggleExpanded } from '../redux/order-list-actions.jsx';

const MINIMISED_RECORD_COUNT = 3;
const EXPANDED_RECORD_COUNT = 9;

const TopOrdersContainer = React.createClass({

    getInitialState() {
        return {
            expanded: false,
            recordsToShow: MINIMISED_RECORD_COUNT,
            showChild: false
        };
    },

    // This mixin makes the getMeteorData method work
    mixins: [ ReactMeteorData ],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        //console.log("getMeteorData()");

        var data = {};

        var handle = Meteor.subscribe('Orders.topOrders', this.getRecordsToShow());

        if (handle.ready()) {
            //console.log("orders", orders);
            data.orders = Orders.find(
                {},
                {
                    sort: {totalValue: -1},
                    limit: this.getRecordsToShow()
                }
            ).fetch();
        }

        data.dataReady = handle;
        return data;
    },

    getRecordsToShow() {
        let recordsToShow = MINIMISED_RECORD_COUNT;
        if (this.props.expanded) {
            recordsToShow = EXPANDED_RECORD_COUNT;
        }
        return recordsToShow;
    },

    render() {
        console.log("OrdersListWrapper.render() ");

        // Get tasks from this.data.tasks
        return (
            <OrdersList
                orders={this.data.orders ? this.data.orders : []}
                expanded={this.props.expanded}
                toggleExpanded={this.props.toggleExpanded}
                parentGotData={this.data.dataReady}
            />
        );
    }
});


TopOrdersContainer.propTypes = {
    //orders: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    console.log("TopOrdersContainer.mapStateToProps", state)
    return {
        expanded: state.userInterface.orderList.expanded
    };
}

export default connect(mapStateToProps, {
    toggleExpanded
})(TopOrdersContainer);




//return (
//    <VelocityTransitionGroup
//
//        enter={{animation: "fadeIn"}}
//        leave={{animation: "fadeOut"}}
//        duration={1500}
//    >
//        { this.state.showChild ?
//            <OrdersList
//                orders={this.data.orders ? this.data.orders : []}
//                expanded={this.props.expanded}
//                toggleExpanded={this.toggleExpanded}
//            /> :
//            undefined
//        }
//
//    </VelocityTransitionGroup>
//
//);