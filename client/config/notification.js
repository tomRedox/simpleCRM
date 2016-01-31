Meteor.startup(function () {

    sAlert.config({
        effect: 'slide',
        position: 'bottom-right',
        timeout: 4000,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 0
    });

});