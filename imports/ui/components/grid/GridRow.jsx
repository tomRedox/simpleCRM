import React from 'react';

const GridRow = React.createClass({
    render() {
        return <div className="row">
            { this.props.children }
        </div>;
    }
});

export default GridRow