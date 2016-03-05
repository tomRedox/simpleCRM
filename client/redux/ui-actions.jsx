

export function toggleLeftNavExpanded() {
    console.log("toggleLeftNavExpanded() ");
    return (dispatch, getState) => {
        dispatch ({
            type: 'TOGGLE_LEFT_NAV_EXPANDED'
        });
    }
}
