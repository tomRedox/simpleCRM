import React from 'react';

import TopOrdersContainer from '../sales/TopOrdersContainer.jsx';
import TopCustomersContainer from '../customers/TopCustomersContainer.jsx';

import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';
import store from '../redux/store.jsx';

import RaisedButton from 'material-ui/lib/raised-button';


const Content = React.createClass({

    render() {
        return (
            <div key="dashboard">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h3><i className="fa fa-dashboard"/> simple crm dashboard </h3>
                    </div>
                </div>
                <RaisedButton label="Default" />
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

//return (
//    <Content />
//);

//return (
//    <VelocityTransitionGroup
//        runOnMount={true}
//        enter={{animation: "fadeIn"}}
//        leave={{animation: "fadeOut"}}
//        duration={500}
//    >
//        <Content />
//    </VelocityTransitionGroup>
//);
//}
