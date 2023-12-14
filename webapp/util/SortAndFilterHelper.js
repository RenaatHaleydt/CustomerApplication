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
        },
        handleFilterBarGo: function (oController, sTableName) {
            let oTable = oController.byId(sTableName),
                oFilterBar = oController.getView().byId("filterbar"),
                oBinding = oTable.getBinding("items")

            let aTableFilters = oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl(),
					aSelectedKeys = oControl.getSelectedKeys(),
					aFilters = aSelectedKeys.map(function (sSelectedKey) {
						return new Filter({
							path: oFilterGroupItem.getName(),
							operator: sap.ui.model.FilterOperator.EQ,
							value1: sSelectedKey
						});
					});

				if (aSelectedKeys.length > 0) {
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