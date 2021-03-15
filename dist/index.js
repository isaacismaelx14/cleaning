"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var App_1 = __importDefault(require("./views/App"));
var Setup_1 = __importDefault(require("./views/Setup"));
react_dom_1.default.render(jsx_runtime_1.jsx(App_1.default, {}, void 0), document.getElementById("root"));
react_dom_1.default.render(jsx_runtime_1.jsx(Setup_1.default, {}, void 0), document.getElementById("setup-root"));
//# sourceMappingURL=index.js.map