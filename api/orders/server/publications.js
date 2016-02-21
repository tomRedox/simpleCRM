
import Orders from '../order';

Meteor.publish('Orders.public', function () {
    return Orders.find();
});

Meteor.publish('Orders.topOrders', function () {
    return Orders.find(
        {},
        {
            sort: {totalValue: -1},
            limit: 3
        }
    );
});

Meteor.publish('Order.get', function (id) {

    //console.log("publication match ", Orders.find({_id: id}).fetch());

    return Orders.find({_id: id});
});


Meteor.publish('Order.customerTotals', function (customerId) {

    //console.log("publication match ", Orders.find({_id: id}).fetch());


    var pipeline = [
        {$group: {_id: null, ordersTotalValue: {$sum: "$totalValue"}}}
    ];

    var result = Orders.aggregate(pipeline, {customerId});
    console.log("Order.customerTotals:", JSON.stringify(result[0]), null, 2);
    console.log("Order.customerTotals:", result);

    return result;
});