import React from 'react';
import accounting from 'accounting';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const CustomersList = React.createClass({
    propTypes: {
        customers: React.PropTypes.array.isRequired
    },

    renderCustomerListItems() {
        //console.log("customers2", this.props.customers)

        return this.props.customers.map((customer) => {

            return (

                <TableRow key={customer._id}>
                    <TableRowColumn >{customer.name}</TableRowColumn >
                    <TableRowColumn >{customer.postcode}</TableRowColumn >
                    <TableRowColumn >{customer.ordersCount}</TableRowColumn >
                    <TableRowColumn >{accounting.formatMoney(customer.ordersTotalValue, "£")}</TableRowColumn >
                    <TableRowColumn ><a className="btn btn-default btn-sm" href={"/customers/" + customer._id}>Edit</a></TableRowColumn >
                </TableRow>

            );
        });
    },

    render() {
        //console.log("customers2", this.props.customers)

        return (
            <Table className="table table-responsive table-striped">
                <TableHeader displaySelectAll ={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Customer name</TableHeaderColumn>
                        <TableHeaderColumn>Postcode</TableHeaderColumn>
                        <TableHeaderColumn>No. orders</TableHeaderColumn>
                        <TableHeaderColumn>Total spend</TableHeaderColumn>
                        <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}  >
                {this.renderCustomerListItems()}
                </TableBody>
            </Table >
        );
    }
});

export default CustomersList;
