"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = void 0;
const failure = (message) => {
    const filteredMessage = message.replace(/([\u001b]\[.{1,2}m)/g, '');
    const shortMessage = filteredMessage.replace(/[\n].*/g, '');
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
