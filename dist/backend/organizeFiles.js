"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var file_controller_1 = __importDefault(require("./extra/file.controller"));
var OrganizeFiles = (function () {
    function OrganizeFiles() {
        this.fileController = new file_controller_1.default();
    }
    OrganizeFiles.prototype.start = function (path, jsonPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var message = {
                            messageType: "Error",
                            message: "Error desconocido Code 1-Unknoun",
                        };
                        _this.gettingFiles(path, jsonPath)
                            .then(function (m) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            var _this = this;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (!this.filesToMove) return [3, 2];
                                        _b = (_a = this.fileController)
                                            .checkingFiles;
                                        return [4, this.filesToMove];
                                    case 1:
                                        _b.apply(_a, [_c.sent()])
                                            .then(function () { })
                                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4, this.moveFiles()];
                                                    case 1:
                                                        message = _a.sent();
                                                        resolve(message);
                                                        return [2];
                                                }
                                            });
                                        }); })
                                            .catch(function (messageE) {
                                            message.message = messageE;
                                            reject(message);
                                        });
                                        _c.label = 2;
                                    case 2: return [2];
                                }
                            });
                        }); })
                            .catch(function (e) {
                            message = {
                                messageType: "Warning",
                                message: "Las rutas no contienen ningun archivo",
                            };
                            reject(message);
                        });
                    })];
            });
        });
    };
    OrganizeFiles.prototype.gettingFiles = function (path, jsonPath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fController = _this.fileController;
            fController.readFromPath(path).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (result.length === 0) {
                        reject(false);
                    }
                    else {
                        this.filesToMove = fController.checkType(result, path, jsonPath);
                        resolve(true);
                    }
                    return [2];
                });
            }); });
        });
    };
    OrganizeFiles.prototype.moveFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lMessage, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        lMessage = {
                            messageType: "Error",
                            message: "Error desconocido Code 0-Unknoun",
                        };
                        if (!this.filesToMove) return [3, 3];
                        _b = (_a = this.fileController)
                            .moveFiles;
                        return [4, this.filesToMove];
                    case 1: return [4, _b.apply(_a, [_c.sent()])
                            .then(function (message) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = {
                                            messageType: "Success"
                                        };
                                        return [4, message];
                                    case 1:
                                        lMessage = (_a.message = _b.sent(),
                                            _a);
                                        return [2];
                                }
                            });
                        }); })
                            .catch(function (message) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = {
                                            messageType: "Error"
                                        };
                                        return [4, message];
                                    case 1:
                                        lMessage = (_a.message = _b.sent(),
                                            _a);
                                        return [2];
                                }
                            });
                        }); })];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3: return [2, lMessage];
                }
            });
        });
    };
    return OrganizeFiles;
}());
exports.default = OrganizeFiles;
//# sourceMappingURL=organizeFiles.js.map