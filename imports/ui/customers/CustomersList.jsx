import React from 'react';
import accounting from 'accounting';

const CustomersList = React.createClass({
    propTypes: {
        customers: React.PropTypes.array.isRequired
    },

    renderCustomerListItems() {
        //console.log("customers2", this.props.customers)

        return this.props.customers.map((customer) => {

            return (

                <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.postcode}</td>
                    <td>{customer.ordersCount}</td>
                    <td>{accounting.formatMoney(customer.ordersTotalValue, "£")}</td>
                    <td><a className="btn btn-default btn-sm" href={"/customers/" + customer._id}>Edit</a></td>
                </tr>

            );
        });
    },

    render() {
        //console.log("customers2", this.props.customers)

        return (
            <table className="table table-responsive table-striped">
                <tbody>
                <tr>
                    <th>Customer name</th>
                    <th>Postcode</th>
                    <th>No. orders</th>
                    <th>Total spend</th>
                    <th></th>
                </tr>
                {this.renderCustomerListItems()}
                </tbody>
            </table>
        );
    }
});

export default CustomersList;
