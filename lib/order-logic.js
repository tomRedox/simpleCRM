

export function lineValue(orderLine) {
        return orderLine.quantity * orderLine.unitPrice;
}

export function orderValue(order) {
    return order.orderLines.reduce(
        function (prev,current) {
            return +Number(current.lineValue) + prev;
        }, 0
    );
}
