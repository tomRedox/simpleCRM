import React from 'react';

const MessageEditor = React.createClass({
    propTypes: {
        onConfirmAction: React.PropTypes.func.isRequired
    },

    getInitialState(){
        return {messageText: ''};
    },

    componentWillMount(){
        //EventEmitter.subscribe("editMessage",this.refillData);
    },

    refillData(message){
        this.setState({messageText: message.text})
        ReactDOM.render(<MessageEditor message={message}/>, document.getElementById("popup-target"));
        $("#primary").modal();
    },

    onUpdate(event){

        var text = this.state.messageText.trim();
        //Meteor.call("updateMessageText",this.props.message._id, text);

        console.log("onupdate");

        // Clear form
        this.state.messageText = '';
    },

    handleChange(event){
        this.setState({messageText: event.target.value})

    },

    render(){
        console.log("MessageEditor.render()");

        return (
            <div>

                <div className="modal fade" id="primary" role="dialog" aria-labelledby="myModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">

                        <div className="modal-content">

                            <div className="modal-header modal-header-info">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                    ×
                                </button>
                                <h1><i className="fa fa-bar-chart-o"></i> Edit Message</h1>
                            </div>
                            <div className="modal-body">


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info pull-left"
                                        data-dismiss="modal">Cancel
                                </button>
                                <button type="button" className="btn btn-info pull-left"
                                        data-dismiss="modal" onClick={this.props.onConfirmAction}>Confirm
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

export default MessageEditor;