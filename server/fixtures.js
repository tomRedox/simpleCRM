//import { CustomerCompanies } from '../api/customers/customer-company.js';


// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
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
                name: item.name
            });

            //console.log("added customer: ", customer);
        });
    }
});
