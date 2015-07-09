(function() {
    var BackgroundImage = COMPONENTS.BackgroundImage,
        Info = COMPONENTS.Info,
        Logo = COMPONENTS.Logo,
        Toolbar = COMPONENTS.Toolbar,
        Clock = COMPONENTS.Clock,
        Preferences = COMPONENTS.Preferences;
        Credit = COMPONENTS.Credit;

    var appState = {
        settingsOpen: false,
        date: new Date(),
        sources: {
            chow: true,
            cbsnews: true,
            cnet: false
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

    var Slide = React.createClass({
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
                <div data-key={this.props.slideKey} className={this.props.currentSlide == this.props.slideKey ? 'slide active' : this.props.currentSlide < this.props.slideKey ? 'slide discarded' : 'slide'}>

                    {appState.settingsOpen ? <Preferences sources={this.state.sources}onChangeSettings={onChangeSettings} /> : null}

                    <div className="overlay">
                        <BackgroundImage image={this.props.asset.image} />
                    </div>
                    <div className="top"></div>
                    <div className="top-left">
                        <Clock date={this.state.date} />
                    </div>
                    <div className="top-right">
                        <Credit asset={this.props.asset} />
                    </div>
                    <div className="slide__greeting"></div>
                    <div className="bottom"></div>
                    <div className="bottom-left">
                        <Logo brand={this.props.asset.brand} />
                    </div>
                    <div className="bottom-center">
                        <Info asset={this.props.asset} />
                    </div>
                    <div className="bottom-right">
                        <Toolbar onToggleSettings={onToggleSettings} />
                    </div>
                </div>
            )
        }
    });


    var App = React.createClass({
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
                slides.push(<Slide asset={asset} key={i} slideKey={i} currentSlide={appState.currentSlide} />)
            });

            return (
                <div id="slides">
                    {slides}
                </div>
            );

           /*<Slide asset={this.props.assets} />*/
       }
    });

    function render(assets) {
        React.render(<App assets={assets} />, document.getElementById('container'));
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
