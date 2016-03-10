import React from 'react';//
import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';

import TopOrdersContainer from '../sales/TopOrdersContainer.jsx';
import TopCustomersContainer from '../customers/TopCustomersContainer.jsx';

import store from '../redux/store.jsx';


const Content = React.createClass({

    render() {
        return (
            <div key="dashboard">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h3><i className="fa fa-dashboard"/> simple crm dashboard </h3>
                    </div>
                </div>
                < TopOrdersContainer store={store} />
                < TopCustomersContainer store={store} />
            </div>
        );
    }
});


const Dashboard = React.createClass({

    getInitialState() {
        return {
            showChild: false
        };
    },

    render() {
        return (
            <Content />
        );
    }
});

export default Dashboard;
