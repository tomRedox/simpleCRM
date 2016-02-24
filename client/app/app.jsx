//Theme from here:
//Site: http://www.bootstrapzero.com/bootstrap-template/facebook
//Code: http://www.bootply.com/96266
//Demo: http://www.bootply.com/render/96266#


import React from 'react';
import MessageEditor from '../controls/modal-message-box.jsx';

//var RouteHandler = require('react-router').RouteHandler;
//var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


Meteor.subscribe("SalesRegions.All");
Meteor.subscribe("Orders.All");
//Meteor.subscribe("Products.public");

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

// define and export our Layout component
export const Layout = ({content}) => (

    <div id="app">

        <div className="wrapper">
            <div className="box">
                <div className="row row-offcanvas row-offcanvas-left">

                    <Sidebar/>

                    <div className="column col-sm-10 col-xs-11" id="main">

                        <TopNav/>

                        <div className="padding">
                            <div className="full col-sm-9">

                                <div className="row">

                                    <main>
                                        <div id="popup"></div>

                                        <div>{content}</div>

                                    </main>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div >

);
//<TopNav/>
//<hr /><div id="popup-target"></div>
//<div>{content}</div>

//<ReactCSSTransitionGroup
//    component="div"
//    transitionName="example"
//    transitionEnterTimeout={500}
//    transitionLeaveTimeout={500}
//>
//    {React.cloneElement(this.props.children, {
//        key: this.props.location.pathname
//    })}
//</ReactCSSTransitionGroup>


//export default Layout;