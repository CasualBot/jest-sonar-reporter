"use strict";
exports.__esModule = true;
exports.failure = void 0;
var failure = function (message) {
    var filteredMessage = message.replace(/([\u001b]\[.{1,2}m)/g, '');
    var shortMessage = filteredMessage.replace(/[\n].*/g, '');
    return {
        failure: {
            _attr: {
                message: shortMessage
            },
            _cdata: filteredMessage
        }
    };
};
exports.failure = failure;
