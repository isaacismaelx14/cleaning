"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
function StateApp(props) {
    if (props.state === "doing") {
        return jsx_runtime_1.jsx("p", { children: "Doing" }, void 0);
    }
    else if (props.state === "Success") {
        return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("h3", __assign({ className: "title succes" }, { children: "Proceso terminado" }), void 0),
                jsx_runtime_1.jsxs("p", { children: [jsx_runtime_1.jsx("strong", { children: "Numero de archivos: " }, void 0), props.file.length] }, void 0)] }, void 0));
    }
    else if (props.state === "Error") {
        return jsx_runtime_1.jsx("div", { children: "Error" }, void 0);
    }
    else if (props.state === "Warning") {
        return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("h3", __assign({ className: "title warning" }, { children: "Proceso terminado" }), void 0),
                jsx_runtime_1.jsx("p", { children: props.file }, void 0)] }, void 0));
    }
    else {
        return jsx_runtime_1.jsx("div", {}, void 0);
    }
}
exports.default = StateApp;
//# sourceMappingURL=StateApp.js.map