import React from 'react';
import OrdersList from '../sales/orders-list.jsx';
import OrdersListWrapper from '../sales/order-list-wrapper.jsx';
import CustomersList from '../customers/customers-list.jsx';

const Dashboard = React.createClass({

    render() {

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h3><i className="fa fa-dashboard"/> simple crm dashboard </h3>
                    </div>
                </div>
                <OrdersListWrapper />
                <CustomersList />
            </div>
        );
    }

});

export default Dashboard;
