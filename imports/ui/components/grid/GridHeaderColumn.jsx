import React from 'react';

const GridHeaderColumn = React.createClass({
    render() {
        return <div className={ this.props.className }>
            { this.props.children }
        </div>;
    }
});

export default GridHeaderColumn