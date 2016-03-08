import React from 'react';

// Copied from Nathan originally, looks like it came from here:
// http://www.bigbinary.com/videos/keep-up-with-reactjs/creating-a-bootstrap-modal-in-react-js
const ModalMessageBox = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        message: React.PropTypes.string.isRequired,
        onConfirmAction: React.PropTypes.func, 
        contextualClass: React.PropTypes.string // active/success/info/warning/danger
    },

    renderConfirmButton() {

        let confirmButtonClassName = "btn pull-right";
        if (this.props.onConfirmAction) {
            confirmButtonClassName += " btn-" + this.props.contextualClass;
        } else {
            confirmButtonClassName += " btn-primary";
        }

        // Only show the confirm button if we were passed a confirm action
        if (this.props.onConfirmAction) {
            //console.log(confirmButtonClassName);
            return (
                <button type="button" className={confirmButtonClassName}
                        data-dismiss="modal" onClick={this.props.onConfirmAction}>Confirm
                </button>
            );
        }
    },

    renderCloseButton() {
        if (this.props.onConfirmAction) {
             return (
                 <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Cancel</button>
            );
        }
        return <button type="button" className="btn btn-primary pull-right" data-dismiss="modal">OK</button>;
    },

    render() {
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
                                {this.renderCloseButton()}
                                {this.renderConfirmButton()}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ModalMessageBox;