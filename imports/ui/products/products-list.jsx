import React from 'react';
import accounting from 'accounting';

import GridRow from '../components/grid/GridRow.jsx'
import GridColumn from '../components/grid/GridColumn.jsx'
import GridHeaderColumn from '../components/grid/GridHeaderColumn.jsx'
import GridHeaderRow from '../components/grid/GridHeaderRow.jsx'

import { upsert, remove } from '../../api/products/methods';

// This click to edit grid comes from this example on Meteor Chef:
// https://themeteorchef.com/snippets/click-to-edit-fields-in-react/
const ProductsList = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired
    },

    getInitialState() {
        return {
            editing: null
        };
    },

    handleItemUpdate(update) {

        const args = {
            productId: update._id,
            data: {
                name: update.name,
                price: update.price,
                createdAt: update.createdAt
            }
        };

        upsert.call(
            args
        , (error, response) => {
            if (error) {
                console.log(error.reason);
                sAlert.error(error.reason);
            } else {
                this.setState({editing: null});
                sAlert.success('Product updated successfully');
            }
        });
    },

    handleEditField(event) {
        if (event.keyCode === 13) {
            let target = event.target;
            let update = {};

            update._id = this.state.editing;
            update[target.name] = target.value;

            this.handleItemUpdate(update);
        }
    },
    handleEditItem() {
        let itemId = this.state.editing;

        this.handleItemUpdate({
            _id: itemId,
            name: this.refs[`name_${ itemId }`].value,
            price: this.refs[`price_${ itemId }`].value,
            createdAt: this.refs[`createdAt_${ itemId }`].value
        });
    },

    toggleEditing(itemId) {
        this.setState({editing: itemId});
    },

    renderItemOrEditField(item) {
        if (this.state.editing === item._id) {
            return <li key={ `editing-${ item._id }` } className="list-group-item">
                <GridRow>
                    <GridColumn className="col-xs-12 col-sm-6">
                        <input
                            onKeyDown={ this.handleEditField }
                            type="text"
                            className="form-control"
                            ref={ `name_${ item._id }` }
                            name="name"
                            defaultValue={ item.name }
                        />
                    </GridColumn>
                    <GridColumn className="col-xs-12 col-sm-2">
                        <input
                            onKeyDown={ this.handleEditField }
                            type="text"
                            className="form-control"
                            ref={ `price_${ item._id }` }
                            name="price"
                            defaultValue={ item.price }
                        />
                    </GridColumn>
                    <GridColumn className="col-xs-12 col-sm-2">
                        <input
                            onKeyDown={ this.handleEditField }
                            type="text"
                            className="form-control"
                            ref={ `createdAt_${ item._id }` }
                            name="createdAt"
                            defaultValue={ item.createdAt }
                            disabled={true}
                        />
                    </GridColumn>
                    <GridColumn className="col-xs-12 col-sm-2">
                        <a className="btn btn-success btn-sm" onClick={ this.handleEditItem }>Update Item</a>
                    </GridColumn>
                </GridRow>
            </li>;
        } else {
            return <li key={ item._id } className="list-group-item"
                       onClick={ this.toggleEditing.bind( null, item._id ) }>
                <GridHeaderRow>
                    <GridHeaderColumn className="col-xs-12 col-sm-6">
                        <span>{ item.name} </span>
                    </GridHeaderColumn>
                    <GridHeaderColumn className="col-xs-12 col-sm-2">
                        <span>{ accounting.formatMoney(item.price, "£") } </span>
                    </GridHeaderColumn>
                    <GridHeaderColumn className="col-xs-12 col-sm-2">
                        <span>{ item.createdAt.toLocaleDateString() } </span>
                    </GridHeaderColumn>
                    <GridHeaderColumn className="col-xs-12 col-sm-2">
                        <a className="btn btn-default btn-sm">Edit Item</a>
                    </GridHeaderColumn>
                </GridHeaderRow>
            </li>;
        }
    },

    render() {
        //console.log("render()", this.props);

        return (
            <div key="productsList">
                <h4><i className="fa fa-archive"/> Products</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <GridRow>
                            <GridColumn className="col-xs-12 col-sm-6">
                                <label>Name</label>
                            </GridColumn>
                            <GridColumn className="col-xs-12 col-sm-2">
                                <label>Price</label>
                            </GridColumn>
                            <GridColumn className="col-xs-12 col-sm-2">
                                <label>Created</label>
                            </GridColumn>
                            <GridColumn className="col-xs-12 col-sm-2">
                            </GridColumn>
                        </GridRow>
                    </li>
                    {this.props.items.map((item) => {
                        return this.renderItemOrEditField(item);
                    })}
                </ul>
            </div>
        );
    }
});

export default ProductsList;

//return <li
//    onClick={ this.toggleEditing.bind( null, item._id ) }
//    key={ item._id }
//    className="list-group-item">
//    { `${ item.name } (${ accounting.formatMoney(item.price, "£") })` }
//</li>;