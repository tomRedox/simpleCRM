import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Provider } from 'react-redux';
import DevTools from '../redux/DevTools.jsx';
import store from '../redux/store.jsx';
//import injectTapEventPlugin from 'react-tap-event-plugin';

import MainContentContainer from './MainContentContainer.jsx';


Meteor.subscribe("SalesRegions.All");
Meteor.subscribe("Orders.All");


//var checkScrollBars = function(){
//    var b = $('body');
//    var normalw = 0;
//    var scrollw = 0;
//    if(b.prop('scrollHeight')>b.height()){
//        normalw = window.innerWidth;
//        scrollw = normalw - b.width();
//        $('#container').css({marginRight:'-'+scrollw+'px'});
//    }
//}
//
//checkScrollBars();

//injectTapEventPlugin();

const ContentContainer = React.createClass({
    render() {
        console.log("ContentContainer.render()", this.props.children);

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



export const Layout2 = ({content}) => (
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



            <Provider store={store}>
                <div>

                    <MainContentContainer store={store}>

                        <div>
                            <div id="popup"></div>

                            <ContentContainer key="content">
                                {content}
                            </ContentContainer>

                            {/*<DevTools />*/}

                        </div>
                    </MainContentContainer>

                </div>
            </Provider>


        </div>
        {/* /#page-wrapper */}
    </div>

);