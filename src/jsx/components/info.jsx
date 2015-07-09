var COMPONENTS = (function(components) {

    components.Info = React.createClass({
        render: function() {
            return (
                <div className="slide__info">
                    <div className="slide__info-title">{this.props.asset.title}</div>
                    <div className="slide__info-lede">
                        {this.props.asset.lede}
                    </div>
                    <a className="slide__info-url" href={this.props.asset.url}>Read the full story</a>
                </div>
            );
        }
    });

    return components;
})(COMPONENTS || {});
