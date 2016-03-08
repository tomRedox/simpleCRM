import React from 'react';

export default class SbAdminTest extends React.Component {
    render() {
        return (
            <div>

                <div id="wrapper">

                    {/* Navigation */}
                    <nav className="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="index.html">SB Admin v2.0</a>

                        {/* The three drop down buttons on the RHS */}
                        <ul className="nav navbar-top-links navbar-right navbar-nav">
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                    <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down"></i>
                                </a>

                            </li>
                            {/* /.dropdown */}
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                    <i className="fa fa-tasks fa-fw"></i> <i className="fa fa-caret-down"></i>
                                </a>
                            </li>

                            {/* /.dropdown */}
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                    <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-user">
                                    <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                                    </li>
                                    <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                                    </li>
                                    <li className="divider"></li>
                                    <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                                    </li>
                                </ul>
                                {/* /.dropdown-user */}
                            </li>
                            {/* /.dropdown */}

                        </ul>
                        {/* /.navbar-top-links */}

                        </div>
                        {/* /.navbar-header */}


                        {/* This is the sidebar.  It's inside the top nav somehow */}
                        <div className="navbar-default sidebar" role="navigation">
                            <div className="sidebar-nav navbar-collapse">
                                <ul className="nav" id="side-menu">

                                    <li className="sidebar-search">
                                        <div className="input-group custom-search-form">
                                            <input type="text" className="form-control" placeholder="Search..."/>
                                <span className="input-group-btn">
                                <button className="btn btn-default" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </span>
                                        </div>
                                        {/* /input-group */}
                                    </li>
                                    <li>
                                        <a href="index.html"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="tables.html"><i className="fa fa-table fa-fw"></i> Tables</a>
                                    </li>
                                    <li>
                                        <a href="forms.html"><i className="fa fa-edit fa-fw"></i> Forms</a>
                                    </li>

                                </ul>
                            </div>
                            {/* /.sidebar-collapse */}
                        </div>
                        {/* /.navbar-static-side */}
                    </nav>
                </div>


                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Dashboard</h1>
                        </div>
                        {/* /.col-lg-12 */}
                    </div>
                    {/* /.row */}
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <i className="fa fa-comments fa-5x"></i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            <div className="huge">26</div>
                                            <div>New Comments!</div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#">
                                    <div className="panel-footer">
                                        <span className="pull-left">View Details</span>
                                        <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                        <div className="clearfix"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="panel panel-green">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <i className="fa fa-tasks fa-5x"></i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            <div className="huge">12</div>
                                            <div>New Tasks!</div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#">
                                    <div className="panel-footer">
                                        <span className="pull-left">View Details</span>
                                        <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                        <div className="clearfix"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="panel panel-yellow">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <i className="fa fa-shopping-cart fa-5x"></i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            <div className="huge">124</div>
                                            <div>New Orders!</div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#">
                                    <div className="panel-footer">
                                        <span className="pull-left">View Details</span>
                                        <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                        <div className="clearfix"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="panel panel-red">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <i className="fa fa-support fa-5x"></i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            <div className="huge">13</div>
                                            <div>Support Tickets!</div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#">
                                    <div className="panel-footer">
                                        <span className="pull-left">View Details</span>
                                        <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                        <div className="clearfix"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* /.row */}
                </div>
                {/* /#page-wrapper */}
            </div>

        )
    }
}