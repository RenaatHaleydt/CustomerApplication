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
                let that = this
                let oContext = oEvent.getSource().getBindingContext();
                // Ensure oContext is valid before proceeding
                if (!oContext) {
                    // Handle the error or return
                    return;
                }
                // let oOffer = oContext.getObject()

                this.getOwnerComponent().getModel().read(oContext.getPath(), {
                    urlParameters: {
                        "$format": "json",
                        "$expand": "OfferMaterials,OfferMaterials/Material"
                    },
                    success: oData => {
                        let oOfferModel = new sap.ui.model.json.JSONModel(oData);

                        that.getView().setModel(oOfferModel, "offerModel");
                        that.oDialog.open()
                    },
                    error: oError => {
                        
                    }
                })

                

                
                
            },
            onCloseDialog: function(oEvent){
                    
                this.oDialog.close();
                
            }
        });
    });
