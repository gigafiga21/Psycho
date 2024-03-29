/**
 * Singleton tracking signal of changing language
 * When language is changed, listener will be called. To get translation bind it to the listener function.
 * @type {Object}
 */
var translations = new
    (function()
    {
        /**
         * Changes current language and dispatches event of it
         * @param {String} language - choosed language name
         */
        function change(language)
        {
            var next = DOM.container.querySelector("[name='" + language + "']");
            if (!next)
            {
                return;
            }

            var active = DOM.container.querySelector(".translations__button--active");
            if (active)
            {
                active.classList.remove("translations__button--active");
            }

            next.classList.add("translations__button--active");
            listeners.forEach(
                function(listener)
                {
                    listener(language);
                });
        }

        /**
         * Setts event listener
         * @param {Function} listener - listener for event
         */
        this.addEventListener = function(listener)
        {
            listeners.push(listener);
        }

        /**
         * Listeners for language changing event
         * @type {Array[Functions]}
         */
        var listeners = [];

        /**
         * Available languages
         * @type {Array[Strings]}
         */
        var languages = [];

        /**
         * Setter for languages property
         * Redraws DOM element with languages selection and setts first given as current
         * @type {Function}
         */
        Object.defineProperty(this, "languages", {set:
            (function(langs)
            {
                DOM.container.innerHTML = "";
                languages = langs;
                languages.forEach(
                    (function(name)
                    {
                        var button = DOM.container.newChildElement("button", {classList: "translations__button", name: name}, name);
                        button.addEventListener("click", change.bind(this, name));
                        DOM.buttons.push(button);
                    }).bind(this));
                change(languages[0]);
            }).bind(this)});

        /**
         * Getter for the current language property
         * @return {String|Null} - current choosed language or null if no languages were added
         */
        Object.defineProperty(this, "current", {get:
            (function()
            {
                var active = DOM.container.querySelector(".translations__button--active");
                return active ? active.name : null;
            }).bind(this)});

        /**
         * DOM tree of the class
         * @type {Object}
         */
        var DOM =
            {
                container: null,
                buttons: []
            };

        DOM.container = document.body.newChildElement("div", {classList: "translations__container"});
    })();
