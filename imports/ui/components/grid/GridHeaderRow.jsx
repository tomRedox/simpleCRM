import React from 'react';

const GridHeaderRow = React.createClass({
    render() {
        return <div className="row">
            { this.props.children }
        </div>;
    }
});

export default GridHeaderRow