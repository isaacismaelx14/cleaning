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
var FileController = (function () {
    function FileController() {
        this.counterRenamed = 0;
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
                for (var i = 0; i < files.length; i++) {
                    var _a = files[i], file = _a.file, finalPath = _a.finalPath, initialPath = _a.initialPath;
                    var fileName = file.fileName;
                    var oldPath = initialPath + fileName;
                    var newPath = finalPath + fileName;
                    if (_this.devOptions.doRename) {
                        fs.renameSync(oldPath, newPath);
                    }
                }
                resolve(files);
            }
            catch (error) {
                reject("Ha ocurrido un error moviendo el archivo " + error);
            }
        });
    };
    FileController.prototype.readFromPath = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var result, unstructuredFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = fs.readdirSync(path);
                        return [4, this.unstructuredFiles(result)];
                    case 1:
                        unstructuredFile = _a.sent();
                        return [2, unstructuredFile];
                }
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
        return __awaiter(this, void 0, void 0, function () {
            var filesComplements, i, fileComplements;
            return __generator(this, function (_a) {
                filesComplements = [];
                for (i = 0; i < files.length; i++) {
                    if (files[i].includes(".")) {
                        fileComplements = files[i].split(".");
                        filesComplements.push({
                            fileName: files[i],
                            renamed: false,
                            unstructured: {
                                name: fileComplements[0],
                                ext: "." + fileComplements[1],
                            },
                        });
                    }
                }
                return [2, filesComplements];
            });
        });
    };
    FileController.prototype.chechIfFileExist = function (fileToMove) {
        return __awaiter(this, void 0, void 0, function () {
            var file, finalPath, fileName;
            return __generator(this, function (_a) {
                file = fileToMove.file, finalPath = fileToMove.finalPath;
                fileName = file.fileName;
                if (fs.existsSync(finalPath + fileName)) {
                    return [2, {
                            change: true,
                            newName: this.renameFile(fileToMove),
                        }];
                }
                return [2, {
                        change: false,
                    }];
            });
        });
    };
    FileController.prototype.renameFile = function (fileToMove) {
        this.counterRenamed++;
        var file = fileToMove.file;
        var name = file.unstructured.name;
        var newName = name + "-(r" + this.counterRenamed + ")";
        return newName;
    };
    FileController.prototype.checkIfRenamedBefore = function (name) {
        if (name.includes("-(r")) {
            var preName1 = name.split("-(r");
            console.log(preName1);
        }
    };
    FileController.prototype.doFileRename = function (fileToMove) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                for (var i = 0; i < fileToMove.length; i++) {
                    if (fileToMove[i].file.renamed) {
                        var initialPath = fileToMove[i].initialPath;
                        var _a = fileToMove[i].file, lastName = _a.lastName, fileName = _a.fileName;
                        var oldPath = initialPath + lastName;
                        var newPath = initialPath + fileName;
                        if (_this.devOptions.doMove) {
                            fs.renameSync(oldPath, newPath);
                        }
                    }
                }
                resolve("Se han renombrando los archivos con exito");
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