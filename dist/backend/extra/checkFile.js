"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_controller_1 = require("./config.controller");
config_controller_1.redingJson();
var Checkers = (function () {
    function Checkers(ext) {
        this.textFiles = config_controller_1.jsonResponse.textFiles.files;
        this.audioFiles = config_controller_1.jsonResponse.audioFiles.files;
        this.compressedFiles = config_controller_1.jsonResponse.compressedFiles.files;
        this.imageFiles = config_controller_1.jsonResponse.imageFiles.files;
        this.videoFiles = config_controller_1.jsonResponse.videoFiles.files;
        this.executableFiles = config_controller_1.jsonResponse.executableFiles.files;
        this.ext = ext;
    }
    Checkers.prototype.isTextFile = function () {
        var _this = this;
        try {
            if (this.textFiles.find(function (textExt) { return textExt == _this.ext; }))
                return true;
            else
                return false;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };
    Checkers.prototype.isImageFile = function () {
        var _this = this;
        try {
            if (this.imageFiles.find(function (Element) { return Element == _this.ext; }))
                return true;
            else
                return false;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };
    Checkers.prototype.isAudioFile = function () {
        var _this = this;
        try {
            if (this.audioFiles.find(function (Element) { return Element == _this.ext; }))
                return true;
            else
                return false;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };
    Checkers.prototype.isCompressedFile = function () {
        var _this = this;
        try {
            if (this.compressedFiles.find(function (Element) { return Element == _this.ext; }))
                return true;
            else
                return false;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };
    Checkers.prototype.isVideoFile = function () {
        var _this = this;
        try {
            if (this.videoFiles.find(function (Element) { return Element == _this.ext; }))
                return true;
            else
                return false;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };
    Checkers.prototype.isExecutableFile = function () {
        var _this = this;
        try {
            if (this.executableFiles.find(function (Element) { return Element == _this.ext; }))
                return true;
            else
                return false;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };
    return Checkers;
}());
exports.default = Checkers;
//# sourceMappingURL=checkFile.js.map