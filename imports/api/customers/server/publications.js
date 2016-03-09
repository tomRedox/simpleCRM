
import CustomerCompanies from '../customer-company.js';

const CustomerCompanyPublicFields = {
    name: 1,
    email: 1,
    postcode: 1,
    salesRegionId: 1,
    nextContactDate: 1,
    ordersCount: 1,
    ordersTotalValue: 1,
    createdAt: 1
}

const CustomerCompaniesListFields = {
    name: 1,
    postcode: 1,
    ordersCount: 1,
    ordersTotalValue: 1
}

Meteor.publish('CustomerCompanies.public', function () {
    return CustomerCompanies.find();
});

Meteor.publish('CustomerCompanies.topCustomerCompanies', function (numberToReturn) {
    return CustomerCompanies.find(
        {
            // return everything
        },
        {
            sort: {ordersTotalValue: -1},
            limit: numberToReturn,
            fields: CustomerCompaniesListFields
        }
    );
});



Meteor.publish('CustomerCompany.get', function (_id) {
    //console.log("publication match ", CustomerCompanies.find({_id: custId}).fetch());
    return CustomerCompanies.find(
        {
            _id
        },
        {
            fields: CustomerCompanyPublicFields
        }
    );
});

Meteor.publish('CustomerCompanies.searchByName', function (searchTerm) {
    // console.log("CustomerCompanies.searchByName - "
    //     + searchTerm + " - ", CustomerCompanies.find({name: new RegExp(searchTerm)}).fetch());

    // the 'i' makes the search case insensitive
    return CustomerCompanies.find(
        {
            name: new RegExp(searchTerm, 'i')
        },
        {
            fields: CustomerCompanyPublicFields
        }
    );
});

Meteor.methods({
    'CustomerCompanies.fullTextSearch.method'({ searchValue }) {

        if (Meteor.isServer) {
            const results = CustomerCompanies.find(
                {$text: {$search: searchValue}},
                {
                    // `fields` is where we can add MongoDB projections. Here we're causing
                    // each document published to include a property named `score`, which
                    // contains the document's search rank, a numerical value, with more
                    // relevant documents having a higher score.
                    fields: {
                        score: {$meta: "textScore"},
                        name: 1 // Only return the name column (_id is returned automatically)
                    },
                    // This indicates that we wish the publication to be sorted by the
                    // `score` property specified in the projection fields above.
                    sort: {
                        score: {$meta: "textScore"}
                    }
                }
            );
            //console.log('CustomerCompanies.fullTextSearch results ', results.fetch());

            return results.fetch();
        }
    }
});
