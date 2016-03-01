import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools.jsx';
import { configureStore } from './store.jsx';
import CustomerContainer from '../customers/CustomerContainer.jsx';
import Actions from '../redux/action_creators.jsx';

export const ReduxContainer = React.createClass({


    render() {
        console.log("ReduxContainer.render()", this.props);

        //const store = configureStore();
        console.log("ReduxContainer.render() store", this.store);

        return (
            <div>
                <h1>"Hi</h1>

                <Provider store={store}>
                    <div>
                        <CustomerContainer store={store}/>
                        <DevTools />
                    </div>
                </Provider>

            </div>

        );
    }
});


module.exports = ReduxContainer;

