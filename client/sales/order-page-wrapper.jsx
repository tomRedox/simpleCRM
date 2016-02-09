
//var TextInput = require('./textInput');

var React = require('react');

import OrderPage from './order-page.jsx';
//import { createHistory, useBasename } from 'history'

//const history = useBasename(createHistory)({
//    basename: '/'
//});

// Top of the stack, represents the whole page
const OrderPageWrapper = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        //console.log("OrderEditForm.getMeteorData");

        const orderId = FlowRouter.getParam('_id');
        //console.log("orderId", orderId)
        var order;
        var handle;

        const newOrder = !orderId;

        if (!newOrder) {
            handle = Meteor.subscribe('OrderCompany.get', orderId);
            order = Orders.findOne({_id: orderId});
        } else {
            // Create an empty new record
            order = {
                orderLines: [],
                createdAt: Date()
            }
        }

        //console.log("OrderEditForm.getMeteorData cust ", cust);

        return {
            orderLoading: handle ? !handle.ready() : {},
            order: order,
            orderId: orderId,
            newOrder: newOrder
        };
    },

    // this code could be moved down to the OrderEditPage, but it seems cleaner
    // to keep all the db access in one place.  This also effectively separates the child
    // component from the data access which may be good for disconnected data scenarios
    saveOrder(order) {
        console.log("submitted order: ", order);

        const orderId = FlowRouter.getParam('_id');

        // call the method for upserting the data
        //Orders.methods.updateManualForm.call({
        //    orderId: orderId,
        //    data: order
        //}, (err, res) => {
        //    //console.log ("OrderCompanies.methods.updateManualForm.call was called");
        //    if (err) {
        //        sAlert.error(err.message);
        //    } else {
        //        sAlert.success("Save successful");
        //        FlowRouter.go("/");
        //    }
        //});

    },

    render() {
        //console.log("render started", this.data.order)
        if (!this.data.newOrder && this.data.orderLoading) {
            return ( <h3>Loading Order</h3> );
        }
        return (
            <OrderEditPage
                order={this.data.order}
                onSave={this.saveOrder}
            />
        );
    }
});

module.exports = OrderPageWrapper;