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
function List(props) {
    return (jsx_runtime_1.jsx("div", __assign({ id: "toDo", className: "container bg-primary m-0" }, { children: props.list.map(function (element) { return (jsx_runtime_1.jsxs("div", __assign({ className: "list-item", id: element.id }, { children: [element.path, jsx_runtime_1.jsx("button", __assign({ className: "btn btn-danger btn-sm", onClick: function (e) { return props.func(e, element.id); } }, { children: "Quitar de la lista" }), void 0)] }), element.id)); }) }), void 0));
}
exports.default = List;
//# sourceMappingURL=List.js.map