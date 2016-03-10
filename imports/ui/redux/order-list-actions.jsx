

export function toggleExpanded() {
    return (dispatch, getState) => {
    dispatch ({
            type: 'TOGGLE_ORDER_LIST_EXPANDED'
        });
    }
}
