sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/Device',
    'sap/f/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Device, fioriLibrary) {
        "use strict";

        return Controller.extend("ap.customerapplication.controller.Offer", {
            onInit: function () {
                this.oDialog = sap.ui.xmlfragment(
                    "ap.customerapplication.fragments.Offer",
                    this
                  );
                  this.getView().addDependent(this.oDialog);
            },
            onNavToCustomers: function(oEvent){
                this.getOwnerComponent().getRouter().navTo("master");
            },
            onListItemPress: function(oEvent){
                var oContext = oEvent.getSource().getBindingContext();

                // Ensure oContext is valid before proceeding
                if (!oContext) {
                    // Handle the error or return
                    return;
                }

                
                let oOfferModel = new sap.ui.model.json.JSONModel(oContext.getObject());

                this.getView().setModel(oOfferModel, "offerModel");
                this.oDialog.open()
            },
            onCloseDialog: function(oEvent){
                    
                this.oDialog.close();
                
            }
        });
    });
