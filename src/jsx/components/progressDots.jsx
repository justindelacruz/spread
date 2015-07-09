var COMPONENTS = (function(components) {

    components.ProgressDots = React.createClass({
        render: function() {
            var dot;
            if (this.props.slideKey <= this.props.currentSlide) {
                dot = <i className="fa fa-circle fa-2x"></i>;
            } else {
                dot = <i className="fa fa-circle-thin fa-2x"></i>;
            }

            return (
                <div className="progressDots">
                    {dot}
                </div>
            );
        }
    });

    return components;
})(COMPONENTS || {});
