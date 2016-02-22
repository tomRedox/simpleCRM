//import { CustomerCompanies } from '../api/customers/customer-company.js';
import Products from '../api/products/products';
import Orders from '../api/orders/order';


// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    console.log("fixtures Meteor.startup");

    CustomerCompanies._ensureIndex({"name":"text", "email":"text", "postcode":"text"});
    //In Meteor Mongo: Orders._dropIndexes();
    Orders._ensureIndex({"customerName":"text", "postcode":"text", "orderLines.description":"text"});
    //In Meteor Mongo: Orders.createIndex({customerName:"text", postcode:"text", "orderLines.description":"text"});
    Products._ensureIndex({"name":"text"});


    if (CustomerCompanies.find().count() === 0) {
        const data = [
            {
                name: "Smiths Fabrication Ltd",
                email: "info@smiths.com",
                postcode: "OX10 4RT"
            },
            {
                name: "Bob's Bricks",
                email: "sales@bobsbricks.co.uk",
                postcode: "BR1 3EY"
            },
            {
                name: 'Parkers & Co',
                email: "info@parkers.co",
                postcode: "W1 8QT"
            }
        ];

        let timestamp = (new Date()).getTime();

        data.forEach((customer) => {
            CustomerCompanies.insert({
                name: customer.name,
                email: customer.email,
                postcode: customer.postcode,
                createdAt: new Date(timestamp)
            });

            //console.log("added customer: ", customer);
        });
    }


    if (SalesRegions.find().count() === 0) {
        const data = [
            {
                name: "North West"
            },
            {
                name: "North East"
            },
            {
                name: "Scotland"
            },
            {
                name: "South East"
            },
            {
                name: "Wales"
            },
            {
                name: "Southern Ireland"
            },
            {
                name: "Nothern Ireland"
            },
            {
                name: "South West"
            },
            {
                name: 'London'
            }
        ];

        let timestamp = (new Date()).getTime();

        data.forEach((item) => {
            SalesRegions.insert({
                name: item.name,
                createdAt: new Date(timestamp)
            });

            //console.log("added customer: ", customer);
        });
    }




    if (Products.find().count() === 0) {
        const data = [
            {
                name: "Olive-spantles (jigged & onioned)",
                price: 35
            },
            {
                name: "Grommet",
                price: 12.60
            },
            {
                name: "Grollings",
                price: 35
            },
            {
                name: "Copper pipe",
                price: 18.35
            },
            {
                name: "Fleeling wire (coaxial)",
                price: 4.30
            },
            {
                name: "Gruddock paper",
                price: 1.95
            },
            {
                name: "Bevelled spill-trunion",
                price: 18.40
            },
            {
                name: "Satchel-arm",
                price: 35
            },
            {
                name: 'Clip-jawed double lock brace',
                price: 3.99
            }
        ];

        let timestamp = (new Date()).getTime();

        data.forEach((item) => {
            Products.insert({
                name: item.name,
                price: item.price,
                createdAt: new Date(timestamp)
            });

            //console.log("added customer: ", customer);
        });
    }
});
