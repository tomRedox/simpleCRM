import React from 'react';

import GridRow from '../components/grid/GridRow.jsx'
import GridColumn from '../components/grid/GridColumn.jsx'
import GridHeaderColumn from '../components/grid/GridHeaderColumn.jsx'
import GridHeaderRow from '../components/grid/GridHeaderRow.jsx'

import OrderLineEdit from './OrderLineEdit.jsx';


// App component - represents the whole app
const OrderLinesList = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        onChildChange: React.PropTypes.func.isRequired,
        onProductChange: React.PropTypes.func.isRequired,
        deleteOrderLine: React.PropTypes.func
    },

    renderOrderLines() {
        //console.log("customers2", this.data.customers)

        // Get tasks from this.data.tasks
        if (!this.props.order.orderLines) {
            return;
        }

        return this.props.order.orderLines.map((orderLine) => {

            return (

                <div key={orderLine._id}>

                    <OrderLineEdit
                        orderLine={orderLine}
                        onChange={this.props.onChildChange}
                        onProductChange={this.props.onProductChange}
                        deleteOrderLine={this.props.deleteOrderLine}
                        errors={orderLine.errors}
                    />

                </div>
            );
        });
    },

    render() {
        //console.log("OrderLinesList.render()");
        return (
            <div>
                <GridHeaderRow>
                    <GridHeaderColumn className="col-xs-12 col-sm-5" ><label>Product</label></GridHeaderColumn>
                    <GridHeaderColumn className="col-xs-12 col-sm-2" ><label>Quantity</label></GridHeaderColumn>
                    <GridHeaderColumn className="col-xs-12 col-sm-2" ><label>Unit price</label></GridHeaderColumn>
                    <GridHeaderColumn className="col-xs-12 col-sm-2" ><label>Line total</label></GridHeaderColumn>
                    <GridHeaderColumn className="col-xs-12 col-sm-1" ></GridHeaderColumn>
                </GridHeaderRow>
                {this.renderOrderLines()}
            </div>
        );
    }
});

export default OrderLinesList;
