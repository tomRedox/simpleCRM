import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Provider } from 'react-redux';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
//import debugOnly from 'meteor/msavin:debugonly';  // not working on web deploy yet by the looks of things

import DevTools from '../redux/DevTools.jsx';
import GlobalSearch from '../search/GlobalSearch.jsx';

import store from '../redux/store.jsx';

import AccountsButton from '../security/accounts-button.jsx';


Meteor.subscribe("SalesRegions.All");
Meteor.subscribe("Orders.All");


const ContentContainer = React.createClass({
    render() {
        //console.log("ContentContainer.render()", this.props.children);

        return (
            <div key="contentContainer">
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="example"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {React.cloneElement(this.props.children, {
                        key: this.props.children.key
                    })}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

});

function renderDevTools() {
    //if (debugOnly) {
        return <DevTools /> ;
    //}
}

export const Layout = ({content}) => (
    <Provider store={store}>
        <div>

            <div id="wrapper">

            {/* Navigation */}
            <nav className="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
                {/* Nav Header */}
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">simple crm</a>

                </div>

                  {/* Left Side Nav - The Add Buttons */}
                    <ul className="nav navbar-nav">

                        <li>
                            <a href="/addOrder"><i className="fa fa-home"></i> Add Order</a>
                        </li>
                        <li>
                            <a href="/addCustomer" role="button" data-toggle="modal"><i className="fa fa-plus"></i> Add
                                Customer </a>
                        </li>

                    </ul>

                {/* Left Side Nav - Account buttons */}
                  <ul className="nav navbar-nav navbar-right">
                    <AccountsButton />
                  </ul>
                {/* /.navbar-header */}

                    {/* This is the sidebar.  It's inside the top nav somehow */}
                    <div className="navbar-default sidebar" role="navigation">
                        <div className="sidebar-nav navbar-collapse">
                            <ul className="nav" id="side-menu">

                                <li className="sidebar-search">
                                    <GlobalSearch />
                                </li>

                                <li className="active"><a href="/"><i className="fa fa-tachometer"/> Dashboard</a>
                                </li>
                                <li><a href="/allOrders"><i className="fa fa-file-text"/> Orders</a></li>
                                <li><a href="/allCustomers"><i className="fa fa-group"/> Customers</a></li>
                                <li><a href="/products"><i className="fa fa-archive"/> Products</a></li>
                                <li><a href="/test1"><i className="fa fa-search"/> Search</a></li>
                                <li><a href="/test2"><i className="fa fa-line-chart"/> Reports</a></li>

                            </ul>
                        </div>
                        {/* /.sidebar-collapse */}
                    </div>
                    {/* /.navbar-static-side */}
                </nav>
            </div>

            <div id="page-wrapper">

                <div id="popup"></div>

                <ContentContainer key="content">
                    {content}
                </ContentContainer>

                <Alert stack={{limit: 3}} />
            </div>
            {/* /#page-wrapper */}

            { renderDevTools() }
        </div>
    </Provider>
);