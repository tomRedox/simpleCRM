/*
 This class was added to allow the react animations to work correctly on the list.
 The issue was that render is called twice on the list, once with no data and then
 again when the data is present.  That was stopping the animations working, so
 broke the data retrieval out into a separate wrapper so the list will always have
 data to work with.
 */

import React from 'react';

import Orders from '../../api/orders/order';
import OrdersList from './orders-list.jsx';
import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';

const OrdersListWrapper = React.createClass({


    getInitialState() {
        console.log("OrdersList.getInitialState() ");

        return {
            expanded: false,
            duration: 500,
        };
    },

    renderDeviceToggle() {
        //console.log("OrdersList.renderDeviceToggle() - this:", this);
        //console.log("OrdersList.renderDeviceToggle() - state:", this.state);

        var arrowAnimation = {
            rotateX: this.state.expanded ? 180 : 0//,
            //transformOriginY: [ '42%', '42%' ]
        };

        let toggleState = function () {
            //console.log("in toggleState: this: ", this);

            this.setState({expanded: !this.state.expanded});
        }.bind(this);

        let getLabel = function () {
            if (this.state.expanded) {
                return " Show less";
            }
            return " Show more";
        }.bind(this);


        return (
            <div className="device-toggle" onClick={toggleState}>
                <div className="device-icon icon huge"></div>
                {getLabel()}<span> </span>
                <VelocityComponent duration={300} animation={arrowAnimation}>
                    <i className="fa fa-arrow-down"/>
                </VelocityComponent>
            </div>
        );
    },

    render() {
        console.log("OrdersListWrapper.render() ")

        let recordsToShow = 3;
        if (this.state.expanded) {
            recordsToShow = 6;
        }

        // Get tasks from this.data.tasks
        return (

            <div>
                <VelocityTransitionGroup component="div"
                                         enter={{animation: 'fadeIn', duration: this.state.duration, style: {height: ''}}}
                                         leave={{animation: 'fadeOut', duration: this.state.duration}}
                >
                    {this.state.expanded ? undefined : <div><OrdersList recordsToShow={recordsToShow}/></div> }
                    {this.state.expanded ? <div><OrdersList recordsToShow={recordsToShow}/></div> : undefined }
                </VelocityTransitionGroup>
                {this.renderDeviceToggle()}
            </div>
        );
    }
});

module.exports = OrdersListWrapper;

//{this.state.expanded ? undefined : <div><OrdersList recordsToShow={recordsToShow}/></div> }
//{this.state.expanded ? <div><OrdersList recordsToShow={recordsToShow}/></div> : undefined }

//{this.state.expanded ?
//    <div><OrdersList recordsToShow={recordsToShow}/></div> :
//    <div><OrdersList recordsToShow={recordsToShow}/></div>
//}

//<div><OrdersList recordsToShow={recordsToShow}/></div>

//{this.state.expanded ? <div><OrdersList recordsToShow={recordsToShow}/></div>
//    : <div><OrdersList recordsToShow={recordsToShow}/></div> }
