import SalesRegions from '../sales-region';

Meteor.publish('SalesRegions.All', function () {
    return SalesRegions.find();
});

