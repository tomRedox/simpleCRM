Meteor.startup(function () {

    sAlert.config({
        effect: 'flip',
        position: 'bottom',
        timeout: 3000,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 0
    });

});
