
//var TextInput = require('./textInput');
var React = require('react');
import { Link } from 'react-router';

// this page is wrapped by the wrapper
TopNav = React.createClass({

    render () {


        return (
            <div className="navbar navbar-blue navbar-static-top">
                <div className="navbar-header">
                    <button className="navbar-toggle" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse">
                        <span className="sr-only">Toggle</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a href="/" className="navbar-brand logo">b</a>
                </div>
                <nav className="collapse navbar-collapse" role="navigation">
                    <form className="navbar-form navbar-left">
                        <div className="input-group input-group-sm" style={{"maxWidth":"360px"}}>
                            <input type="text" className="form-control" placeholder="Search" name="srch-term"
                                   id="srch-term"/>
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit"><i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to={`/`}><i className="fa fa-home"></i> Home</Link>
                        </li>
                        <li>
                            <a href="/orders/newOrder" role="button" data-toggle="modal"><i className="fa fa-plus"></i> Post </a>
                        </li>
                        <li>
                            <a href="#"><span className="badge">badge</span></a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                    </ul>
                </nav>
            </div>
        );
    }
});
    //    <li>
    //        {{#if isInRole 'Administrator'}}
    //        <a href="#">Admin</a>
    //        {{/if}}
    //    </li>
    //{{> loginButtons}} <!-- here -->

    module.exports = TopNav;