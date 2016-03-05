import React, { Component, PropTypes } from 'react';

import { toggleLeftNavExpanded } from '../redux/ui-actions.jsx';


// App component - represents the whole app
const MainContentContainer = React.createClass({
    updateDimensions: function () {
        //this.setState({width: $(window).width(), height: $(window).height()});

        if ($(window).width() < 768 && this.props.leftNavExpanded) {
            this.props.toggleLeftNavExpanded();
        } else if ($(window).width() > 768 && !this.props.leftNavExpanded) {
            this.props.toggleLeftNavExpanded();
        }
    },
    componentWillMount: function () {
        this.updateDimensions();
    },
    componentDidMount: function () {
        window.addEventListener("resize", this.updateDimensions);
    },
    componentWillUnmount: function () {
        window.removeEventListener("resize", this.updateDimensions);
    },

    render() {

        let divStyle = {
            marginLeft: this.props.leftNavExpanded ? 270 : 100
        }

        return (
            <div style={ divStyle }>

                {this.props.children}
            </div>
        )
    }
});

MainContentContainer.propTypes = {
    leftNavExpanded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    //console.log("MainContentContainer.mapStateToProps", state)
    return {
        leftNavExpanded: state.userInterface.leftNavExpanded
    };
}

export default connect(mapStateToProps, {
    toggleLeftNavExpanded
})(MainContentContainer);


// <span>{this.state.width} x {this.state.height}</span>

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
