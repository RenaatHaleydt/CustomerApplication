sap.ui.define(['sap/ui/Device','sap/ui/model/Sorter',
'sap/ui/core/Fragment',
'sap/ui/model/Filter'], function (Device, Sorter, Fragment, Filter) {
    "use strict";

    return {
        handleSortButtonPressed: function (oController, sFragment) {
            this.getViewSettingsDialog(sFragment, oController)
                .then(function (oViewSettingsDialog) {
                    oViewSettingsDialog.open();
                });
        },
        handleFilterButtonPressed: function (oController, sFragment) {
            this.getViewSettingsDialog(sFragment, oController)
                .then(function (oViewSettingsDialog) {
                    oViewSettingsDialog.open();
                });
        },
        getViewSettingsDialog: function (sDialogFragmentName, oController) {
            var pDialog = oController._mViewSettingsDialogs[sDialogFragmentName];

            if (!pDialog) {
                pDialog = Fragment.load({
                    id: oController.getView().getId(),
                    name: sDialogFragmentName,
                    controller: oController
                }).then(function (oDialog) {
                    if (Device.system.desktop) {
                        oDialog.addStyleClass("sapUiSizeCompact");
                    }
                    return oDialog;
                });
                oController._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
            }
            return pDialog;
        },
        handleSortDialogConfirm: function (oEvent, oController, sTableName) {
            var oTable = oController.byId(sTableName),
                mParams = oEvent.getParameters(),
                oBinding = oTable.getBinding("items"),
                sPath,
                bDescending,
                aSorters = [];

            sPath = mParams.sortItem.getKey();
            bDescending = mParams.sortDescending;
            aSorters.push(new Sorter(sPath, bDescending));

            // apply the selected sort and group settings
            oBinding.sort(aSorters);
        },
        handleFilterDialogConfirm: function (oEvent, oController, sTableName) {
            var oTable = oController.byId(sTableName),
                mParams = oEvent.getParameters(),
                oBinding = oTable.getBinding("items"),
                aFilters = [];

            mParams.filterItems.forEach(function(oItem) {
                let sPath = oItem.getParent().getKey(),
                    sOperator = 'EQ',
                    sValue1 = oItem.getKey(),
                    oFilter = new Filter(sPath, sOperator, sValue1);
                aFilters.push(oFilter);
            });

            // apply filter settings
            oBinding.filter(aFilters);

            // update filter bar
            // this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
            // this.byId("vsdFilterLabel").setText(mParams.filterString);
        },
    }})