var React = require('react');
import accounting from 'accounting';


const GridColumn = React.createClass({
    render() {
        return <div className={ this.props.className }>
            { this.props.children }
        </div>;
    }
});

const GridRow = React.createClass({
    render() {
        return <div className="row">
            { this.props.children }
        </div>;
    }
});

const ProductsList = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired
        //onSave: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            editing: null
        };
    },

    handleVinylUpdate( update ) {

        const args = {
            productId: update._id,
            data: {
                name: update.name,
                price: update.price,
                createdAt: update.createdAt
            }
        };

        Meteor.call( 'Products.methods.upsert', args, ( error, response ) => {
            if ( error ) {
                sAlert.error( error.reason );
            } else {
                this.setState( { editing: null } );
                sAlert.success( 'Record updated!' );
            }
        });
    },

    handleEditField( event ) {
        if ( event.keyCode === 13 ) {
            let target = event.target;
            let update = {};

            update._id = this.state.editing;
            update[target.name] = target.value;

            this.handleVinylUpdate( update );
        }
    },
    handleEditItem() {
        let itemId = this.state.editing;

        this.handleVinylUpdate({
            _id: itemId,
            name: this.refs[`name_${ itemId }`].value,
            price: this.refs[`price_${ itemId }`].value,
            createdAt: this.refs[`createdAt_${ itemId }`].value
        });
    },

    toggleEditing( itemId ) {
        this.setState( { editing: itemId } );
    },

    renderItemOrEditField( item ) {
        if ( this.state.editing === item._id ) {
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
                        <a className="btn btn-success" onClick={ this.handleEditItem }>Update Item</a>
                    </GridColumn>
                </GridRow>
            </li>;
        } else {
            return <li
                onClick={ this.toggleEditing.bind( null, item._id ) }
                key={ item._id }
                className="list-group-item">
                { `${ item.name } (${ accounting.formatMoney(item.price, "£") })` }
            </li>;
        }
    },

    render() {
        //console.log("render()", this.props);

        return <ul className="list-group">
            {this.props.items.map( ( item ) => {
                return this.renderItemOrEditField( item );
            })}
        </ul>;
    }
});

export default ProductsList;
