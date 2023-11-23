sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, fioriLibrary) {
        "use strict";

        return Controller.extend("ap.customerapplication.controller.Main", {
            onInit: function () {

            },

            onListItemPress: function () {
                var oFCL = this.oView.getParent().getParent();

                oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
            }
        });
    });
