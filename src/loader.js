(function(d, w) {
    'use strict';

    var CONST = {
        placeholderClass: 'bw-placeholder'
    };

    var defaults = {
        selector: '[data-bwloader]'
    };

    var BwLoader = function(options) {
        if (!(this instanceof BwLoader)) {
            return new BwLoader(options)
        }

        this.placeholders = [];

        this.setOptions(options);
        this.createPlaceholders();
        attachEvents.call(this);
    };

    BwLoader.prototype.setOptions = function(options) {
        if (typeof options !== 'object' && options !== null) {
            return this.options = defaults
        }

        Object.keys(defaults).forEach(function(k) {
            if (options[k] === undefined) options[k] = defaults[k];
        });

        this.options = options;
    };

    BwLoader.prototype.createPlaceholders = function() {
        var $images = d.querySelectorAll(this.options.selector);
        var $placeholder = d.createElement('div');
        $placeholder.className = CONST.placeholderClass;

        $images.forEach(function($image, index) {
            var $placeholderClone = $placeholder.cloneNode(false);

            $image.dataset.bwloaderIndex = index;
            $image.parentNode.insertBefore($placeholderClone, $image.nextSibling);

            this.placeholders.push({
                placeholder: $placeholderClone,
                image: $image
            });
        }, this);
    };

    BwLoader.prototype.removePlaceholder = function($image) {
        var placeholder = this.placeholders[$image.dataset.bwloaderIndex];

        placeholder.placeholder.remove();
        detachEvent($image);
    };

    function onLoad(e) {
        var $image = e.target;

        if (!$image.complete || (typeof $image.naturalWidth !== 'undefined' && $image.naturalWidth == 0)) {
            console.log('Image not loaded!: ', $image);
            return detachEvent(e.target);
        }

        this.removePlaceholder($image);
    }

    function onError(e) {
        var $image = e.target;

        console.log('Image not loaded!: ', $image);
        detachEvent($image);
    }

    function attachEvents() {
        this.placeholders.forEach(function(placeholder) {
            placeholder.image.addEventListener('load', onLoad.bind(this));
            placeholder.image.addEventListener('error', onError.bind(this));
        }, this);
    }

    function detachEvent($image) {
        $image.removeEventListener('load', onLoad);
        $image.removeEventListener('error', onError);
    }

    w.BwLoader = BwLoader;
})(document, window);

/* polyfill for DOM.remove() */
(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('remove')) {
            return;
        }
        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
                this.parentNode.removeChild(this);
            }
        });
    });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);