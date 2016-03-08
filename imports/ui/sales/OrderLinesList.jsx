
import OrderLineEdit from './OrderLineEdit.jsx';

var React = require('react');

// App component - represents the whole app
const OrderLinesList = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        onChildChange: React.PropTypes.func.isRequired,
        onProductChange: React.PropTypes.func.isRequired,
        deleteOrderLine: React.PropTypes.func
    },

    //getErrorsForLine(orderLine) {
    //
    //    let errorSet;
    //    let errors = {};
    //
    //    if (this.props.lineErrorSets) {
    //        errorSet = this.props.lineErrorSets.find(x => x._id === orderLine._id);
    //        if (errorSet && errorSet.errors) {
    //            errors = errorSet.errors;
    //        }
    //    }
    //    //console.log(errors);
    //    return errors;
    //},

    renderOrderLines() {
        //console.log("customers2", this.data.customers)

        // Get tasks from this.data.tasks
        if (!this.props.order.orderLines) { return; }

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

    divStyle: {
        minWidth: "70px",
        verticalAlign: top
    },

    render() {
        //console.log("OrderLinesList.render()");
        return (
            <div>
                <table id="cart" className="table  table-condensed" style={this.divStyle}>
                    <thead>
                    <tr>
                        <th style={ {minWidth: '200px'} }>Product</th>
                        <th style={ this.divStyle }>Quantity</th>
                        <th style={ {minWidth: '90px'} }>Unit price</th>
                        <th style={ {minWidth: '90px'} }>Line total</th>
                        <th style={ {minWidth: '70px'} }></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderOrderLines()}
                    </tbody>
                </table>
            </div>
        );
    }
});

export default OrderLinesList;
