var React = require('react');
import { VelocityComponent, velocityHelpers, VelocityTransitionGroup } from 'velocity-react';

import Products from '../../api/products/products';
import ProductsList from './products-list.jsx';

const ProductsListWrapper = React.createClass({

    mixins: [ ReactMeteorData ],

    getMeteorData() {
        //console.log("Empty.getMeteorData");
        Meteor.subscribe("Products.public");
        return {
            products: Products.find(
                {},
                {
                    sort: {name: 1}
                }
            ).fetch()
        };
    },

    render() {
        //console.log("render()", this.props);
        return (
            <div key="productsListWrapper">
                <ProductsList items={ this.data.products }/>
            </div>
        );
    }
});

export default ProductsListWrapper;
