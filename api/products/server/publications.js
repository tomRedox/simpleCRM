import Products from '../products';

Meteor.publish('Products.public', function () {
    return Products.find();
});

Meteor.publish('Product.get', function (_id) {
    //console.log("publication match ", Products.find({_id: custId}).fetch());
    return Products.find({_id});
});

Meteor.publish('Products.searchByName', function (searchTerm) {
    //console.log("Products.searchByName - " +
    //    searchTerm + " - ", Products.find({name: new RegExp(searchTerm)}).fetch());

    // the 'i' makes the search case insensitive
    return Products.find({name: new RegExp(searchTerm, 'i')});
});

Meteor.publish('Products.fullTextSearch', function (searchValue) {
    // console.log("Products.fullTextSearch - "
    //     + searchTerm + " - ", Products.find({name: new RegExp(searchTerm)}).fetch());

    const results = Products.find(
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

    //console.log('Products.fullTextSearch results ', results);

    return results;
});


Meteor.methods({
    'Products.fullTextSearch.method'({ searchValue }) {

        if (Meteor.isServer) {
            const results = Products.find(
                {$text: {$search: searchValue}},
                {
                    // `fields` is where we can add MongoDB projections. Here we're causing
                    // each document published to include a property named `score`, which
                    // contains the document's search rank, a numerical value, with more
                    // relevant documents having a higher score.
                    fields: {
                        score: {$meta: "textScore"},
                        name: 1
                    },
                    // This indicates that we wish the publication to be sorted by the
                    // `score` property specified in the projection fields above.
                    sort: {
                        score: {$meta: "textScore"}
                    }
                }
            );


            //console.log('Products.fullTextSearch results ', results.fetch());

            return results.fetch();
        }
    }
});