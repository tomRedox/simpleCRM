//import './app-body.html';

//import { FlowRouter } from 'kadira:flow-router';

Meteor.subscribe("SalesRegions.All");

if (Meteor.isClient) {
    Template.AppBody.onCreated(function () {
        //console.log("AppBody.onCreated");
    });
}



Template.AppBody.events({
    'click button': function () {
        // increment the counter when button is clicked
        console.log("button .sidebarToggle");
    }
});
