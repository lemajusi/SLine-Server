"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let caseModel;
exports.caseHandler = new class caseHandler {
    constructor() {
        this.validateBody = (caseData) => {
            if (!caseData) {
                return false;
            }
            if (caseData !== caseModel) {
                return false;
            }
            return true;
        };
    }
};