sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("test.controller.Employees", {
		
		//json data

		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				employeePath: window.encodeURIComponent(oItem.getBindingContext("employee").getPath().substr(1))
			});
		},

		// filter

		onFilterEmployees: function (oEvent) {
			var aFilter;
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter = new Filter([
					new Filter("FirstName", FilterOperator.Contains, sQuery),
					new Filter("LastName", FilterOperator.Contains, sQuery),
					new Filter("Address", FilterOperator.Contains, sQuery),
					new Filter("City", FilterOperator.Contains, sQuery),
					new Filter("PostalCode", FilterOperator.Contains, sQuery),
					new Filter("Department", FilterOperator.Contains, sQuery)
				], false);
			}

			var oList = this.byId("employeesTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});