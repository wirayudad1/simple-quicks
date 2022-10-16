/**
 * @private
 */
Ext.define('Ext.Evented', {

    alternateClassName: 'Ext.EventedBase',

    mixins: [
        'Ext.mixin.Observable'
    ],

    /**
     * @cfg {Object} eventedConfig
     * Config options defined within `eventedConfig` will auto-generate the setter /
     * getter methods (see {@link #cfg-config config} for more information on
     * auto-generated getter / setter methods).  Additionally, when an
     * `eventedConfig` is set it will also fire a before{cfg}change and {cfg}change
     * event when the value of the eventedConfig is changed from its originally
     * defined value.
     *
     * **Note:** When creating a custom class you'll need to extend Ext.Evented
     *
     * Example custom class:
     *
     *     Ext.define('MyApp.util.Test', {
     *         extend: 'Ext.Evented',
     *
     *         eventedConfig: {
     *             foo: null
     *         }
     *     });
     *
     * In this example, the `foo` config will initially be null.  Changing it via
     * `setFoo` will fire the `beforefoochange` event.  The call to the setter can be
     * halted by returning `false` from a listener on the **before** event.
     *
     *     var test = Ext.create('MyApp.util.Test', {
     *         listeners: {
     *             beforefoochange: function (instance, newValue, oldValue) {
     *                 return newValue !== 'bar';
     *             },
     *             foochange: function (instance, newValue, oldValue) {
     *                console.log('foo changed to:', newValue);
     *             }
     *         }
     *     });
     *
     *     test.setFoo('bar');
     *
     * The `before` event handler can be used to validate changes to `foo`.
     * Returning `false` will prevent the setter from changing the value of the
     * config.  In the previous example the `beforefoochange` handler returns false
     * so `foo` will not be updated and `foochange` will not be fired.
     *
     *     test.setFoo('baz');
     *
     * Setting `foo` to 'baz' will not be prevented by the `before` handler.  Foo
     * will be set to the value: 'baz' and the `foochange` event will be fired.
     */

    statics: {
        generateSetter: function (cfg) {
            var names = cfg.names,
                name = cfg.name,
                prefixedName = names.internal,
                applyName = names.apply,
                changeEventName = names.changeEvent,
                doSetName = names.doSet;

            return function(value) {
                var me = this,
                    internalName = me.$configPrefixed ? prefixedName : name,
                    initialized = me.initialized,
                    oldValue,
                    applier = me[applyName];

                if (applier) {
                    value = applier.call(me, value, me[internalName]);
                    if (value === undefined) {
                        return me;
                    }
                }

                // The old value might have been changed at this point
                // (after the apply call chain) so it should be read here
                oldValue = me[internalName];

                if (value !== oldValue) {
                    if (initialized) {
                        me.fireAction(changeEventName, [me, value, oldValue], me.doSet, me, {
                            nameMap: names
                        });
                    }
                    else {
                        me[internalName] = value;
                        if (me[doSetName]) {
                            me[doSetName](value, oldValue);
                        }
                    }
                }

                return this;
            };
        }
    },

    initialized: false,

    constructor: function(config) {
        this.mixins.observable.constructor.call(this, config);
        this.initialized = true;
    },

    doSet: function(me, value, oldValue, options) {
        var nameMap = options.nameMap;

        me[nameMap.internal] = value;
        if (me[nameMap.doSet]) {
            me[nameMap.doSet].call(this, value, oldValue);
        }
    },

    onClassExtended: function(cls, data) {
        if (!data.hasOwnProperty('eventedConfig')) {
            return;
        }

        var config = data.config,
            eventedConfig = data.eventedConfig,
            cacheName = 'eventedSetter',
            name, cfg;

        if (config) {
            Ext.applyIf(config, eventedConfig);
        } else {
            cls.addConfig(eventedConfig);
        }

        /*
         * These are generated setters for eventedConfig
         *
         * If the component is initialized, it invokes fireAction to fire the event as well,
         * which indicate something has changed. Otherwise, it just executes the action
         * (happens during initialization)
         *
         * This is helpful when we only want the event to be fired for subsequent changes.
         * Also it's a major performance improvement for instantiation when fired events
         * are mostly useless since there's no listeners
         */
        for (name in eventedConfig) {
            if (eventedConfig.hasOwnProperty(name)) {
                cfg = Ext.Config.get(name);
                data[cfg.names.set] = cfg[cacheName] ||
                                     (cfg[cacheName] = this.generateSetter(cfg));
            }
        }
    }
});
