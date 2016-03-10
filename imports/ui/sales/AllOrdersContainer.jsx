import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Orders from '../../api/orders/order';
import OrdersList from './OrdersList.jsx';
import PaginatedPanel from '../components/PaginatedPanel.jsx';


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

    render() {
        //console.log("OrdersListWrapper.render() ");

        return (
            <PaginatedPanel
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

AllOrdersContainer.propTypes = {};

function mapStateToProps(state) {
    //console.log("TopOrdersContainer.mapStateToProps", state)
    return {};
}

export default connect(mapStateToProps, {})(AllOrdersContainer);
