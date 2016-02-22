
var React = require('react');
import GlobalSearch from '../search/global-search.jsx';

// this page is wrapped by the wrapper
TopNav = React.createClass({

    render() {


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
                        <div className="input-group input-group-sm" style={{maxWidth: "360px"}}>
                             <GlobalSearch id="srch-term" />
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit"><i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="/"><i className="fa fa-home"></i> Home</a>
                        </li>
                        <li>
                            <a href="/addCustomer" role="button" data-toggle="modal"><i className="fa fa-plus"></i> Post </a>
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

//<input type="text" className="form-control" placeholder="Search" name="srch-term"
//       id="srch-term"/>



    //    <li>
    //        {{#if isInRole 'Administrator'}}
    //        <a href="#">Admin</a>
    //        {{/if}}
    //    </li>
    //{{> loginButtons}} <!-- here -->

    module.exports = TopNav;