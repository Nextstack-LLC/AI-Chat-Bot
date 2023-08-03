"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var base_url = "https://chat-api.nextstack.org/api/v1";
var instance = _axios["default"].create({
  baseURL: base_url
});
var _default = instance;
exports["default"] = _default;