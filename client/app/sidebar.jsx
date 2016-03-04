
//var TextInput = require('./textInput');
var React = require('react');
// import { Link } from 'react-router';

// App component - represents the whole app
Sidebar = React.createClass({

    render() {
        // console.log("CustomerEditComponent props: ", this.props);

        return (
            <div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">

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

        );
    }
});

module.exports = Sidebar;
