

export function toggleExpanded() {
    //console.log("customer-list-actions.toggleExpanded() ");
    return (dispatch, getState) => {

        //console.log("inner CustomerActions.editCustomer() " );
        dispatch ({
            type: 'TOGGLE_CUSTOMER_LIST_EXPANDED'
        });
    }
}
