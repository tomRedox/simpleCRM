import React from 'react';

// Copied from Nathan originally, looks like it came from here:
// http://www.bigbinary.com/videos/keep-up-with-reactjs/creating-a-bootstrap-modal-in-react-js
const ModalMessageBox = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        message: React.PropTypes.string.isRequired,
        onConfirmAction: React.PropTypes.func.isRequired
    },

    //getInitialState(){
    //    return {messageText: ''};
    //},

    //refillData(message){
    //    this.setState({messageText: message.text})
    //    ReactDOM.render(<ModalMessageBox message={message}/>, document.getElementById("popup-target"));
    //    $("#primary").modal();
    //},

    render(){
        console.log("ModalMessageBox.render()");

        return (
            <div>
                <div className="modal fade" id="modalMessageBox" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                    ×
                                </button>
                                <h4 className="modal-title">{this.props.title}</h4>
                            </div>

                            <div className="modal-body">
                                <p>{this.props.message}</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left"
                                        data-dismiss="modal">Cancel
                                </button>
                                <button type="button" className="btn btn-primary pull-right"
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

export default ModalMessageBox;