var COMPONENTS = (function(components) {

    components.BackgroundImage = React.createClass({displayName: "BackgroundImage",
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
                React.createElement("div", {className: "slide__background fadein", style: styles})
            );
        }
    });

    return components;
})(COMPONENTS || {});
;var COMPONENTS = (function(components) {

    components.Clock = React.createClass({displayName: "Clock",
        render: function() {
            var hour = this.props.date.getHours() % 12 || 12;
            var minutes = this.props.date.getMinutes();
            var seconds = this.props.date.getSeconds();
            return (
                React.createElement("div", {className: "slide__clock"}, hour < 10 ? '0'+hour : hour, ":", minutes < 10 ? '0'+minutes : minutes, ":", seconds < 10 ? '0'+seconds : seconds)
            );
        }
    });

    return components;
})(COMPONENTS || {});
;var COMPONENTS = (function(components) {

    components.Credit = React.createClass({displayName: "Credit",
        render: function() {
            return (
                React.createElement("div", {className: "slide__credit"}, 
                    this.props.asset.image.credit || null
                )
            );
        }
    });

    return components;
})(COMPONENTS || {});
;var COMPONENTS = (function(components) {

    components.Info = React.createClass({displayName: "Info",
        render: function() {
            return (
                React.createElement("div", {className: "slide__info"}, 
                    React.createElement("div", {className: "slide__info-title"}, this.props.asset.title), 
                    React.createElement("div", {className: "slide__info-lede"}, 
                        this.props.asset.lede
                    ), 
                    React.createElement("a", {className: "slide__info-url", href: this.props.asset.url}, "Read the full story")
                )
            );
        }
    });

    return components;
})(COMPONENTS || {});
;var COMPONENTS = (function(components) {

    components.Logo = React.createClass({displayName: "Logo",
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
                React.createElement("div", {className: "slide__logo"}, 
                    React.createElement("a", {href: brands[brand].url}, React.createElement("img", {src: brands[brand].logo}))
                )
            );
        }
    });

    return components;
})(COMPONENTS || {});
;var COMPONENTS = (function(components) {

    components.Preferences = React.createClass({displayName: "Preferences",
        render: function() {
            return (
                React.createElement("div", {className: "slide__preferences"}, 

                    React.createElement("div", {className: "slide__preferences-title"}, "Customize"), 

                    "Include content from:", 

                    React.createElement("form", null, 
                        React.createElement("input", {id: "slide__preferences-input--chow", type: "checkbox", checked: this.props.sources.chow, name: "chow", onChange: this.props.onChangeSettings}), 
                        React.createElement("label", {htmlFor: "slide__preferences-input--chow"}, 
                            "CHOW", 
                            React.createElement("i", {className: "slide__preferences-checked fa fa-check-circle"}), 
                            React.createElement("i", {className: "slide__preferences-unchecked fa fa-circle-o"})
                        ), 

                        React.createElement("input", {id: "slide__preferences-input--cbsnews", name: "cbsnews", type: "checkbox", checked: this.props.sources.cbsnews, onChange: this.props.onChangeSettings}), 
                        React.createElement("label", {htmlFor: "slide__preferences-input--cbsnews"}, 
                            "CBS News", 
                            React.createElement("i", {className: "slide__preferences-checked fa fa-check-circle"}), 
                            React.createElement("i", {className: "slide__preferences-unchecked fa fa-circle-o"})
                        ), 

                        React.createElement("input", {id: "slide__preferences-input--cnet", name: "cnet", type: "checkbox", checked: this.props.sources.cnet, onChange: this.props.onChangeSettings}), 
                        React.createElement("label", {htmlFor: "slide__preferences-input--cnet"}, 
                            "CNET", 
                            React.createElement("i", {className: "slide__preferences-checked fa fa-check-circle"}), 
                            React.createElement("i", {className: "slide__preferences-unchecked fa fa-circle-o"})
                        )
                    )
                )
            );
        }
    });


    return components;
})(COMPONENTS || {});
;var COMPONENTS = (function(components) {

    components.ProgressDots = React.createClass({displayName: "ProgressDots",
        render: function() {
            var dot;
            if (this.props.slideKey == this.props.currentSlide) {
                dot = React.createElement("i", {className: "fa fa-circle"});
            } else {
                dot = React.createElement("i", {className: "fa fa-circle-thin"});
            }

            return (
                React.createElement("div", {className: "progressDots"}, 
                    dot
                )
            );
        }
    });

    return components;
})(COMPONENTS || {});
;var COMPONENTS = (function(components) {

    components.Toolbar = React.createClass({displayName: "Toolbar",
        render: function() {
            return (
                React.createElement("div", {className: "slide__toolbar"}, 
                    React.createElement("i", {className: "slide__toolbar-icon fa fa-cog fa-2x", onClick: this.props.onToggleSettings})
                )
            );
        }
    });

    return components;
})(COMPONENTS || {});
;(function() {
    var BackgroundImage = COMPONENTS.BackgroundImage,
        Info = COMPONENTS.Info,
        Logo = COMPONENTS.Logo,
        Toolbar = COMPONENTS.Toolbar,
        Clock = COMPONENTS.Clock,
        Preferences = COMPONENTS.Preferences,
        Credit = COMPONENTS.Credit,
        ProgressDots = COMPONENTS.ProgressDots;

    var appState = {
        settingsOpen: false,
        date: new Date(),
        sources: {
            chow: true,
            cbsnews: true,
            cnet: true
        },
        urls: {
            chow: 'data/chow.json',
            cbsnews: 'data/cbsnews.json',
            cnet: 'data/cnet.json'
        },
        currentSlide: 0
    };

    getSettingsFromLocalStorage();
    getAssetsFromXhr(appState.urls[ _getRandomBrand() ]);

    function getAssetsFromXhr(url) {
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var assets = data;
                assets = _.shuffle(data);
                render(assets);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    }

    function onToggleSettings() {
        appState.settingsOpen = !appState.settingsOpen;
        console.log("Settings is now ", appState.settingsOpen)
    }

    function getSettingsFromLocalStorage() {
        var sources = localStorage.getItem("sources");

        if (sources) {
            console.log("Getting settings from localStorage", sources);
            appState.sources = JSON.parse(localStorage.getItem("sources"));
        }
    }

    function onChangeSettings(event) {
        var brand = event.target.name;
        appState.sources[brand] = !appState.sources[brand];

        console.log("Saving settings to localStorage", appState.sources);
        localStorage.setItem("sources", JSON.stringify(appState.sources));
    }

    var Slide = React.createClass({displayName: "Slide",
        getInitialState: function() {
            return appState;
        },

        componentDidMount: function() {
            setInterval(function() {
                appState.date = new Date();
                this.setState({
                    date: appState.date
                })
            }.bind(this), 17);
        },

        render: function() {
            return (
                React.createElement("div", {"data-key": this.props.slideKey, className: this.props.currentSlide == this.props.slideKey ? 'slide active' : this.props.currentSlide < this.props.slideKey ? 'slide discarded' : 'slide'}, 

                    appState.settingsOpen ? React.createElement(Preferences, {sources: this.state.sources, onChangeSettings: onChangeSettings}) : null, 

                    React.createElement("div", {className: "overlay"}, 
                        React.createElement(BackgroundImage, {image: this.props.asset.image})
                    ), 
                    React.createElement("div", {className: "top"}), 
                    React.createElement("div", {className: "top-left"}, 
                        React.createElement(Clock, {date: this.state.date})
                    ), 
                    React.createElement("div", {className: "top-right"}, 
                        React.createElement(Credit, {asset: this.props.asset})
                    ), 
                    React.createElement("div", {className: "slide__greeting"}), 
                    React.createElement("div", {className: "bottom"}), 
                    React.createElement("div", {className: "bottom-left"}, 
                        React.createElement(Logo, {brand: this.props.asset.brand})
                    ), 
                    React.createElement("div", {className: "bottom-center"}, 
                        React.createElement(Info, {asset: this.props.asset})
                    ), 
                    React.createElement("div", {className: "bottom-right"}, 
                        React.createElement(Toolbar, {onToggleSettings: onToggleSettings})
                    )
                )
            )
        }
    });


    var App = React.createClass({displayName: "App",
        getInitialState: function() {
            return appState;
        },

        show: function() {
            $(React.findDOMNode(this)).addClass('show');
        },

        componentDidMount: function() {
            window.setTimeout(this.show.bind(this), 24);

            var isScrollWaiting = false;
            document.addEventListener('mousewheel', function(e) {
                var timeout = 1500;
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

                if (!isScrollWaiting) {
                    isScrollWaiting = true;

                    //console.log(delta);
                    if (delta == 1 && appState.currentSlide > 0) {
                    //if (e.keyCode == 38 && appState.currentSlide > 0) { // down
                        appState.currentSlide -= 1;
                        slideUp();
                        this.setState({
                            currentSlide: appState.currentSlide
                        });

                        this.forceUpdate();
                    } else if (delta == -1 && appState.currentSlide < this.props.assets.length-1) {
                    //} else if (e.keyCode == 40 && appState.currentSlide < this.props.assets.length-1) { // up
                        appState.currentSlide += 1;
                        slideDown();
                        this.setState({
                            currentSlide: appState.currentSlide
                        });
                        this.forceUpdate();
                    } else {
                        timeout = 1;
                    }

                    console.log("Starting scroll");

                    window.setTimeout(function() {
                        console.log("Ending scroll");
                        isScrollWaiting = false;
                    }.bind(this), timeout);
                }

                return false;
            }.bind(this));
        },
        render: function() {
            var slides = [];
            _.forEach(this.props.assets, function(asset, i) {
                console.log('state', appState.currentSlide);
                slides.push(React.createElement(Slide, {asset: asset, key: i, slideKey: i, currentSlide: appState.currentSlide}))
            });

            var dots = [];
            _.times(this.props.assets.length, function(n) {
                dots.push(React.createElement(ProgressDots, {slideKey: n, currentSlide: appState.currentSlide}));
            });

            return (
                React.createElement("div", {id: "slides"}, 
                    slides, 
                    React.createElement("div", {className: "left"}, 
                        dots

                    )
                )
            );

           /*<Slide asset={this.props.assets} />*/
       }
    });

    function render(assets) {
        React.render(React.createElement(App, {assets: assets}), document.getElementById('container'));
    }

    function slideUp() {
        console.log("Sliding up", appState.currentSlide);
    }

    function slideDown() {
        console.log("Sliding down", appState.currentSlide);
    }


    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    function _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function _getRandomBrand() {
        var enabledBrands = [];
        for(var key in appState.sources) {
            if(appState.sources.hasOwnProperty(key) && appState.sources[key]) {
                enabledBrands.push(key);
            }
        }

        // If none are selected, then pick from all choices
        if (!enabledBrands.length) {
            enabledBrands = Object.keys(appState.sources);
        }

        return enabledBrands[ enabledBrands.length * Math.random() << 0 ];
    }
})();
