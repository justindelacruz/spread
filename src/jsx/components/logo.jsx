var COMPONENTS = (function(components) {

    components.Logo = React.createClass({
        render: function() {
            var brand = this.props.brand;
            var brands = {
                chow: {
                    'url': 'http://www.chow.com',
                    'logo': 'images/chow-logo.png'
                },
                cbsnews: {
                    'url': 'http://www.cbsnews.com',
                    'logo': 'images/cbsnews-logo.png'
                },
                cnet: {
                    'url': 'http://www.cnet.com',
                    'logo': 'images/cnet-logo.png'
                }
            };

            return (
                <div className="slide__logo">
                    <a href={brands[brand].url}><img src={brands[brand].logo} /></a>
                </div>
            );
        }
    });

    return components;
})(COMPONENTS || {});
