import React from 'react';
import OrdersList from '../sales/orders-list.jsx';

const Dashboard = React.createClass({

    render() {

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h3>Dashboard <i className="fa fa-dashboard"></i></h3>
                    </div>
                </div>
                <OrdersList/>
                <CustomersList/>
            </div>
        );
    }

});

export default Dashboard;
