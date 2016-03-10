

export function toggleExpanded() {
    return (dispatch, getState) => {
        dispatch ({
            type: 'TOGGLE_CUSTOMER_LIST_EXPANDED'
        });
    }
}
