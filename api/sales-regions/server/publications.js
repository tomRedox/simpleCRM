
Meteor.publish('SalesRegions.All', function () {
    return SalesRegions.find();
});

