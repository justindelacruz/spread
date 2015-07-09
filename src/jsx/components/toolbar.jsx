var COMPONENTS = (function(components) {

    components.Toolbar = React.createClass({
        render: function() {
            return (
                <div className="slide__toolbar">
                    <i className="slide__toolbar-icon fa fa-cog fa-2x" onClick={this.props.onToggleSettings}></i>
                </div>
            );
        }
    });

    return components;
})(COMPONENTS || {});
