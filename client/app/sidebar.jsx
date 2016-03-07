import React, { Component, PropTypes } from 'react';

import { toggleLeftNavExpanded } from '../redux/ui-actions.jsx';


// App component - represents the whole app
const SidebarContainer = React.createClass({

    renderExpandedSideBar() {

        const navStyle = {
            //marginTop: 64,
            height: "100%", //(window.innerHeight - 64)
            width: 220,
            color:"red"
        };

        return (
                <div className="navbar navbar-default sidebar-offcanvas" id="sidebar">
            <div>

                    <ul className="nav">
                        <li><a href="#" data-toggle="offcanvas" className="visible-xs text-center">
                            <i className="fa fa-chevron-right"/></a></li>
                    </ul>

                    <ul className="nav hidden-xs" id="lg-menu">
                        <li className="active"><a href="/"><i className="fa fa-tachometer"/> Dashboard</a></li>
                        <li><a href="/allOrders"><i className="fa fa-file-text"/> Orders</a></li>
                        <li><a href="/allCustomers"><i className="fa fa-group"/> Customers</a></li>
                        <li><a href="/products"><i className="fa fa-archive"/> Products</a></li>
                        <li><a href="/test1"><i className="fa fa-search"/> Search</a></li>
                        <li><a href="/test2"><i className="fa fa-line-chart"/> Reports</a></li>
                    </ul>
                    <ul className="list-unstyled hidden-xs" id="sidebar-footer">
                        <li>
                            <a href="http://www.redox-software.co.uk"><h3>simple crm</h3>
                                <i className="fa fa-cloud"/> redox software ltd</a>
                        </li>
                    </ul>

                    <ul className="nav visible-xs" id="xs-menu">
                        <li><a href="/" className="text-center"><i className="fa fa-tachometer"/></a></li>
                        <li><a href="/allOrders" className="text-center"><i className="fa fa-file-text"/></a></li>
                        <li><a href="/allCustomers" className="text-center"><i className="fa fa-group"/></a></li>
                        <li><a href="/products" className="text-center"><i className="fa fa-archive"/></a></li>
                        <li><a href="#" className="text-center"><i className="fa fa-search"/></a></li>
                        <li><a href="#" className="text-center"><i className="fa fa-line-chart"/></a></li>
                    </ul>

                </div>
            </div>
        );
    },

    render()
    {
        console.log("SidebarContainer.render() props: ", this.props);

        if (this.props.expanded) {
            return this.renderExpandedSideBar()
        } else {
            return <div></div>
        }
    }
});

SidebarContainer.propTypes = {
    expanded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    //console.log("SidebarContainer.mapStateToProps", state)
    return {
        expanded: state.userInterface.leftNavExpanded
    };
}

export default connect(mapStateToProps, {
    toggleLeftNavExpanded
})(SidebarContainer);


//<div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">
//
//    <ul className="nav">
//        <li><a href="#" data-toggle="offcanvas" className="visible-xs text-center">
//            <i className="fa fa-chevron-right"/></a></li>
//    </ul>
//
//    <ul className="nav hidden-xs" id="lg-menu">
//        <li className="active"><a href="/"><i className="fa fa-tachometer"/> Dashboard</a></li>
//        <li><a href="/allOrders"><i className="fa fa-file-text"/> Orders</a></li>
//        <li><a href="/allCustomers"><i className="fa fa-group"/> Customers</a></li>
//        <li><a href="/products"><i className="fa fa-archive"/> Products</a></li>
//        <li><a href="/test1"><i className="fa fa-search"/> Search</a></li>
//        <li><a href="/test2"><i className="fa fa-line-chart"/> Reports</a></li>
//    </ul>
//    <ul className="list-unstyled hidden-xs" id="sidebar-footer">
//        <li>
//            <a href="http://www.redox-software.co.uk"><h3>simple crm</h3>
//                <i className="fa fa-cloud"/> redox software ltd</a>
//        </li>
//    </ul>
//
//    <ul className="nav visible-xs" id="xs-menu">
//        <li><a href="/" className="text-center"><i className="fa fa-tachometer"/></a></li>
//        <li><a href="/allOrders" className="text-center"><i className="fa fa-file-text"/></a></li>
//        <li><a href="/allCustomers" className="text-center"><i className="fa fa-group"/></a></li>
//        <li><a href="/products" className="text-center"><i className="fa fa-archive"/></a></li>
//        <li><a href="#" className="text-center"><i className="fa fa-search"/></a></li>
//        <li><a href="#" className="text-center"><i className="fa fa-line-chart"/></a></li>
//    </ul>
//
//</div>
