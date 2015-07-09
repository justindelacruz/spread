var COMPONENTS = (function(components) {

    components.BackgroundImage = React.createClass({
        componentDidMount: function() {
            window.setTimeout(this.show.bind(this), 10);
        },

        show: function() {
            $(React.findDOMNode(this)).addClass('slide__background--show');
        },

        render: function() {
            var imageUrl = typeof this.props.image == 'string' ?  this.props.image : this.props.image.url;

            var styles = {
                backgroundImage: 'url(' + imageUrl + ')'
            }
            return (
                <div className="slide__background fadein" style={styles}></div>
            );
        }
    });

    return components;
})(COMPONENTS || {});
