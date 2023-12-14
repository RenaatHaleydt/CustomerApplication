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
        handleFilterBarGo: function (oController, sTableName) {
            let oTable = oController.byId(sTableName),
                oFilterBar = oController.getView().byId("filterbar"),
                oBinding = oTable.getBinding("items")
                

            let aTableFilters = oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				let oControl = oFilterGroupItem.getControl(),
                aFilters = []
                if(oFilterGroupItem.getName() === 'Search'){
                    aFilters.push(new Filter({
                        path: "City",
                        operator: sap.ui.model.FilterOperator.Contains,
                        value1: oControl.getValue()
                    }))
                }else{
				let aSelectedKeys = oControl.getSelectedKeys()
                if(aSelectedKeys.length > 0){
				    aFilters.push(aSelectedKeys.map(function (sSelectedKey) {
						return new Filter({
							path: oFilterGroupItem.getName(),
							operator: sap.ui.model.FilterOperator.EQ,
							value1: sSelectedKey
						});
					}))
                }
                }

				if (aFilters.length > 0) {
					aResult.push(new Filter({
						filters: aFilters,
						and: false
					}));
				}

				return aResult;
			}, []);


			oBinding.filter(aTableFilters);
        }
    }})