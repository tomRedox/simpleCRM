import React, { Component, PropTypes } from 'react';

import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import { toggleLeftNavExpanded } from '../redux/ui-actions.jsx';

import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';



const SelectableList = SelectableContainerEnhance(List);

function onRequestChangeList(e,index) {
    //console.log("e",e);
    //console.log("index",index);
    FlowRouter.go(index);
};

// App component - represents the whole app
const SidebarContainer = React.createClass({

    renderExpandedSideBar() {

        const navStyle = {
            marginTop: 64,
            height: (window.innerHeight - 64)
        };

        return (

            <div>
                <LeftNav width={220} open={true} style={navStyle} className="MY_LeftNav">
                    <SelectableList
                        valueLink={{value: "", requestChange: onRequestChangeList }}
                    >
                        <ListItem primaryText="Dashboard" leftIcon={<ContentInbox />} value="/" />
                        <ListItem primaryText="Orders" leftIcon={<ContentInbox />} value="/allOrders" />
                        <ListItem primaryText="Customers" leftIcon={<ContentInbox />} value="/allCustomers" />
                        <ListItem primaryText="Products" leftIcon={<ContentInbox />} value="/products" />
                        <ListItem primaryText="Search" leftIcon={<ContentInbox />} value="/test1" />
                        <ListItem primaryText="Reports" leftIcon={<ContentInbox />} value="/test2" />

                    </SelectableList>
                </LeftNav>
            </div>
        );
    },

//        <li className="active"><a href="/"><i className="fa fa-tachometer"/> Dashboard</a></li>
//        <li><a href="/allOrders"><i className="fa fa-file-text"/> Orders</a></li>
//        <li><a href="/allCustomers"><i className="fa fa-group"/> Customers</a></li>
//        <li><a href="/products"><i className="fa fa-archive"/> Products</a></li>
//        <li><a href="/test1"><i className="fa fa-search"/> Search</a></li>
//        <li><a href="/test2"><i className="fa fa-line-chart"/> Reports</a></li>


    renderMinimisedSideBar() {

        const navStyle = {
            marginTop: 64,
            height: (window.innerHeight - 64)
        };

        return (
            <div>
                <LeftNav width={65} style={navStyle} open={true}>


                </LeftNav>
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
