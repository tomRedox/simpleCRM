var React = require('react');


const Test2 = React.createClass({
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
            <div key="test2">
                <h1>Test 2</h1>
                <p> nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum. async
                </p>
                <p>
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>

            </ div >
        );
    }
});

export default Test2;
