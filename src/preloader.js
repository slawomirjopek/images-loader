(function(d, w) {
    'use strict';

    var defaults = {
        selector: '[data-bwloader]'
    };

    var BwLoader = function(options) {
        if (!(this instanceof BwLoader)) {
            return new BwLoader(options)
        }

        this.setOptions(options);
        this.createPlaceholders();
    };

    BwLoader.prototype.setOptions = function(options) {
        if (typeof options !== 'object' && options !== null) {
            return this.options = defaults
        }

        Object.keys(defaults).forEach(function(k) {
            if (options[k] === undefined) options[k] = defaults[k];
        });

        this.options = options
    };

    BwLoader.prototype.createPlaceholders = function() {
        var images = d.querySelectorAll(this.options.selector);

        //@TODO create & inject placeholders
    };

    w.BwLoader = BwLoader;
})(document, window);

BwLoader();