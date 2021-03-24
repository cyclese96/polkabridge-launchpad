"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PolkaBridgeProvider_1 = require("../contexts/PolkaBridgeProvider");
var usePolkaBridge = function () {
    var pbr = react_1.useContext(PolkaBridgeProvider_1.Context).pbr;
    return pbr;
};
exports["default"] = usePolkaBridge;
