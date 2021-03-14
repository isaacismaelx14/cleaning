"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Checkers = (function () {
    function Checkers(ext) {
        this.textFiles = [
            ".txt",
            ".doc",
            ".docx",
            "pptx",
            ".odt",
            ".docm",
            ".pdf",
            ".rtf",
        ];
        this.audioFiles = [
            ".aif",
            ".cda",
            ".mid",
            ".midi",
            ".mp3",
            ".mpa",
            ".ogg",
            ".wav",
            ".wma",
            ".wpl",
        ];
        this.compressedFiles = [".7z", ".rar", ".zip"];
        this.imageFiles = [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".ico",
            ".tiff",
            ".NEF",
        ];
        this.videoFiles = [
            ".avi",
            ".flv",
            ".mov",
            ".mp4",
            ".wmv",
            ".m4v",
        ];
        this.executableFiles = [".exe", ".msi"];
        this.ext = ext;
    }
    Checkers.prototype.isTextFile = function () {
        var _this = this;
        if (this.textFiles.find(function (textExt) { return textExt == _this.ext; }))
            return true;
        else
            return false;
    };
    Checkers.prototype.isImageFile = function () {
        var _this = this;
        if (this.imageFiles.find(function (Element) { return Element == _this.ext; }))
            return true;
        else
            return false;
    };
    Checkers.prototype.isAudioFile = function () {
        var _this = this;
        if (this.audioFiles.find(function (Element) { return Element == _this.ext; }))
            return true;
        else
            return false;
    };
    Checkers.prototype.isCompressedFile = function () {
        var _this = this;
        if (this.compressedFiles.find(function (Element) { return Element == _this.ext; }))
            return true;
        else
            return false;
    };
    Checkers.prototype.isVideoFile = function () {
        var _this = this;
        if (this.videoFiles.find(function (Element) { return Element == _this.ext; }))
            return true;
        else
            return false;
    };
    Checkers.prototype.isExecutableFile = function () {
        var _this = this;
        if (this.executableFiles.find(function (Element) { return Element == _this.ext; }))
            return true;
        else
            return false;
    };
    return Checkers;
}());
exports.default = Checkers;
//# sourceMappingURL=checkFile.js.map