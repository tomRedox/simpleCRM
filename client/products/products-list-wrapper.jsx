var React = require('react');
import Products from '../../api/products/products';
import ProductsList from './products-list.jsx';

const ProductsListWrapper = React.createClass({
    propTypes: {
        //order: React.PropTypes.object,
        //onSave: React.PropTypes.func.isRequired
    },

    //getDefaultProps() {
    //    return {
    //        order: {}
    //    };
    //},

    //getInitialState() {
    //    //console.log("Empty.getInitialState(): props", this.props);
    //
    //    return {
    //        isValid: false
    //    };
    //},

    mixins: [ ReactMeteorData ],

    getMeteorData() {
        //console.log("Empty.getMeteorData");
        Meteor.subscribe( "Products.public" );
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
            <ProductsList items={ this.data.products } />
        );
    }
});

export default ProductsListWrapper;
