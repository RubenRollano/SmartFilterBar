/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sfb1/SmartFilterBar/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});