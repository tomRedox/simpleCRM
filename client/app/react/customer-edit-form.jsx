
//var Input = require('./textInput');

// App component - represents the whole app
CustomerEditComponent = React.createClass({
    // Declare our expectations for using this class (not mandatory, just good practice)
    propTypes: {
        customer: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object // this one is optional (no isRequired)
    },

    render() {
        console.log("CustomerEditComponent customer: ", this.props.customer);

        return (
            <form className="customer_edit_react" onSubmit={this.handleSubmit}>
                <div className="panel panel-default col-md-6">
                    <div className="panel-body">

                        <h3>{this.props.customer.name}</h3>

                        <Input
                            name="name"
                            label="Name"
                            onChange = {this.props.onChange}
                            placeholder="Name"
                            defaultValue={this.props.customer.name}
                            error={this.props.errors.name}
                        />

                        <Input
                            name="email"
                            label="Email"
                            onChange = {this.props.onChange}
                            placeholder="Email"
                            defaultValue={this.props.customer.email}
                            error={this.props.errors.email}
                        />

                        <Input
                            name="postcode"
                            label="Postcode"
                            onChange = {this.props.onChange}
                            placeholder="Postcode"
                            defaultValue={this.props.customer.postcode}
                            error={this.props.errors.postcode}
                        />


                        <input
                            type="submit"
                            value="Save"
                            className="btn btn-primary"
                            onClick={this.props.onSave}
                        />

                    </div>
                </div>
            </form>
        );
    }
});
//<div className="form-group">
//    <label for="nextContactDate">Next contact date</label>
//    <input type="text" id="nextContactDate" className="form-control"
//           defaultValue={this.props.customer.nextContactDate}/>
//</div>
