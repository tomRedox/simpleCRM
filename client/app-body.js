//import './app-body.html';

//import { FlowRouter } from 'kadira:flow-router';

if (Meteor.isClient) {
    Template.AppBody.onCreated(function () {
        console.log("AppBody.onCreated");
    });
}