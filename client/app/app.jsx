//Theme from here:
//Site: http://www.bootstrapzero.com/bootstrap-template/facebook
//Code: http://www.bootply.com/96266
//Demo: http://www.bootply.com/render/96266#


import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Provider } from 'react-redux';
import DevTools from '../redux/DevTools.jsx';
import store from '../redux/store.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TopNavContainer from './top-nav.jsx';
import SidebarContainer from './sidebar.jsx';
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

injectTapEventPlugin();

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
// define and export our Layout component
export const Layout = ({content}) => (
    <div id="app">
        {console.log("Layout rendered")}
        <Provider store={store}>
            <div>

                <TopNavContainer store={store}/>

                <div className="row">
                    <div className="col-sm-2">

                        <SidebarContainer store={store}/>
                    </div>
                    <div className="col-sm-10">

                        <MainContentContainer store={store}>


                            <main>
                                <div id="popup"></div>

                                <div id="outerContent">

                                    <ContentContainer key="content">
                                        {content}
                                    </ContentContainer>

                                    {/*<DevTools />*/}

                                </div>
                            </main>
                        </MainContentContainer>
                    </div>
                </div>
            </div>
        </Provider>
    </div >

);
