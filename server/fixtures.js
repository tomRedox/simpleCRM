import { CustomerCompanies } from '../api/customers/customer-company.js';


// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    if (CustomerCompanies.find().count() === 0) {
        const data = [
            {
                name: "Smiths Fabrication Ltd"
            },
            {
                name: "Bob's Bricks"
            },
            {
                name: 'Parkers & Co'
            }
        ];

        let timestamp = (new Date()).getTime();

        data.forEach((customer) => {
            const customerId = CustomerCompanies.insert({
                name: customer.name,
                createdAt: new Date(timestamp)
            });

            console.log("added customer: ", customer);
        });
    }
});
