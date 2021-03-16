"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var Store_provider_1 = __importDefault(require("../Hooks/Store.provider"));
var Home_1 = __importDefault(require("../components/homePage/Home"));
var electron_1 = require("electron");
var Setup_1 = __importDefault(require("./Setup"));
function App() {
    var _a = react_1.useState(false), showSettings = _a[0], setShowSettings = _a[1];
    var _b = react_1.useState(), data = _b[0], setData = _b[1];
    react_1.useEffect(function () {
        electron_1.ipcRenderer.on("open:settings", function (e, newData) {
            setData(JSON.parse(newData));
        });
    }, []);
    react_1.useEffect(function () {
        if (data !== undefined)
            setShowSettings(true);
    }, [data]);
    react_1.useEffect(function () {
        if (!showSettings)
            setData(undefined);
    }, [showSettings]);
    return (jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsx(Store_provider_1.default, { children: showSettings ? (jsx_runtime_1.jsx(Setup_1.default, { data: data, changeState: setShowSettings }, void 0)) : (jsx_runtime_1.jsx(Home_1.default, {}, void 0)) }, void 0) }, void 0));
}
exports.default = App;
//# sourceMappingURL=App.js.map