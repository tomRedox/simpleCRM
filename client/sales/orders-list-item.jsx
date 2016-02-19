import React from 'react';
//import Modal from 'react-modal';




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
                sAlert(err);
            } else {
                // success!
            }
        });
    },

    render() {
        //Modal.setAppElement('#app');

        return (

            //console.log("orders2", this.data.orders)
            <tr key={this.props.order._id}>
                <td>{this.props.order.deliveryAddress1}</td>
                <td>{this.props.order.notes}</td>
                <td><a className="btn btn-warning btn-sm" data-toggle="modal" href="#primary">Delete</a></td>
                <td><a className="btn btn-default btn-sm" href={"/orders/" + this.props.order._id}>Edit</a></td>
            </tr>

        );
    }
});



export default OrdersListItem;