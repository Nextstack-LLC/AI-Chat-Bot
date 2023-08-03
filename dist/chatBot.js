"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _chat = _interopRequireDefault(require("./chat"));
var _ErrorBoudary = _interopRequireDefault(require("./ErrorBoudary"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ChatBot(props) {
  return /*#__PURE__*/_react["default"].createElement(_ErrorBoudary["default"], {
    chatchError: props.chatchError
  }, /*#__PURE__*/_react["default"].createElement(_chat["default"], {
    companyId: props.companyId,
    analitics: props.analitics,
    trackImpression: props.trackImpression
  }));
}
var _default = ChatBot;
exports["default"] = _default;