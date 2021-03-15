"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var Store_provider_1 = __importDefault(require("../Hooks/Store.provider"));
var Home_1 = __importDefault(require("../components/homePage/Home"));
function App() {
    return (jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsx(Store_provider_1.default, { children: jsx_runtime_1.jsx(Home_1.default, {}, void 0) }, void 0) }, void 0));
}
exports.default = App;
//# sourceMappingURL=App.js.map