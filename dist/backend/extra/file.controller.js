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
var routes_controller_1 = __importDefault(require("./routes.controller"));
var fs = __importStar(require("fs"));
var os = __importStar(require("os"));
var cpus = os.cpus().length;
var waitTime = cpus <= 2 ? 25 : cpus <= 4 ? 13 : cpus <= 6 ? 10 : 5;
console.log(waitTime);
var FileController = (function () {
    function FileController() {
        this.counterRenamed = 0;
        this.renameIdent = "-(r";
        this.devOptions = {
            doMove: false,
            doRename: false,
        };
        if (this.devOptions.doMove == false || this.devOptions.doRename === false) {
            console.warn("some of the devOptions are set to false", false);
        }
        this.routeController = new routes_controller_1.default();
    }
    FileController.prototype.checkType = function (files, initialRoute) {
        return __awaiter(this, void 0, void 0, function () {
            var preFilesToMove, i, unstructured, finalPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preFilesToMove = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < files.length)) return [3, 4];
                        unstructured = files[i].unstructured;
                        return [4, this.routeController.typeOf(unstructured.ext)];
                    case 2:
                        finalPath = _a.sent();
                        if (initialRoute)
                            preFilesToMove.push({
                                initialPath: initialRoute,
                                finalPath: finalPath,
                                file: files[i],
                            });
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2, preFilesToMove];
                }
            });
        });
    };
    FileController.prototype.moveFiles = function (files) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var _loop_1 = function (i) {
                    var _a = files[i], file = _a.file, finalPath = _a.finalPath, initialPath = _a.initialPath;
                    var fileName = file.fileName;
                    var oldPath = initialPath + fileName;
                    var newPath = finalPath + fileName;
                    setTimeout(function () {
                        if (_this.devOptions.doRename) {
                            fs.renameSync(oldPath, newPath);
                        }
                    }, 500);
                };
                for (var i = 0; i < files.length; i++) {
                    _loop_1(i);
                }
                resolve(files);
            }
            catch (error) {
                reject("Ha ocurrido un error moviendo el archivo " + error);
            }
        });
    };
    FileController.prototype.readFromPath = function (path) {
        var _this = this;
        return new Promise(function (resolve) {
            var result = fs.readdirSync(path);
            _this.unstructuredFiles(result).then(function (result) {
                resolve(result);
            });
        });
    };
    FileController.prototype.checkingFiles = function (filesToMove) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var i, lastFileName, checker, newName, change, newFileName, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < filesToMove.length)) return [3, 4];
                        lastFileName = filesToMove[i].file.fileName;
                        return [4, this.chechIfFileExist(filesToMove[i])];
                    case 2:
                        checker = _a.sent();
                        newName = checker.newName, change = checker.change;
                        if (change) {
                            if (newName) {
                                newFileName = newName + filesToMove[i].file.unstructured.ext;
                                filesToMove[i].file.lastName = lastFileName;
                                filesToMove[i].file.unstructured.name = newName;
                                filesToMove[i].file.fileName = newFileName;
                                filesToMove[i].file.renamed = true;
                            }
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        resolve(this.doFileRename(filesToMove));
                        return [3, 6];
                    case 5:
                        error_1 = _a.sent();
                        reject("Ha ocurrido un error leyendo los archios");
                        console.error(error_1);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        }); });
    };
    FileController.prototype.unstructuredFiles = function (files) {
        if (files === void 0) { files = []; }
        return new Promise(function (resolve) {
            var filesComplements = [];
            var _loop_2 = function (i) {
                if (files[i].includes(".")) {
                    var fileComplements_1 = files[i].split(".");
                    setTimeout(function () {
                        filesComplements.push({
                            fileName: files[i],
                            renamed: false,
                            unstructured: {
                                name: fileComplements_1[0],
                                ext: "." + fileComplements_1[fileComplements_1.length - 1],
                            },
                        });
                    }, waitTime);
                }
            };
            for (var i = 0; i < files.length; i++) {
                _loop_2(i);
            }
            setTimeout(function () {
                resolve(filesComplements);
            }, waitTime * files.length);
        });
    };
    FileController.prototype.chechIfFileExist = function (fileToMove) {
        return __awaiter(this, void 0, void 0, function () {
            var file, finalPath, fileName;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        file = fileToMove.file, finalPath = fileToMove.finalPath;
                        fileName = file.fileName;
                        if (!fs.existsSync(finalPath + fileName)) return [3, 2];
                        _a = {
                            change: true
                        };
                        return [4, this.renameFile(fileToMove)];
                    case 1: return [2, (_a.newName = _b.sent(),
                            _a)];
                    case 2: return [2, {
                            change: false,
                        }];
                }
            });
        });
    };
    FileController.prototype.renameFile = function (fileToMove) {
        return __awaiter(this, void 0, void 0, function () {
            var file, finalPath, name, numb, newName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.counterRenamed++;
                        file = fileToMove.file, finalPath = fileToMove.finalPath;
                        name = file.unstructured.name;
                        return [4, this.checkIfRenamedBefore(finalPath, name)];
                    case 1:
                        numb = _a.sent();
                        newName = "" + name + this.renameIdent + numb + ")";
                        return [2, newName];
                }
            });
        });
    };
    FileController.prototype.checkIfRenamedBefore = function (finalPath, name) {
        return __awaiter(this, void 0, void 0, function () {
            var finalPahtFiles, number, i, preName1, preName2;
            return __generator(this, function (_a) {
                finalPahtFiles = fs.readdirSync(finalPath);
                number = 1;
                for (i = 0; i < finalPahtFiles.length; i++) {
                    if (finalPahtFiles[i].includes(this.renameIdent)) {
                        preName1 = finalPahtFiles[i].split(this.renameIdent);
                        if (preName1[0] === name) {
                            preName2 = preName1[1].split(")");
                            number = parseInt(preName2[0]) + 1;
                        }
                    }
                }
                return [2, number];
            });
        });
    };
    FileController.prototype.doFileRename = function (fileToMove) {
        var _this = this;
        var interWaitTime = waitTime;
        return new Promise(function (resolve, reject) {
            try {
                var _loop_3 = function (i) {
                    if (fileToMove[i].file.renamed) {
                        var initialPath = fileToMove[i].initialPath;
                        var _a = fileToMove[i].file, lastName = _a.lastName, fileName = _a.fileName;
                        var oldPath_1 = initialPath + lastName;
                        var newPath_1 = initialPath + fileName;
                        if (_this.devOptions.doMove) {
                            setTimeout(function () {
                                fs.renameSync(oldPath_1, newPath_1);
                            }, waitTime);
                        }
                        else {
                            interWaitTime = 0;
                        }
                    }
                };
                for (var i = 0; i < fileToMove.length; i++) {
                    _loop_3(i);
                }
                setTimeout(function () {
                    resolve("Se han renombrando los archivos con exito");
                }, interWaitTime * fileToMove.length);
            }
            catch (error) {
                reject("Ha ocurrido un error leyendo los archios > " + error);
            }
        });
    };
    return FileController;
}());
exports.default = FileController;
//# sourceMappingURL=file.controller.js.map