import React from 'react';
import ReactDOM from 'react-dom';
import accounting from 'accounting';

import ModalMessageBox from '../components/ModalMessageBox1.jsx';


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

//data-toggle="modal" href="#primary"

export default OrdersListItem;