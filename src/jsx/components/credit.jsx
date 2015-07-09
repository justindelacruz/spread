var COMPONENTS = (function(components) {

    components.Credit = React.createClass({
        render: function() {
            return (
                <div className="slide__credit">
                    {this.props.asset.image.credit || null}
                </div>
            );
        }
    });

    return components;
})(COMPONENTS || {});
