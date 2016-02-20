import Products from '../products';

Meteor.publish('Products.public', function () {
    return Products.find();
});

Meteor.publish('Product.get', function (_id) {
    //console.log("publication match ", Products.find({_id: custId}).fetch());
    return Products.find({_id});
});

Meteor.publish('Products.searchByName', function (searchTerm) {
    console.log("Products.searchByName - "
         + searchTerm + " - ", Products.find({name: new RegExp(searchTerm)}).fetch());

    // the 'i' makes the search case insensitive
    return Products.find({name: new RegExp(searchTerm, 'i')});
})
