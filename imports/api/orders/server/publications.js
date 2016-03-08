import Orders from '../order';

Meteor.publish('Orders.public', function () {
    return Orders.find();
});

Meteor.publish('Orders.topOrders', function (numberToReturn) {
    return Orders.find(
        {},
        {
            sort: {totalValue: -1},
            limit: numberToReturn
        }
    );
});

Meteor.publish('Order.get', function (id) {
    //console.log("Order.get ", Orders.find({_id: id}).fetch());
    return Orders.find({_id: id});
});

Meteor.publish('Order.customerTotals', function (customerId) {
    //console.log("Order.customerTotals ");

    var pipeline = [
        {$group: {_id: null, ordersTotalValue: {$sum: "$totalValue"}}}
    ];

    var result = Orders.aggregate(pipeline, {customerId});
    //console.log("Order.customerTotals:", JSON.stringify(result[0]), null, 2);
    //console.log("Order.customerTotals:", result);

    return result;
});

Meteor.publish('Orders.fullTextSearch', function (searchValue) {
    // console.log("Orders.fullTextSearch - "
    //     + searchTerm + " - ", Orders.find({name: new RegExp(searchTerm)}).fetch());

    return Orders.find(
        { $text: {$search: searchValue} },
        {
            // `fields` is where we can add MongoDB projections. Here we're causing
            // each document published to include a property named `score`, which
            // contains the document's search rank, a numerical value, with more
            // relevant documents having a higher score.
            fields: {
                score: { $meta: "textScore" }
            },
            // This indicates that we wish the publication to be sorted by the
            // `score` property specified in the projection fields above.
            sort: {
                score: { $meta: "textScore" }
            }
        }
    );
});

Meteor.methods({
    'Orders.fullTextSearch.method'({ searchValue }) {

        if (Meteor.isServer) {
            const results = Orders.find(
                {$text: {$search: searchValue}},
                {
                    // `fields` is where we can add MongoDB projections. Here we're causing
                    // each document published to include a property named `score`, which
                    // contains the document's search rank, a numerical value, with more
                    // relevant documents having a higher score.
                    fields: {
                        score: {$meta: "textScore"},
                        // Only return the fields needed for the search results control:
                        customerName: 1,
                        createdAt: 1
                    },
                    // This indicates that we wish the publication to be sorted by the
                    // `score` property specified in the projection fields above.
                    sort: {
                        score: {$meta: "textScore"}
                    }
                }
            );
           //console.log('Orders.fullTextSearch results ', results.fetch());

            return results.fetch();
        }
    }
});