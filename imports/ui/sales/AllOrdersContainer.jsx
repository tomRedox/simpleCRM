import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Orders from '../../api/orders/order';
import OrdersList from './OrdersList.jsx';
import PaginatedPanel from '../components/PaginatedPanel.jsx';

//import { toggleExpanded } from '../redux/order-list-actions.jsx';

//const MINIMISED_RECORD_COUNT = 3;
//const EXPANDED_RECORD_COUNT = 9;

const AllOrdersContainer = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        //console.log("getMeteorData()");

        var data = {};

        var handle = Meteor.subscribe('Orders.public');

        if (handle.ready()) {
            //console.log("orders", orders);
            data.orders = Orders.find(
                {},
                {
                    sort: {createdAt: -1},
                    //limit: this.getRecordsToShow()
                }
            ).fetch();
        }

        data.dataReady = handle;
        return data;
    },

    //getRecordsToShow() {
    //    let recordsToShow = MINIMISED_RECORD_COUNT;
    //    if (this.props.expanded) {
    //        recordsToShow = EXPANDED_RECORD_COUNT;
    //    }
    //    return recordsToShow;
    //},

    render() {
        console.log("OrdersListWrapper.render() ");

        return (
            <PaginatedPanel
                //expanded={this.props.expanded}
                //toggleExpanded={this.props.toggleExpanded}
                parentGotData={this.data.dataReady}
                panelTitle = "All orders"
                itemType = "order"
                newItemLink ="/addOrder"
                allItemsLink ="/"
            >
                <OrdersList
                    orders={this.data.orders ? this.data.orders : []}
                />
            </PaginatedPanel>
        );
    }
});

AllOrdersContainer.propTypes = {
    //expanded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    console.log("TopOrdersContainer.mapStateToProps", state)
    return {
        //expanded: state.userInterface.orderList.expanded
    };
}

export default connect(mapStateToProps, {
    //toggleExpanded
})(AllOrdersContainer);
