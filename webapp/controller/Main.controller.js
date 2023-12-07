sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/Device',
    'sap/f/library',
    '../util/SortAndFilterHelper'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Device, fioriLibrary, SortAndFilterHelper) {
        "use strict";

        return Controller.extend("ap.customerapplication.controller.Main", {
            onInit: function () {
                // Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
			    this._mViewSettingsDialogs = {};
            },

            onListItemPress: function (oEvent) {
                let sCustomerPath = oEvent.getSource().getBindingContext().getPath(),
                oSelectedCustomer = sCustomerPath.split("'")[1]; // We split the path /CustomerSet('145999') into 3 pieces by splitting on '

			    this.getOwnerComponent().getRouter().navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, customer: oSelectedCustomer});
            },
            onNavToOffers: function(oEvent){
                this.getOwnerComponent().getRouter().navTo("offers");
            },
            handleSortButtonPressed: function () {
                SortAndFilterHelper.handleSortButtonPressed(this, "ap.customerapplication.fragments.sortDialog")
            },
            handleFilterButtonPressed: function () {
                SortAndFilterHelper.handleFilterButtonPressed(this, "ap.customerapplication.fragments.filterDialog")
            },
            handleSortDialogConfirm: function (oEvent) {
                SortAndFilterHelper.handleSortDialogConfirm(oEvent, this, "customersTable")
            },
            handleFilterDialogConfirm: function (oEvent) {
                SortAndFilterHelper.handleFilterDialogConfirm(oEvent, this, 'customersTable')
            },
        });
    });
