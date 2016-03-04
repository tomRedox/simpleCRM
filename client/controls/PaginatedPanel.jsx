import React from 'react';

//import Collapse from 'react-collapse';
//import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';


const PaginatedPanel = React.createClass({
    propTypes: {
        //expanded: React.PropTypes.bool.isRequired,
        //toggleExpanded: React.PropTypes.func.isRequired,
        parentGotData: React.PropTypes.bool.isRequired,
        panelTitle: React.PropTypes.string,
        itemType: React.PropTypes.string,
        newItemLink: React.PropTypes.string

    },

    shouldComponentUpdate() {
        console.log("PaginatedPanel.shouldComponentUpdate() ", this.props.parentGotData);
        // Don't re-render if there are no records, which there won't be
        // after the first render (when the initial subscription happens
        // and before the data is actually retrieved)
        return (this.props.parentGotData);
    },

    render() {
        console.log("PaginatedPanel render");

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="pull-right text-right">
                            <p><a href={this.props.newItemLink} className="pull-right">New {this.props.itemType} </a>
                            </p>
                        </div>
                        <h4>{this.props.panelTitle}</h4>
                    </div>
                    <div className="panel-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

export default PaginatedPanel;
