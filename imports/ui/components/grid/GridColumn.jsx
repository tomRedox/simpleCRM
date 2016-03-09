import React from 'react';

const GridColumn = React.createClass({
    render() {
        return <div className={ this.props.className }>
            { this.props.children }
        </div>;
    }
});

export default GridColumn