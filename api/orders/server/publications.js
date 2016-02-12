
//import { Orders } from '../customer-company.js';

Meteor.publish('Orders.public', function() {
    return Orders.find();
});

Meteor.publish('Order.get', function (id) {

    //console.log("publication match ", Orders.find({_id: id}).fetch());

    return Orders.find({_id: id});
});


Meteor.publish('Orders.All', function() {
    return Orders.find();
});

