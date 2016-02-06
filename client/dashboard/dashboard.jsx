import React from 'react';

const Dashboard = React.createClass({

    render() {

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h3>Dashboard <i className="fa fa-dashboard"></i></h3>
                    </div>
                </div>
                <CustomersList/>
            </div>
        );
    }

})

export default Dashboard;
