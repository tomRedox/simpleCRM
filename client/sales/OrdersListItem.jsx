import React from 'react';
import ReactDOM from 'react-dom';
import accounting from 'accounting';

import ModalMessageBox from '../controls/modal-message-box.jsx';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const OrdersListItem = React.createClass({
    propTypes: {
        order: React.PropTypes.object
    },

    deleteOrder() {
        console.log("Deleting order ", this.props.order._id);
        Meteor.call('Orders.methods.remove', {
            orderId: this.props.order._id
        }, (err, res) => {
            if (err) {
                sAlert.error(err);
            } else {
                sAlert.success("Order deleted successfully");
            }
        });
    },

    render() {
        //Modal.setAppElement('#app');

        return (
            //console.log("orders2", this.data.orders)
            <TableRow key={this.props.order._id}>
                <TableRowColumn >{this.props.order.createdAt.toLocaleDateString()}</TableRowColumn >
                <TableRowColumn >{this.props.order.customerName}</TableRowColumn >
                <TableRowColumn >{accounting.formatMoney(this.props.order.totalValue, '£')}</TableRowColumn >
                <TableRowColumn >
                    <a className="btn btn-warning btn-sm" data-toggle="modal" data-target="#modalMessageBox">Delete</a>
                </TableRowColumn >
                <TableRowColumn >
                    <a className="btn btn-default btn-sm" href={"/orders/" + this.props.order._id}>Edit</a>
                </TableRowColumn >
            </TableRow>
        );
    }
});

//data-toggle="modal" href="#primary"

export default OrdersListItem;

//<ModalMessageBox
//    title="Delete order?"
//    message="This action cannot be undone."
//    onConfirmAction={this.deleteOrder}
//    contextualClass = "danger"
///>