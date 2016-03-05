import React from 'react';

import Collapse from 'react-collapse';
import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';

const CollapsiblePanel = React.createClass({
    propTypes: {
        expanded: React.PropTypes.bool.isRequired,
        toggleExpanded: React.PropTypes.func.isRequired,
        parentGotData: React.PropTypes.bool.isRequired,
        panelTitle: React.PropTypes.string,
        itemType: React.PropTypes.string,
        newItemLink: React.PropTypes.string,
        allItemsLink: React.PropTypes.string,

    },

    animationDuration: 500,

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate", this.props.parentGotData);
       // Don't re-render if there are no records, which there won't be
        // after the first render (when the initial subscription happens
        // and before the data is actually retrieved)
        return (this.props.parentGotData);
    },

    renderShowMoreToggle() {
        //console.log("OrdersList.renderShowMoreToggle() - this:", this);
        //console.log("OrdersList.renderShowMoreToggle() - state:", this.state);

        var arrowAnimation = {
            rotateX: this.props.expanded ? 180 : 0//,
            //transformOriginY: [ '42%', '42%' ]
        };

        let getLabel = function () {
            if (this.props.expanded) {
                return " Show less";
            }
            return " Show more";
        }.bind(this);

        return (
            <div className="device-toggle" onClick={this.props.toggleExpanded}>
                <div className="device-icon icon huge"></div>
                {getLabel()}<span> </span>
                <VelocityComponent duration={this.animationDuration * 1.5} animation={arrowAnimation}>
                    <i className="fa fa-arrow-down"/>
                </VelocityComponent>
            </div>
        );
    },

    render() {
        console.log("OrdersList render");
        var transitionAnimation = {
            rotateX: this.props.expanded ? 360 : 0//,
            //transformOriginY: [ '42%', '42%' ]
        };

        return (

            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="pull-right text-right">
                            <p><a href={this.props.newItemLink} className="pull-right">New {this.props.itemType} </a></p>
                            <p><a href={this.props.allItemsLink}> View all</a></p>
                        </div>
                        <h4>{this.props.panelTitle}</h4>
                    </div>
                    <div className="panel-body">
                        <Collapse isOpened={true} keepCollapsedContent={false}>
                            <div style={{padding: 10}}>
                                <VelocityComponent duration={this.animationDuration}
                                                   animation={transitionAnimation}
                                >
                                    {this.props.children}
                                </VelocityComponent>
                            </div>
                        </Collapse>
                        {this.renderShowMoreToggle()}
                    </div>
                </div>
            </div>
        );
    }
});

export default CollapsiblePanel;



//renderTest() {
//    if (this.props.expanded) {
//        return (
//            <div>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//                <p>p</p>
//            </div>
//        );
//    }
//
//    return (
//        <div>
//            <p>p</p>
//            <p>p</p>
//            <p>p</p>
//            <p>p</p>
//            <p>p</p>
//        </div>
//    );
//},
