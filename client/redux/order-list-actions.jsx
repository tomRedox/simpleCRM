

import Orders from '../../api/orders/order';
import store from './store.jsx';



export function toggleExpanded() {
    console.log("order-list-actions.toggleExpanded() ");
    return (dispatch, getState) => {

        console.log("inner OrderActions.editOrder() " );
        dispatch ({
            type: 'TOGGLE_ORDER_LIST_EXPANDED'
        });
    }
}
