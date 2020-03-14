// sap.ui.define([
// 	"sap/ui/core/UIComponent",
// 	"sap/ui/Device",
// 	"sfb1/SmartFilterBar/model/models"
// ], function (UIComponent, Device, models) {
// 	"use strict";

// 	return UIComponent.extend("sfb1.SmartFilterBar.Component", {

// 		metadata: {
// 			manifest: "json"
// 		},

// 		/**
// 		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
// 		 * @public
// 		 * @override
// 		 */
// 		init: function () {
// 			// call the base component's init function
// 			UIComponent.prototype.init.apply(this, arguments);

// 			// enable routing
// 			this.getRouter().initialize();

// 			// set the device model
// 			this.setModel(models.createDeviceModel(), "device");
// 		}
// 	});
// });

sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/fl/FakeLrepConnectorLocalStorage',
	'sap/ui/core/util/MockServer'
], function(UIComponent, FakeLrepConnectorLocalStorage, MockServer) {
	"use strict";

	return UIComponent.extend("sfb1.SmartFilterBar.Component", {

		_oMockServer: null,

		metadata: {
			rootView: {
			 "viewName": "sfb1.SmartFilterBar.view.SmartFilterBar",
			   "type": "XML",
			  "async": true
			},
			dependencies: {
				libs: [ "sap.m", "sap.ui.comp" ]
			},
			config: {
				sample: {
					stretch: true,
					files: [
						"../view/SmartFilterBar.view.xml",
						"../controller/SmartFilterBar.controller.js",
						"../mockserver/LineItemsSet.json",
						"../mockserver/metadata.xml",
						"../mockserver/VL_SH_H_T001.json",
						"../mockserver/VL_SH_DEBIA.json"
					]
				}
			}
		},
		constructor: function () {
			sap.ui.core.UIComponent.prototype.constructor.apply(this, arguments);
			sap.ui.fl.FakeLrepConnectorLocalStorage.enableFakeConnector();

			//Start Mockserver
			this._oMockServer = new MockServer({
				rootUri: "/MockDataService/"
			});
			var sMockdataUrl = sap.ui.require.toUrl("sfb1/SmartFilterBar/mockserver");
			var sMetadataUrl = sMockdataUrl + "/metadata.xml";
			this._oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl: sMockdataUrl,
				aEntitySetsNames: [
					"LineItemsSet", "VL_SH_H_T001", "VL_SH_DEBIA"
				]
			});
			this._oMockServer.start();
		},

		destroy: function() {
			sap.ui.fl.FakeLrepConnectorLocalStorage.disableFakeConnector();
			sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);

			this._oMockServer.stop();
		}
	});
});