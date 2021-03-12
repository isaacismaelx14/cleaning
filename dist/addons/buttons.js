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
function ButtonSm(props) {
    return (jsx_runtime_1.jsx("button", __assign({ className: "btn btn-success btn-sm m-0", id: "folderSelectBtn", onClick: function (e) { return props.onClick(e); } }, { children: props.children }), void 0));
}
exports.default = ButtonSm;
//# sourceMappingURL=buttons.js.map