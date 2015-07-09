var COMPONENTS = (function(components) {

    components.Preferences = React.createClass({
        render: function() {
            return (
                <div className="slide__preferences">

                    <div className="slide__preferences-title">Customize</div>

                    Include content from:

                    <form>
                        <input id="slide__preferences-input--chow" type="checkbox" checked={this.props.sources.chow} name="chow" onChange={this.props.onChangeSettings} />
                        <label htmlFor="slide__preferences-input--chow">
                            CHOW
                            <i className="slide__preferences-checked fa fa-check-circle"></i>
                            <i className="slide__preferences-unchecked fa fa-circle-o"></i>
                        </label>

                        <input id="slide__preferences-input--cbsnews" name="cbsnews" type="checkbox" checked={this.props.sources.cbsnews} onChange={this.props.onChangeSettings} />
                        <label htmlFor="slide__preferences-input--cbsnews">
                            CBS News
                            <i className="slide__preferences-checked fa fa-check-circle"></i>
                            <i className="slide__preferences-unchecked fa fa-circle-o"></i>
                        </label>

                        <input id="slide__preferences-input--cnet" name="cnet" type="checkbox" checked={this.props.sources.cnet} onChange={this.props.onChangeSettings} />
                        <label htmlFor="slide__preferences-input--cnet">
                            CNET
                            <i className="slide__preferences-checked fa fa-check-circle"></i>
                            <i className="slide__preferences-unchecked fa fa-circle-o"></i>
                        </label>
                    </form>
                </div>
            );
        }
    });


    return components;
})(COMPONENTS || {});
