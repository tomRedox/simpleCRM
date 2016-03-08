import React from 'react';

export default class AppNotFound extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-danger">
                            <div className="panel-heading">
                                <h3 className="text-center">
                                    <i className="glyphicon glyphicon-exclamation-sign"
                                       aria-hidden="true"></i> Oops</h3>
                                <h4 className="text-center">Page not found - 404 error</h4>
                            </div>
                            <div className="panel-body">
                                <p>The page you are looking for might have been removed, had its name
                                    changed, or is temporarily unavailable. Please try the following:</p>

                                <ul className="list-group">
                                    <li className="list-group-item">Make sure that the Web site address
                                        displayed in the address bar of your browser is spelled and
                                        formatted correctly.
                                    </li>
                                    <li className="list-group-item">If you reached this page by clicking a link,
                                        <a href="help@test.co.uk"><b>contact us</b></a> to alert
                                        us that the link is incorrectly formatted.
                                    </li>
                                    <li className="list-group-item">Forget that this ever happened, and go <a
                                        href="/">our <b>Home</b> page</a> :)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}