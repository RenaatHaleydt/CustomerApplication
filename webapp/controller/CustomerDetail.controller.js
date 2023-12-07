sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ap.customerapplication.controller.CustomerDetail", {
            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter()
                oRouter.getRoute("master").attachPatternMatched(this._onCustomerMatched, this);
                oRouter.getRoute("detail").attachPatternMatched(this._onCustomerMatched, this);
            },
            _onCustomerMatched: function (oEvent) {
                let sCustomerID = oEvent.getParameter("arguments").customer || "0";
                this.getView().bindElement({
                    path: `/CustomerSet('${sCustomerID}')`
                    // ,
                    // parameters: {
                    //     $expand: "Customer_SalesSet",
                    //     $filter: "Kunnr eq '" + sCustomerID +  "'"
                    // }
                });
            },
    
            onExit: function () {
                this.oRouter.getRoute("list").detachPatternMatched(this._onProductMatched, this);
                this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
            }
        });
    });
