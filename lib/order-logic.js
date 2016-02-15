

export function lineValue(orderLine) {
    const val = orderLine.quantity * orderLine.unitPrice;
    console.log("lineValue", val);
    return val;
}

export function orderValue(order) {
    console.log(order);

    let total = 0;
    let arrayLength = order.orderLines.length;
    for (var i = 0; i < arrayLength; i++) {
        total += order.orderLines[i].lineValue;
    }

    console.log("orderValue", total);
    return total;
}

export function recalculateOrderTotals(order) {
    console.log(order);

    let total = 0;
    let arrayLength = order.orderLines.length;
    for (var i = 0; i < arrayLength; i++) {
        order.orderLines[i].lineValue = lineValue(order.orderLines[i]);
        total += order.orderLines[i].lineValue;
    }
    order.totalValue = total;

    //console.log("orderValue", total);
    return order;
}
