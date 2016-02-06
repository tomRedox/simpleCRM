import React from 'react';

Dashboard = React.createClass({

    render() {

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <p className="lead"><h3>Dashboard <i className="fa fa-dashboard"></i></h3></p>
                    </div>
                </div>
                <CustomersList/>
            </div>
        );
    }

})

module.exports = Dashboard;
