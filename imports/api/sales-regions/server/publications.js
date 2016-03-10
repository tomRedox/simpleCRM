import SalesRegions from '../sales-region';

const SalesRegionListFields = {
    name: 1,
    createdAt: 1
};

Meteor.publish('SalesRegions.All', function () {
    return SalesRegions.find(
        {},
        {
            fields: SalesRegionListFields
        }
    );
});

