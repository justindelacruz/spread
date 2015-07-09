var COMPONENTS = (function(components) {

    components.Clock = React.createClass({
        render: function() {
            var hour = this.props.date.getHours() % 12 || 12;
            var minutes = this.props.date.getMinutes();
            var seconds = this.props.date.getSeconds();
            return (
                <div className="slide__clock">{hour < 10 ? '0'+hour : hour}:{minutes < 10 ? '0'+minutes : minutes}:{seconds < 10 ? '0'+seconds : seconds}</div>
            );
        }
    });

    return components;
})(COMPONENTS || {});
