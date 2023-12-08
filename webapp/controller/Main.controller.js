sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/Device',
    'sap/f/library',
    '../util/SortAndFilterHelper',
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Device, fioriLibrary, SortAndFilterHelper, Spreadsheet, exportLibrary) {
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
            onExport: function(oEvent) {
                let aCols, oRowBinding, oSettings, oSheet, oTable;
                
    
                oTable = this.getView().byId("customersTable")
                oRowBinding = oTable.getBinding('items')
                aCols = this.createColumnConfig()
    
                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'Table export sample.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
    
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });
            },
            createColumnConfig: function() {
                let aCols = []
                let EdmType = exportLibrary.EdmType
    
                aCols.push({
                    label: 'Id',
                    property: ['Kunnr'],
                    type: EdmType.String,
                    template: 'Whatever you want - {0}'
                });
    
                aCols.push({
                    label: 'Name',
                    type: EdmType.String,
                    property: 'Name',
                    scale: 0
                });
    
                aCols.push({
                    property: 'Country',
                    type: EdmType.String
                });
    
                aCols.push({
                    property: 'City',
                    type: EdmType.String
                });

                return aCols;
            },
        });
    });
