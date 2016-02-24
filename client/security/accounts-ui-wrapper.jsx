import React from 'react';
import ReactDOM from 'react-dom'

AccountsUIWrapper = React.createClass({
    componentDidMount() {
        console.log("AccountsUIWrapper.componentDidMount()");
        // Use Meteor Blaze to render login buttons

        console.log("Template.loginButtons", Template);

        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.loginButtonsContainer));
    },
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    },
    render() {
        // Just render a placeholder container that will be filled in
        return <span ref="loginButtonsContainer"/>;
    }
});