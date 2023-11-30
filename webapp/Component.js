/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "ap/customerapplication/model/models",
        "sap/f/library"
    ],
    function (UIComponent, Device, models, fioriLibrary) {
        "use strict";

        return UIComponent.extend("ap.customerapplication.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);


                let oModel = new sap.ui.model.json.JSONModel({layout: fioriLibrary.LayoutType.OneColumn});
                this.setModel(oModel, "settings");

                // enable routing
                this.getRouter().initialize();
                this.getRouter().attachBeforeRouteMatched(this._onBeforeRouteMatched, this);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },
            _onBeforeRouteMatched: function(oEvent) {
                var oModel = this.getModel("settings"),
                    sLayout = oEvent.getParameters().arguments.layout;
      
                // If there is no layout parameter, set a default layout (normally OneColumn)
                if (!sLayout) {
                    sLayout = fioriLibrary.LayoutType.OneColumn;
                }
      
                oModel.setProperty("/layout", sLayout);
            }
        });
    }
);