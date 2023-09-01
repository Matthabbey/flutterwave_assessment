"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAccountNumber = exports.UserSchema = exports.option = void 0;
const joi_1 = __importDefault(require("joi"));
exports.option = {
    abortEarly: false,
    errors: {
        wrap: { label: '' }
    }
};
exports.UserSchema = joi_1.default.object().keys({
    account_holder_name: joi_1.default.string().required(),
    account_holder_DOB: joi_1.default.date().required(),
    account_type: joi_1.default.string().valid("Savings").required(),
    initial_balance: joi_1.default.number().min(0).required(),
});
const GenerateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
};
exports.GenerateAccountNumber = GenerateAccountNumber;
