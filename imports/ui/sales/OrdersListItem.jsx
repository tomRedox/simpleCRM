import React from 'react';
import ReactDOM from 'react-dom';
import accounting from 'accounting';
import Alert from 'react-s-alert';

import ModalMessageBox from '../components/ModalMessageBox.jsx';


const OrdersListItem = React.createClass({
    propTypes: {
        order: React.PropTypes.object
    },

    deleteOrder() {
        //console.log("Deleting order ", this.props.order._id);

        Meteor.call('Orders.methods.remove', {
            orderId: this.props.order._id
        }, (err, res) => {
            if (err) {
                Alert.error(err);
            } else {
                Alert.success("Order deleted successfully");
            }
        });
    },

    render() {
         return (
            //console.log("orders2", this.data.orders)

             <tr key={this.props.order._id}>
                <td>{this.props.order.createdAt.toLocaleDateString()}</td>
                <td>{this.props.order.customerName}</td>
                <td>{accounting.formatMoney(this.props.order.totalValue, '£')}</td>
                <td>
                    <a className="btn btn-warning btn-sm" data-toggle="modal" data-target="#modalMessageBox">Delete</a>
                    <ModalMessageBox
                        title="Delete order?"
                        message="This action cannot be undone."
                        onConfirmAction={this.deleteOrder}
                        contextualClass = "danger"
                    />
                </td>
                <td><a className="btn btn-default btn-sm" href={"/orders/" + this.props.order._id}>Edit</a></td>
            </tr>
        );
    }
});

export default OrdersListItem;