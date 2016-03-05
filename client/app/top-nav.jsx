import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/lib/app-bar';

import GlobalSearch from '../search/global-search.jsx';
import { toggleLeftNavExpanded } from '../redux/ui-actions.jsx';


// this page is wrapped by the wrapper
const TopNavContainer = React.createClass({

    render() {


        let divStyle = {
            position: "fixed",
            top:0,
            width:"100%"
        }

        return (
            <div class="header">
                <AppBar
                    title="simple crm"
                    iconElementRight={<GlobalSearch id="srch-term" />}
                    onLeftIconButtonTouchTap={this.props.toggleLeftNavExpanded}
                    style={divStyle}
                />
            </div>
        );
    }
});


TopNavContainer.propTypes = {
    expanded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    //console.log("TopNavContainer.mapStateToProps", state)
    return {
        expanded: state.userInterface.leftNavExpanded
    };
}

export default connect(mapStateToProps, {
    toggleLeftNavExpanded
})(TopNavContainer);


//<div className="navbar navbar-blue navbar-static-top">
//    <div className="navbar-header">
//        <button className="navbar-toggle" type="button" data-toggle="collapse"
//                data-target=".navbar-collapse">
//            <span className="sr-only">Toggle</span>
//            <span className="icon-bar"></span>
//            <span className="icon-bar"></span>
//            <span className="icon-bar"></span>
//        </button>
//        <a href="/" className="navbar-brand logo">simple crm</a>
//    </div>
//    <nav className="collapse navbar-collapse" role="navigation">
//        <form className="navbar-form navbar-left">
//            <div className="input-group input-group-sm" style={{maxWidth: "360px"}}>
//                <GlobalSearch id="srch-term" />
//                <div className="input-group-btn">
//                    <button className="btn btn-default" type="submit"><i className="fa fa-search"></i>
//                    </button>
//                </div>
//            </div>
//        </form>
//        <ul className="nav navbar-nav">
//            <li>
//                <a href="/"><i className="fa fa-home"></i> Home</a>
//            </li>
//            <li>
//                <a href="/addCustomer" role="button" data-toggle="modal"><i className="fa fa-plus"></i> Post </a>
//            </li>
//            <li>
//                <a href="#"><span className="badge">badge</span></a>
//            </li>
//            <li>
//                <AccountsUIWrapper />
//            </li>
//        </ul>
//        <ul className="nav navbar-nav navbar-right">
//        </ul>
//    </nav>
//</div>


//<input type="text" className="form-control" placeholder="Search" name="srch-term"
//       id="srch-term"/>


//    <li>
//        {{#if isInRole 'Administrator'}}
//        <a href="#">Admin</a>
//        {{/if}}
//    </li>
//{{> loginButtons}} <!-- here -->
