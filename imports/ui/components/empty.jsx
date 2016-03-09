var React = require('react');


const Empty = React.createClass({
    propTypes: {
        //order: React.PropTypes.object,
        //onSave: React.PropTypes.func.isRequired
    },

    //getDefaultProps() {
    //    return {
    //        order: {}
    //    };
    //},

    //getInitialState() {
    //    //console.log("Empty.getInitialState(): props", this.props);
    //
    //    return {
    //        isValid: false
    //    };
    //},

    //mixins: [ ReactMeteorData ],

    //getMeteorData() {
    //    //console.log("Empty.getMeteorData");
    //    return {
    //
    //    };
    //},


    render() {
        //console.log("render()", this.props);

        return (

            <h1></h1>


        );
    }
});

export default Empty;
