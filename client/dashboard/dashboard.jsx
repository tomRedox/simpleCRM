import React from 'react';
import OrdersList from '../sales/OrdersList.jsx';
import TopOrdersContainer from '../sales/TopOrdersContainer.jsx';
import CustomersList from '../customers/customers-list.jsx';
import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';
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
                < CustomersList />
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
