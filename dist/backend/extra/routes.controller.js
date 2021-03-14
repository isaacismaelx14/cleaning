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
var fs = __importStar(require("fs"));
var checkFile_1 = __importDefault(require("./checkFile"));
var config_controller_1 = require("./config.controller");
var audioPath;
var compressedPath;
var execPath;
var imagePath;
var textPath;
var videoPath;
var othersPath;
var RouteController = (function () {
    function RouteController() {
        config_controller_1.redingJson().then(function () {
            audioPath = config_controller_1.jsonResponse.audioFiles.routeFor;
            compressedPath = config_controller_1.jsonResponse.compressedFiles.routeFor;
            execPath = config_controller_1.jsonResponse.executableFiles.routeFor;
            imagePath = config_controller_1.jsonResponse.imageFiles.routeFor;
            videoPath = config_controller_1.jsonResponse.videoFiles.routeFor;
            textPath = config_controller_1.jsonResponse.textFiles.routeFor;
            if (config_controller_1.jsonResponse.othersFiles) {
                othersPath = config_controller_1.jsonResponse.othersFiles.routeFor;
            }
        });
    }
    RouteController.prototype.checkExist = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!fs.existsSync(path))
                    fs.mkdirSync(path);
                return [2, path];
            });
        });
    };
    RouteController.prototype.forAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.checkExist(audioPath)];
            });
        });
    };
    RouteController.prototype.forCompressed = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.checkExist(compressedPath)];
            });
        });
    };
    RouteController.prototype.forExec = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.checkExist(execPath)];
            });
        });
    };
    RouteController.prototype.forImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.checkExist(imagePath)];
            });
        });
    };
    RouteController.prototype.forText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.checkExist(textPath)];
            });
        });
    };
    RouteController.prototype.forVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.checkExist(videoPath)];
            });
        });
    };
    RouteController.prototype.forUnknown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (othersPath) {
                    return [2, othersPath];
                }
                else {
                    return [2, "unknow"];
                }
                return [2];
            });
        });
    };
    RouteController.prototype.typeOf = function (ext) {
        return __awaiter(this, void 0, void 0, function () {
            var checker, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        checker = new checkFile_1.default(ext);
                        _a = true;
                        switch (_a) {
                            case checker.isAudioFile(): return [3, 2];
                            case checker.isCompressedFile(): return [3, 3];
                            case checker.isExecutableFile(): return [3, 4];
                            case checker.isImageFile(): return [3, 5];
                        }
                        return [4, checker.isTextFile()];
                    case 1:
                        switch (_a) {
                            case _b.sent(): return [3, 6];
                            case checker.isVideoFile(): return [3, 7];
                        }
                        return [3, 8];
                    case 2: return [2, this.forAudio()];
                    case 3: return [2, this.forCompressed()];
                    case 4: return [2, this.forExec()];
                    case 5: return [2, this.forImage()];
                    case 6: return [2, this.forText()];
                    case 7: return [2, this.forVideo()];
                    case 8: return [2, this.forUnknown()];
                }
            });
        });
    };
    return RouteController;
}());
exports.default = RouteController;
//# sourceMappingURL=routes.controller.js.map