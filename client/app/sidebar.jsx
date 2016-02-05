
//var TextInput = require('./textInput');
var React = require('react');

// App component - represents the whole app
Sidebar = React.createClass({

    render() {
        //console.log("CustomerEditComponent props: ", this.props);

        return (
            <div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">

                <ul className="nav">
                    <li><a href="#" data-toggle="offcanvas" className="visible-xs text-center"><i className="fa fa-chevron-right"></i></a></li>
                </ul>

                <ul className="nav hidden-xs" id="lg-menu">
                    <li className="active"><a href="/"><i className="fa fa-tachometer"></i> Dashboard</a></li>
                    <li><a href="#"><i className="fa fa-history"></i> Recent customers</a></li>
                    <li><a href="#"><i className="fa fa-group"></i> All customers</a></li>
                    <li><a href="#"><i className="fa fa-search"></i> Search</a></li>
                    <li><a href="#"><i className="fa fa-line-chart"></i> Reports</a></li>
                </ul>
                <ul className="list-unstyled hidden-xs" id="sidebar-footer">
                    <li>
                        <a href="http://www.redox-software.co.uk"><h3>simple crm</h3> <i className="fa fa-cloud"></i> redox software ltd</a>
                    </li>
                </ul>

                <ul className="nav visible-xs" id="xs-menu">
                    <li><a href="/" className="text-center"><i className="fa fa-tachometer"></i></a></li>
                    <li><a href="#" className="text-center"><i className="fa fa-history"></i></a></li>
                    <li><a href="#" className="text-center"><i className="fa fa-search"></i></a></li>
                    <li><a href="#" className="text-center"><i className="fa fa-line-chart"></i></a></li>
                </ul>

            </div>

        );
    }
});

module.exports = Sidebar;
